import csv
import random

INPUT_PATH = "datasets/processed/student_performance_clean.csv"

TRAIN_PATH = "datasets/processed/train.csv"
TEST_PATH = "datasets/processed/test.csv"

TEST_SIZE = 0.2
RANDOM_SEED = 42

with open(INPUT_PATH, "r", newline="", encoding="utf-8") as input_file:
    reader = csv.DictReader(input_file)
    rows = list(reader)
    columns = reader.fieldnames

groups = {}

for row in rows:
    groups.setdefault(row["FinalGrade"], []).append(row)

random.seed(RANDOM_SEED)

train_rows = []
test_rows = []

for grade, group in groups.items():
    random.shuffle(group)

    test_count = round(len(group) * TEST_SIZE)

    test_rows.extend(group[:test_count])
    train_rows.extend(group[test_count:])

random.shuffle(train_rows)
random.shuffle(test_rows)

with open(TRAIN_PATH, "w", newline="", encoding="utf-8") as train_file:
    writer = csv.DictWriter(train_file, fieldnames=columns)
    writer.writeheader()
    writer.writerows(train_rows)

with open(TEST_PATH, "w", newline="", encoding="utf-8") as test_file:
    writer = csv.DictWriter(test_file, fieldnames=columns)
    writer.writeheader()
    writer.writerows(test_rows)

print(f"Total rows: {len(rows)}")
print(f"Training rows: {len(train_rows)}")
print(f"Testing rows: {len(test_rows)}")