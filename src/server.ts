import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

//import Routes

const app: express.Application = express();
const port: number = 3000 || process.env.PORT;

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//use routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
