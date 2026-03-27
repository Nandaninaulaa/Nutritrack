import pandas as pd
from sklearn.linear_model import LinearRegression
import pickle

data = {
    "protein": [10, 20, 30],
    "carbs": [50, 60, 70],
    "fat": [5, 10, 15],
    "calories": [300, 500, 700]
}

df = pd.DataFrame(data)

X = df[["protein", "carbs", "fat"]]
y = df["calories"]

model = LinearRegression()
model.fit(X, y)

# ✅ Save model
with open("model.pkl", "wb") as f:
    pickle.dump(model, f)