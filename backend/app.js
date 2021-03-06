const port = 3000;
const config = require('./config');
const express = require('express');
const app = express();
const cors = require('cors');
const order = require('./routes/order');
const savedata = require('./routes/savedata');
const deletedata = require('./routes/delete');
const updatedata = require('./routes/update');

app.use(cors());
app.use('/order', order);
app.use('/save', savedata);
app.use('/delete', deletedata);
app.use('/update', updatedata);

app.listen(config.port, () => console.log(`listening on port: ${config.port}`));