#                                                long live the snake
import requests
from flask import Flask, jsonify
from threading import Thread
import time
import os
from flask_cors import CORS
import json
import random
from dotenv import load_dotenv

load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_API_BASE = "https://api.github.com"
USERS_PER_PAGE = 50
MAX_USER_PAGES = 10 
REPOS_PER_USER = 5
REFRESH_INTERVAL_HOURS = 12
CACHE_FILE = os.path.join(os.path.dirname(__file__), "cached_repos.json")

app = Flask(__name__)
CORS(app)

cached_repos = []
last_updated = 0

headers = {
    "Authorization": f"Bearer {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

def fetch_algerian_users():
    users = []
    pages = list(range(1, MAX_USER_PAGES + 1))
    random.shuffle(pages)  # Randomize pages

    for page in pages:
        params = {
            "q": "location:algeria",
            "per_page": USERS_PER_PAGE,
            "page": page
        }
        try:
            res = requests.get(f"{GITHUB_API_BASE}/search/users", headers=headers, params=params, timeout=10)
            res.raise_for_status()
            data = res.json()
            items = data.get("items", [])
            if not items:
                break
            users.extend(items)
        except Exception as e:
            print(f"Error fetching users page {page}: {e}")
            continue
    return users

def fetch_user_repos(username):
    try:
        res = requests.get(
            f"{GITHUB_API_BASE}/users/{username}/repos",
            headers=headers,
            params={"per_page": REPOS_PER_USER, "sort": "updated"},
            timeout=10
        )
        if res.status_code != 200:
            return []
        repos = res.json()
        return [
            {
                "id": r["id"],
                "name": r["name"],
                "full_name": r["full_name"],
                "html_url": r["html_url"],
                "description": r["description"],
                "stargazers_count": r["stargazers_count"],
                "updated_at": r["updated_at"],
                "owner": {
                    "login": r["owner"]["login"],
                    "avatar_url": r["owner"]["avatar_url"]
                },
                "language": r["language"],
                "homepage": r["homepage"],
                "topics": r.get("topics", []),
                "forks_count": r["forks_count"],
                "watchers": r["watchers_count"]
            }
            for r in repos
        ]
    except Exception as e:
        print(f"Error fetching repos for {username}: {e}")
        return []

def refresh_cache():
    global cached_repos, last_updated
    print(f"🔄 Refreshing GitHub cache at {time.ctime()}...")

    users = fetch_algerian_users()
    repos = []
    for user in users:
        repos.extend(fetch_user_repos(user["login"]))

    repos.sort(key=lambda r: r["stargazers_count"], reverse=True)
    cached_repos = repos[:250]
    last_updated = int(time.time())

    try:
        with open(CACHE_FILE, "w") as f:
            json.dump({
                "last_updated": last_updated,
                "data": cached_repos
            }, f)
        print(f"✅ Refreshed {len(cached_repos)} repos at {last_updated}")
    except Exception as e:
        print(f"❌ Error saving cache file: {e}")

def background_scheduler():
    while True:
        refresh_cache()
        time.sleep(REFRESH_INTERVAL_HOURS * 3600)

try:
    with open(CACHE_FILE, "r") as f:
        data = json.load(f)
        cached_repos = data["data"]
        last_updated = data["last_updated"]
        print("✅ Loaded cached data from file.")
except FileNotFoundError:
    print("⚠️ No cache file found. Fetching from GitHub...")
    refresh_cache()

if int(time.time()) - last_updated > REFRESH_INTERVAL_HOURS * 3600:
    print("⏳ Cache is old. Refreshing asynchronously...")
    Thread(target=refresh_cache).start()

@app.route("/api/top-repos")
def get_top_repos():
    return jsonify({
        "last_updated": last_updated,
        "total_repos": len(cached_repos),
        "data": cached_repos
    })

if __name__ == "__main__":
    Thread(target=background_scheduler, daemon=True).start()
    app.run(host="0.0.0.0", port=5000)
