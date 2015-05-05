/*function TicTacToe(size) {
  this.board = [];
  for(var r=0; r < size; r++) {
    var row = [];
    for(var c = 0; c < size; c ++) {
      row.push(undefined);
    }
    board.push(row)
  }
}
TicTacToe.prototype.move = function(playerID, row, col) {
  if(typeof(this.board[row][col]) === 'undefined') {
    this.board[row][col] = playerID;
    return true;
  } else {
    return false;
  }
};*/

function getText (move) {
  if(move % 2) {
    return 'O';
  } else {
    return 'X';
  }
}
function checkWin (selector) {
  var board = $(selector);
  board.at = function(x, y) {
    return board.children(":nth-child(" + (y+1) + ")").children(" :nth-child(" + (x+1) + ")").html();
  };
  var middle = board.at(1, 1);
  var win = (middle &&
    ((board.at(0, 0) === middle && board.at(2, 2) === middle) ||
    (board.at(0, 2) === middle && board.at(2, 0) === middle)));
  for(var i = 0; i < 3; i++) {
    win = win || (
      (board.at(i, 0) && board.at(i, 0) === board.at(i, 1) && board.at(i, 1) === board.at(i, 2)) ||
      (board.at(0, i) && board.at(0, i) === board.at(1, i) && board.at(1, i) === board.at(2, i))
      );
  }
  return win;
}
function handleWin(boardSelector, logSelector, winner) {
  var board = $(boardSelector),
    log = $(logSelector);
  board.children().children('td').text('');
  var wins = parseInt(log.children('dd.' + winner).text());
  log.children('dd.' + winner).text(wins + 1);

}
function handleTie(boardSelector, logSelector) {
  var board = $(boardSelector),
    log = $(logSelector);
  board.children().children().html('');
  var ties = parseInt(log.children('dd.tie').text());
  log.children('dd.tie').text(ties + 1);

}
$(function(){
  var move = 0;
  $('.board').on('click', 'td', function(e){
    var target = e.target;
    if(target.innerHTML === ''){
      target.innerHTML = getText(move);
      if (checkWin('.board')) {
        handleWin('.board', '.log', getText(move));
        move = 0;
      } else {
        move++;
      }
      if(move === 9) {
        handleTie('.board', '.log');
      }
    }
  });
});
