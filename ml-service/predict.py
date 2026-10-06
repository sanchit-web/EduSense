import joblib
import pandas as pd


MODEL_PATH = "models/random_forest.joblib"
FEATURES_PATH = "models/feature_columns.joblib"


model = joblib.load(MODEL_PATH)
feature_columns = joblib.load(FEATURES_PATH)


def predict_student(data: dict):
    input_data = {
        column: data[column]
        for column in feature_columns
    }

    dataframe = pd.DataFrame([input_data], columns=feature_columns)

    prediction = model.predict(dataframe)[0]
    probabilities = model.predict_proba(dataframe)[0]

    return {
        "predicted_grade": int(prediction),
        "probabilities": {
            str(index): float(probability)
            for index, probability in enumerate(probabilities)
        },
    }