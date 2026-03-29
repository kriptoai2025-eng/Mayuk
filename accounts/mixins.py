from django.contrib.auth.mixins import UserPassesTestMixin, LoginRequiredMixin
from django.core.exceptions import PermissionDenied
from core.models import SuperAdmin, SchoolAdmin, Teacher, Student


class SuperAdminRequiredMixin(LoginRequiredMixin, UserPassesTestMixin):
    """Mixin to restrict access to Super Admin only"""
    def test_func(self):
        return self.request.user.is_authenticated and hasattr(self.request.user, 'superadmin_profile')


class SchoolAdminRequiredMixin(LoginRequiredMixin, UserPassesTestMixin):
    """Mixin to restrict access to School Admin only"""
    def test_func(self):
        return self.request.user.is_authenticated and hasattr(self.request.user, 'schooladmin_profile')


class TeacherRequiredMixin(LoginRequiredMixin, UserPassesTestMixin):
    """Mixin to restrict access to Teachers only"""
    def test_func(self):
        return self.request.user.is_authenticated and hasattr(self.request.user, 'teacher_profile')


class StudentRequiredMixin(LoginRequiredMixin, UserPassesTestMixin):
    """Mixin to restrict access to Students only"""
    def test_func(self):
        return self.request.user.is_authenticated and hasattr(self.request.user, 'student_profile')


class SameSchoolRequiredMixin(LoginRequiredMixin):
    """Mixin to ensure users can only access data from their own school"""
    def has_same_school(self, obj):
        """Check if the object belongs to the same school as the user"""
        user = self.request.user
        
        # Get user's school based on their role
        if hasattr(user, 'schooladmin_profile'):
            user_school = user.schooladmin_profile.school
        elif hasattr(user, 'teacher_profile'):
            user_school = user.teacher_profile.school
        elif hasattr(user, 'student_profile'):
            user_school = user.student_profile.school
        else:
            return False
        
        # Get object's school
        if hasattr(obj, 'school'):
            obj_school = obj.school
        elif hasattr(obj, 'get_school'):
            obj_school = obj.get_school()
        else:
            return False
        
        return user_school == obj_school
    
    def dispatch(self, request, *args, **kwargs):
        if not self.has_same_school(self.get_object() if hasattr(self, 'get_object') else None):
            raise PermissionDenied
        return super().dispatch(request, *args, **kwargs)


def get_user_role(user):
    """Helper function to determine user role"""
    if not user.is_authenticated:
        return None
    if hasattr(user, 'superadmin_profile'):
        return 'superadmin'
    if hasattr(user, 'schooladmin_profile'):
        return 'schooladmin'
    if hasattr(user, 'teacher_profile'):
        return 'teacher'
    if hasattr(user, 'student_profile'):
        return 'student'
    return None


def get_user_school(user):
    """Helper function to get user's school"""
    if not user.is_authenticated:
        return None
    if hasattr(user, 'schooladmin_profile'):
        return user.schooladmin_profile.school
    if hasattr(user, 'teacher_profile'):
        return user.teacher_profile.school
    if hasattr(user, 'student_profile'):
        return user.student_profile.school
    return None
