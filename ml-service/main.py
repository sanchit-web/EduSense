from fastapi import FastAPI

from schemas import PredictionInput
from predict import predict_student


app = FastAPI(title="EduSense ML Service")


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "edusense-ml-service"
    }


@app.post("/predict")
def predict(input_data: PredictionInput):
    return predict_student(input_data.model_dump())