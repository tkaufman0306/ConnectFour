

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // Creates "htmlBoard" variable assigned to the html element "board"
  const board = document.getElementById("board");
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  board.append(top);

  // TODO: add comment for this code
  // Creates cells for each row and column based on the WIDTH and HEIGHT variables. Using 'for' loops, it will append new html table cell elements (<tr> and <td>) until it reaches the length of the WIDTH and HEIGHT.

  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    board.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--){
    if (!board[y][x]) {
      return y;
    }
  }
  return null;
}
/** placeInTable: update DOM to place piece into HTML table of board */
// TODO: make a div and insert into correct table cell

function placeInTable(y, x) {
  const piece = document.createElement("div");
  piece.classList.add("piece");
  piece.classList.add(`p${currPlayer}`);
  piece.style.top = -50 * (y + 2);
  const cell = document.getElementById(`${y}-${x}`);
  // const cell = document.createElement("td");
  cell.appendChild(piece);
  currPlayer = currPlayer === 1 ? 2 : 1;
}
/** endGame: announce game end */
// TODO: pop up alert message

function endGame(msg) {
  alert(msg);
}
/** handleClick: handle click of column top to play piece */
// get x from ID of clicked cell
// get next spot in column (if none, ignore click)
// place piece in board and add to HTML table

function handleClick(evt) {
  const x = +evt.target.id;
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  board[y][x] = currPlayer;
  placeInTable(y, x);
  // TODO: add line to update in-memory board

  // const piece = currPlayer === 1 ? 1 : 2;

  // check for win
  // TODO: check if all cells in board are filled; if so call, call endGame
  
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie

  if (board.every(row => row.every(cell => cell))) {
    return endGame("Tie!");
  }
  
  // switch players
  // TODO: switch currPlayer 1 <-> 2
 
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

// Check four cells to see if they're all color of current player
//  - cells: list of four (y, x) cells
//  - returns true if all are legal coordinates & all match currPlayer

function checkForWin() {
  function _win(cells) {
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
