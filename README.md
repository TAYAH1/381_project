# Student Information System

## Group Info
- **Group No.:** 16
- **Members:**
  - Tung Yu Hin (SID: 12888128)
  - Soo Lok Yiu (SID: 12894424)
  - Lee Chin Yiu (SID: 13432147)
  

## Project File Introduction
### 1. server.js
**Summary:**
The server.js file is the main entry point of the application. It provides:
- Middleware setup for session management, body parsing, and static file serving.
- Authentication system with login and logout routes.
- CRUD operations for managing student records (Create, Read, Update, Delete) through web pages and RESTful APIs.
- Routes for rendering EJS templates (login, logout, layout) and handling form submissions.
- Database connection to MongoDB using Mongoose.

### 2. package.json
**Summary:**
This file lists the dependencies required to run the project, including:
- express: Web framework for Node.js.
- mongoose: MongoDB object modeling tool.
- bcrypt: For password hashing.
- ejs: Templating engine for rendering dynamic HTML.
- body-parser: Middleware for parsing form data and JSON.
- express-session: Middleware for session management.

### 3. public (folder)
**Summary:**
The public folder contains the following static files:
- logo.png: The logo of HKMU for the application.

### 4. views (folder)
**Summary:**
The views folder contains EJS files (templates) for rendering dynamic HTML pages:
- login.ejs:
  - **Title:** "Student Information System"
  - Provides a login form for user authentication with a "Login" button.
- logout.ejs:
  - **Title:** "Logout Confirmation"
  - Provides a confirmation message: "Are you sure you want to logout?".
  - Includes "Logout" and "Cancel" options.
- layout.ejs:
  - **Title:** "Student Information Management"
  - Displays the main dashboard for managing student records.
  - Includes:
    - Add Student: A button to add new students.
    - Filter Students: A form to search students by name criteria.
    - Student List: A table listing student details (Name, Student ID, Course) and actions (Edit/Delete).

### 5. models (folder)
**Summary:**
The models folder contains Mongoose models for MongoDB collections:
- user.js: Defines the schema for storing user (unique username and password).
- student.js: Defines the schema for storing student details (name, unique with 8 digit studentId andcourse).
### 6. CreateUser.js
**Summary:**
The CreateUser.js provide a way for user to create their username and password. It will store in the MongoDB

## Cloud-Based Server URL
https://three81-project-b39e.onrender.com/login

## Operation Guides
### 1. Login/Logout Pages
**Login Page:**
- **Title:** "Student Information System".
- **Steps:**
  1. Visit the login page: https://three81-project-b39e.onrender.com/login
  2. Enter valid credentials (Username=admin, Password=password).
  3. Click the "Login" button to access the dashboard (/layout).

**Logout Page:**
- **Title:** "Logout Confirmation".
- **Steps:**
  1. Click the "Logout" button on the dashboard to visit the logout page.
  2. Confirm logout by clicking "Logout" or cancel the action.

### 2. CRUD Web Pages
**Dashboard Page (/layout):**
- **Title:** "Student Information Management".
- **Features:**
  - Add Student: Click the "Add Student" button to open a form for adding a new student.
  - Filter Students: Use the "Filter Students" input box and click "Filter" to search for specific students.
  - Edit Student: Click the "Edit" button next to a student to modify their details.
  - Delete Student: Click the "Delete" button next to a student to remove them from the database.

### 3. RESTful CRUD Services
The application provides the following RESTful APIs for CRUD operations:

| Method | Path                              | Description                             |
|--------|-----------------------------------|-----------------------------------------|
| POST   | /api/students/create              | Create a new student record.           |
| GET    | /api/students                     | Fetch all student records.             |
| GET    | /api/students?search={name}      | Search for students by name.           |
| PUT    | /api/students/update/:id          | Update a specific student.             |
| DELETE | /api/students/delete/:id          | Delete a specific student.             |

### 4. Testing RESTful APIs
**cURL Commands for Testing APIs**
- Login to system:
  ```bash
  curl -X POST "https://three81-project-b39e.onrender.com/login" -d "username=admin&password=password" -c cookies.txt
- Read student records:
  ```bash
  curl -X GET https://three81-project-b39e.onrender.com/api/students -b cookies.txt
- Search student by name:
  ```bash
  curl -X GET "https://three81-project-b39e.onrender.com/api/students?search=Smith" -b cookies.txt
- Create a Student:
  ```bash
  curl -X POST https://three81-project-b39e.onrender.com/api/students/create -H "Content-Type: application/json" -d '{"name": "Smith", "studentId": "12345668", "course": "Science"}' -b cookies.txt
  
  (For WINDOWS)curl -X POST "https://three81-project-b39e.onrender.com/api/students/create" -H "Content-Type: application/json" -d "{\"name\": \"Smith\", \"studentId\": \"12345668\", \"course\": \"Science\"}" -b cookies.txt
- Update a Student:
  ```bash
  curl -X PUT http://localhost:8099/api/students/update/674092a14bf554df734704a1 -H "Content-Type: application/json" -d '{"name": "Sam", "studentId": "12345568"}' -b cookies.txt
  (For WINDOWS)curl -X PUT https://three81-project-b39e.onrender.com/api/students/update/674092a14bf554df734704a1 \-H "Content-Type: application/json" \-d "{\"name\": \"Sam\", \"studentId\": \"12345568\"}" \-b cookies.txt
  

- Delete student
  ```bash
  curl -X DELETE https://three81-project-b39e.onrender.com/api/students/delete/674092a14bf554df734704a1 -b cookies.txt
