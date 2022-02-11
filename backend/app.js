const port = 3000;
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());

app.listen(port, () => console.log('app listening on port 3000!'));