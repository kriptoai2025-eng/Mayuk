from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.db.models import Count, Q, Sum
from django.utils import timezone
from datetime import timedelta

from core.models import (
    SuperAdmin, School, SchoolAdmin, Teacher, Student, 
    Class, Subject, Assignment, AssignmentSubmission,
    Note, Grade, Announcement, SystemLog
)
from accounts.mixins import get_user_role, get_user_school


# Generic dashboard redirect
@login_required
def dashboard_redirect(request):
    """Redirect to appropriate dashboard based on user role"""
    user = request.user
    
    if hasattr(user, 'superadmin_profile'):
        return redirect('superadmin_dashboard')
    elif hasattr(user, 'schooladmin_profile'):
        return redirect('schooladmin_dashboard')
    elif hasattr(user, 'teacher_profile'):
        return redirect('teacher_dashboard')
    elif hasattr(user, 'student_profile'):
        return redirect('student_dashboard')
    else:
        return redirect('login')


# Super Admin Dashboard
@login_required
def superadmin_dashboard(request):
    """Super Admin Dashboard - Platform overview"""
    if not hasattr(request.user, 'superadmin_profile'):
        return redirect('dashboard')
    
    # Stats
    total_schools = School.objects.count()
    active_schools = School.objects.filter(is_active=True).count()
    total_students = Student.objects.count()
    total_teachers = Teacher.objects.count()
    
    # Schools by state
    schools_by_state = School.objects.values('state').annotate(
        count=Count('id')
    ).order_by('-count')[:10]
    
    # Recent registrations (last 30 days)
    thirty_days_ago = timezone.now() - timedelta(days=30)
    recent_schools = School.objects.filter(
        date_registered__gte=thirty_days_ago
    ).order_by('-date_registered')[:5]
    
    # Subscription expiring soon (next 30 days)
    thirty_days_future = timezone.now().date() + timedelta(days=30)
    expiring_soon = School.objects.filter(
        is_active=True,
        subscription_end_date__lte=thirty_days_future
    ).order_by('subscription_end_date')[:5]
    
    # Monthly registration chart data (last 6 months)
    from collections import defaultdict
    monthly_registrations = defaultdict(int)
    six_months_ago = timezone.now() - timedelta(days=180)
    schools_last_6_months = School.objects.filter(
        date_registered__gte=six_months_ago
    )
    for school in schools_last_6_months:
        month_key = school.date_registered.strftime('%Y-%m')
        monthly_registrations[month_key] += 1
    
    context = {
        'total_schools': total_schools,
        'active_schools': active_schools,
        'total_students': total_students,
        'total_teachers': total_teachers,
        'schools_by_state': schools_by_state,
        'recent_schools': recent_schools,
        'expiring_soon': expiring_soon,
        'monthly_registrations': dict(monthly_registrations),
        'page_title': 'Super Admin Dashboard',
        'user_role': 'superadmin',
    }
    
    return render(request, 'dashboard/superadmin/dashboard.html', context)


# School Admin Dashboard
@login_required
def schooladmin_dashboard(request):
    """School Admin Dashboard - School management overview"""
    if not hasattr(request.user, 'schooladmin_profile'):
        return redirect('dashboard')
    
    school_admin = request.user.schooladmin_profile
    school = school_admin.school
    
    # Stats
    total_students = Student.objects.filter(school=school, is_active=True).count()
    total_teachers = Teacher.objects.filter(school=school, is_active=True).count()
    total_classes = Class.objects.filter(school=school, is_active=True).count()
    
    # Unread announcements count (for display purposes)
    recent_announcements = Announcement.objects.filter(
        school=school, 
        is_active=True
    ).order_by('-publish_date')[:5]
    
    # Recent students (last 7 days)
    seven_days_ago = timezone.now() - timedelta(days=7)
    recent_students = Student.objects.filter(
        school=school,
        date_enrolled__gte=seven_days_ago
    ).order_by('-date_enrolled')[:5]
    
    # Teachers overview
    teachers = Teacher.objects.filter(school=school, is_active=True)[:5]
    
    # Classes with student counts
    classes = Class.objects.filter(school=school, is_active=True).annotate(
        student_count=Count('students')
    )[:5]
    
    context = {
        'school': school,
        'total_students': total_students,
        'total_teachers': total_teachers,
        'total_classes': total_classes,
        'recent_announcements': recent_announcements,
        'recent_students': recent_students,
        'teachers': teachers,
        'classes': classes,
        'page_title': f'{school.name} - Admin Dashboard',
        'user_role': 'schooladmin',
    }
    
    return render(request, 'dashboard/schooladmin/dashboard.html', context)


