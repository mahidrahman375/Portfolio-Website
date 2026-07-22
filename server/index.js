 
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { projects } from "./data/projects.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [ 
    "http://localhost:5173", 
    process.env.FRONTEND_URL,
].filter(Boolean);

app.set("trust proxy", 1);
app.use(helmet());
app.use(express.json({ limit: "10kb" })); 
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use(
  cors({
    origin(origin, callback) {
    // Requests without an Origin header include direct browser visits, 
    // server-to-server calls, and many API testing tools.
    if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true); 
    }
    return callback(new Error("This origin is not allowed to use the API.")); 
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"], 
    }),
);

app.get("/", (request, response) => { 
    response.json({
    message: "Portfolio API is running.", 
    documentation: "/api/health",
     }); 
});

app.get("/api/health", (request, response) => { 
    response.status(200).json({
    status: "ok",
    service: "portfolio-api",
    timestamp: new Date().toISOString(),
    });
});

app.get("/api/projects", (request, response) => { 
    response.status(200).json(projects);
});

app.post("/api/contact", (request, response) => {
    const name = String(request.body.name || "").trim();
    const email = String(request.body.email || "").trim().toLowerCase(); 
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
    // Beginner version: the message appears in the Render logs.
    // See the optional-upgrades chapter to send email or save to a database. 
    console.log("Contact form submission:", submission);
    return response.status(201).json({
        message: `Thanks, ${name}. Your message was received successfully.`,
    }); 
});

app.use((request, response) => {
    response.status(404).json({ message: "API route not found." });
});

app.use((error, request, response, next) => { 
    console.error(error);
    if (error.message === "This origin is not allowed to use the API.") { 
        return response.status(403).json({ message: error.message });
    }
    return response.status(500).json({
        message: "An unexpected server error occurred.",
    }); 
});
app.listen(PORT, "0.0.0.0", () => { 
    console.log(`Portfolio API listening on port ${PORT}`);
});
