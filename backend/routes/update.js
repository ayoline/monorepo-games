const express = require('express');
const router = express.Router();
router.use(express.json());
const fs = require('fs');

router.put('/updatedata', function (req, res) {
    const gameFromClient = req.body;

    if (gameFromClient) {
        const games = JSON.parse(fs.readFileSync('data/games.json', 'utf8'));
        const gameToBeUpdated = games.find((el) => el.id === parseInt(gameFromClient.id));

        if (gameToBeUpdated) {
            const gameToBeUpdatedIndex = games.indexOf(gameToBeUpdated);
            games[gameToBeUpdatedIndex].game = gameFromClient.game;
            games[gameToBeUpdatedIndex].year = gameFromClient.year;
            games[gameToBeUpdatedIndex].genre = gameFromClient.genre;
            games[gameToBeUpdatedIndex].multiplayer = gameFromClient.multiplayer;
            games[gameToBeUpdatedIndex].offline = gameFromClient.offline;
            games[gameToBeUpdatedIndex].crossplataform = gameFromClient.crossplataform;

            fs.writeFile('data/games.json', JSON.stringify(games), function (err) {
                if (!err) {
                    res.json(gameToBeUpdated.id);
                } else {
                    console.log('Error: ' + err);
                    res.send(err);
                }
            });
        }
    }
});

module.exports = router;