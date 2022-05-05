var frames;
var playing = false;
var isCustom = false;
var interval = null;
var speed = 250;
var selectAnimationIndex = 0;

function toggleElementDisable(elementId, toggleValue) {
    document.getElementById(elementId).disabled = toggleValue;
}



function customDisplay() {
    var selectedAnims = document.getElementById("display").value;
    if (selectedAnims.split("=====\n").length > 0) {
        this.frames = selectedAnims.split("=====\n");
    }
    else {
        this.frames = selectedAnims.split("=====\\n");
    }
    document.getElementById("display").innerHTML = selectedAnims
}

function animateIt(el) {
    if (el.value === 'Custom') {
        alert('You can write your own animation and can Play it!');
        this.isCustom = true;
    }

    this.playing = false;
    document.getElementById("display").readOnly = !this.isCustom;
    this.selectAnimationIndex = 0;

    toggleElementDisable("start", false);
    toggleElementDisable("stop", true);

    var selectedAnims = ANIMATIONS[el.value];
    this.frames = selectedAnims.split("=====\n");
    document.getElementById("display").value = selectedAnims;
}


function playFrames() {
    if (this.isCustom && this.frames === '') {
        customDisplay();
    }
    this.interval = setInterval(function () {
        if (this.playing) {
            this.selectAnimationIndex = this.selectAnimationIndex === this.frames.length ? 0 : this.selectAnimationIndex;
            var perFrame = this.frames[this.selectAnimationIndex++];
            document.getElementById("display").value = perFrame;
        }
        else {
            clearInterval(this, interval);
        }
    }, this.speed);
}

function startAnim(el) {
    this.playing = true;
    el.disabled = true;
    document.getElementById("stop").disabled = false;
    document.getElementById("animation").disabled = true;
    document.getElementById("display").readOnly = true;

    playFrames();

}

function stopAnim(el) {
    this.playing = false;
    el.disabled = true;
    toggleElementDisable("start", false);
    toggleElementDisable("animation", false);
    document.getElementById("display").readOnly = false;
}

function fontChanged(el) {
    document.getElementById("display").style.fontSize = el.value;
}

function speedChanged(el) {
    this.speed = el.checked ? 45 : 250;
    clearTimeout(this.interval);
    playFrames();
}




var animArray10 = [
    ">   ",
    " >  ",
    "  > ",
    "   >",
    "   <",
    "  < ",
    " <  ",
    "<   "
];

var EXERCISE =
    "  o\n" +
    " /#\\\n" +
    " _|_\n" +
    "=====\n" +
    " \\o/\n" +
    "  #\n" +
    "_/ \\_\n";

function ASCIIAnimation(animArray, speed, DOMtarget) {
    var currentFrame = 0;
    for (var i = 0; i < animArray.length; i++) {
        animArray[i] = animArray[i].replace(/ /g, "&nbsp;");
        animArray[i] = "<pre>" + animArray[i] + "</pre>";
    }
    DOMtarget.innerHTML = animArray[0];
    currentFrame++;
    this.animation = setInterval(function () {
        DOMtarget.innerHTML = animArray[currentFrame];
        currentFrame++;
        if (currentFrame >= animArray.length) currentFrame = 0;
    }, speed);
    this.getCurrentFrame = function () {
        return currentFrame;
    }
}

ASCIIAnimation.prototype.stopAnimation = function () {
    clearInterval(this.animation);
}

// EXAMPLES //

// (EXTRA STREAMLINING FLUFF FOR EXAMPLES)
document.body.style.textAlign = "center";
document.body.innerHTML = "<br /><br /><h1>ASCII animations are fun!</h1>";

function makeDiv() { return document.createElement("div"); }
function bodyAppend(element) { document.body.appendChild(element); }

//EX1:
var div1 = makeDiv();
bodyAppend(div1);
var animArray1 = [
    ">   ",
    " >  ",
    "  > ",
    "   >",
    "   <",
    "  < ",
    " <  ",
    "<   "
];

var anim1 = new ASCIIAnimation(animArray1, 500, div1);

//EX2:
var div2 = makeDiv();
bodyAppend(div2);
div2.style.fontFamily = "monospace";
var animArray2 = ["///", "|||", "\\\\\\", "|||"];

var anim2 = new ASCIIAnimation(animArray2, 100, div2);

//EX3:
var div3 = makeDiv();
bodyAppend(div3);
div3.style.fontFamily = "monospace";
var animArray3 = [".(^-^)'", "-(^-^)-", "'(^-^).", "-(^o^)-", ".(^-^)'", "-(^-^)-", "'(^-^).", "-(^-^)-"];

var anim3 = new ASCIIAnimation(animArray3, 125, div3);

//EX4:
var div4 = makeDiv();
bodyAppend(div4);
div4.style.fontFamily = "monospace";
var animArray4 = [
    "[>    ]",
    "[>>   ]",
    "[>>>  ]",
    "[ >>> ]",
    "[  >>>]",
    "[   >>]",
    "[    >]",
    "[     ]"
];

var anim4 = new ASCIIAnimation(animArray4, 50, div4);

//EX5:
var div5 = makeDiv();
div5.style.height = "100px";
bodyAppend(div5);
var animArray5 = [
    "+--+\n" +
    "|> |\n" +
    "|  |\n" +
    "+--+",
    "+--+\n" +
    "| >|\n" +
    "|  |\n" +
    "+--+",
    "+--+\n" +
    "| v|\n" +
    "|  |\n" +
    "+--+",
    "+--+\n" +
    "|  |\n" +
    "| v|\n" +
    "+--+",
    "+--+\n" +
    "|  |\n" +
    "| <|\n" +
    "+--+",
    "+--+\n" +
    "|  |\n" +
    "|< |\n" +
    "+--+",
    "+--+\n" +
    "|  |\n" +
    "|^ |\n" +
    "+--+",
    "+--+\n" +
    "|^ |\n" +
    "|  |\n" +
    "+--+",
];

var anim5 = new ASCIIAnimation(animArray5, 1000, div5);