import firebase_admin
from firebase_admin import credentials, auth, db
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
import pyrebase

# ---------------------------------------------------------
# 1. SETUP & INITIALIZATION
# ---------------------------------------------------------
# Admin SDK (For verifying tokens and accessing DB)
cred = credentials.Certificate("serviceAccountKey.json")
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://final-future-d1547-default-rtdb.firebaseio.com/' 
    })

# Pyrebase (Required for the actual Email/Password login sign-in)
config = {
    "apiKey": "YOUR_WEB_API_KEY",
    "authDomain": "final-future-d1547.firebaseapp.com",
    "databaseURL": "https://final-future-d1547-default-rtdb.firebaseio.com/",
    "projectId": "final-future-d1547",
    "storageBucket": "final-future-d1547.appspot.com",
}
pb = pyrebase.initialize_app(config)
pb_auth = pb.auth()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------
# 2. DATA MODELS
# ---------------------------------------------------------
class LoginSchema(BaseModel):
    email: EmailStr
    password: str

# ---------------------------------------------------------
# 3. LOGIN ENDPOINT
# ---------------------------------------------------------

@app.post("/login")
async def login(data: LoginSchema):
    try:
        # 1. Sign in with Pyrebase (verifies email/password)
        user = pb_auth.sign_in_with_email_and_password(data.email, data.password)
        
        # 2. Get details
        id_token = user['idToken']
        local_id = user['localId']
        
        # 3. Fetch profile from Realtime Database
        user_profile = db.reference(f'users/{local_id}/profile').get()
        
        return {
            "status": "success",
            "token": id_token,
            "uid": local_id,
            "profile": user_profile
        }
    except Exception as e:
        # Usually returns "INVALID_PASSWORD" or "EMAIL_NOT_FOUND"
        raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/")
async def root():
    return {"message": "Login API is active"}