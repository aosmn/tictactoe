$(document).ready(function(){
  let grid = [['','',''],['','',''],['','','']];

  let playerToken = 'x';
  let computerToken = 'o';


  $(".reset").click(e=>{
    resetGame();
  });

  $(".btn").click(e=>{
    playerToken = $(e.target).data("token");
    computerToken = playerToken == "x" ? "o" : "x";
    $(".selectToken").addClass("hideAll").removeClass("showAll");
  });

  $("td").click(e=>{
    if(!$(e.target).hasClass("full")){
      $(".selectToken").addClass("hideAll").removeClass("showAll");

      $(".reset").show();
      $(".reset").addClass("showAll").removeClass("hideAll");

      updateGrid($(e.target), playerToken);
      $(e.target).html(playerToken).addClass(playerToken).addClass("full");
      let gameState = isGameOver(grid);

      if(gameState || gameState===null){
        $("td").addClass("full");
        const winner = gameState === null ? "It's a tie !" : " won the game !";
        $(".winText").html(winner);
        $(".winner").html(gameState).addClass(gameState);
        $(".whoWon").addClass("showAll").removeClass("hideAll");
        $(".reset").addClass("hideAll").removeClass("showAll");
        setTimeout(function(){
          $(".reset").hide();
        },1000);
        setTimeout(function(){
          $(".reset").hide();
          $("table").addClass("hideAll").removeClass("showAll");
        },2000);
        setTimeout(function(){
          $(".whoWon").addClass("hideAll").removeClass("showAll");
        },3500);
        setTimeout(resetGame,3000);
      } else {
        fillAI();
        gameState = isGameOver(grid);
        if(gameState || gameState===null){
          $("td").addClass("full");

          const winner = gameState === null ? "It's a tie !" : " won the game!";
          $(".winText").html(winner);
          $(".winner").html(gameState).addClass(gameState);
          $(".whoWon").addClass("showAll").removeClass("hideAll");
          $(".reset").addClass("hideAll").removeClass("showAll");

          setTimeout(function(){
            $(".reset").hide();
          },1000);
          setTimeout(function(){
            $("table").addClass("hideAll").removeClass("showAll");
          },2000);
          setTimeout(function(){
            $(".whoWon").addClass("hideAll").removeClass("showAll");
          },3700);
          setTimeout(resetGame,4000);
        }
      }
    }

    // $(e.target).html("X");
  });

  function resetGame(){
    $(".full").removeClass("full");
    $(".x").removeClass("x");
    $(".o").removeClass("o");
    $("td").html("");
    $(".winText").html("");
    $(".winner").html("");
    grid = [['','',''],['','',''],['','','']];
    $(".reset").hide();
    $(".selectToken").addClass("showAll").removeClass("hideAll");
    $("table").addClass("showAll").removeClass("hideAll");
  }

  function fillAI(){
    let ij = minmax(grid, 0, computerToken);
    let selected = $(".row" + ij.i + " .col" + ij.j);
    selected.html(computerToken).addClass(computerToken).addClass("full");
    updateGrid(selected, computerToken);
  }

  function isGameOver(thisGrid){
      for(var i=0; i<3; i++){
        let row = thisGrid[i];
        if(row[0] != "" && row[0] == row[1] && row[1] == row[2])
          return row[0];
      }
      for(var j=0; j<3; j++){
        if(thisGrid[0][j] != "" && thisGrid[0][j] == thisGrid[1][j] && thisGrid[1][j] == thisGrid[2][j])
          return thisGrid[0][j];
      }

      if((thisGrid[1][1] != "" && thisGrid[0][0] == thisGrid[1][1] && thisGrid[1][1] == thisGrid[2][2]) || (thisGrid[1][1] != "" && thisGrid[0][2] == thisGrid[1][1] && thisGrid[1][1] == thisGrid[2][0])){
        return thisGrid[1][1];
      }

      for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
          if(thisGrid[i][j] == ""){
            return false
          }
        }
      }

      return null;
  }

  function updateGrid(el,token){
    const i = el.data("i");
    const j = el.data("j");
    grid[i][j] = token;
  }

  function cloneGrid(theGrid){
    let veryNewGrid = [];
    for(let i = 0; i < 3; i++){
      let row = [];
      for(let j = 0; j < 3; j++){
        row.push(theGrid[i][j]);
      }
      veryNewGrid.push(row);
    }
    return veryNewGrid;
  }

  function minmax(newGrid, depth, player){
    const gridState = isGameOver(newGrid);
    if(gridState === false){// tie
        const values = [];
        for(var i = 0; i < 3; i++){
          for(var j = 0; j < 3; j++){
            const gridCopy = cloneGrid(newGrid);
            if(gridCopy[i][j] !== "") continue;
            gridCopy[i][j] = player;
            const value = minmax(gridCopy, depth+1, player == playerToken ? computerToken : playerToken);
            values.push({cost: value, cell: {i:i,j:j}});
          }
        }
        if(player == computerToken){
          const max = _.maxBy(values, r => {return r.cost});
          if(depth == 0){
            return max.cell;
          } else {
            return max.cost;
          }
        } else {
          const min = _.minBy(values, r=>{return r.cost});;
          if(depth == 0){
            return min.cell;
          } else {
            return min.cost;
          }
        }
    } else if(gridState === null){
      return 0;
    } else if(gridState === playerToken){
      return depth - 10;
    } else if(gridState === computerToken){
        return 10 - depth;
    }
  }
});
