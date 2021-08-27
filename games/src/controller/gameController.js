const games = require("../models/games")

const getAllGames = (req, res) => {
    games.find( function (err, gamesFound) {
        if (err) {
            res.status(500).send( { message: err.message } )
        }
        if (gamesFound && gamesFound.length > 0){
            res.status(200).send(gamesFound)
        } else {
            res.status(204).send( { message: "nenhum jogo disponível" } )
        }
    })
}

const getGameById = (req,res) => {
    const requestId = req.params.id
    games.findOne( { id: requestId }, function (err,gamesFound) {
        if (err) {
            res.status(500).send({message: err.message})
        }
        if (gamesFound){
            res.status(200).send(gamesFound.toJSON( { virtuals:true } ))
        } else {
            res.status(204).send({message: "nada consta"})
        }
    })
}

const createGame = (req,res) => {
    let { id, title, launchYear, consoles, liked, stages} = req.body
    const gamers = games.insertMany({id, title, launchYear, consoles, liked, stages})

    if (gamers) {
        res.status(200).send({message: "criado com sucesso"})
    } else {
        res.status(500).send({ message: "error"})
    }
}

const updateGame = (req, res) => {
    const requiredId = req.params.id;
    games.findOne({ id: requiredId }, function (err, gameFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (gameFound) {
                games.updateOne({ id: requiredId }, { $set: req.body }, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message })
                    } else {
                        res.status(200).send({ message: "Jogo alterado com sucesso" })
                    }
                })
            } else {
                res.status(404).send({ message: "Não há jogos para atualizar com esse id" });
            }
        }
    })
};

const deleteGame = (req, res) => {
    const requiredId = req.params.id;
    games.findOne({ id: requiredId }, function (err, gameFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (gameFound) {
                games.deleteOne({ id: requiredId }, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message })
                    } else {
                        res.status(200).send({ message: "Deletado com sucesso" })
                    }
                })
            } else {
                res.status(404).send({ message: "Não há jogos com esse id" });
            }
        }
    })
}

module.exports = {
    getAllGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
}