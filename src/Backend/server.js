// server.js

// Import the required modules
const express = require("express");  // Express framework for building the server
const bodyParser = require("body-parser");  // Middleware to parse request bodies
const cors = require("cors");  // Middleware to enable CORS (Cross-Origin Resource Sharing)
const pool = require("./db");  // Import the database connection

// Initialize the Express application
const app = express();
const port = 5000;  // Port number on which the server will listen

// Middleware setup
app.use(cors());  // Enable CORS to allow cross-origin requests
app.use(bodyParser.json());  // Parse JSON bodies from incoming requests
// Body Parser Middleware: When the server receives this request, the bodyParser.json() middleware processes the JSON data. It converts the raw JSON string in the request body into a JavaScript object and attaches it to req.body.

// Route for handling user signup
app.post("/api/signup", async (req, res) => {
  // Destructure the user data from the request body
  const { name, email, username, password } = req.body;

  try {
    // Insert the new user into the database and return the created record
    const result = await pool.query(
      "INSERT INTO users (name, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, username, password]
    );
    console.log("Data saved:", result.rows[0]);  // Log the saved user data
    res.status(200).send("Form submitted successfully!");  // Send success response
  } catch (error) {
    // Handle errors that occur during the database operation
    console.error("Error saving data:", error);
    res.status(500).send("An error occurred while saving the form data.");  // Send error response
  }
});

// Route for handling user login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;  // Destructure the login credentials from the request body
  console.log(username);  // Log the username for debugging

  try {
    // Query the database to find the user by username
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

    if (result.rows.length > 0) {
      const user = result.rows[0];  // Get the user record from the result
      if (user.password === password) {
        // Check if the provided password matches the stored password
        res.status(200).send("Login successful");  // Send success response
      } else {
        // Passwords do not match
        res.status(401).send("Invalid username or password");  // Send unauthorized response
      }
    } else {
      // No user found with the given username
      res.status(401).send("Invalid username or password");  // Send unauthorized response
    }
  } catch (error) {
    // Handle errors that occur during the database operation
    console.error("Error saving data:", error);
    res.status(500).send("An error occurred while saving the form data.");  // Send error response
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);  // Log a message indicating the server is running
});
