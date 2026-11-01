import { definirCasos } from "@/motor/calculo";
import calc from "./pausalni-obrt";

const U = "https://porezna-uprava.gov.hr/hr/obrtnici-pausalisti/4564";

export default definirCasos(calc, [
  {
    nombre: "Primici 30.000 eura, samo obrt",
    origen: { tipo: "oficial", url: U, detalle: "Razred do 30.600: dohodak 4.590, porez 550,80; doprinosi 290,98 x 12 = 3.491,76; ostaje 25.957,44." },
    fecha: "2026-11-01",
    entrada: { primici: 30000, drugaOsnova: false },
    esperado: { dohodak: 4590, porez: 550.8, tromjesecno: 137.7, doprinosi: 3491.76, ostaje: 25957.44 },
  },
  {
    nombre: "Primici 30.000 eura uz radni odnos",
    origen: { tipo: "oficial", url: U, detalle: "Tablica: 344,25 + 114,75 + 344,25 = 803,25." },
    fecha: "2026-11-01",
    entrada: { primici: 30000, drugaOsnova: true },
    esperado: { doprinosi: 803.25 },
  },
  {
    nombre: "Granica prvog razreda",
    origen: { tipo: "oficial", url: U, detalle: "Do 11.300 eura: dohodak 1.695, porez 203,40." },
    fecha: "2026-11-01",
    entrada: { primici: 11300, drugaOsnova: true },
    esperado: { dohodak: 1695, porez: 203.4, doprinosi: 296.64 },
  },
  {
    nombre: "Prvi cent drugog razreda",
    origen: { tipo: "oficial", url: U, detalle: "Od 11.300,01 eura: dohodak 2.295, porez 275,40." },
    fecha: "2026-11-01",
    entrada: { primici: 11300.01, drugaOsnova: true },
    esperado: { dohodak: 2295, porez: 275.4 },
  },
  {
    nombre: "Zadnji razred",
    origen: { tipo: "oficial", url: U, detalle: "Do 60.000 eura: dohodak 9.000, porez 1.080." },
    fecha: "2026-11-01",
    entrada: { primici: 60000, drugaOsnova: false },
    esperado: { dohodak: 9000, porez: 1080 },
  },
  {
    nombre: "Iznad granice od 60.000 eura",
    origen: { tipo: "oficial", url: U, detalle: "Primici ne smiju biti veći od 60.000 eura." },
    fecha: "2026-11-01",
    entrada: { primici: 60000.01, drugaOsnova: false },
    esperaError: true,
  },
]);
