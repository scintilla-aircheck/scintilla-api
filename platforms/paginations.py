from rest_framework.pagination import CursorPagination


class PlatformPagination(CursorPagination):
    page_size = 10
    ordering = '-id'


class SensorPagination(CursorPagination):
    page_size = 10
    ordering = '-id'
