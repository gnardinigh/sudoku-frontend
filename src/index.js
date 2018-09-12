document.addEventListener("DOMContentLoaded", function() {

const canvas = document.getElementById("board-canvas")

const puzzlesUrl = `http://localhost:3000/api/v1/puzzles/`

const puzzlesContainer = document.getElementById('puzzles-container')
const puzzlesList = document.getElementById('puzzles-list')

function displayPuzzle(id){
  // let url = puzzlesUrl/${id}
  fetch(puzzlesUrl + id).then(res => res.json()).then(function(puzzle){
    let board = new Board(canvas, puzzle.numbers)
    board.render()
  })
}

displayPuzzle(1)

canvas.addEventListener("click", (event)=>{
  let row = Math.floor((event.y-15)/(500/9))
  let column = Math.floor((event.x)/(500/9))
  if(row >= 9){
    row = 8
  }
  if(column === 9){
    column = 8
  }
  console.log(`row = ${row}`)
  console.log(`column = ${column}`)
  checkIfBlank(row, column)
})

function checkIfBlank(row, column){
  let clickNumber = boards[0].panel[column][row]
  console.log(clickNumber)
}

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
