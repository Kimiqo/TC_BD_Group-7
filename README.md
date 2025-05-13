🗳️ Polling App Backend
A lightweight RESTful API backend for a polling application, built with Node.js, Express, and JSON file storage. Create polls, cast votes, and view results with ease! Developed by a team of five for a backend development project, this API is simple, extensible, and ready for future enhancements like authentication and database integration.
   

📋 Table of Contents

🌟 Project Overview
🚀 Features
🛠️ Tech Stack
📂 Folder Structure
⚙️ Setup Instructions
📡 API Endpoints
🧪 Testing with Postman


🌟 Project Overview
The Polling App Backend is a RESTful API designed to power a simple polling system. Users can create polls with multiple options, vote on their favorite choices, and view real-time results. Data is stored in a JSON file (polls.json), making it easy to set up for small-scale applications. This project was crafted by a team of five developers as part of a backend development exercise, emphasizing clean code, robust error handling, and modern JavaScript practices.

🚀 Features
🗳️ Create Polls: Add new polls with a question and multiple options.
📊 View Results: Retrieve all polls or details of a specific poll.
✅ Cast Votes: Vote on poll options with automatic vote counting.
🛡️ Input Validation: Ensure data integrity with express-validator.
⚠️ Error Handling: Graceful handling of file operations and invalid requests.
📦 Modern JavaScript: Uses ES Modules for a future-proof codebase.


🛠️ Tech Stack
Node.js (v20.10.0): Runtime environment for JavaScript.
Express: Fast and minimal web framework for building APIs.
JSON File Storage: polls.json for lightweight data persistence.
Dependencies:
express: Core API framework.
express-validator: Validates and sanitizes user inputs.
uuid: Generates unique IDs for polls and options.


Tools:
Postman: For API testing.
Git: Version control with GitHub.


📂 Folder Structure
TC_BD_Group-7/
├── index.js                # 🚀 Entry point for the Express server
├── package.json            # 📝 Project metadata and dependencies
├── node_modules/           # 📦 Installed dependencies
├── README.md               # 📖 Project documentation
├── src/
│   ├── controllers/
│   │   └── polls.js        # 🧠 Business logic for poll operations
│   ├── routes/
│   │   └── polls.js        # 🛤️ API route definitions
│   ├── data/
│   │   └── polls.json      # 💾 JSON file for storing polls


⚙️ Setup Instructions
Follow these steps to get the polling app backend up and running locally.
Prerequisites

Node.js (v20.10.0 or higher)
npm (included with Node.js)
Postman (for API testing)
Git (for cloning the repository)

Installation

Clone the Repository:
git clone https://github.com/<your-repo>/TC_BD_Group-7.git
cd TC_BD_Group-7


Install Dependencies:
npm install


Initialize Data File:
Create the src/data/ directory:mkdir -p src/data
Create src/data/polls.json with:{
  "polls": []
}
Ensure the file is writable:chmod 664 src/data/polls.json


Start the Server:
node index.js


The server will run at http://localhost:3000 (or the port in .env).
Look for: Server running on port 3000.



📡 API Endpoints
The API is accessible at http://localhost:3000/api/polls. All endpoints expect and return JSON.

Method
Endpoint
Description
Request Body/Example
Response


POST
/api/polls
Create a new poll
{ "question": "Favorite color?", "options": [{ "text": "Red" }, { "text": "Blue" }] }
201: Poll object with IDs, options, createdAt


GET
/api/polls
List all polls
None
200: Array of poll objects


GET
/api/polls/:id
Get a specific poll by ID
None
200: Poll object, 404: Not found


POST
/api/polls/:id/vote
Vote on a poll option
{ "optionId": "<option-id>" }
200: Updated poll, 404: Not found


Example Requests
Create a Poll
curl -X POST -H "Content-Type: application/json" \
-d '{"question":"Favorite color?","options":[{"text":"Red"},{"text":"Blue"},{"text":"Green"}]}' \
http://localhost:3000/api/polls

Response:
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "question": "Favorite color?",
  "options": [
    { "id": "opt1", "text": "Red", "votes": 0 },
    { "id": "opt2", "text": "Blue", "votes": 0 },
    { "id": "opt3", "text": "Green", "votes": 0 }
  ],
  "createdAt": "2025-05-13T14:17:00.000Z"
}

Get All Polls
curl http://localhost:3000/api/polls

Response:
[{ ...poll object... }]

Get a Poll by ID
curl http://localhost:3000/api/polls/123e4567-e89b-12d3-a456-426614174000

Response:
{ ...poll object... }

Vote on a Poll
curl -X POST -H "Content-Type: application/json" \
-d '{"optionId":"opt2"}' \
http://localhost:3000/api/polls/123e4567-e89b-12d3-a456-426614174000/vote

Response:
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "question": "Favorite color?",
  "options": [
    { "id": "opt1", "text": "Red", "votes": 0 },
    { "id": "opt2", "text": "Blue", "votes": 1 },
    { "id": "opt3", "text": "Green", "votes": 0 }
  ],
  "createdAt": "2025-05-13T14:17:00.000Z"
}

Error Responses

400 Bad Request: Invalid input (e.g., missing question, fewer than 2 options).{ "errors": [{ "msg": "Invalid value", "param": "question" }] }


404 Not Found: Poll or option not found.{ "error": "Poll not found" }


500 Internal Server Error: File or server issues.{ "error": "Failed to create poll" }




🧪 Testing with Postman

Install Postman: Download from postman.com.
Create a Collection:
Name it “Polling App API.”
Add requests for each endpoint (see API Endpoints).
Set Content-Type: application/json for POST requests.


Test Scenarios:
Create polls with valid and invalid data.
Retrieve all polls and individual polls.
Vote on options and verify vote counts.
Test error cases (e.g., nonexistent IDs, missing fields).


Verify Data: Check src/data/polls.json to confirm persistence.


🤝 Contributing
We welcome contributions! Please:

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request.

For issues, open a ticket on the GitHub Issues page.


Built with 💻 and ☕ by Team TC_BD_Group-7
