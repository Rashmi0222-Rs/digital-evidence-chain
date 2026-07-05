const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const caseRoutes = require("./routes/caseRoutes");
const evidenceRoutes = require("./routes/evidenceRoutes");
const activityRoutes = require("./routes/activityRoutes");
const userRoutes = require("./routes/userRoutes");
const passwordRoutes = require("./routes/passwordRoutes");
const profileRoutes = require("./routes/profileRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const searchRoutes = require("./routes/search/searchRoutes");
const avatarRoutes = require("./routes/avatarRoutes");
const publicRoutes = require("./routes/publicRoutes");
const forgotPasswordRoutes = require("./routes/forgotPasswordRoutes");

const securityMiddleware = require("./middleware/securityMiddleware");
const { initSocket } = require("./socket");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

initSocket(server);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://digital-evidence-chain-du52uxzue-sanjay-s-projects8.vercel.app",
      "https://digital-evidence-chain-5kx2jt35p-sanjay-s-projects8.vercel.app"
    ],
    credentials: true
  })
);

app.use(express.json());
securityMiddleware(app);

app.get("/", (req, res) => {
  res.send("Digital Evidence Chain API is running");
});

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use("/api/auth", authRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/evidence", evidenceRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/users", userRoutes);
app.use("/api/password", passwordRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/avatar", avatarRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/forgot-password", forgotPasswordRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});