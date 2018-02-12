$(document).ready(() => {
  $("#weatherSubmit").click(event => {
    event.preventDefault();
    let value = $("#weatherInput").val();
    console.log(value);
    let apiKey = "ce6211f23345783e46d6763ebf390a83";
    let myurl =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      value +
      ",US&units=imperial" +
      "&APPID=" +
      apiKey;
    $.ajax({
      url: myurl,
      dataType: "json",
      success: function(json) {
        let results = "";
        results += "<h2>Weather in " + json.name + "</h2>";
        for (let i = 0; i < json.weather.length; i++) {
          results +=
            '<img src="http://openweathermap.org/img/w/' +
            json.weather[i].icon +
            '.png"/>';
        }
        results += "<h2>" + json.main.temp + " &deg;F</h2>";
        results += "<p>";
        for (let i = 0; i < json.weather.length; i++) {
          results += json.weather[i].description;
          if (i !== json.weather.length - 1) results += ", ";
        }
        results += "</p>";
        $("#weatherResults").html(results);
      }
    });
  });
  $("#questionSubmit").click(event => {
    event.preventDefault();
    let question = $("#question").val();
    let url =
      "https://api.stackexchange.com//2.2/search?&order=desc&sort=activity&intitle=" +
      question +
      "&site=stackoverflow";
    $.ajax({
      url: url,
      dataType: "json",
      success: json => {
        const items = json["items"];
        result = items.reduce((result, current) => {
          return (
            result +
            '<div class="divider"></div><p><a href="' +
            current["link"] +
            '" >' +
            current["title"] +
            "</a></p>\n"
          );
        }, "");
        $("#answers").html(result);
      }
    });
  });
  $("#weather-tab").click(event => {
    $("#stackoverflow").css("display", "none");
    $("#weather").css("display", "inherit");
  });
  $("#stack-tab").click(event => {
    $("#stackoverflow").css("display", "inherit");
    $("#weather").css("display", "none");
  });
});
