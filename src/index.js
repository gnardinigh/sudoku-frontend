document.addEventListener("DOMContentLoaded", function() {

const formContainer = document.getElementById('form-container')

const checkPuzzleButton = document.getElementById('check-puzzle')


displayPuzzle(puzzleId)

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

})

function checkIfBlank(){
  let clickedNumber = currBoard.originalBoard[currCol][currRow]
  return clickedNumber === ""
  }

function createForm(){
  let input = `<input id="number" type="text" autofocus="autofocus" name="number" value="" maxlength="1" pattern="[1-9]"><br> <input type="submit" value="Submit"> `
  numberInput.innerHTML = input
}

 //To be moved to function used when user finishes puzzle

checkPuzzleButton.addEventListener("click", function(event){
  currBoard.renderAndCheck()
})


const viewPuzzlesBtn = document.getElementById("view-puzzles-button")
const viewPuzzles = document.getElementById("view-puzzles")

viewPuzzlesBtn.addEventListener("click", function(event){
  displayPuzzles()
})


const puzzlesContainer = document.getElementById("puzzles-container")
puzzlesContainer.addEventListener("click", function(event){
  if(puzzleId === parseInt(event.target.id)){
    alert("You're already on this Suduko!")
  }
  else{
    puzzleId = parseInt(event.target.id)
    displayPuzzle(puzzleId)
  }
})

function displayPuzzles(){
  fetch(`http://localhost:3000/api/v1/puzzles`).then(res => res.json()).then(function(puzzles){
    viewPuzzles.innerHTML = ""
    puzzles.forEach(function(puzzle){
      let HtmlToAdd = `<a id='${puzzle.id}'> ${puzzle.id} (${puzzle.difficulty}) </a>`
      viewPuzzles.innerHTML += HtmlToAdd
    })
    viewPuzzles.innerHTML += `<br><br>`
  })

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
