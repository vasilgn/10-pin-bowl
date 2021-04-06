const express = require("express");

const PORT = 3000;

const app = express();
app.use(express.json());

const { apiRouter } = require("./routes");

apiRouter(app);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
