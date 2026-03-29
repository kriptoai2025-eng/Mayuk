from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from core.models import SuperAdmin, SchoolAdmin, Teacher, Student, School


class LoginForm(AuthenticationForm):
    """Custom login form with styled fields"""
    username = forms.CharField(
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter username',
            'autofocus': True
        })
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter password'
        })
    )


class SuperAdminCreationForm(UserCreationForm):
    """Form for creating Super Admin"""
    email = forms.EmailField(required=True, widget=forms.EmailInput(attrs={'class': 'form-control'}))
    phone_number = forms.CharField(max_length=15, widget=forms.TextInput(attrs={'class': 'form-control'}))
    
    class Meta:
        model = User
        fields = ['username', 'email', 'phone_number', 'password1', 'password2']
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget.attrs.update({'class': 'form-control'})
        self.fields['password1'].widget.attrs.update({'class': 'form-control'})
        self.fields['password2'].widget.attrs.update({'class': 'form-control'})


class SchoolRegistrationForm(forms.ModelForm):
    """Form for registering a new school"""
    admin_username = forms.CharField(max_length=150, required=True, widget=forms.TextInput(attrs={'class': 'form-control'}))
    admin_email = forms.EmailField(required=True, widget=forms.EmailInput(attrs={'class': 'form-control'}))
    admin_phone = forms.CharField(max_length=15, required=True, widget=forms.TextInput(attrs={'class': 'form-control'}))
    admin_password = forms.CharField(min_length=8, widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    
    class Meta:
        model = School
        fields = [
            'name', 'address', 'state', 'lga', 'gps_latitude', 'gps_longitude',
            'admin_name', 'admin_email', 'admin_phone', 'subscription_start_date',
            'subscription_end_date', 'logo'
        ]
        widgets = {
            'name': forms.TextInput(attrs={'class': 'form-control'}),
            'address': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'state': forms.Select(attrs={'class': 'form-select'}),
            'lga': forms.TextInput(attrs={'class': 'form-control'}),
            'gps_latitude': forms.NumberInput(attrs={'class': 'form-control', 'step': '0.000001'}),
            'gps_longitude': forms.NumberInput(attrs={'class': 'form-control', 'step': '0.000001'}),
            'admin_name': forms.TextInput(attrs={'class': 'form-control'}),
            'admin_email': forms.EmailInput(attrs={'class': 'form-control'}),
            'admin_phone': forms.TextInput(attrs={'class': 'form-control'}),
            'subscription_start_date': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
            'subscription_end_date': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
            'logo': forms.FileInput(attrs={'class': 'form-control'}),
        }


class SchoolAdminUpdateForm(forms.ModelForm):
    """Form for updating School Admin profile"""
    class Meta:
        model = SchoolAdmin
        fields = ['phone_number', 'profile_picture']
        widgets = {
            'phone_number': forms.TextInput(attrs={'class': 'form-control'}),
            'profile_picture': forms.FileInput(attrs={'class': 'form-control'}),
        }


class TeacherCreationForm(forms.ModelForm):
    """Form for creating a teacher"""
    first_name = forms.CharField(max_length=150, required=True, widget=forms.TextInput(attrs={'class': 'form-control'}))
    last_name = forms.CharField(max_length=150, required=True, widget=forms.TextInput(attrs={'class': 'form-control'}))
    email = forms.EmailField(required=True, widget=forms.EmailInput(attrs={'class': 'form-control'}))
    password = forms.CharField(min_length=8, widget=forms.PasswordInput(attrs={'class': 'form-control'}))
    
    class Meta:
        model = Teacher
        fields = ['employee_id', 'subjects', 'classes_assigned', 'phone_number', 'qualification', 'profile_picture']
        widgets = {
            'employee_id': forms.TextInput(attrs={'class': 'form-control'}),
            'subjects': forms.SelectMultiple(attrs={'class': 'form-select'}),
            'classes_assigned': forms.SelectMultiple(attrs={'class': 'form-select'}),
            'phone_number': forms.TextInput(attrs={'class': 'form-control'}),
            'qualification': forms.TextInput(attrs={'class': 'form-control'}),
            'profile_picture': forms.FileInput(attrs={'class': 'form-control'}),
        }


class StudentCreationForm(forms.ModelForm):
    """Form for registering a student"""
    first_name = forms.CharField(max_length=150, required=True, widget=forms.TextInput(attrs={'class': 'form-control'}))
    last_name = forms.CharField(max_length=150, required=True, widget=forms.TextInput(attrs={'class': 'form-control'}))
    parent_email = forms.EmailField(required=False, widget=forms.EmailInput(attrs={'class': 'form-control'}))
    
    class Meta:
        model = Student
        fields = [
            'student_id', 'class_enrolled', 'date_of_birth', 'gender',
            'parent_name', 'parent_phone', 'parent_email', 'address', 'profile_picture'
        ]
        widgets = {
            'student_id': forms.TextInput(attrs={'class': 'form-control'}),
            'class_enrolled': forms.Select(attrs={'class': 'form-select'}),
            'date_of_birth': forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}),
            'gender': forms.Select(attrs={'class': 'form-select'}),
            'parent_name': forms.TextInput(attrs={'class': 'form-control'}),
            'parent_phone': forms.TextInput(attrs={'class': 'form-control'}),
            'parent_email': forms.EmailInput(attrs={'class': 'form-control'}),
            'address': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'profile_picture': forms.FileInput(attrs={'class': 'form-control'}),
        }


class ProfileUpdateForm(forms.ModelForm):
    """Generic profile update form"""
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']
        widgets = {
            'first_name': forms.TextInput(attrs={'class': 'form-control'}),
            'last_name': forms.TextInput(attrs={'class': 'form-control'}),
            'email': forms.EmailInput(attrs={'class': 'form-control'}),
        }
