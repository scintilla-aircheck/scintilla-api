from rest_framework.pagination import CursorPagination


class DeploymentPagination(CursorPagination):
    page_size = 10
    ordering = '-id'


class DevicePagination(CursorPagination):
    page_size = 10
    ordering = '-id'
