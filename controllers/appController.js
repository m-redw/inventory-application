const db = require("../db/queries");

async function getGames(req, res) {
  let games;
  if (req.query.search) {
    games = await db.getGames(req.query.search);
  } else {
    games = await db.getAllGames();
  }
  res.render("games", { games: games });
}

async function getNewForm(req, res) {
  res.render("form", { game: "" });
}

async function getUpdateForm(req, res) {
  const game = await db.getGame(req.params.id);
  res.render("form", { game: game });
}

async function postGame(req, res) {
  const { name, developer, genre, platforms, rating } = req.body;
  let platformsArr = Array.isArray(platforms) ? platforms : [platforms];
  await db.insertGame(name, developer, genre, platformsArr, rating);
  res.redirect("/");
}

async function postUpdatedGame(req, res) {
  const { id } = req.params;
  const { name, developer, genre, platforms, rating } = req.body;
  let platformsArr = Array.isArray(platforms) ? platforms : [platforms];
  await db.updateGame(name, developer, genre, platformsArr, rating, id);
  res.redirect("/");
}

async function deleteGame(req, res) {
  const { id } = req.params;
  await db.deleteGame(id);
  res.redirect("/");
}

async function deleteAllGames(req, res) {
  await db.deleteAllGames();
  console.log("All games deleted.");
  res.redirect("/");
}

module.exports = {
  getGames,
  getNewForm,
  getUpdateForm,
  postGame,
  postUpdatedGame,
  deleteGame,
  deleteAllGames,
};
