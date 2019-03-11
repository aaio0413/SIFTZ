const router = require("express").Router();
const mongodb = require("mongoose");
const Songs = require("../models/song-model");

console.log("shits this page is loading");

const authCheck = (req, res, next) => {
  if (!req.user) {
    //if user is not logged in
    res.redirect("/");
  } else {
    next();
  }
};

router.get("/", authCheck, (err, req, res, next) => {
  console.log(req.user);
  console.log(err);
  res.json({ userName: req.user.userName });
});

router.get("/search/:time", (req, res) => {
  const timeChanger = req.params.time;
  let timeQuery = "";

  switch (timeChanger) {
    case "night":
      timeQuery = "Night(pm6~am5)";
      break;
    case "morning":
      timeQuery = "Morning(am5~am10)";
      break;
    case "day":
      timeQuery = "Day(am10~pm4)";
      break;
    case "sunset":
      timeQuery = "Sunset(pm4~pm6)";
      break;
    default:
      timeQuery = "Night(pm6~am5)";
  }

  Songs.find({ [timeQuery]: [1] }).then(songsForNight => {
    if (songsForNight) {
      console.log("songs found!!", songsForNight);
      res.send(songsForNight);
      res.end("ending session ;)");
    } else {
      console.log("songs are not found :(");
      res.send("there's no song for night");
      res.end("ending session ;)");
    }
  });
});

router.get("/search/songParam/:searchQuery", (req, res) => {
  let searcher = req.params.searchQuery;
  let searchQueryForDatabase = {};

  searcher = searcher.split("+");
  console.log("this is searcher", searcher);

  searcher.forEach(key => {
    console.log("key", key);
    searchQueryForDatabase[key] = 1;
  });

  try {
    console.log("this is searchQueryForDatabse", searchQueryForDatabase);
    let testFinalQuery = {};
    for (let i = 0; i < searchQueryForDatabase.length; i++) {
      testFinalQuery[searchQueryForDatabase[i]] = searchQueryForDatabase[i];
    }
  } catch (err) {
    console.log("there's error", err);
  } finally {
    let finalQuery = { inside: 1, alone: 1, activeFeeling: 1 };
    console.log("this is real final", finalQuery);

    Songs.find(searchQueryForDatabase).then(songsRequested => {
      if (songsRequested) {
        console.log("songs found!!", songsRequested);
        res.send(songsRequested);
        res.end("ending session ;)");
      } else {
        console.log("songs are not found :(");
        res.send("there's no song for night");
        res.end("ending session ;)");
      }
    });
  }
});

module.exports = router;
