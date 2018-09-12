let boards = []

class Board{

  constructor(canvas, numbers, start){
    let startArr = start.split("")
    startArr = startArr.map(function(elem){
      if(elem === '0'){
        return ""
      }
      else{
        return elem
      }
    })
    this.canvas = canvas
    this.panel = []
    this.originalBoard = []
    let index = 0
    for( let i = 0; i < 9;i++){
      let row = []
      let origin_row = []
      for( let j = 0; j < 9; j++){
        row.push(startArr[index])
        origin_row.push(startArr[index])
        index++
      }
      this.originalBoard.push(origin_row)
      this.panel.push(row)
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
          context.fillStyle = 'red'
          context.font = '43px arial';
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

}
