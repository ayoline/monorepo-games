const port = 3000;
const express = require('express');
const app = express();
const cors = require('cors');
const order = require('./order');
const savedata = require('./savedata');
const deletedata = require('./delete');

app.use(cors());
app.use('/order', order);
app.use('/save', savedata);
app.use('/delete', deletedata);

app.listen(port, () => console.log(`listening on port: ${port}`));