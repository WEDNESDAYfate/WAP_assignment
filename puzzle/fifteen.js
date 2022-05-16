$(document).ready(function () {
  function init() {
    $("#puzzlearea div").each(function (i, div) {
      var x = (i % 4) * 100;
      var y = Math.floor(i / 4) * 100;

      $(div).addClass("puzzlepiece");
      $(div).css("left", x + "px");
      $(div).css("top", y + "px");
      $(div).css("backgroundImage", 'url("background.jpeg")');
      $(div).css("backgroundPosition", -x + "px " + -y + "px");
      div.x = x;
      div.y = y;
    });
  }

  var canMove = function (el) {
    let distanceX = Math.abs(el.x - blank.x);
    let distanceY = Math.abs(el.y - blank.y);
    return distanceX + distanceY == 100;
  };

  var moveTo = function (el, x, y) {
    if (canMove(el)) {
      el.style.left = x + "px";
      el.style.top = y + "px";

      $(el).animate({ left: x + "px", top: y + "px" }, 70);

      blank.x = el.x;
      blank.y = el.y;
      el.x = x;
      el.y = y;
    }
    return false;
  };

  let newPos = function () {
    let directions = [
      [1, 0],
      [0, -1],
      [-1, 0],
      [0, 1],
    ];
    let isFound = false;

    while (!isFound) {
      let index = Math.floor(Math.random() * 4);
      let newX = directions[index][0] * 100 + blank.x;
      let newY = directions[index][1] * 100 + blank.y;
      if (newX >= 0 && newY >= 0 && newX <= 300 && newY <= 300) {
        isFound = true;
        return {
          x: newX,
          y: newY,
        };
      }
    }
  };

  var blank = { x: 300, y: 300 };
  init();

  $("#puzzlearea div").hover(
    function () {
      if (canMove(this)) {
        $(this).addClass("movablepiece");
        newPos();
      }
    },
    function () {
      $(this).removeClass("movablepiece");
    }
  );

  $("#puzzlearea div").click(function (e) {
    e.preventDefault();
    if (canMove(this)) {
      moveTo(this, blank.x, blank.y);
    }
  });

  $("#shufflebutton").click(function (e) {
    e.preventDefault();
    for (let i = 0; i < 100; ++i) {
      setTimeout(shuffleIt, 30);
    }
  });

  let shuffleIt = function () {
    let pos = newPos();
    $("#puzzlearea div").each(function () {
      if (this.x == pos.x && this.y == pos.y) {
        moveTo(this, blank.x, blank.y);
      }
    });
  };
});
