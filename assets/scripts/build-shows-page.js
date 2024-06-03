import { BandSiteApi } from './band-site-api';

class Show {
    constructor(date, place, location) {
        this.date = date;
        this.place = place;
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

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const apiKeyResponse = await registerWithBandSiteApi();
        const apiKey = apiKeyResponse.api_key;

        const bandSiteApi = new BandSiteApi(apiKey);

        const showsData = await bandSiteApi.getShows();

        showsData.forEach(show => {
            let elements = createShowLayout();

            elements.date.textContent = show.date;
            elements.place.textContent = show.place;
            elements.location.textContent = show.location;
        });
    } catch (error) {
        console.error('Error:', error);
    }
});

async function registerWithBandSiteApi() {
    const response = await fetch('https://unit-2-project-api-25c1595833b2.herokuapp.com/register');
    if (!response.ok) {
        throw new Error('Failed to register with BandSite API');
    }
    return response.json();
}

function createShowLayout() {
    let date = "";
    let place = "";
    let location = "";

    if (!isMobileDevice()) {

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
    } else {
        let showContainer = document.createElement("div");
        showContainer.className = "show__container";

        let showDetailContainer1 = document.createElement("div");
        showDetailContainer1.className = "show__detailContainer";

        let showDetailLabel1 = document.createElement("p");
        showDetailLabel1.className = "show__detailLabel";

        date = document.createElement("p");
        date.className = "show__detail date";

        let showDetailContainer2 = document.createElement("div");
        showDetailContainer2.className = "show__detailContainer";

        let showDetailLabel2 = document.createElement("p");
        showDetailLabel2.className = "show__detailLabel";

        place = document.createElement("p");
        place.className = "show__detail";

        let showDetailContainer3 = document.createElement("div");
        showDetailContainer3.className = "show__detailContainer";

        let showDetailLabel3 = document.createElement("p");
        showDetailLabel3.className = "show__detailLabel";

        location = document.createElement("p");
        location.className = "show__detail";

        let showButtonContainer = document.createElement("div");
        showButtonContainer.className = "show__buttonContainer";

        let showButton = document.createElement("button");
        showButton.className = "blackButton";

        let divider = document.createElement("div");
        divider.className = "divider";

        tableMobile.append(showContainer);

        showContainer.append(showDetailContainer1);
        showDetailContainer1.append(showDetailLabel1);
        showDetailContainer1.append(date);

        showContainer.append(showDetailContainer2);
        showDetailContainer1.append(showDetailLabel2);
        showDetailContainer1.append(place);

        showContainer.append(showDetailContainer3);
        showDetailContainer1.append(showDetailLabel3);
        showDetailContainer1.append(location);

        showContainer.append(buttonContainer);
        buttonContainer.append(button);

        tableMobile.append(divider);
    }

    return { date: date, place: place, location: location };
}


function isMobileDevice() {
    return window.innerWidth <= 768;
}