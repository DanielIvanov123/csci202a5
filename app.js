async function fetchPeopleInSpace() {
    const apiUrl = "http://api.open-notify.org/astros.json";
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
}

function displaySpacecraft(spacecraftData) {
    const spacecraftList = document.getElementById("spacecraft-list");
    const spacecraftNames = [...new Set(spacecraftData.map(person => person.craft))];

    spacecraftNames.forEach(spacecraft => {
        const spacecraftDiv = document.createElement("div");
        spacecraftDiv.classList.add("spacecraft");

        const img = document.createElement("img");
        img.src = document.getElementById(spacecraft.toLowerCase().replace(" ", "-")).src;
        img.alt = `${spacecraft}`;

        const spacecraftName = document.createElement("h2");
        spacecraftName.textContent = spacecraft;

        const tooltip = document.createElement("div");
        tooltip.classList.add("tooltip");

        const peopleOnCraft = spacecraftData.filter(person => person.craft === spacecraft);
        peopleOnCraft.forEach(person => {
            const personName = document.createElement("p");
            personName.textContent
            personName.textContent = person.name;
            tooltip.appendChild(personName);
        });

        spacecraftDiv.appendChild(img);
        spacecraftDiv.appendChild(spacecraftName);
        spacecraftDiv.appendChild(tooltip);
        spacecraftList.appendChild(spacecraftDiv);
    });
}

async function init() {
    const data = await fetchPeopleInSpace();
    document.getElementById("people-count").textContent = data.number;
    displaySpacecraft(data.people);
}

init();
