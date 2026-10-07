import express from "express";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;
const { Pool } = pg;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mahasiswa",
  password: String(process.env.PASSWORD),
  port: 5432,
});

app.get("/", (req, res, next) => {
  console.log("[REST DATA :");
  pool
    .query("Select * from biodata")
    .then((testData) => {
      console.log(testData);
      res.send(testData.rows);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
