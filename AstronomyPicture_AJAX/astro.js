$(document).ready(
    function () {
        $("#view_button").click(getPicture);
    });

function getPicture() {
    const url = "https://api.nasa.gov/planetary/apod";
    $.ajax({
        url: url,
        type: "GET",
        data: {
            api_key: "jAO2cx8ytq76HPcjaf205dAYrrF0TIA49zrO7piK",
            date: $("#date").val()
        },
        dataType: "json",
        "success": loadData,
        "error": noPicture
    });
};

function showPicture(data) {
    $("#pic").attr("src", data.url);
};

function noPicture(error) {
    alert(error.responseText);
};

function showTitle(data) {
    $("#title").append(data.title);
};

function loadData(data) {
    showPicture(data);
    showTitle(data);
};