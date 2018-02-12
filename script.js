function createRow(label, data) {
  return `<tr><td>${label}</td><td>${data}</td></tr>`;
}

function unitToNumber(unit) {
  switch(unit) {
    case "year", "years":
      return 5;
    case "day", "days":
      return 4;
    case "hour", "hours":
      return 3;
    case "minute", "minutes":
      return 2;
    case "second", "seconds":
      return 1;
    default:
      return 0;
  }
  
}

function shorterTime(shorterTime, longerTime) {
  let shorterArray = shorterTime.split(" ");
  let longerArray = longerTime.split(" ");
  let shorterUnit = unitToNumber(shorterArray[1]);
  let shorterNumber = parseInt(shorterArray[0]);
  let longerUnit = unitToNumber(longerArray[1]);
  let longerNumber = parseInt(longerArray[0]);
  if (shorterUnit === longerUnit) {
    if (longerNumber > shorterNumber) {
      return shorterTime
    }
    return longerTime;
  } else if (shorterUnit > longerUnit) {
    return longerTime;
  } else {
    return shorterTime;
  }
}

$(document).ready(() => {
  let url = "https://www.myrentie.com/api/listings";
  $.ajax({
    url: url,
    dataType: "json",
    success: json => {
      const data = json["data"];
      let rows = [];
      rows.push(createRow("Total number of listings", data.length));

      rows.push(createRow("Most recent listing",
       data.reduce((least, currentListing) => {
        const currentTime = currentListing["timeOnline"];
        if (shorterTime(least, currentTime)) {
          return least;
        }
        return currentTime;
       }, "1000000 years")));

      rows.push(createRow("Oldest listing", 
        data.reduce((oldest, current) => {
          const currentTime = currentListing["timeOnline"];
          if (shorterTime(currentTime, oldest)) {
            return oldest;
          }
          return currentTime;
        }), "0 0"));

      rows.push(createRow("Average price", 
        data.reduce((sum, currentListing) => {
          // Slice of dollar sign
          return sum + parseInt(currentListing["price"].slice(1));
        }, 0)/data.length))
      $("#table").html(result);
    }
  });
});
