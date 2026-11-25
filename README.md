# Nutritrack

Nutritrack is a nutrition tracking app with a browser-based interface, a Node.js/Express API backed by MongoDB, and a small FastAPI service for calorie estimates.

## Prerequisites

- Node.js and npm
- Python 3
- MongoDB running locally at `mongodb://127.0.0.1:27017/nutritrack`

The backend currently connects to that MongoDB URL directly in `backend/server.js`.

## Run locally

Open three terminals from the repository root.

### 1. Start the API

Install the Node dependencies and start the Express server:

```sh
npm install
node backend/server.js
```

The API listens on `http://localhost:5000`.

### 2. Start the calorie prediction service

Create and activate a virtual environment, install the service dependencies, and run FastAPI:

```sh
python -m venv .venv
```

On macOS or Linux:

```sh
source .venv/bin/activate
```

On Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

Then, from the repository root:

```sh
python -m pip install fastapi uvicorn
cd ml-service
python -m uvicorn app:app --reload --port 8000
```

The prediction endpoint is `http://127.0.0.1:8000/predict`.

### 3. Open the web app

In a third terminal, from the repository root, serve the static files:

```sh
python -m http.server 8080
```

Open [http://localhost:8080](http://localhost:8080) in your browser. The page calls the API at port 5000 and the prediction service at port 8000, so keep all three processes running while using the app.

## API reference

### Express API

The Express API runs at `http://localhost:5000`.

| Method | Endpoint | Purpose | Authentication |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | Register with `name`, `email`, and `password` | None |
| `POST` | `/api/auth/login` | Log in with `email` and `password`; returns a JWT `token` | None |
| `GET` | `/api/food` | List saved food entries | None |
| `POST` | `/api/food` | Save a food entry | JWT in the `Authorization` header |

A food entry accepts fields such as `name`, `quantity`, `calories`, `protein`, `carbs`, `fat`, `mealType`, and `date`. For the protected food creation route, send the returned token as the `Authorization` header value.

Example calorie prediction request:

```sh
curl -X POST http://127.0.0.1:8000/predict \
  -H "Content-Type: application/json" \
  -d '{"protein": 20, "carbs": 30, "fat": 10}'
```

The prediction response includes a `calories` value calculated from the submitted macronutrients.
