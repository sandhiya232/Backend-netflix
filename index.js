const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let users = []; 

app.post("/api/signup", (req, res) => {
  const { email, password } = req.body;
  const userExists = users.find(user => user.email === email);
  if (userExists) return res.status(400).json({ message: "User already exists" });
  users.push({ email, password });
  res.status(201).json({ message: "Signup successful" });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const validUser = users.find(user => user.email === email && user.password === password);
  if (validUser) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.listen(5000, () => console.log("Backend running at http://localhost:5000"));
