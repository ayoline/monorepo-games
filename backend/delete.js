const express = require('express');
const router = express.Router();
router.use(express.json());
const jsonUsers = require('./users.json');
const fs = require('fs');

router.delete('/deletedata', function (req, res) {
    const idFromGame = Number(req.body.id);

    if (idFromGame) {
        const games = JSON.parse(fs.readFileSync('users.json', 'utf8'));
        const gameToBeDeleted = games.find((el) => el.id === idFromGame);

        if (gameToBeDeleted) {
            const gameToBeDeletedIndex = games.indexOf(gameToBeDeleted);
            games.splice(gameToBeDeletedIndex, 1);

            fs.writeFile('users.json', JSON.stringify(games), function (err) {
                if (!err) {
                    res.json(gameToBeDeleted);
                } else {
                    throw err;
                }
            });
        }
    }
});

module.exports = router;