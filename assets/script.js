$(document).ready(function () {
    var gifs = ["cats", "cute animals", "dogs", "funny", "cartoons"];

    function renderButtons() {
        $("#gif-buttons").empty();
        for (i = 0; i < gifs.length; i++) {
            $("#gif-buttons").append("<button class = 'btn btn-success' data-gif='" + gifs[i] + "'>" + gifs[i] + "</button>");
        }
    }

    renderButtons();

    $("add-gif").on("click", function () {
        event.preventDefault();
        var gif = $("#gif-input").val().trim();
        gifs.push(gif);
        renderButtons();
        return;
    });

    $("button").on("click", function () {
        var gif = $(this).attr("data-gif");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=10"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            var results = response.data;
            $("#gifs").empty();
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                var p = $("<p>").text("rating: " + results[i].rating);
                var gifImg = $("<img>");
                gifImg.attr("src",results[i].images.fixed_height.url);

                gifDiv.prepend(p);
                gifDiv.prepend(gifImg);
                $("#gifs").prepend(gifDiv);
            }
        })
    })
})