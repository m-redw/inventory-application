const { Router } = require("express");
const {
  getNewForm,
  postGame,
  getUpdateForm,
  postUpdatedGame,
  deleteGame,
  getGames,
} = require("../controllers/appController");

const formRouter = Router();

formRouter.get("/", getGames);

formRouter.get("/add", getNewForm);
formRouter.post("/add", postGame);

formRouter.get("/update/:id", getUpdateForm);
formRouter.post("/update/:id", postUpdatedGame);

formRouter.post("/delete/:id", deleteGame);

module.exports = formRouter;
