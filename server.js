const express = require("express");
const cors = require("cors");
const router = require("./router.const");
const helmet = require("helmet");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.use("/api", router);

app.listen(PORT, HOST, () => {
  console.log(`Server is listening at http://localhost:3000`);
});
