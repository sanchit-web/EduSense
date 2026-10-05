import os
import joblib
import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline


TRAIN_PATH = "datasets/processed/train.csv"
TEST_PATH = "datasets/processed/test.csv"

MODEL_DIR = "models"

TARGET_COLUMN = "FinalGrade"


# Create model directory
os.makedirs(MODEL_DIR, exist_ok=True)


# Load datasets
train_df = pd.read_csv(TRAIN_PATH)
test_df = pd.read_csv(TEST_PATH)


# Separate features and target
X_train = train_df.drop(columns=[TARGET_COLUMN])
y_train = train_df[TARGET_COLUMN]

X_test = test_df.drop(columns=[TARGET_COLUMN])
y_test = test_df[TARGET_COLUMN]


# Models
models = {
    "Logistic Regression": Pipeline([
        ("scaler", StandardScaler()),
        ("model", LogisticRegression(max_iter=1000))
    ]),

    "Random Forest": RandomForestClassifier(
        n_estimators=200,
        random_state=42,
        n_jobs=-1
    )
}


# Train and evaluate
results = {}

for name, model in models.items():
    print(f"\n{'=' * 60}")
    print(name)
    print(f"{'=' * 60}")

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    accuracy = accuracy_score(y_test, predictions)
    results[name] = accuracy

    print(f"Accuracy: {accuracy:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, predictions))

    if name == "Random Forest":
        joblib.dump(model, os.path.join(MODEL_DIR, "random_forest.joblib"))
        print("\nRandom Forest model saved.")


# Save feature order
joblib.dump(
    list(X_train.columns),
    os.path.join(MODEL_DIR, "feature_columns.joblib")
)

print("\nFeature columns saved.")