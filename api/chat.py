from backend.chatbot.service import app

# Vercel needs the 'app' variable to be exposed
# backend.chatbot.service already defines 'app = Flask(__name__)'
