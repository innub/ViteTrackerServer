const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;
require("dotenv/config");
const mongo = require("./mongo");
const dataMatch = require("./dataMatch");

app.use(require("./middleware/headerControl"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/latest", require("./routes/latest"));
app.use("/amazon", require("./routes/amazon"));
app.use("/account", require("./routes/accounts"));

app.get("/", (req, res) => {
  res.send("hi");
});
dataMatch();
const connectToMongoDB = async () => {
  await mongo().then(async (mongoose) => {
    try {
      console.log("Connected to database");
    } catch {
      mongoose.connection.close();
    }
  });
};
connectToMongoDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
