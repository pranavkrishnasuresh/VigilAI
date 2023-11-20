// server/index.js
const express = require("express");
const cors = require("cors");

const stationAuthRoutes = require("./routes/stationAuthRoutes");
const officerAuthRoutes = require("./routes/officerAuthRoutes");
const diarizationRoute = require("./routes/diarizationRoute");
const reportsRoutes = require("./routes/reportsRoutes");
const officerRoutes = require("./routes/officerRoutes");
// const sentimentAnalysisRoute = require("./routes/sentimentAnalysisRoute");


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors())

app.use('/auth', stationAuthRoutes);
app.use('/auth', officerAuthRoutes);
app.use('/officer', diarizationRoute);
app.use('/station', reportsRoutes); 
app.use('/station', officerRoutes);
// app.use('/video', sentimentAnalysisRoute);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});