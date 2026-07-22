import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { projects } from "./data/projects.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/*
  Allow frontend applications to access the API.

  This beginner portfolio API contains only public project information,
  so allowing requests from all origins is acceptable for this project.
*/
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.set("trust proxy", 1);

app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(
  morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"),
);

/* Home route */
app.get("/", (request, response) => {
  response.status(200).json({
    message: "Portfolio API is running.",
    documentation: "/api/health",
  });
});

/* Health-check route */
app.get("/api/health", (request, response) => {
  response.status(200).json({
    status: "ok",
    service: "portfolio-api",
    timestamp: new Date().toISOString(),
  });
});

/* Projects route */
app.get("/api/projects", (request, response) => {
  response.status(200).json(projects);
});

/* Contact-form route */
app.post("/api/contact", (request, response) => {
  const name = String(request.body.name || "").trim();
  const email = String(request.body.email || "")
    .trim()
    .toLowerCase();
  const message = String(request.body.message || "").trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name.length < 2 || name.length > 80) {
    return response.status(400).json({
      message: "Name must contain between 2 and 80 characters.",
    });
  }

  if (!emailPattern.test(email) || email.length > 120) {
    return response.status(400).json({
      message: "Please enter a valid email address.",
    });
  }

  if (message.length < 10 || message.length > 1500) {
    return response.status(400).json({
      message: "Message must contain between 10 and 1,500 characters.",
    });
  }

  const submission = {
    name,
    email,
    message,
    submittedAt: new Date().toISOString(),
  };

  // The submitted message will appear in your Render logs.
  console.log("Contact form submission:", submission);

  return response.status(201).json({
    message: `Thanks, ${name}. Your message was received successfully.`,
  });
});

/* Route-not-found handler */
app.use((request, response) => {
  response.status(404).json({
    message: "API route not found.",
  });
});

/* General server-error handler */
app.use((error, request, response, next) => {
  console.error("Server error:", error);

  response.status(500).json({
    message: "An unexpected server error occurred.",
  });
});

/* Start the server */
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Portfolio API listening on port ${PORT}`);
});