const url = "https://data.stad.gent/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time/records?limit=20";
const parkingDiv = document.getElementById("parking-data");

async function getData() {
    try {
        const response = await fetch(url);
        console.log(response);
        if(!response.ok){
            throw new Error(`http error: ${response.status} `);
        };
        const data = await response.json();
        console.log("data, met results titel: ", data);
        const parkings = data.results;
        console.log(parkings);
        displayData(parkings);
    } catch (error) {
        console.error("er ging iets fout met het verkrijgen van de data", error);
        parkingDiv.innerHTML=`<p style = "color:red;">oeps... Het werkt even niet. Kom later terug</p>`;
    } finally {
        console.log("getData finished");
    }
};

function displayData(parkings) {
    console.log("parkings in display functie: ", parkings);
    parkings.forEach(parking => {
        // const bezetting = parking.occupation;
        // const capaciteit = parking.totalcapacity;
        // const naam = parking.name;
        // const isopen = parking.isopennow;
        const { occupation, totalcapacity, name, isopennow } = parking;
        let status = isopennow ? "parking open" : "parking gesloten";
        // if (isopennow === 1) {
        //     status = "parking open";
        // } else {
        //     status = "parking gesloten";
        // };
        console.log(`bezetting: ${occupation} | capaciteit: ${totalcapacity} | naam: ${name} | open: ${status}`);
        const parkingCard = document.createElement("div");
        parkingCard.className = "parking";
        parkingCard.innerHTML = `
            <h2>${name}</h2>
            <p>bezetting: ${occupation}</p>
            <p>capaciteit: ${totalcapacity}</p>
            <p class="status">${status}</p>
        `;
        parkingDiv.appendChild(parkingCard);
        const pElements = parkingCard.getElementsByClassName("status");
        Array.from(pElements).forEach(pElement => {
            pElement.classList.add(isopennow ? "open" : "gesloten");
    });
});
}

getData();
