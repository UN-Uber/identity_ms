require('dotenv').config()
const express = require("express");
const authRoutes = require("./routes/auth");

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json())
app.use("/auth",authRoutes);


app.listen(port, () =>console.log( `🚀 Server ready at http://localhost:${port}`));