# Teacher Dashboard
@login_required
def teacher_dashboard(request):
    """Teacher Dashboard - Teaching activities overview"""
    if not hasattr(request.user, 'teacher_profile'):
        return redirect('dashboard')
    
    teacher = request.user.teacher_profile
    school = teacher.school
    
    # Stats
    classes_assigned = teacher.classes_assigned.count()
    total_students = Student.objects.filter(
        class_enrolled__in=teacher.classes_assigned.all()
    ).count()
    
    # Pending assignments to grade
    pending_submissions = AssignmentSubmission.objects.filter(
        assignment__teacher=teacher,
        is_graded=False
    ).count()
    
    # Notes uploaded count
    notes_uploaded = Note.objects.filter(teacher=teacher).count()
    
    # My classes
    my_classes = Class.objects.filter(
        id__in=teacher.classes_assigned.all()
    ).annotate(
        student_count=Count('students')
    )
    
    # Recent assignments
    recent_assignments = Assignment.objects.filter(
        teacher=teacher
    ).order_by('-date_created')[:5]
    
    # Upcoming assignment deadlines
    upcoming_deadlines = Assignment.objects.filter(
        class_assigned__in=teacher.classes_assigned.all(),
        due_date__gt=timezone.now()
    ).order_by('due_date')[:5]
    
    context = {
        'teacher': teacher,
        'school': school,
        'classes_assigned': classes_assigned,
        'total_students': total_students,
        'pending_submissions': pending_submissions,
        'notes_uploaded': notes_uploaded,
        'my_classes': my_classes,
        'recent_assignments': recent_assignments,
        'upcoming_deadlines': upcoming_deadlines,
        'page_title': 'Teacher Dashboard',
        'user_role': 'teacher',
    }
    
    return render(request, 'dashboard/teacher/dashboard.html', context)


# Student Dashboard
@login_required
def student_dashboard(request):
    """Student Dashboard - Learning activities overview"""
    if not hasattr(request.user, 'student_profile'):
        return redirect('dashboard')
    
    student = request.user.student_profile
    school = student.school
    
    # Unread announcements count
    unread_announcements = Announcement.objects.filter(
        school=school,
        is_active=True,
        target_audience__in=['All', 'Students Only']
    ).exclude(
        publish_date__gt=timezone.now()
    ).count()
    
    # Pending assignments
    pending_assignments = Assignment.objects.filter(
        class_assigned=student.class_enrolled,
        is_published=True,
        due_date__gt=timezone.now()
    ).exclude(
        submissions__student=student
    ).count()
    
    # My assignments (submitted and graded)
    my_submissions = AssignmentSubmission.objects.filter(
        student=student
    ).order_by('-date_submitted')[:5]
    
    # Recent announcements
    recent_announcements = Announcement.objects.filter(
        school=school,
        is_active=True,
        target_audience__in=['All', 'Students Only'],
        publish_date__lte=timezone.now()
    ).order_by('-is_pinned', '-publish_date')[:5]
    
    # Available notes
    available_notes = Note.objects.filter(
        class_assigned=student.class_enrolled,
        is_published=True
    ).order_by('-date_uploaded')[:5]
    
    # Latest grades
    latest_grades = Grade.objects.filter(
        student=student,
        is_published=True
    ).order_by('-date_recorded')[:5]
    
    context = {
        'student': student,
        'school': school,
        'unread_announcements': unread_announcements,
        'pending_assignments': pending_assignments,
        'my_submissions': my_submissions,
        'recent_announcements': recent_announcements,
        'available_notes': available_notes,
        'latest_grades': latest_grades,
        'page_title': 'Student Dashboard',
        'user_role': 'student',
    }
    
    return render(request, 'dashboard/student/dashboard.html', context)
