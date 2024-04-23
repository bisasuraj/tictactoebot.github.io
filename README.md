# Tic-Tac-Toe Game with AI Bot - README

## https://bisasuraj.github.io/tictactoebot.github.io/

This is a simple vanilla JavaScript project that implements a Tic-Tac-Toe game with an AI bot using the minimax algorithm. The project uses Firebase for database communication to store and retrieve user scores.

## Features

- Play Tic-Tac-Toe against an AI bot.
- The bot uses the minimax algorithm to make intelligent moves.
- Firebase is used to store and update user scores.

## Setup

1. Clone or download the project repository to your local machine.
2. Open the `index.html` file in a web browser to launch the game.

## How to Play

1. Upon opening the game, you'll see a 3x3 grid representing the Tic-Tac-Toe board.
2. Click on the cells to make your moves as player "X". The bot, represented by player "O", will make its move after you.
3. The game's status text will indicate whose turn it is.
4. The game ends when one player wins, there's a draw, or you decide to restart the game.
5. To restart the game, click the "Restart" button.

## Testing the AI Bot

1. You can test the bot's performance by entering custom JavaScript code in the provided input field and clicking the "Evaluate and Insert Code" button. The bot will use this code to make its moves instead of the minimax algorithm.
2. To test the bot's performance using the minimax algorithm, click the "Test Code" button. This will simulate multiple games where the bot plays against itself.
3. The test results, including the number of draws and wins for the bot, will be displayed in an alert.

## Submitting Scores

### https://gamification-database.firebaseapp.com/

1. After testing the bot and obtaining your score, you can submit your score to the database by entering your unique user ID and clicking the "Insert ID" button.
2. Enter your score and click the "Final Submit" button to update your score in the Firebase database.

**Note**: Ensure that you have a working internet connection and the Firebase configuration is correctly set up in `index.js` for the database communication to work.

## Additional Notes

- The project uses the Firebase Firestore and Realtime Database SDKs to communicate with the database.
- The AI bot uses the minimax algorithm to make decisions based on the provided code input.
- The game provides a simple user interface to play and test the AI bot's performance.
- The project has been tested on modern web browsers.

Enjoy playing Tic-Tac-Toe against the AI bot! If you have any questions or feedback, feel free to reach out.
