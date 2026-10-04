import csv

INPUT_PATH = "datasets/raw/student_performance.csv"
OUTPUT_PATH = "datasets/processed/student_performance_clean.csv"

TARGET_COLUMN = "FinalGrade"

EXCLUDED_COLUMNS = {
    "ExamScore",
}

with open(INPUT_PATH, "r", newline="", encoding="utf-8") as input_file:
    reader = csv.DictReader(input_file)
    rows = list(reader)

unique_rows = []
seen = set()

for row in rows:
    row_key = tuple(row.values())

    if row_key not in seen:
        seen.add(row_key)
        unique_rows.append(row)

feature_columns = [
    column
    for column in reader.fieldnames
    if column != TARGET_COLUMN and column not in EXCLUDED_COLUMNS
]

output_columns = feature_columns + [TARGET_COLUMN]

with open(OUTPUT_PATH, "w", newline="", encoding="utf-8") as output_file:
    writer = csv.DictWriter(output_file, fieldnames=output_columns)
    writer.writeheader()
    writer.writerows(
        {
            column: row[column]
            for column in output_columns
        }
        for row in unique_rows
    )

print(f"Original rows: {len(rows)}")
print(f"Unique rows: {len(unique_rows)}")
print(f"Removed duplicates: {len(rows) - len(unique_rows)}")
print(f"Features: {feature_columns}")
print(f"Target: {TARGET_COLUMN}")
print(f"Saved to: {OUTPUT_PATH}")