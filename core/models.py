from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid


class SuperAdmin(models.Model):
    """Super Admin model for Kripto Software owner"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='superadmin_profile')
    phone_number = models.CharField(max_length=15)
    profile_picture = models.ImageField(upload_to='profile_pictures/superadmin/', blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Super Admin: {self.user.username}"

    class Meta:
        verbose_name = "Super Admin"
        verbose_name_plural = "Super Admins"


class School(models.Model):
    """School model representing each registered school"""
    NIGERIAN_STATES = [
        ('Abia', 'Abia'), ('Adamawa', 'Adamawa'), ('Akwa Ibom', 'Akwa Ibom'),
        ('Anambra', 'Anambra'), ('Bauchi', 'Bauchi'), ('Bayelsa', 'Bayelsa'),
        ('Benue', 'Benue'), ('Borno', 'Borno'), ('Cross River', 'Cross River'),
        ('Delta', 'Delta'), ('Ebonyi', 'Ebonyi'), ('Edo', 'Edo'), ('Ekiti', 'Ekiti'),
        ('Enugu', 'Enugu'), ('FCT', 'FCT'), ('Gombe', 'Gombe'), ('Imo', 'Imo'),
        ('Jigawa', 'Jigawa'), ('Kaduna', 'Kaduna'), ('Kano', 'Kano'), ('Katsina', 'Katsina'),
        ('Kebbi', 'Kebbi'), ('Kogi', 'Kogi'), ('Kwara', 'Kwara'), ('Lagos', 'Lagos'),
        ('Nasarawa', 'Nasarawa'), ('Niger', 'Niger'), ('Ogun', 'Ogun'), ('Ondo', 'Ondo'),
        ('Osun', 'Osun'), ('Oyo', 'Oyo'), ('Plateau', 'Plateau'), ('Rivers', 'Rivers'),
        ('Sokoto', 'Sokoto'), ('Taraba', 'Taraba'), ('Yobe', 'Yobe'), ('Zamfara', 'Zamfara'),
    ]

    name = models.CharField(max_length=200)
    registration_number = models.CharField(max_length=50, unique=True)
    address = models.TextField()
    state = models.CharField(max_length=50, choices=NIGERIAN_STATES)
    lga = models.CharField(max_length=100, help_text="Local Government Area")
    gps_latitude = models.FloatField(null=True, blank=True)
    gps_longitude = models.FloatField(null=True, blank=True)
    logo = models.ImageField(upload_to='school_logos/', blank=True, null=True)
    admin_name = models.CharField(max_length=200)
    admin_email = models.EmailField()
    admin_phone = models.CharField(max_length=15)
    is_active = models.BooleanField(default=True)
    subscription_start_date = models.DateField()
    subscription_end_date = models.DateField()
    date_registered = models.DateTimeField(auto_now_add=True)
    registered_by = models.ForeignKey(SuperAdmin, on_delete=models.SET_NULL, null=True, related_name='registered_schools')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "School"
        verbose_name_plural = "Schools"
        ordering = ['name']


class SchoolAdmin(models.Model):
    """School Administrator model"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='schooladmin_profile')
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='admins')
    phone_number = models.CharField(max_length=15)
    profile_picture = models.ImageField(upload_to='profile_pictures/schooladmins/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.school.name}"

    class Meta:
        verbose_name = "School Admin"
        verbose_name_plural = "School Admins"


class Teacher(models.Model):
    """Teacher model"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='teacher_profile')
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='teachers')
    employee_id = models.CharField(max_length=50)
    subjects = models.ManyToManyField('Subject', blank=True, related_name='teachers')
    classes_assigned = models.ManyToManyField('Class', blank=True, related_name='teachers')
    phone_number = models.CharField(max_length=15)
    profile_picture = models.ImageField(upload_to='profile_pictures/teachers/', blank=True, null=True)
    qualification = models.CharField(max_length=200, blank=True)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.get_full_name() or self.user.username} ({self.employee_id})"

    class Meta:
        verbose_name = "Teacher"
        verbose_name_plural = "Teachers"
        unique_together = ['school', 'employee_id']
        ordering = ['user__first_name', 'user__last_name']


class Student(models.Model):
    """Student model"""
    GENDER_CHOICES = [('Male', 'Male'), ('Female', 'Female')]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='students')
    student_id = models.CharField(max_length=50, help_text="Format: SCH/2024/001")
    class_enrolled = models.ForeignKey('Class', on_delete=models.SET_NULL, null=True, related_name='students')
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    parent_name = models.CharField(max_length=200)
    parent_phone = models.CharField(max_length=15)
    parent_email = models.EmailField(blank=True)
    address = models.TextField()
    profile_picture = models.ImageField(upload_to='profile_pictures/students/', blank=True, null=True)
    date_enrolled = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.student_id} - {self.user.get_full_name() or self.user.username}"

    class Meta:
        verbose_name = "Student"
        verbose_name_plural = "Students"
        unique_together = ['school', 'student_id']
        ordering = ['user__first_name', 'user__last_name']


class Class(models.Model):
    """Class model representing school classes"""
    SECTION_CHOICES = [
        ('A', 'A'), ('B', 'B'), ('C', 'C'), ('D', 'D'),
        ('Science', 'Science'), ('Art', 'Art'), ('Commercial', 'Commercial'),
    ]
    
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='classes')
    name = models.CharField(max_length=50, help_text="e.g., JSS 1, SS 2")
    section = models.CharField(max_length=20, choices=SECTION_CHOICES, blank=True)
    class_teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True, blank=True, related_name='classes_taught')
    capacity = models.IntegerField(default=50)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        section_str = f" - {self.section}" if self.section else ""
        return f"{self.name}{section_str} ({self.school.name})"

    class Meta:
        verbose_name = "Class"
        verbose_name_plural = "Classes"
        unique_together = ['school', 'name', 'section']
        ordering = ['name', 'section']


class Subject(models.Model):
    """Subject model"""
    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='subjects')
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=20)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.code} - {self.name}"

    class Meta:
        verbose_name = "Subject"
        verbose_name_plural = "Subjects"
        unique_together = ['school', 'code']
        ordering = ['name']


class Assignment(models.Model):
    """Assignment model for teachers to post assignments"""
    title = models.CharField(max_length=200)
    description = models.TextField()
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='assignments')
    class_assigned = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='assignments')
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='assignments_created')
    file_attachment = models.FileField(upload_to='assignments/questions/', blank=True, null=True)
    due_date = models.DateTimeField()
    max_score = models.FloatField(default=100)
    is_published = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Assignment"
        verbose_name_plural = "Assignments"
        ordering = ['-due_date']


class AssignmentSubmission(models.Model):
    """Student assignment submission model"""
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submissions')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='assignment_submissions')
    file_submitted = models.FileField(upload_to='assignments/submissions/', blank=True, null=True)
    text_answer = models.TextField(blank=True)
    score = models.FloatField(null=True, blank=True)
    feedback = models.TextField(blank=True)
    is_graded = models.BooleanField(default=False)
    date_submitted = models.DateTimeField(auto_now_add=True)
    date_graded = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.student.student_id} - {self.assignment.title}"

    class Meta:
        verbose_name = "Assignment Submission"
        verbose_name_plural = "Assignment Submissions"
        unique_together = ['assignment', 'student']
        ordering = ['-date_submitted']


class Note(models.Model):
    """Educational notes/resources model"""
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='notes')
    class_assigned = models.ForeignKey(Class, on_delete=models.CASCADE, related_name='notes')
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name='notes_uploaded')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    file = models.FileField(upload_to='notes/')
    file_size = models.BigIntegerField(help_text="File size in bytes")
    download_count = models.IntegerField(default=0)
    is_published = models.BooleanField(default=True)
    date_uploaded = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Note"
        verbose_name_plural = "Notes"
        ordering = ['-date_uploaded']


class Grade(models.Model):
    """Grade/Result model for student academic records"""
    TERM_CHOICES = [
        ('First Term', 'First Term'),
        ('Second Term', 'Second Term'),
        ('Third Term', 'Third Term'),
    ]
    
    GRADE_CHOICES = [
        ('A1', 'A1'), ('B2', 'B2'), ('B3', 'B3'), ('C4', 'C4'), ('C5', 'C5'),
        ('C6', 'C6'), ('D7', 'D7'), ('E8', 'E8'), ('F9', 'F9'),
    ]
    
    REMARK_CHOICES = [
        ('Excellent', 'Excellent'), ('Very Good', 'Very Good'), ('Good', 'Good'),
        ('Credit', 'Credit'), ('Pass', 'Pass'), ('Fail', 'Fail'),
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='grades')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='grades')
    term = models.CharField(max_length=20, choices=TERM_CHOICES)
    session = models.CharField(max_length=20, help_text="e.g., 2023/2024")
    ca_score = models.FloatField(help_text="Continuous Assessment Score")
    exam_score = models.FloatField()
    total_score = models.FloatField(editable=False)
    grade = models.CharField(max_length=5, choices=GRADE_CHOICES)
    remark = models.CharField(max_length=20, choices=REMARK_CHOICES)
    teacher = models.ForeignKey(Teacher, on_delete=models.SET_NULL, null=True)
    date_recorded = models.DateTimeField(auto_now_add=True)
    is_published = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        self.total_score = self.ca_score + self.exam_score
        # Auto-calculate grade based on total score
        if self.total_score >= 75:
            self.grade = 'A1'
            self.remark = 'Excellent'
        elif self.total_score >= 70:
            self.grade = 'B2'
            self.remark = 'Very Good'
        elif self.total_score >= 65:
            self.grade = 'B3'
            self.remark = 'Very Good'
        elif self.total_score >= 60:
            self.grade = 'C4'
            self.remark = 'Good'
        elif self.total_score >= 55:
            self.grade = 'C5'
            self.remark = 'Good'
        elif self.total_score >= 50:
            self.grade = 'C6'
            self.remark = 'Credit'
        elif self.total_score >= 45:
            self.grade = 'D7'
            self.remark = 'Pass'
        elif self.total_score >= 40:
            self.grade = 'E8'
            self.remark = 'Pass'
        else:
            self.grade = 'F9'
            self.remark = 'Fail'
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.student.student_id} - {self.subject.name} ({self.term})"

    class Meta:
        verbose_name = "Grade"
        verbose_name_plural = "Grades"
        unique_together = ['student', 'subject', 'term', 'session']
        ordering = ['session', 'term', 'subject__name']


class Announcement(models.Model):
    """Announcement model for school communications"""
    PRIORITY_CHOICES = [('Low', 'Low'), ('Medium', 'Medium'), ('High', 'High')]
    CATEGORY_CHOICES = [
        ('Principal', 'Principal'), ('Academic', 'Academic'), ('Exam', 'Exam'),
        ('Resumption', 'Resumption'), ('Closing', 'Closing'), ('General', 'General'),
    ]
    TARGET_CHOICES = [
        ('All', 'All'), ('Students Only', 'Students Only'),
        ('Teachers Only', 'Teachers Only'), ('Parents', 'Parents'),
    ]

    school = models.ForeignKey(School, on_delete=models.CASCADE, related_name='announcements')
    title = models.CharField(max_length=200)
    content = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    posted_by = models.ForeignKey(SchoolAdmin, on_delete=models.CASCADE, related_name='announcements_posted')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='Medium')
    attachment = models.FileField(upload_to='announcements/', blank=True, null=True)
    is_pinned = models.BooleanField(default=False)
    target_audience = models.CharField(max_length=20, choices=TARGET_CHOICES, default='All')
    publish_date = models.DateTimeField(default=timezone.now)
    expiry_date = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    view_count = models.IntegerField(default=0)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Announcement"
        verbose_name_plural = "Announcements"
        ordering = ['-is_pinned', '-publish_date']


class SystemLog(models.Model):
    """System logging model for tracking user actions"""
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    action = models.CharField(max_length=100)
    description = models.TextField()
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username if self.user else 'Anonymous'} - {self.action}"

    class Meta:
        verbose_name = "System Log"
        verbose_name_plural = "System Logs"
        ordering = ['-timestamp']
