const express = require('express');
const app = express();
const port = 8080;

app.use('/games', express.static('src/game-repo'));

app.listen(port, () => console.log(`app listening on port ${port}!`));