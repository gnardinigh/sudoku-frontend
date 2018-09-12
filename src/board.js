

class Board{

  constructor(canvas, game){
    this.canvas = canvas
    this.panel = []
    for( let i = 0; i < 9;i++){
      let row = []
      for( let j = 0; j < 9; j++){
        row.push(parseInt(Math.random()*10))
      }
      this.panel.push(row)
    }
    this.game = game
  }

  renderNumbers(){

  }
  render(){
    let height = this.canvas.height
    let width = this.canvas.width
    let h = this.canvas.height/9
    let w = this.canvas.width/9

    let context = this.canvas.getContext("2d");
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
        context.font = '48px serif';
        context.fillText(num, i*w+15, j*h+45);
      })
    })
  }

  click(x, y){

  }
}
