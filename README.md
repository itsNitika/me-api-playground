# Me-API Playground (Backend Assessment)

This project is a personal portfolio website with a custom Backend API. It serves static HTML for the frontend and exposes RESTful endpoints to manage and retrieve portfolio data (Profile, Education, Skills, Projects) from a MongoDB database.

## 📄 Resume
👉 **View My Resume:**  
https://drive.google.com/file/d/1cGagenS58Po5LCco12GNX8uexCqb_lvA/view?usp=drivesdk

## 🚀 Tech Stack
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Frontend:** HTML5, CSS3 (Static serving)
* **Tools:** Postman/cURL for API testing

## ⚙️ Setup & Installation

### Prerequisites
* Node.js installed.
* MongoDB installed and running locally on port `27017`.

### Local Setup
1. **Clone the repository** (or extract files):
```bash
git clone <repo-url>
cd <folder-name>
```

2. **Install Dependencies**:
```bash
npm install
```

3. **Start MongoDB**:
Ensure your local MongoDB instance is running.
```bash
# On Windows (if set up as service)
net start MongoDB
# On Mac/Linux
mongod
```

4. **Run the Server**:
```bash
node server.js
```

5. **View Application**:
* **Frontend**: http://localhost:3000
* **API Health**: http://localhost:3000/health

---

## 🔌 API Documentation

| Method | Endpoint | Description | Query Params |
|------|----------|-------------|--------------|
| GET | `/health` | Server status check | - |
| GET | `/profile` | Fetch full profile details | - |
| POST | `/profile` | Create/Update profile data | - |
| GET | `/projects` | List all projects | `?skill=react` |
| GET | `/search` | Global search | `?q=query` |

### 🧪 Sample cURL Commands

**Check Health**
```bash
curl http://localhost:3000/health
```
