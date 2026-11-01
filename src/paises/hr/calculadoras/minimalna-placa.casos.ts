import { definirCasos } from "@/motor/calculo";
import calc from "./minimalna-placa";

const U26 = "https://narodne-novine.nn.hr/clanci/sluzbeni/2025_10_132_1931.html";
const U27 = "https://narodne-novine.nn.hr/eli/sluzbeni/2026/124/1481/pdf";

export default definirCasos(calc, [
  {
    nombre: "Minimalna plaća 2026 u Zagrebu",
    origen: { tipo: "recalculado", url: U26, detalle: "Bruto 1.050; umanjenje 125; I. stup 138,75; II. stup 52,50; osnovica 258,75; porez 59,51; neto 799,24; trošak 1.223,25." },
    fecha: "2026-12-31",
    entrada: { grad: "zagreb", drugiStup: true },
    esperado: { bruto: 1050, doprinosi: 191.25, porez: 59.51, neto: 799.24, trosak: 1223.25 },
  },
  {
    nombre: "Minimalna plaća od 1. siječnja 2027.",
    origen: { tipo: "recalculado", url: U27, detalle: "Bruto 1.130; umanjenje 85; I. stup 156,75; II. stup 56,50; osnovica 316,75; porez 72,85; neto 843,90." },
    fecha: "2027-01-01",
    entrada: { grad: "zagreb", drugiStup: true },
    esperado: { bruto: 1130, porez: 72.85, neto: 843.9 },
  },
  {
    nombre: "Rijeka, niža stopa 20 %",
    origen: { tipo: "recalculado", url: U26, detalle: "Osnovica 258,75 x 20 % = 51,75; neto 858,75 - 51,75 = 807." },
    fecha: "2026-06-15",
    entrada: { grad: "rijeka", drugiStup: true },
    esperado: { porez: 51.75, neto: 807 },
  },
]);
