const express = require("express")
const router = express.Router()
const controller = require("../controller/gameController")

//GET
router.get("/games", controller.getAllGames)
router.get("/games/:id", controller.getGameById)

//POST
router.post("/games/create", controller.createGame)

//PUT
router.put("/games/:id/update", controller.updateGame)

//DELETE
router.delete("/games/:id/delete", controller.deleteGame)

module.exports = router