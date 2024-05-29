const express = require("express");
const path = require("path");
const app = express();
const port = 9090;
app.disable("x-powered-by");
app.use(express.static(path.join(__dirname, "build")));

app.get("/cmsapp*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);
