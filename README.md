# Task-1 Social Media Web App

A simple social media web application built with Node.js, Express, MongoDB, and EJS. Users can sign up, log in, create posts, follow/unfollow other users, like/dislike posts, and comment on posts.

## Live Demo
[View the app](https://task-1-b3y2.onrender.com/login)

## Features
- User authentication (sign up, login, logout) using Passport.js
- Create, view, and manage posts (with image and caption)
- Comment on posts
- Like and dislike posts
- Follow and unfollow users
- Profile page displaying user posts, followers, and following
- Responsive and visually appealing UI using Bootstrap

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Authentication:** Passport.js with `passport-local-mongoose`
- **Frontend:** EJS templates, Bootstrap 5
- **Deployment:** Render

## Installation (Local Setup)
1. Clone the repository:
   ```bash
   git clone https://github.com/Sakshi330g/Task-1.git
2.Navigate to the project directory:
   cd Task-1
3.Install dependencies:
  npm install
4.Create a .env file in the root directory with the following variables:

 DB_URL=<Your MongoDB Atlas URL>
 SECRET=<Your session secret>
5.Start the server:
  npm start
6.Open http://localhost:8080
 in your browser.
 
## Project Structure

Task-1/
│
├─ models/         # Mongoose schemas (User, Post, Comment)
├─ routes/         # Express routes
├─ controllers/    # Route handlers and logic
├─ views/          # EJS templates
├─ public/         # CSS, JS, and static files
├─ index.js        # Main server file
├─ package.json
└─ .env            # Environment variables (not uploaded)

## Contributing

Fork the repository.

Create a feature branch (git checkout -b feature-name).

Commit your changes (git commit -m 'Add feature').

Push to the branch (git push origin feature-name).

Open a pull request.

## License

This project is open-source and free to use.
