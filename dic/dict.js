var similarHeaderInserted = false;
var currentWord = "";

$(document).ready(function () {
  $("#word").focus();

  $(document).keydown(function (e) {
    var keycode = window.event ? event.keyCode : event.which;
    if (keycode == "13") {
      $("#word").val();
      searchWord();
    }
  });

  $("#search").on("click", function () {
    searchWord();
  });
});

function searchWordFromResult(wordToSearch) {
  $("#word").val(wordToSearch);
  searchWord(wordToSearch);
}

function searchWord(wordToSearch = null) {
  const word = wordToSearch ? wordToSearch : $("#word").val();
  currentWord = "";
  $("#result").empty();
  $("#pron").empty();
  $("#pron").removeClass("has-value");
  similarHeaderInserted = false;
  if (word && word != "") {
    currentWord = word;
    $.post("http://localhost:3000/search", { word: word })
      .done(function (data, status) {
        if (status == "success") {
          if (data.result != "") {
            responsiveVoice.speak(word);
            let pron = data.pron;
            let results = data.result;
            results.forEach((result) => {
              $("#result").append(
                $("<div>", {
                  html: wordFormatter(result),
                  class: "result",
                })
              );
            });
            $("#pron").addClass("has-value");
            $("#pron").append(
              $("<div>", {
                text: pron,
                class: "pron",
              })
            );
            var playButton = $("<button>", {
              text: "Play",
            });
            $("#pron").append(playButton);
            playButton.attr("id", "play");
            playButton.on("click", function () {
              console.log("playing");
              responsiveVoice.speak(word);
            });
            //   pron.forEach((pronounce) => {
            //     $("#pron").append(
            //       $("<div>", {
            //         text: pronounce,
            //         class: "pron",
            //       })
            //     );
            //   });
          } else {
            $("#result").append(
              $("<div>", {
                text: "NO RESULT",
                class: "no-result",
              })
            );
          }
          $("#word").select();
        } else {
          $("#result").append(
            $("<div>", {
              text: "Unable to Search! Server error",
              class: "no-result-error",
            })
          );
        }
      })
      .fail(function () {
        console.log("Server error");

        $("#result").append(
          $("<div>", {
            text: "SERVER ERROR, PLEASE CONTACT WITH ADMIN!",
            css: {
              margin: "10px",
              color: "#434211",
            },
          })
        );
      });
  } else {
    console.log("Empty search word ...");
  }
}

function wordFormatter(result) {
  var formatted = "";
  var searchedWord = $("#word").val();
  console.log("searching: " + searchedWord);
  var isSame =
    result.word.trim().toLowerCase() == searchedWord.trim().toLowerCase();
  formatted += !isSame
    ? `<span class="word" onClick="searchWordFromResult('` +
      result.word +
      `')">` +
      result.word +
      "</span>"
    : "";
  formatted +=
    `<span class="wordtype ${isSame ? "same" : "similar"}">` +
    result.wordtype +
    '</span><span class="desc">' +
    result.definition +
    "</span>";
  if (!similarHeaderInserted) {
    if (!isSame) {
      insertSimilarHeader();
    }
  }
  return formatted;
}
function insertSimilarHeader() {
  $("#result").append(
    $("<div>", {
      text: "Similar results",
      class: "similar-header",
    })
  );
  similarHeaderInserted = true;
}
