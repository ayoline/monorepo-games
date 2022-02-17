const express = require('express');
const router = express.Router();
router.use(express.json());
const fs = require('fs');

router.post('/savedata', function (req, res) {
    let dataFromClient = req.body;
    const jsonGames = JSON.parse(fs.readFileSync('data/games.json', 'utf8'));
    const lastGameId = JSON.parse(fs.readFileSync('data/lastId.json', 'utf8'));

    dataFromClient.id = (lastGameId[0].lastid + 1);
    jsonGames.push(dataFromClient);

    fs.writeFile('data/games.json', JSON.stringify(jsonGames), function (err) {
        if (!err) {
            res.json(dataFromClient);
        } else {
            console.log('Erro: ' + err);
            res.send(err);
        }
    });

    lastGameId[0].lastid = dataFromClient.id;
    fs.writeFile('data/lastId.json', JSON.stringify(lastGameId), function (err) {
        if (!err) {
            console.log(lastGameId);
        } else {
            console.log('Error: ' + err);
        }
    });
});

module.exports = router;