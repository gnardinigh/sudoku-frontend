
let puzzleId;
puzzleId = 5;

const userFormInput = document.getElementById("user-input")
const timer = document.getElementById('timer-display')

let secondLimit = 600

let interval = setInterval(function(){ myTimer() }, 1000);

function myTimer() {
  timer.innerHTML = `${secondLimit}`
  secondLimit = secondLimit  - 1;
}

userFormInput.addEventListener("submit", function(event){
  event.preventDefault()
  let name = document.getElementById("name-input").value
  let score = secondLimit
  createNewUser(name)
  createNewScore(name, function(user_id, puzzle_id){
    fetch(`http://localhost:3000/api/v1/scores`,
    {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({points: secondLimit, user_id: user_id, puzzle_id: puzzle_id})
    })
  })
  // createNewScore(user, score, puzzle_id)
})

function createNewUser(username){
  fetch(`http://localhost:3000/api/v1/users`,
  {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  method: "POST",
  body: JSON.stringify({name: username})
  })
}

function createNewScore(name, callback){
  fetch(`http://localhost:3000/api/v1/users`).then(res => res.json()).then(function(users){
    user_id = users.length + 1
    puzzle_id = puzzleId
    callback(user_id, puzzle_id)
  })
}

let boards = []

class Board{

  constructor(canvas, numbers, start){
    let blanksCounter = 0
    let answers = numbers.split("")
    let startArr = start.split("")
    startArr = startArr.map(function(elem){
      if(elem === '0'){
        blanksCounter++
        return ""
      }
      else{
        return elem
      }
    })
    this.blankSpaces = blanksCounter
    this.canvas = canvas
    this.panel = []
    this.originalBoard = []
    this.answerKey = []
    this.checkedTracker = []
    let index = 0
    for( let i = 0; i < 9;i++){
      let row = []
      let origin_row = []
      let answer_row = []
      let checkTracker_row = []
      for(let j = 0; j < 9; j++){
        row.push(startArr[index])
        origin_row.push(startArr[index])
        answer_row.push(answers[index])
        checkTracker_row.push(0)
        index++
      }
      this.originalBoard.push(origin_row)
      this.panel.push(row)
      this.answerKey.push(answer_row)
      this.checkedTracker.push(checkTracker_row)
    }

    boards.push(this)
  }


  render(){

    let height = this.canvas.height
    let width = this.canvas.width

    let h = this.canvas.height/9
    let w = this.canvas.width/9

    let context = this.canvas.getContext("2d");
    context.clearRect(0, 0, width, height)
    for( let i = 0; i<=9; i++){
      context.beginPath();
      context.moveTo(0, i*h)
      context.lineTo(width, i*h);
      context.moveTo(i*w, 0)
      context.lineTo(i*w, height);
      if( i %3 == 0){
        context.lineWidth = 5
        context.stroke()
      }
      else{
        context.lineWidth = 1
        context.stroke()
      }
    }

    let panel = this.panel
    panel.forEach((row,i)=>{
      row.forEach((num, j)=>{
        if(!this.checkIfInput(i,j)){
          if(this.checkedTracker[i][j] === 0){
            context.fillStyle = 'yellow'
            context.font = '43px arial';
          }
          else if(this.checkedTracker[i][j] === 1){
            context.fillStyle = 'red'
            context.font = '43px arial';
          }
          else {
            context.fillStyle = 'green'
            context.font = '43px arial';
          }
        }
        else {
          context.fillStyle = 'black'
          context.font = '48px serif';
        }
        context.fillText(num, i*w+15, j*h+45);
      })
    })
  }

  checkIfInput(i,j){
    return this.panel[i][j] === this.originalBoard[i][j]
  }

  renderAndCheck(){
    let height = this.canvas.height
    let width = this.canvas.width

    let h = this.canvas.height/9
    let w = this.canvas.width/9

    let context = this.canvas.getContext("2d");
    context.clearRect(0, 0, width, height)
    for( let i = 0; i<=9; i++){
      context.beginPath();
      context.moveTo(0, i*h)
      context.lineTo(width, i*h);
      context.moveTo(i*w, 0)
      context.lineTo(i*w, height);
      if( i %3 == 0){
        context.lineWidth = 5
        context.stroke()
      }
      else{
        context.lineWidth = 1
        context.stroke()
      }
    }

    let panel = this.panel
    panel.forEach((row,i)=>{
      row.forEach((num, j)=>{
        if(!this.checkIfInput(i,j)){
          if(this.checkIfCorrect(i,j)){
            this.checkedTracker[i][j] = 2
            context.fillStyle = 'green'
            context.font = '43px arial';
          }
          else {
            this.checkedTracker[i][j] = 1
            context.fillStyle = 'red'
            context.font = '43px arial';
          }
        }
        else {
          context.fillStyle = 'black'
          context.font = '48px serif';
        }
        context.fillText(num, i*w+15, j*h+45);
      })
    })
    if(this.puzzleComplete()){
      this.createUserForm()
    }
  }

  checkIfCorrect(i,j){
    return this.panel[i][j] === this.answerKey[i][j]
  }

  puzzleComplete(){
    let sum = 0
    this.checkedTracker.forEach(function(arr){
      arr.forEach(num => sum += num)
    })

    return sum === (this.blankSpaces * 2)
  }

  createUserForm(){
    let input = `<input id="name-input" type="text" autofocus="autofocus" name="name" value="" "><br><input type="submit" value="Submit"> `
    userFormInput.innerHTML = `Congrats! Please submit your name.<br>`
    userFormInput.innerHTML += input
  }

}
