from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.models import User
from django.db import transaction
from django.utils import timezone
from datetime import timedelta

from .forms import LoginForm, SchoolRegistrationForm, TeacherCreationForm, StudentCreationForm, ProfileUpdateForm
from .mixins import get_user_role, get_user_school
from core.models import SuperAdmin, School, SchoolAdmin, Teacher, Student, SystemLog


def login_view(request):
    """Handle user login with role auto-detection"""
    if request.user.is_authenticated:
        return redirect('dashboard')
    
    form = LoginForm(request)
    
    if request.method == 'POST':
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            
            user = authenticate(username=username, password=password)
            
            if user is not None:
                login(request, user)
                
                # Log the action
                SystemLog.objects.create(
                    user=user,
                    action='LOGIN',
                    description=f'User {username} logged in',
                    ip_address=get_client_ip(request)
                )
                
                # Redirect based on role
                if hasattr(user, 'superadmin_profile'):
                    messages.success(request, f'Welcome back, Super Admin {user.username}!')
                    return redirect('superadmin_dashboard')
                elif hasattr(user, 'schooladmin_profile'):
                    messages.success(request, f'Welcome back, {user.get_full_name() or user.username}!')
                    return redirect('schooladmin_dashboard')
                elif hasattr(user, 'teacher_profile'):
                    messages.success(request, f'Welcome back, {user.get_full_name() or user.username}!')
                    return redirect('teacher_dashboard')
                elif hasattr(user, 'student_profile'):
                    messages.success(request, f'Welcome back, {user.get_full_name() or user.username}!')
                    return redirect('student_dashboard')
                else:
                    messages.warning(request, 'No role assigned to your account.')
                    return redirect('login')
        else:
            messages.error(request, 'Invalid username or password.')
    
    return render(request, 'accounts/login.html', {'form': form})


@login_required
def logout_view(request):
    """Handle user logout"""
    # Log the action
    SystemLog.objects.create(
        user=request.user,
        action='LOGOUT',
        description=f'User {request.user.username} logged out',
        ip_address=get_client_ip(request)
    )
    
    logout(request)
    messages.info(request, 'You have been logged out successfully.')
    return redirect('login')


@login_required
def profile_view(request):
    """View and update user profile"""
    user = request.user
    role = get_user_role(user)
    
    if request.method == 'POST':
        user_form = ProfileUpdateForm(request.POST, request.FILES, instance=user)
        
        if user_form.is_valid():
            user_form.save()
            
            # Update profile picture if provided
            if hasattr(user, 'superadmin_profile'):
                profile = user.superadmin_profile
                if 'profile_picture' in request.FILES:
                    profile.profile_picture = request.FILES['profile_picture']
                    profile.save()
            elif hasattr(user, 'schooladmin_profile'):
                profile = user.schooladmin_profile
                if 'profile_picture' in request.FILES:
                    profile.profile_picture = request.FILES['profile_picture']
                    profile.save()
            elif hasattr(user, 'teacher_profile'):
                profile = user.teacher_profile
                if 'profile_picture' in request.FILES:
                    profile.profile_picture = request.FILES['profile_picture']
                    profile.save()
            elif hasattr(user, 'student_profile'):
                profile = user.student_profile
                if 'profile_picture' in request.FILES:
                    profile.profile_picture = request.FILES['profile_picture']
                    profile.save()
            
            messages.success(request, 'Profile updated successfully!')
            return redirect('profile')
    else:
        user_form = ProfileUpdateForm(instance=user)
    
    context = {
        'user': user,
        'role': role,
        'user_form': user_form,
    }
    
    return render(request, 'accounts/profile.html', context)


# Super Admin Views
@login_required
def superadmin_school_register(request):
    """Super Admin: Register a new school"""
    if not hasattr(request.user, 'superadmin_profile'):
        messages.error(request, 'Access denied. Super Admin only.')
        return redirect('dashboard')
    
    if request.method == 'POST':
        form = SchoolRegistrationForm(request.POST, request.FILES)
        if form.is_valid():
            try:
                with transaction.atomic():
                    # Create school
                    school = form.save(commit=False)
                    
                    # Generate registration number
                    state_prefix = school.state[:3].upper()
                    year = timezone.now().year
                    school_count = School.objects.filter(state=school.state).count() + 1
                    school.registration_number = f"{state_prefix}/{year}/{school_count:04d}"
                    
                    # Get super admin
                    super_admin = request.user.superadmin_profile
                    school.registered_by = super_admin
                    
                    # Set default subscription dates if not provided
                    if not school.subscription_start_date:
                        school.subscription_start_date = timezone.now().date()
                    if not school.subscription_end_date:
                        school.subscription_end_date = school.subscription_start_date + timedelta(days=365)
                    
                    school.save()
                    
                    # Create School Admin user
                    admin_username = f"{school.registration_number.replace('/', '_')}_admin"
                    admin_email = form.cleaned_data['admin_email']
                    admin_password = form.cleaned_data['admin_password']
                    
                    admin_user = User.objects.create_user(
                        username=admin_username,
                        email=admin_email,
                        password=admin_password,
                        first_name=form.cleaned_data['admin_name'].split()[0] if form.cleaned_data['admin_name'] else 'Admin',
                        last_name=' '.join(form.cleaned_data['admin_name'].split()[1:]) if len(form.cleaned_data['admin_name'].split()) > 1 else ''
                    )
                    
                    SchoolAdmin.objects.create(
                        user=admin_user,
                        school=school,
                        phone_number=form.cleaned_data['admin_phone']
                    )
                    
                    # Log the action
                    SystemLog.objects.create(
                        user=request.user,
                        action='SCHOOL_REGISTERED',
                        description=f'Registered new school: {school.name}',
                        ip_address=get_client_ip(request)
                    )
                    
                    messages.success(
                        request, 
                        f'School "{school.name}" registered successfully! Admin username: {admin_username}'
                    )
                    return redirect('superadmin_dashboard')
                    
            except Exception as e:
                messages.error(request, f'Error registering school: {str(e)}')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = SchoolRegistrationForm()
    
    return render(request, 'accounts/school_register.html', {'form': form})


# Helper function to get client IP
def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip
