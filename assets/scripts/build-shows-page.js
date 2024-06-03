class Show {
    constructor(date, venue, location) {
        this.date = date;
        this.venue = venue;
        this.location = location;
    }
}

let dataArray = [
    new Show("Mon Sept 09 2024", "Ronald Lane", "San Francisco, CA"),
    new Show("Tue Sept 17 2024", "Pier 3 East", "San Francisco, CA"),
    new Show("Sat Oct 12 2024", "View Lounge", "San Francisco, CA"),
    new Show("Sat Nov 16 2024", "Hyatt Agency", "San Francisco, CA"),
    new Show("Fri Nov 29 2024", "Moscow Center", "San Francisco, CA"),
    new Show("Wed Dec 18 2024", "Press Club", "San Francisco, CA"),
]

const table = document.getElementsByClassName("shows__table")[0];

const tableMobile = document.getElementsByClassName("shows__table--mobile")[0];

document.addEventListener("DOMContentLoaded", function () {


    dataArray.forEach(show => {
        let elements = createShowLayout();

        elements.date.textContent = show.date;
        elements.venue.textContent = show.venue;
        elements.location.textContent = show.location;
    });
});

function createShowLayout() {
    let newDataRow = document.createElement("tr");
    newDataRow.className = "shows__dataRow";

    let date = document.createElement("td");
    date.className = "shows__dataRow-item date";

    let venue = document.createElement("td");
    venue.className = "shows__dataRow-item";

    let location = document.createElement("td");
    location.className = "shows__dataRow-item";

    let newItemForButton = document.createElement("td");
    newItemForButton.className = "shows__dataRow-item";

    let buttonContainer = document.createElement("div");
    buttonContainer.className = "shows__dataRow-buttonContainer";

    let button = document.createElement("button");
    button.className = "shows__dataRow-button blackButton";
    button.textContent = "BUY TICKETS";

    let divider = document.createElement("td");
    divider.className = "divider";

    let divider2 = document.createElement("td");
    divider2.className = "divider";

    let divider3 = document.createElement("td");
    divider3.className = "divider";

    let divider4 = document.createElement("td");
    divider4.className = "divider";

    table.append(newDataRow);

    newDataRow.append(date);
    newDataRow.append(venue);
    newDataRow.append(location);
    newDataRow.append(newItemForButton);

    newItemForButton.append(buttonContainer);

    buttonContainer.append(button);

    table.append(divider);
    table.append(divider2);
    table.append(divider3);
    table.append(divider4);

    return { date: date, venue: venue, location: location };
}


function isMobileDevice() {
    return window.innerWidth <= 768;
}