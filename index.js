// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyBHj7sygXjmNV-9r4kIQWEoAzBEAp9F4BI",
//     authDomain: "gamification-database.firebaseapp.com",
//     projectId: "gamification-database",
//     storageBucket: "gamification-database.appspot.com",
//     messagingSenderId: "1083702318620",
//     appId: "1:1083702318620:web:88f706e08a0bf75d4cf1d9",
//     measurementId: "G-3L2Q2KG7H5"
//   };
let botCode = "";

var myscore=0;
  // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getFirestore,doc, getDocs,getDoc,updateDoc } from 'https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js'

import { getDatabase, set, get, update, remove, ref, child } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHj7sygXjmNV-9r4kIQWEoAzBEAp9F4BI",
  authDomain: "gamification-database.firebaseapp.com",
  projectId: "gamification-database",
  storageBucket: "gamification-database.appspot.com",
  messagingSenderId: "1083702318620",
  appId: "1:1083702318620:web:88f706e08a0bf75d4cf1d9",
  measurementId: "G-3L2Q2KG7H5"
};


//------working things
// Initialize Firebase

var unique_Id;

const app = initializeApp(firebaseConfig);




const db = getFirestore();
// const colRef = doc(db, "UserData", "2PInFnt9MhhI6jYDUzpUOPuQEuz2");
// const sc = await getDoc(colRef);
// console.log(sc.data());
//---------------------
// const myProducts = db.collection('UserData');
// const productsContainer = document.querySelector('#9gLaqKhHaDMD2buqQuJiGONzRy23');

// myProducts.onSnapshot(products => {
//     products.forEach(doc => {
//       data = doc.data();
//       console.log(data);
//     });
//   });


theInstructions = document.getElementById("code").value;

const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

var theInstructions;

// var botCellDecision;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}


async function cellClicked(){    
    var cellIndex = this.getAttribute("cellIndex");



    if(options[cellIndex] != "" || !running){
        return;
    }
    
    updateCell(this, cellIndex);

    verifyWinner();

    if(!running)
        return;
        console.log(cellIndex);

    //bot's turn
    await eval(theInstructions);
    console.log(cellIndex);
    

    updateCell(cells[cellIndex], cellIndex);
    verifyWinner();
    
}



function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function verifyWinner(simulation){
    let roundWon = false;


    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}



function checkWin(){
    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        if (options[a] && options[a] === options[b] && options[a] === options[c]) {
          return options[a];
        }
      }
    
      if (options.every(cell => cell !== '')) {
        return 'tie';
      }
    
      return null;
}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}


//  execute the code, 
//window[settings.functionName](t.parentNode.id);
document.querySelector('#eval').addEventListener('click', function() {
    theInstructions = document.getElementById("code").value;
    
    // setTimeout(theInstructions, 1);
    alert('inserted  code');
});
//-----------------------------------------


async function simulateWithPerfectBot(botCode){

    
    //iterating 100 games with a proper bot:
    //keeping track of games, draws, win or loose
    var draws = 0;
    var perfectBoxwins = 0;

    for(var i =0;i<100;i++){

      // console.log(running);
      
      //first move is random;
      var cellIndex = Math.floor(Math.random() * (8 - 0 + 1) + 0);
      // var cellIndex = 0;
      // while( verifyWinner!="X" ||verifyWinner!="O"||verifyWinner!="draw" ){
        // console.log(cellIndex);

      while(running===true){
      

      if(options[cellIndex] != "" || !running){
          break;
      }

      //updating cell without UI, hehe
      options[cellIndex] = currentPlayer;

      verifyWinner = verifyWinnerSimulation();
      if(verifyWinner!=undefined)
        if(verifyWinner==='X')
          perfectBoxwins++;
        else 
          draws++;

      if(!running)
          break;

      await eval(theInstructions);
      options[cellIndex] = currentPlayer;
      verifyWinner = verifyWinnerSimulation();
      if(verifyWinner!=undefined)
        if(verifyWinner==='X')
          perfectBoxwins++;
        else 
          draws++;
      
      
      // console.log(verifyWinner);


      cellIndex = await thePerfectBot();
      // console.log(cellIndex);
      }

    restartGame();
    }


    return [draws,perfectBoxwins];
}

function verifyWinnerSimulation(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    

    if(roundWon){
        running = false;
        return currentPlayer.toString();
    }
    else if(!options.includes("")){
        running = false;
        return "draw";
    }
    else{
        currentPlayer = (currentPlayer == "X") ? "O" : "X";
    }
    
}




  async function thePerfectBot(){

  //perfect bot code:
  var board = options.slice();
                
  // Define the maximizing player and minimizing player
  const aiPlayer = "X";
  const humanPlayer = "O";
  
  // Define the evaluation function for the board
  function evaluate(board) {
    // Check for a winner
    const winPatterns = [      
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
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
  
  return bestMove;
//   cellIndex = bestMove;
}




//-------------submit + things-------------


  // Call the function when the test code is pressed.
  document.querySelector("#test-code").addEventListener("click", async function () {
    const botCode = document.getElementById("code").value;
    let res = await simulateWithPerfectBot(botCode);
    console.log(res);
    myscore = res[0];
    alert("your score: "+res[0].toString());
  });


// submit, updating the score, hehe:


document.querySelector("#submit-button").addEventListener("click", async function () {

  try {
const colRef = doc(db, "UserData", unique_Id);

// Assuming you want to increase the score by 10, you can set the value accordingly


// Update the "score" key with the new value
await updateDoc(colRef, { score: myscore });

alert("updated the score succesfully go back to the main page. :)");
  }
  catch (error) {
    // Handle the error
    console.error("Error updating score:", error);
    alert("Failed to update score. Ensure the UID is correct. try again later :(");
  }


});



document.querySelector("#insert-id").addEventListener("click", function () {
  console.log(document.querySelector('#UID').value.trim());
  unique_Id = document.querySelector('#UID').value.trim();
});