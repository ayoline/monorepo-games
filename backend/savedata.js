const express = require('express');
const router = express.Router();
router.use(express.json());
const jsonGames = require('./games.json');
const lastGameId = require('./lastId.json');
const fs = require('fs');

router.post('/savedata', function (req, res) {
    let dataFromClient = req.body;
    console.log(dataFromClient);

    dataFromClient.id = (lastGameId[0].lastid + 1);
    jsonGames.push(dataFromClient);

    fs.writeFile('games.json', JSON.stringify(jsonGames), function (err) {
        if (err) throw err;
        res.json(dataFromClient);
    });

    lastGameId[0].lastid = dataFromClient.id;
    fs.writeFile('lastId.json', JSON.stringify(lastGameId), function (err) {
        if (err) throw err;
        res.json(dataFromClient);
    });
});

module.exports = router;