document.addEventListener("DOMContentLoaded", function() {

const canvas = document.getElementById("board-canvas")

const puzzlesUrl = `http://localhost:3000/api/v1/puzzles/`
const scoresUrl = `http://localhost:3000/api/v1/scores`
const usersUrl = `http://localhost:3000/api/v1/users`

const formContainer = document.getElementById('form-container')
const numberInput = document.getElementById('number-input')
const leaderboardContainer = document.getElementById('leaderboard')
const checkPuzzleButton = document.getElementById('check-puzzle')

let currRow;
let currCol;
let currBoard;


function displayPuzzle(id){
  debugger
  // let url = puzzlesUrl/${id}
  fetch(puzzlesUrl + id).then(res => res.json()).then(function(puzzle){
    let board = new Board(canvas, puzzle.numbers, puzzle.start)
    currBoard = board
    currBoard.render()
  })
}

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

function clearForm(){
  numberInput.innerHTML = ""
}

numberInput.addEventListener("submit", function(event){
  event.preventDefault()
  let input = document.getElementById("number").value
  currBoard.panel[currCol][currRow] = input
  currBoard.checkedTracker[currCol][currRow] = 0
  currBoard.render()
  clearForm()
})



function sortScores(scores){
  sortedScores = scores.sort(function(a,b){
    return b.points - a.points
  })
  return sortedScores
}


function getUserNames(sortedScores,callback){
  let leaderboard = [];
  fetch(usersUrl).then(res => res.json()).then(function(users){
    sortedScores.forEach(function(score){
      let name = users[score.user_id-1].name
      leaderboard.push({name: name, points: score.points})
    })
    callback(leaderboard)
  })

}


function getScores(callback){
  fetch(scoresUrl).then(res => res.json()).then(function(scoreList){
    let scores = scoreList.filter(score => score.puzzle_id === puzzleId)
    let sortedScores = sortScores(scores)
    getUserNames(sortedScores,callback)
  })
}

getScores((leaderboard)=>{
  counter = 1
  leaderboardContainer.innerHTML = `Leaderboard <br></br>`
  leaderboard.forEach((score)=>{
    leaderboardContainer.innerHTML += `${counter}.  `
    leaderboardContainer.innerHTML += score.name
    leaderboardContainer.innerHTML += `  `
    leaderboardContainer.innerHTML += score.points
    leaderboardContainer.innerHTML += `<br>`
    counter++
  })
}) //To be moved to function used when user finishes puzzle

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
  displayPuzzle(parseInt(event.target.id))
})

function displayPuzzles(){
  fetch(`http://localhost:3000/api/v1/puzzles`).then(res => res.json()).then(function(puzzles){
    viewPuzzles.innerHTML = ""
    puzzles.forEach(function(puzzle){
      let HtmlToAdd = `<a id='${puzzle.id}'> ${puzzle.id}  </a>`
      viewPuzzles.innerHTML += HtmlToAdd
    })
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
