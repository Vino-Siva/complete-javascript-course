const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// $ Coding Challenge 1
// * Task 1
const [players1, players2] = game.players;
console.log(players1, players2);

// * Task 2
const [gk1, ...fieldPlayers1] = players1;
const [gk2, ...fieldPlayers2] = players2;
console.log(gk1, fieldPlayers1);
console.log(gk2, fieldPlayers2);

// * Task 3
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

// * Task 4
const players1Final = [...players1, "Thiago", "Coutinho", "Perisic"];
console.log(players1Final);

// * Task 5
// const { team1, x: draw, team2 } = game.odds;  // $ Two ways
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

// * Task 6
function printGoals(...players) {
  console.log(`${players} scored ${players.length} goals`);
}
printGoals("Lewandowski", "Gnarby", "Lewandowski", "Hummels");
printGoals(...game.scored);

// * Task 7
function highWinningProbability() {
  (team1 < team2 && console.log("Team 1 has high chance to win")) ??
    (team1 > team2 && console.log("Team 2 has high chance to win"));
}
highWinningProbability();

// $ Coding Challenge 2
// * Task 1
for (const [i, player] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${player}`);
}

// * Task 2
let totalOdd = 0;
const odds = Object.values(game.odds);
for (const odd of odds) {
  totalOdd += odd;
}
totalOdd /= odds.length;
console.log(totalOdd);

for (const [key, value] of Object.entries(game.odds)) {
  console.log(
    `Odd of ${game[key] ? `victory for ${game[key]}` : "draw"}: ${value}`
  );
}
const scorers = {};
let goal;
for (const player of game.scored) {
  scorers[`${player}`] ? scorers[`${player}`]++ : (scorers[`${player}`] = 1);
}
console.log(scorers);

// $ Coding Challenge 3
const gameEvents = new Map([
  [17, "⚽ GOAL"],
  [36, "🔁 Substitution"],
  [47, "⚽ GOAL"],
  [61, "🔁 Substitution"],
  [64, "🔶 Yellow card"],
  [69, "🔴 Red card"],
  [70, "🔁 Substitution"],
  [72, "🔁 Substitution"],
  [76, "⚽ GOAL"],
  [80, "⚽ GOAL"],
  [92, "🔶 Yellow card"],
]);

console.log(new Set(gameEvents.values()));

gameEvents.delete(64);
const time = [...gameEvents.keys()].pop();
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);

for (const [min, event] of gameEvents) {
  const eventTime = min <= 45 ? `FIRST` : `SECOND`;
  console.log(`[${eventTime} HALF] ${min}: ${event}`);
}

// $ Coding Challenge 4
document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));
const button = document.querySelector("button");
const clickEventAction = () => {
  const testData = document.querySelector("textarea").value;
  const rows = testData.split("\n");
  for (const [i, data] of rows.entries()) {
    const [firstWord, lastWord] = data.toLowerCase().trim().split("_");
    const camelCaseData =
      firstWord + lastWord.replace(lastWord[0], lastWord[0].toUpperCase());
    console.log(`${camelCaseData.padEnd(20)}${"✅".repeat(i + 1)}`);
  }
};
button.addEventListener("click", clickEventAction);
