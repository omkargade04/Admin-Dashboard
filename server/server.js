const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "PUT", "POST", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use("/api/admin", require("./routes/admin.routes.js"));
app.use("/api/user", require("./routes/users.routes.js"));

app.get("/", (req, res) => {
  res.status(200).json(`Server is running...`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//**************************/

app.get("/ping", (req, res) => {
  res.status(200).json("pong....");
});

const API_ENDPOINT = "https://admin-dashboard-xi14.onrender.com";

const makeApiRequest = async () => {
  try {
    const response = await axios.get(API_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error("API request failed:", error.message);
    throw error;
  }
};

const runApiRequestJob = async () => {
  console.log("Running API request job...");
  try {
    const responseData = await makeApiRequest();
    return responseData;
  } catch (error) {
    return null;
  }
};

// Schedule the API request job to run every 15 minutes
cron.schedule("*/15 * * * *", async () => {
  const responseData = await runApiRequestJob();
  if (responseData) {
    // Process the response data here
    console.log("API request successful:", responseData);
  } else {
    console.log("API request failed");
  }
});
