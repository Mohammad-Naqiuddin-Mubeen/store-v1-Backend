import { config } from "dotenv";
import express from "express";
import CORS from "cors";
import { connectDB } from "./database/ConnectDB.js";
import routes from "./routes/auth.routes.js";

config();

const app = express();
const PORT = process.env.PORT || 5050;
const URI = process.env.MONGODB_URI;

app.use(CORS());
app.use(express.json());

app.use("/api/auth", routes);

app.get("/", (req, res) => {
  res.send("Server says HI");
});

const startServer = async () => {
  try {
    await connectDB(URI);
    app.listen(PORT, () => {
      console.log(`Server Initiated on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error while initiating: ", error);
  }
};

startServer();
