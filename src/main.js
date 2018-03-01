function createRow(label, data) {
  return `<tr><td>${label}</td><td>${data}</td></tr>`;
}

function unitToNumber(unit) {
  switch (unit) {
    case ("year", "years"):
      return 5;
    case ("day", "days"):
      return 4;
    case ("hour", "hours"):
      return 3;
    case ("minute", "minutes"):
      return 2;
    case ("second", "seconds"):
      return 1;
    default:
      return 0;
  }
}

function shorterTime(leftTime, rightTime) {
  let leftArray = leftTime.split(" ");
  let rightArray = rightTime.split(" ");
  let leftUnit = unitToNumber(leftArray[1]);
  let leftNumber = parseInt(leftArray[0]);
  let rightUnit = unitToNumber(rightArray[1]);
  let rightNumber = parseInt(rightArray[0]);
  if (leftUnit == rightUnit) {
    if (rightNumber < leftNumber) {
      return leftTime;
    }
    return rightTime;
  } else if (leftUnit > rightUnit) {
    return rightTime;
  } else {
    return leftTime;
  }
}

$(document).ready(() => {
  //let url = "https://www.myrentie.com/api/listings";
  //let url = "http://127.0.0.1:3000/api/listings";
  let url = "http://18.219.39.127/api/listings";
  $.ajax({
    url: url,
    type: "GET",
    success: json => {
      const data = json["data"];
      let rows = [];
      rows.push(createRow("Total number of listings", data.length));
      // console.log('Finding the most recent listing');
      rows.push(
        createRow(
          "Most recent listing",
          data.reduce((least, currentListing) => {
            const currentTime = currentListing["timeOnline"];
            if (shorterTime(least, currentTime) == currentTime) {
              return currentTime;
            }
            return least;
          }, "1000000 years")
        )
      );
      // console.log('Finding the oldest listing');
      rows.push(
        createRow(
          "Oldest listing",
          data.reduce((oldest, current) => {
            const currentTime = current["timeOnline"];
            if (shorterTime(currentTime, oldest) == oldest) {
              return currentTime;
            }
            return oldest;
          }, "0 0")
        )
      );
      
      const prices = data.map((listing) => {
        return parseFloat(listing["price"].replace(/,/g, '').replace(/\$/g,''));
      });
      
      let averagePrice = prices.reduce((sum, next) => sum + next) / prices.length;
      averagePrice = Math.round(averagePrice * 100) / 100;
      rows.push(createRow("Average price", '$' + averagePrice.toString()));

      let maxPrice = Math.round(Math.max(...prices) * 100) / 100;
      rows.push(createRow("Max price", '$' + maxPrice));

      let minPrice = Math.min(...prices.filter((price) => price > 10));
      rows.push(createRow("Minimum price", '$' + minPrice));

      const squareFeet = data.map((listing) => parseInt(listing['sqft']));

      let averageSquareFeet = squareFeet.reduce((sum, next) => sum + next) / squareFeet.length;
      averageSquareFeet = Math.round(averageSquareFeet * 100) / 100;
      rows.push(createRow("Average square footage", averageSquareFeet.toString() + '\''));

      let maxSquareFeet = Math.round(Math.max(...squareFeet) * 100) / 100;
      rows.push(createRow("Max square footage", maxSquareFeet.toString() + '\''));

      let minSquareFeet = Math.round(Math.min(...squareFeet) * 100) / 100;
      rows.push(createRow("Minimum square footage", minSquareFeet.toString() + '\''));

      $("#table").html('<table class="col s10 m6 l6 offset-s1 offset-m3 offest-l6 striped">'
      + rows.reduce((combinedString, current) => {
          return combinedString + current;
        }, "")
        + 
        '</table>'
      );

    },
    failure: result => console.log(result)
  });
});

import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
