from rest_framework.pagination import CursorPagination


class CalibratedReadingPagination(CursorPagination):
    page_size = 10
    ordering = '-id'


class ReadingPagination(CursorPagination):
    page_size = 10
    ordering = '-id'


class ReadingGroupPagination(CursorPagination):
    page_size = 10
    ordering = '-id'
