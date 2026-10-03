from fastapi import FastAPI

app = FastAPI(title="EduSense ML Service")


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "edusense-ml-service"
    }