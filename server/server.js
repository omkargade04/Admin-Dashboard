const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: [`${process.env.NEXT_URL}`],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));

app.use("/api/admin", require("./routes/admin.routes.js"));
app.use("/api/user", require("./routes/users.routes.js"));

app.get("/", (req, res) => {
  res.status(200).json(`Server is running...`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
