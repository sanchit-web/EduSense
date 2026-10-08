import joblib
import pandas as pd
import shap


MODEL_PATH = "models/random_forest.joblib"
FEATURES_PATH = "models/feature_columns.joblib"


model = joblib.load(MODEL_PATH)
feature_columns = joblib.load(FEATURES_PATH)

explainer = shap.TreeExplainer(model)


def predict_student(data: dict):
    input_data = {
        column: data[column]
        for column in feature_columns
    }

    dataframe = pd.DataFrame([input_data], columns=feature_columns)

    prediction = int(model.predict(dataframe)[0])
    probabilities = model.predict_proba(dataframe)[0]

    shap_values = explainer.shap_values(dataframe)
    contributions = shap_values[0, :, prediction]

    feature_contributions = [
        {
            "feature": feature,
            "value": data[feature],
            "contribution": float(contribution),
        }
        for feature, contribution in zip(
            feature_columns,
            contributions,
        )
    ]

    feature_contributions.sort(
        key=lambda item: abs(item["contribution"]),
        reverse=True,
    )

    return {
        "predicted_grade": prediction,
        "probabilities": {
            str(index): float(probability)
            for index, probability in enumerate(probabilities)
        },
        "explanation": {
            "predicted_class": prediction,
            "feature_contributions": feature_contributions,
        },
    }