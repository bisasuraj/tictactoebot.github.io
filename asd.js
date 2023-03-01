

board = options.slice();

// Define the maximizing player and minimizing player
const aiPlayer = "O";
const humanPlayer = "X";

// Define the evaluation function for the board
function evaluate(board) {
  // Check for a winner
  const winPatterns = [      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      if (board[a] === aiPlayer) {
        return 10;
      } else if (board[a] === humanPlayer) {
        return -10;
      }
    }
  }

  // Check for a tie
  if (!board.includes("")) {
    return 0;
  }

  // Otherwise, return null
  return null;
}

// Define the minimax function
function minimax(board, depth, maximizingPlayer) {
  // Evaluate the board at the current depth
  const evaluation = evaluate(board);

  // If the evaluation is not null, return the value
  if (evaluation !== null) {
    return evaluation;
  }

  // Otherwise, determine the best score for the current player
  if (maximizingPlayer) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = aiPlayer;
        const score = minimax(board, depth + 1, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = humanPlayer;
        const score = minimax(board, depth + 1, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

// Find the best move for the AI player
let bestScore = -Infinity;
let bestMove;
for (let i = 0; i < board.length; i++) {
  if (board[i] === "") {
    board[i] = aiPlayer;
    const score = minimax(board, 0, false);
    board[i] = "";
    if (score > bestScore) {
      bestScore = score;
      bestMove = i;
    }
  }
}


cellIndex = bestMove;
