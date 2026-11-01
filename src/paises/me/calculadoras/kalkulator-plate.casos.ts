import { definirCasos } from "@/motor/calculo";
import kalkulatorPlate from "./kalkulator-plate";

const ZAKON = "https://wapi.gov.me/download/47bea12c-f250-4cdc-b481-3afc30fba94f?version=1.0";

export default definirCasos(kalkulatorPlate, [
  {
    nombre: "Bruto ispod 700 eura: bez poreza",
    origen: { tipo: "recalculado", url: ZAKON, detalle: "670,39 x 10,5 % = 70,39 doprinosa; porez 0 do 700 eura; neto 600,00." },
    fecha: "2026-10-31",
    entrada: { bruto: 670.39, prirez: 13 },
    esperado: { doprinosi: 70.39, porez: 0, prirez: 0, neto: 600 },
  },
  {
    nombre: "Prosječna bruto zarada za septembar 2026",
    origen: { tipo: "recalculado", url: ZAKON, detalle: "1.245: doprinosi 124,50 + 6,23; porez 27 + 15 % na 245 = 63,75; prirez 13 % = 8,29; neto 1.042,23. MONSTAT objavljuje prosjek 1.043." },
    fecha: "2026-10-31",
    entrada: { bruto: 1245, prirez: 13 },
    esperado: { doprinosi: 130.73, porez: 63.75, prirez: 8.29, neto: 1042.23 },
  },
  {
    nombre: "Bruto 900 eura bez prireza",
    origen: { tipo: "recalculado", url: ZAKON, detalle: "Doprinosi 94,50; porez 9 % na 200 = 18; neto 787,50." },
    fecha: "2026-10-31",
    entrada: { bruto: 900, prirez: 0 },
    esperado: { doprinosi: 94.5, porez: 18, prirez: 0, neto: 787.5 },
  },
  {
    nombre: "Bruto 2.000 eura, prirez 15 odsto",
    origen: { tipo: "recalculado", url: ZAKON, detalle: "Doprinosi 210; porez 27 + 150 = 177; prirez 26,55; neto 1.586,45; poslodavac 0,7 % = 14." },
    fecha: "2026-10-31",
    entrada: { bruto: 2000, prirez: 15 },
    esperado: { doprinosi: 210, porez: 177, prirez: 26.55, neto: 1586.45, trosakPoslodavca: 2014 },
  },
  {
    nombre: "Bruto nula je greška",
    origen: { tipo: "recalculado", url: ZAKON, detalle: "Bez zarade nema obračuna." },
    fecha: "2026-10-31",
    entrada: { bruto: 0, prirez: 13 },
    esperaError: true,
  },
]);
