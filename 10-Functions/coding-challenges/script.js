"use strict";
const poll = {
  question: "What is your favorite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const userInput = Number(
      prompt(
        `${this.question}\n${this.options.join("\n")}\n(Write option number)`
      )
    );
    /*
    if (userInput >= 0 && userInput < 4) {
      this.answers[userInput]++;
      this.displayPollResults(this.answers);
    } else {
      alert("Invalid Input");
    }
    */
    //  $ Instead We can use short circuiting
    typeof userInput === "number" &&
      userInput < this.options.length &&
      this.answers[userInput]++;
    this.displayPollResults();
    this.displayPollResults("string");
  },
  displayPollResults(type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      console.log(`Poll results are ${this.answers.join(", ")}`);
    }
  },
};
document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

const data1 = [5, 2, 3];
const data2 = [1, 5, 3, 9, 6, 1];
poll.displayPollResults.call({ answers: data1 });
poll.displayPollResults.call({ answers: data2 }, "string");

(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";
  header.addEventListener("click", function () {
    header.style.color = "blue";
  });
})();
