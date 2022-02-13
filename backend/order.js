const express = require('express');
const router = express.Router();
const jsonUsers = require('./users.json');

router.get('/order', function (req, res) {
    const isNotEmpty = req.query.value;
    const orderedGames = jsonUsers;

    if (isNotEmpty) {
        orderedGames.sort(
            (a, b) => Number(a.id) > Number(b.id) ? 1 : -1
        );
        filteredResponse(orderedGames, res);
    }
});

function filteredResponse(filteredJSON, res) {
    if (filteredJSON.length > 0) {
        res.json(filteredJSON);
    } else {
        res.send({ error: true, msg: "NENHUM RESULTADO ENCONTRADO" });
    }
}

module.exports = router
