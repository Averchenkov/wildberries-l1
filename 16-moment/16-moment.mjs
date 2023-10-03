import differanceDate from "./differanceDate.mjs";

const flight = {
    arrivalDate: "2020-08-19T21:45:00",
    departureDate: "2020-08-19T18:10:00",
}

const durationFlight = differanceDate(flight.departureDate, flight.arrivalDate)
console.log("Время полета - " + durationFlight);
