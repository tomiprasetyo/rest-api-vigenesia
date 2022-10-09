const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routes/user");
const motivasiRouter = require("./routes/motivasi");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/motivasi", motivasiRouter);

app.listen(port, () => {
  console.log(`app is runnning at port ${port}`);
});
