var state = "idle";

$(document).ready(function () {
    console.log("document ready!");

    $("#start")
        .on("click", function () {
            console.log("Start");
            resetState();
        })
        .on("mouseenter", function () {
            if (state == "in_game") {
                updateStatus("You need to go forward! ");
            }
        })
        .on("mouseleave", function () {
            if (state == "reset") {
                state = "in_game";
                updateState();
            }
        });

    $("#end")
        .on("click", function () {
            state = "won";
            updateState();
        })
        .on("mouseenter", function () {
            if (state == "in_game") {
                state = "won";
                updateState();
            }
        });

    $("#maze")
        .on("mouseleave", function () {
            console.log("maze mouse leaving ...");
            console.log("maze state: " + state);
            if (state == "in_game") {
                state = "out_range";
                updateState();
            }
        });

    $("div.boundary")
        .on("mouseenter", function () {
            console.log("mouseenter " + state);
            if (state == "in_game") {
                state = "lose";
                updateState();
            }
        });

    function resetState() {
        state = "reset";
        updateState();
    }

    function updateState() {
        console.log("updating state: " + state);
        switch (state) {
            case "reset":
                updateStatus("Game started!");
                state = "in_game";
                setTimeout(function () {
                    updateState();
                }, 1000);
                $(".boundary").removeClass("youlose");
                break;

            case "in_game":
                console.log("KEEP GOING");
                updateStatus("Keep going! ");
                break;

            case "out_range":
                console.log("OUT OF RANGE, LOSING");
                $(".boundary").addClass("youlose");

                updateStatus("Out of range!");
                setTimeout(function () {
                    updateStatus("You lose! ");
                }, 1000);
                break;

            case "lose":
                console.log("LOSING");
                if (!$(".boundary").hasClass("youlose")) {
                    updateStatus("Bumped your head!");
                }
                setTimeout(function () {
                    updateStatus("You lose!");
                }, 500);
                $(".boundary").addClass("youlose");
                break;

            case "won":
                console.log("WINNING");
                $(".boundary").removeClass("youlose");

                updateStatus("Hurray!!!");
                setTimeout(function () {
                    updateStatus("You win!");
                }, 1000);

                const jsConfetti = new JSConfetti()
                jsConfetti.addConfetti()
                break;

            default:

                break;
        }
    }

    function updateStatus(status) {
        $("#status").text(status);
    }
});