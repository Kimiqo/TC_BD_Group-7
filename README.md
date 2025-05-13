Polling App Backend
This is a simple RESTful API backend for a polling application, built with Node.js, Express, and JSON file storage. It allows users to create polls, vote on options, and retrieve poll results. The project is designed to be lightweight and extensible, using a JSON file (polls.json) for data persistence, with plans to add authentication and database support in the future.
Table of Contents

Project Overview
Features
Tech Stack
Folder Structure
Setup Instructions
API Endpoints
Testing with Postman
Team Contributions
Future Enhancements

Project Overview
The polling app backend provides a simple API for creating and managing polls. Users can create polls with multiple options, cast votes, and view poll results. The app uses a JSON file for storage, making it easy to set up for small-scale use. This project was developed by a team of five as part of a backend development exercise, focusing on clean code, error handling, and API design.
Features

Create polls with a question and multiple options.
Retrieve a list of all polls or details of a specific poll.
Vote on poll options, incrementing vote counts.
Input validation to ensure data integrity.
Error handling for file operations and invalid requests.
ES Modules for modern JavaScript syntax.

Tech Stack

Node.js: Runtime environment.
Express: Web framework for building the API.
JSON File Storage: polls.json for data persistence.
Dependencies:
express: API framework.
express-validator: Input validation.
uuid: Generate unique IDs for polls and options.

Development Tools: Postman for testing, Git for version control.

Folder Structure
TC_BD_Group-7/
├── index.js                # Main entry point (Express server setup)
├── package.json            # Project metadata and dependencies
├── node_modules/           # Installed dependencies
├── README.md               # Project documentation
├── src/
│   ├── controllers/
│   │   └── polls.js        # Business logic for poll operations
│   ├── routes/
│   │   └── polls.js        # API route definitions
│   ├── data/
│   │   └── polls.json      # JSON file for storing polls


Setup Instructions
Prerequisites

Node.js (v20.10.0 or higher)
npm (included with Node.js)
Postman (for testing API endpoints)
Git (for cloning and version control)

Installation

Clone the Repository:
git clone <repository-url>
cd TC_BD_Group-7


Install Dependencies:
npm install

Initialize Data File:
Create the src/data/ directory if it doesn’t exist: mkdir -p src/data
Create src/data/polls.json with the following content:{
  "polls": []
}
Ensure the file is writable:chmod 664 src/data/polls.json


Run the Server:
node index.js
The server will start at http://localhost:3000 (or the port specified in .env).
You should see: Server running on port 3000.



Running Tests
Test the API using Postman (see Testing with Postman).
Automated tests (optional) can be added using Jest and Supertest (see package.json for test scripts).

API Endpoints
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
201: Poll object with IDs, options, and createdAt


GET
/api/polls
Get all polls
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

Create a Poll:
curl -X POST -H "Content-Type: application/json" -d '{"question":"Favorite color?","options":[{"text":"Red"},{"text":"Blue"},{"text":"Green"}]}' http://localhost:3000/api/polls

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


Get All Polls:
curl http://localhost:3000/api/polls

Response:
[{ ...poll object... }]


Get a Poll by ID:
curl http://localhost:3000/api/polls/123e4567-e89b-12d3-a456-426614174000

Response:
{ ...poll object... }


Vote on a Poll:
curl -X POST -H "Content-Type: application/json" -d '{"optionId":"opt2"}' http://localhost:3000/api/polls/123e4567-e89b-12d3-a456-426614174000/vote

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

500 Internal Server Error: File or server issues (e.g., unable to read/write polls.json).{ "error": "Failed to create poll" }


Testing with Postman

Install Postman: Download from postman.com.
Set Up Requests:
Create a new collection (e.g., “Polling App API”).
Add requests for each endpoint (see API Endpoints).
Set Content-Type: application/json for POST requests.


Test Cases:
Create a poll with valid and invalid data.
Retrieve all polls and a specific poll.
Vote on an option and check the updated vote count.
Test error cases (e.g., nonexistent poll ID, missing optionId).

Verify Data: Check src/data/polls.json to confirm data persistence.



For issues or contributions, please open a pull request or contact the team.
