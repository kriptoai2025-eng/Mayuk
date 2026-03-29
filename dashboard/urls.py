from django.urls import path
from . import views

urlpatterns = [
    # Dashboard redirect
    path('', views.dashboard_redirect, name='dashboard'),
    
    # Super Admin Dashboard
    path('superadmin/', views.superadmin_dashboard, name='superadmin_dashboard'),
    
    # School Admin Dashboard
    path('schooladmin/', views.schooladmin_dashboard, name='schooladmin_dashboard'),
    
    # Teacher Dashboard
    path('teacher/', views.teacher_dashboard, name='teacher_dashboard'),
    
    # Student Dashboard
    path('student/', views.student_dashboard, name='student_dashboard'),
]
