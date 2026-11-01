import { definirCasos } from "@/motor/calculo";
import porezNaDohodak from "./porez-na-dohodak";

const ZAKON = "https://wapi.gov.me/download/47bea12c-f250-4cdc-b481-3afc30fba94f?version=1.0";

export default definirCasos(porezNaDohodak, [
  {
    nombre: "Do 700 eura nema poreza",
    origen: { tipo: "recalculado", url: ZAKON, detalle: "Član 10 tačka 1: 0 % do 700,00 eura." },
    fecha: "2026-10-31",
    entrada: { bruto: 700, prirez: 13 },
    esperado: { ukupno: 0, porez: 0 },
  },
  {
    nombre: "Tačno 1.000 eura",
    origen: { tipo: "recalculado", url: ZAKON, detalle: "9 % na 300 eura = 27; Uputstvo, čl. 3: isti iznos od 27 eura." },
    fecha: "2026-10-31",
    entrada: { bruto: 1000, prirez: 0 },
    esperado: { porez: 27, razred9: 27, razred15: 0 },
  },
  {
    nombre: "Bruto 1.500 eura, prirez 13 odsto",
    origen: { tipo: "recalculado", url: ZAKON, detalle: "27 + 15 % na 500 = 102; prirez 13,26; ukupno 115,26; za godinu 1.383,12." },
    fecha: "2026-10-31",
    entrada: { bruto: 1500, prirez: 13 },
    esperado: { porez: 102, prirez: 13.26, ukupno: 115.26, godisnje: 1383.12, razred15: 75 },
  },
  {
    nombre: "Bruto nula je greška",
    origen: { tipo: "recalculado", url: ZAKON, detalle: "Bez dohotka nema obračuna." },
    fecha: "2026-10-31",
    entrada: { bruto: 0, prirez: 13 },
    esperaError: true,
  },
]);
