import { definirCasos } from "@/motor/calculo";
import calc from "./neto-bruto-kalkulator";

const U = "https://porezna-uprava.gov.hr/hr/place-i-mirovine/4428";
const Z = { djeca: 0, uzdrzavani: 0 };

export default definirCasos(calc, [
  {
    nombre: "Neto 1.370 eura u Zagrebu",
    origen: { tipo: "recalculado", url: U, detalle: "Obrnuti izračun bruta od 2.000 eura: doprinosi 400, porez 230, zdravstveno 330." },
    fecha: "2026-11-01",
    entrada: { neto: 1370, grad: "zagreb", drugiStup: true, ...Z },
    esperado: { bruto: 2000, doprinosi: 400, porez: 230, trosak: 2330 },
  },
  {
    nombre: "Neto 525 eura, zona punog umanjenja",
    origen: { tipo: "recalculado", url: U, detalle: "Obrnuti izračun bruta od 600 eura: umanjenje 300, doprinosi 75, porez 0." },
    fecha: "2026-11-01",
    entrada: { neto: 525, grad: "zagreb", drugiStup: true, ...Z },
    esperado: { bruto: 600, doprinosi: 75, porez: 0 },
  },
  {
    nombre: "Neto 5.069 eura u Splitu",
    origen: { tipo: "recalculado", url: U, detalle: "Obrnuti izračun bruta od 8.000 eura: doprinosi 1.600, porez 1.331." },
    fecha: "2026-11-01",
    entrada: { neto: 5069, grad: "split", drugiStup: true, ...Z },
    esperado: { bruto: 8000, porez: 1331 },
  },
]);
