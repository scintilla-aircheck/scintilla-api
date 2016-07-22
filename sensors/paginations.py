from rest_framework.pagination import CursorPagination


class SensorReadingPagination(CursorPagination):
    page_size = 10
    ordering = '-id'
