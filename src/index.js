

document.addEventListener("DOMContentLoaded", ()=>{
  console.log("loaded")
  let canvas = document.getElementById("board-canvas")
  let board = new Board(canvas)
  board.render()
  canvas.addEventListener("click", (e)=>{
    console.log(e)
  })
})
