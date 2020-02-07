import datetime
from clean_data import inject_missing_dates, get_next_week_and_day, parse_week_and_day, calculate_date
import unittest


########################################################################
class CleanDataTests(unittest.TestCase):
    ####################################################################
    def test_parse_week_and_day(self):
        self.assertEqual(parse_week_and_day("cook11"), (1, 1))
        self.assertEqual(parse_week_and_day("cook42"), (4, 2))
        self.assertEqual(parse_week_and_day("cook415"), (41, 5))

    ####################################################################
    def test_get_next_week_and_day(self):
        self.assertEqual(get_next_week_and_day(1, 1), (1, 2))
        self.assertEqual(get_next_week_and_day(2, 2), (2, 3))
        self.assertEqual(get_next_week_and_day(40, 3), (40, 4))
        self.assertEqual(get_next_week_and_day(40, 4), (40, 5))
        self.assertEqual(get_next_week_and_day(49, 5), (50, 1))

    ####################################################################
    def test_inject_missing_dates(self):
        input_data = ["cook11", "assist11", "clean11", "cook12", "assist12", "clean12", "cook15", "assist15", "clean15"]
        self.assertEqual(
            inject_missing_dates(input_data),
            ["cook11", "assist11", "clean11",
             "cook12", "assist12", "clean12",
             "cook13", "assist13", "clean13",
             "cook14", "assist14", "clean14",
             "cook15", "assist15", "clean15"])

    ####################################################################
    def test_inject_missing_dates__across_week_boundary(self):
        input_data = ["cook11", "assist11", "clean11", "cook12", "assist12", "clean12", "cook22", "assist22", "clean22"]
        self.assertEqual(
            inject_missing_dates(input_data),
            ["cook11", "assist11", "clean11",
             "cook12", "assist12", "clean12",
             "cook13", "assist13", "clean13",
             "cook14", "assist14", "clean14",
             "cook15", "assist15", "clean15",
             "cook21", "assist21", "clean21",
             "cook22", "assist22", "clean22"])

    ####################################################################
    def test_calculate_date(self):
        start_date = datetime.date(2019, 12, 1)
        self.assertEqual(calculate_date(start_date, 1, 1), datetime.date(2019, 12, 1))
        self.assertEqual(calculate_date(start_date, 1, 2), datetime.date(2019, 12, 2))
        self.assertEqual(calculate_date(start_date, 1, 3), datetime.date(2019, 12, 3))
        self.assertEqual(calculate_date(start_date, 1, 4), datetime.date(2019, 12, 4))
        self.assertEqual(calculate_date(start_date, 1, 5), datetime.date(2019, 12, 5))
        self.assertEqual(calculate_date(start_date, 2, 1), datetime.date(2019, 12, 8))
        self.assertEqual(calculate_date(start_date, 2, 2), datetime.date(2019, 12, 9))
        self.assertEqual(calculate_date(start_date, 2, 3), datetime.date(2019, 12, 10))
        self.assertEqual(calculate_date(start_date, 2, 4), datetime.date(2019, 12, 11))
        self.assertEqual(calculate_date(start_date, 2, 5), datetime.date(2019, 12, 12))
        self.assertEqual(calculate_date(start_date, 3, 1), datetime.date(2019, 12, 15))
        self.assertEqual(calculate_date(start_date, 4, 1), datetime.date(2019, 12, 22))
        self.assertEqual(calculate_date(start_date, 5, 1), datetime.date(2019, 12, 29))
        self.assertEqual(calculate_date(start_date, 6, 1), datetime.date(2020, 1, 5))
        self.assertEqual(calculate_date(start_date, 6, 2), datetime.date(2020, 1, 6))
        self.assertEqual(calculate_date(start_date, 7, 1), datetime.date(2020, 1, 12))
