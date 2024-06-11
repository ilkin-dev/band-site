import { BandSiteApi } from './band-site-api.js';

class Show {
    constructor(id, date, place, location) {
        this.id = id;
        this.date = date;
        this.place = place;
        this.location = location;
    }
}

const table = document.getElementsByClassName("shows__table")[0];

const tableMobile = document.getElementsByClassName("shows__table--mobile")[0];

document.addEventListener("DOMContentLoaded", async function () {
    try {
        let bandSiteApi = new BandSiteApi("");
        bandSiteApi.apiKey = await bandSiteApi.register();

        const showsData = await bandSiteApi.getShows();

        console.log(showsData);

        showsData.forEach(show => {
            let elements = createShowLayout();

            console.log(elements);

            elements[0].date.textContent = getFormattedDate(show.date);
            elements[0].place.textContent = show.place;
            elements[0].location.textContent = show.location;

            elements[1].date.textContent = getFormattedDate(show.date);
            elements[1].place.textContent = show.place;
            elements[1].location.textContent = show.location;
        });
    } catch (error) {
        console.error('Error:', error);
    }
});

function createShowLayout() {
    let date = "";
    let place = "";
    let location = "";

    let dateForMobile = "";
    let placeForMobile = "";
    let locationForMobile = "";


    //LAPTOP

    let newDataRow = document.createElement("tr");
    newDataRow.className = "shows__dataRow";

    date = document.createElement("td");
    date.className = "shows__dataRow-item date";

    place = document.createElement("td");
    place.className = "shows__dataRow-item";

    location = document.createElement("td");
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
    newDataRow.append(place);
    newDataRow.append(location);
    newDataRow.append(newItemForButton);

    newItemForButton.append(buttonContainer);

    buttonContainer.append(button);

    table.append(divider);
    table.append(divider2);
    table.append(divider3);
    table.append(divider4);


    //MOBILE

    let showContainer = document.createElement("div");
    showContainer.className = "show__container";

    let showDetailContainer1 = document.createElement("div");
    showDetailContainer1.className = "show__detailContainer";

    let showDetailLabel1 = document.createElement("p");
    showDetailLabel1.className = "show__detailLabel";
    showDetailLabel1.textContent = "DATE";

    dateForMobile = document.createElement("p");
    dateForMobile.className = "show__detail date";

    let showDetailContainer2 = document.createElement("div");
    showDetailContainer2.className = "show__detailContainer";

    let showDetailLabel2 = document.createElement("p");
    showDetailLabel2.className = "show__detailLabel";
    showDetailLabel2.textContent = "PLACE";


    placeForMobile = document.createElement("p");
    placeForMobile.className = "show__detail";

    let showDetailContainer3 = document.createElement("div");
    showDetailContainer3.className = "show__detailContainer";

    let showDetailLabel3 = document.createElement("p");
    showDetailLabel3.className = "show__detailLabel";
    showDetailLabel3.textContent = "LOCATION";

    locationForMobile = document.createElement("p");
    locationForMobile.className = "show__detail";

    let showButtonContainer = document.createElement("div");
    showButtonContainer.className = "show__buttonContainer";

    let showButton = document.createElement("button");
    showButton.className = "blackButton";
    showButton.textContent = "BUY TICKETS";

    let dividerForMobile = document.createElement("div");
    dividerForMobile.className = "divider";

    tableMobile.append(showContainer);

    showContainer.append(showDetailContainer1);
    showDetailContainer1.append(showDetailLabel1);
    showDetailContainer1.append(dateForMobile);

    showContainer.append(showDetailContainer2);
    showDetailContainer2.append(showDetailLabel2);
    showDetailContainer2.append(placeForMobile);

    showContainer.append(showDetailContainer3);
    showDetailContainer3.append(showDetailLabel3);
    showDetailContainer3.append(locationForMobile);

    showContainer.append(showButtonContainer);
    showButtonContainer.append(showButton);

    tableMobile.append(divider);

    return [{ date: date, place: place, location: location },
    { date: dateForMobile, place: placeForMobile, location: locationForMobile }
    ];
}


function isMobileDevice() {
    return window.innerWidth <= 768;
}

function getFormattedDate(timestamp) {
    const date = new Date(timestamp);

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayOfWeek = daysOfWeek[date.getUTCDay()];
    const month = monthsOfYear[date.getUTCMonth()];
    const day = String(date.getUTCDate()).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${dayOfWeek} ${month} ${day} ${year}`;
}