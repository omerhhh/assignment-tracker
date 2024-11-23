# Assignment Tracker

## Description
The **Assignment Tracker** is a web-based application designed to help students track their assignments. It allows users to **create, read, update**, and **delete** assignments easily. Users can manage assignments with a title, description, and due date, as well as search and sort them.

## Features
- **Add Assignments**: Users can create new assignments with a title, description, and due date.
- **View Assignments**: A list of all assignments can be viewed and sorted.
- **Edit Assignments**: Users can update existing assignments.
- **Delete Assignments**: Assignments can be deleted with a confirmation prompt.
- **Search & Sort**: Assignments can be searched by title and sorted by due date or title.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Frontend**: EJS templating engine
- **Database**: MongoDB (using Mongoose)
- **Styling**: Custom CSS with Bootstrap for responsive design

## Features Implemented
- Full **CRUD** functionality (Create, Read, Update, Delete).
- Search and sort functionality for assignments.
- Customizable UI using CSS and Bootstrap.

## Live Demo
You can view the live version of the application here:
[Assignment Tracker - Live Demo](https://assignment-tracker-omer.onrender.com/home)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/omerhhh/assignment-tracker.git
   ```

2. Navigate to the project directory:
   ```bash
   cd assignment-tracker
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory with the following environment variables:
   ```bash
   MONGO_URI=<Your MongoDB URI>
   PORT=3000
   ```

5. Run the application:
   ```bash
   npm start
   ```

## Acknowledgements
Render: For hosting the app and providing a cloud-based deployment platform.
MongoDB: For database management and storage.
Bootstrap: For creating a responsive design and UI components.
Dotenv: For managing environment variables securely.
Express: For building the backend web framework.
Mongoose: For MongoDB object modeling and interaction.
EJS: For templating engine to render dynamic content.
