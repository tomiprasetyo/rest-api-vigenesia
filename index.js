const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routes/user");
const motivasiRouter = require("./routes/motivasi");
const roleRouter = require("./routes/role");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/vigenesia/user", userRouter);
app.use("/api/vigenesia/motivasi", motivasiRouter);
app.use("/api/vigenesia/role", roleRouter);

app.listen(port, () => {
  console.log(`app is runnning at port ${port}`);
});
