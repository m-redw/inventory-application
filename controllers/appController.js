const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const validateUser = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name can't be empty.")
    .escape(),
  body("developer")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name can't be empty.")
    .escape(),
  body("genre")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name can't be empty.")
    .escape(),
  body("platforms").exists().withMessage("Select platform(s)."),
  body("rating")
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be a number between 0 and 5 (ie 0, 2.2, 5)."),
];

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

postGame = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        game: req.body,
        errors: errors.array(),
      });
    }

    const { name, developer, genre, platforms, rating } = req.body;
    let platformsArr = Array.isArray(platforms) ? platforms : [platforms];
    await db.insertGame(name, developer, genre, platformsArr, rating);
    res.redirect("/");
  },
];

postUpdatedGame = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        game: { ...req.body, id: req.params.id },
        errors: errors.array(),
      });
    }

    const { id } = req.params;
    const { name, developer, genre, platforms, rating } = req.body;
    let platformsArr = Array.isArray(platforms) ? platforms : [platforms];
    await db.updateGame(name, developer, genre, platformsArr, rating, id);
    res.redirect("/");
  },
];

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
