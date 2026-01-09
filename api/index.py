import os
import sys

# Add the project root to sys.path so we can import from nested modules
# Vercel places function in /var/task/api usually, so we add the parent directories
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(current_dir)
sys.path.append(project_root)

# Adjust path to include the nested backend folder structure specifically
# study-serenity-main/exam-anxiety-ai/backend
backend_path = os.path.join(project_root, "study-serenity-main", "exam-anxiety-ai", "backend")
sys.path.append(backend_path)

# Set the root_path env var BEFORE importing app
os.environ["FASTAPI_ROOT_PATH"] = "/api"

from main import app
