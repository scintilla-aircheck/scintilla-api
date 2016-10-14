from rest_framework.pagination import CursorPagination


class CalibratedReadingPagination(CursorPagination):
    page_size = 1000
    ordering = 'time'


class ReadingPagination(CursorPagination):
    page_size = 1000
    ordering = 'time'


class ReadingGroupPagination(CursorPagination):
    page_size = 1000
    ordering = '-id'
