from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "ML API Running"}

@app.post("/predict")
def predict(data: dict):
    protein = data["protein"]
    carbs = data["carbs"]
    fat = data["fat"]

    # 🔥 Simple formula (no model needed)
    calories = (protein * 4) + (carbs * 4) + (fat * 9)

    return {"calories": calories}