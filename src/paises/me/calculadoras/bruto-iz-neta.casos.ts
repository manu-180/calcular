import { definirCasos } from "@/motor/calculo";
import brutoIzNeta from "./bruto-iz-neta";

const ZAKON = "https://wapi.gov.me/download/47bea12c-f250-4cdc-b481-3afc30fba94f?version=1.0";

export default definirCasos(brutoIzNeta, [
  {
    nombre: "Neto 600 eura je bruto 670,39",
    origen: { tipo: "recalculado", url: ZAKON, detalle: "600 / 0,895 = 670,39, bez poreza jer je ispod 700 eura." },
    fecha: "2026-10-31",
    entrada: { neto: 600, prirez: 13 },
    esperado: { bruto: 670.39, porez: 0 },
  },
  {
    nombre: "Neto 800 eura bez prireza",
    origen: { tipo: "recalculado", url: ZAKON, detalle: "B x 0,895 - 9 % x (B - 700) = 800, B = 737 / 0,805 = 915,53." },
    fecha: "2026-10-31",
    entrada: { neto: 800, prirez: 0 },
    esperado: { bruto: 915.53, porez: 19.4 },
  },
  {
    nombre: "Neto 1.500 eura, prirez 13 odsto",
    origen: { tipo: "recalculado", url: ZAKON, detalle: "Bruto 1.892,99: doprinosi 198,76; porez 160,95; prirez 20,92; neto ne manji od 1.500." },
    fecha: "2026-10-31",
    entrada: { neto: 1500, prirez: 13 },
    esperado: { dobijeniNeto: 1500 },
  },
  {
    nombre: "Neto nula je greška",
    origen: { tipo: "recalculado", url: ZAKON, detalle: "Nema šta da se računa." },
    fecha: "2026-10-31",
    entrada: { neto: 0, prirez: 13 },
    esperaError: true,
  },
]);
