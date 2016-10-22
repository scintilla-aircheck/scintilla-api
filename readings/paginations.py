from rest_framework.pagination import CursorPagination


class CalibratedReadingPagination(CursorPagination):
    page_size = 100000
    ordering = 'time'


class ReadingPagination(CursorPagination):
    page_size = 100000
    ordering = 'time'


class ReadingGroupPagination(CursorPagination):
    page_size = 100000
    ordering = '-id'
