var secretNumber;
var attemptCount = 0;
var gameOver = false;

function startGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attemptCount = 0;
    gameOver = false;

    document.getElementById("attempts").textContent = 0;
    document.getElementById("guess").value = "";
    document.getElementById("guess").disabled = false;
    document.getElementById("guessBtn").hidden = false;
    document.getElementById("restartBtn").hidden = true;
    document.getElementById("message").textContent =
        "🎯 Make your first guess!";
    document.getElementById("message").className = "";
    document.getElementById("history").innerHTML = "";
}

function checkGuess() {
    if (gameOver) return;

    const input = document.getElementById("guess");
    const number = Number(input.value);
    const message = document.getElementById("message");
    const history = document.getElementById("history");

    if (
        input.value.trim() === "" ||
        !Number.isInteger(number) ||
        number < 1 ||
        number > 100
    ) {
        message.textContent =
            "Enter a valid number from 1 to 100!";
        return;
    }

    attemptCount++;

    document.getElementById("attempts").textContent =
        attemptCount;

    if (number === secretNumber) {
        message.textContent =
            " WINNER! Correct number: " + secretNumber +
            " | Attempts: " + attemptCount;

        message.className = "winner";
        gameOver = true;

        input.disabled = true;
        document.getElementById("guessBtn").hidden = true;
        document.getElementById("restartBtn").hidden = false;

        history.innerHTML +=
            "<p>Guess " + attemptCount + ": " +
            number + " — Correct! </p>";

    } else if (number < secretNumber) {
        message.textContent =
            " Greater than " + number + "! Try again.";

        history.innerHTML +=
            "<p>Guess " + attemptCount + ": " +
            number + " — Greater than " + number + "</p>";

    } else {
        message.textContent =
            " Less than " + number + "! Try again.";

        history.innerHTML +=
            "<p>Guess " + attemptCount + ": " +
            number + " — Less than " + number + "</p>";
    }

    input.value = "";
    input.focus();
}

function restartGame() {
    startGame();
}

document.getElementById("guess").addEventListener(
    "keydown",
    function(event) {
        if (event.key === "Enter") {
            checkGuess();
        }
    }
);

startGame();