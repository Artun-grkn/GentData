const url = "https://data.stad.gent/api/explore/v2.1/catalog/datasets/bezetting-parkeergarages-real-time/records?limit=20";
const parkingDiv = document.getElementById("parking-data");
async function getData() {


    try {
        const response = await fetch (url);
        if(!response.ok){
            throw new Error(`http error: ${response.status}`);
        };
        const data = await response.json();
        const parkings = data.results;
        console.log(parkings);
        displayData(parkings);

} catch (error) {
    console.error("er ging iets fout met het verkrijgen van de data",error);
    document.getElementById("parking-data").innerHTML= `<p style= "color:red";>oeps...  Het werkt even niet kom later terug</p>`;

} finally {
    console.log("get data functie is finished");

}


};

function displayData(parkings) {

        console.log("parkings in display functie: ", parkings );
        parkings.forEach(parking => {
           const { occupation, totalcapacity, name, isopennow } = parking;
           let status = isopennow ? "parking open" : "parking gesloten"; //PLUS PUNT
            console.log(`bezetting: ${occupation} | capaciteit: ${totalcapacity} | naam: ${name} | open: ${status}}`);
            console.log(parkingDiv);
            const parkingCard = document.createElement("div");
            parkingCard.className = "parking";
            parkingCard.innerHTML = `
            <h2>${name}</h2>
            <p>bezetting: ${occupation}<p>
            <p>capaciteit: ${totalcapacity}<p>
            <p>open: ${isopennow}<p>
            `;
            parkingDiv.appendChild(parkingCard);

            
            
        });
};

getData();