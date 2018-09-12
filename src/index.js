document.addEventListener("DOMContentLoaded", function() {

const puzzlesUrl = `http://localhost:3000/api/v1/puzzles`

const puzzlesContainer = document.getElementById('puzzles-container')
const puzzlesList = document.getElementById('puzzles-list')

function displayPuzzles(){
  fetch(puzzlesUrl).then(res => res.json()).then(function(puzzles){
    console.log(puzzles)
    puzzles.forEach(puzzle => createPuzzleHTML(puzzle))
  })
}

function createPuzzleHTML(puzzle){
  let puzzleDifficulty = puzzle.difficulty
  let puzzleNumbers = puzzle.numbers
  let puzzleId = puzzle.id
  let li = document.createElement("li")
  li.innerHTML = `${puzzleId} <br> </br> Difficulty: ${puzzleDifficulty}`
  puzzlesList.appendChild(li)
}

displayPuzzles()

}) //END OF DOMCONTENTLOAD
