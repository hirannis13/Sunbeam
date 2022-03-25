document.getElementById("pickup").valueAsDate = new Date(); // always get the current date
const numPersons = document.getElementById("quantity");
const numSuitcases = document.getElementById("suitcases");
const carsContainer = document.querySelector(".cars");
const form = document.getElementById("form");
const dateStart = document.getElementById("pickup");
const dateHandIn = document.getElementById("handin");
let carBox = "";

function validDates(dateStart, dateHandIn) {
    const arrival = new Date(dateStart);
    const departure = new Date(dateHandIn);
    if (arrival > departure) {
      return false;
    } else {
      return true;
    }
  }
  
  function calcRentalDays(dateStart, dateHandIn) {
    const arrival = new Date(dateStart);
    const departure = new Date(dateHandIn);
    const timediff = departure.getTime() - arrival.getTime();
    const diffindays = timediff / (1000 * 3600 * 24) + 1;
    return diffindays;
  }
  
  function calcRentalCost(days, priceperday) {
    const totalprice = priceperday * days;
    return totalprice;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
  
    const datesValid = validDates(dateStart.value, dateHandIn.value);
    if (datesValid) {  
      carsContainer.innerHTML="";
      for (const car of cars) {
        const cost = calcRentalCost(
          calcRentalDays(dateStart.value, dateHandIn.value),
          car.price
        );
        if (numPersons.value < 3 || numSuitcases < 3) {
          if (car.category === "Sedan") {
            carBox = `
                    <div id="car-box">
                            <img id="car-logo" src="${car.image}" />
                            <h2 class="name" id="car-name">${car.name}</h2>
                        <section class="infos">
                            <h2 id="car-category">Category: ${car.type}</h2>
                            <h2 id="car-persons">Persons: ${car.persons}</h2>
                            <h2 id="car-suitcases">Suitcases: ${car.suitcases}</h2>
                        </section>
                        <section class="price">
                            <h2 id="car-price">${cost} kr</h2>
                            <button onclick='buttonclick(${JSON.stringify(car)}, ${JSON.stringify(cost)})' type="button" class="book-btn" id="car-book-btn">Book Now</button>
                        </section>
                    </div>
                `;
            carsContainer.insertAdjacentHTML("beforeend", carBox);
          }
        }
        if (numPersons.value >= 3 || numSuitcases >= 3) {
          if (car.category === "Van" ) {
            carBox = `
                  <div id="car-box">
                          <img id="car-logo" src="${car.image}" />
                          <h2 class="name" id="car-name">${car.name}</h2>
                          <section class="infos">
                          <h2 id="car-category">Category: ${car.type}</h2>
                          <h2 id="car-persons">Persons: ${car.persons}</h2>
                          <h2 id="car-suitcases">Suitcases: ${car.suitcases}</h2>
                          </section>
                          <section class="price">
                          <h2 id="car-price">${cost} kr</h2>
                          <button onclick='buttonclick(${JSON.stringify(car)}, ${JSON.stringify(cost)})' type="button" class="book-btn" id="car-book-btn">Book Now</button>
                          </section>
                      </div>
                  `;
            carsContainer.insertAdjacentHTML("beforeend", carBox);
          }
        }
      }
    } else {
      carsContainer.insertAdjacentHTML(
        "beforeend",
        "Start date cannot be later then the hand in date...you DUMB"
      );
    }
  });
  







  function buttonclick (car, totalprice) {
    sessionStorage.setItem ('car', JSON.stringify(car));
    sessionStorage.setItem('cost', JSON.stringify(totalprice));
    window.location.href='accessories.html';
  }