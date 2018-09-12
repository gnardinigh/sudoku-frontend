document.addEventListener("DOMContentLoaded", function() {

const canvas = document.getElementById("board-canvas")

const puzzlesUrl = `http://localhost:3000/api/v1/puzzles/`

const formContainer = document.getElementById('form-container')
const numberInput = document.getElementById('number-input')

let currRow;
let currCol;
let currBoard;


function displayPuzzle(id){
  // let url = puzzlesUrl/${id}
  fetch(puzzlesUrl + id).then(res => res.json()).then(function(puzzle){
    let board = new Board(canvas, puzzle.numbers, puzzle.start)
    currBoard = board
    currBoard.render()
  })
}

displayPuzzle(4)

canvas.addEventListener("click", (event)=>{
  let row = Math.floor((event.y)/(500/9))
  let column = Math.floor((event.x)/(500/9))
  if(row >= 9){
    row = 8
  }
  if(column === 9){
    column = 8
  }
  currRow = row
  currCol = column
  if(checkIfBlank()){
    createForm()
  }
  else {
    console.log("Already filled out!")
    clearForm()
  }
  // clearForm()
})

function checkIfBlank(){
  let clickedNumber = currBoard.originalBoard[currCol][currRow]
  return clickedNumber === ""
  }

function createForm(){
  let input = `<input id="number" type="text" name="number" value="" maxlength="1" pattern="[1-9]"><br> <input type="submit" value="Submit"> `
  numberInput.innerHTML = input
}

function clearForm(){
  numberInput.innerHTML = ""
}

numberInput.addEventListener("submit", function(event){
  event.preventDefault()
  let input = document.getElementById("number").value
  currBoard.panel[currCol][currRow] = input
  currBoard.render()
  clearForm()
})


// function displayPuzzles(){
//   fetch(puzzlesUrl).then(res => res.json()).then(function(puzzles){
//     console.log(puzzles)
//     puzzles.forEach(puzzle => createPuzzleHTML(puzzle))
//   })
// }
//
// function createPuzzleHTML(puzzle){
//   let puzzleDifficulty = puzzle.difficulty
//   let puzzleNumbers = puzzle.numbers
//   let puzzleId = puzzle.id
//   let li = document.createElement("li")
//   li.innerHTML = `Puzzle ID: ${puzzleId} <br> </br> Difficulty: ${puzzleDifficulty} <br> </br>`
//   puzzlesList.appendChild(li)
// }
//
// displayPuzzles()

}) //END OF DOMCONTENTLOAD
