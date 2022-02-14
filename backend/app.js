const port = 3000;
const express = require('express');
const app = express();
const cors = require('cors');
const order = require('./order');
const savedata = require('./savedata');
const deletedata = require('./delete');
const updatedata = require('./update');

app.use(cors());
app.use('/order', order);
app.use('/save', savedata);
app.use('/delete', deletedata);
app.use('/update', updatedata);

app.listen(port, () => console.log(`listening on port: ${port}`));