const url = "https://data.stad.gent/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time/records?limit=20";
const parkingDiv = document.getElementById("parking-data");

async function getData() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        
        const { results: parkings } = await response.json();
        displayData(parkings);
    } catch (error) {
        console.error("Error fetching data", error);
        parkingDiv.innerHTML = `<p style="color:red;">Oeps... Het werkt even niet, probeer later terug!</p>`;
    } finally {
        console.log("getData function finished");
    }
}

function displayData(parkings) {
    parkingDiv.innerHTML = "";  // Clear previous data

    if (parkings.length === 0) {
        parkingDiv.innerHTML = `<p style="color:red;">Geen parkeerinformatie beschikbaar.</p>`;
        return;
    }

    parkings.forEach(({ occupation, totalcapacity, name, isopennow }) => {
        const status = isopennow ? "Open" : "Gesloten";
        const parkingCard = createParkingCard(name, occupation, totalcapacity, status);
        parkingDiv.appendChild(parkingCard);
    });
}

function createParkingCard(name, occupation, totalcapacity, status) {
    const parkingCard = document.createElement("div");
    parkingCard.classList.add("parking");

    parkingCard.innerHTML = `
        <h2>${name}</h2>
        <p><strong>Bezetting:</strong> ${occupation}</p>
        <p><strong>Capaciteit:</strong> ${totalcapacity}</p>
        <p><strong>Status:</strong> ${status}</p>
    `;

    return parkingCard;
}

// Initialize data fetching
getData();
