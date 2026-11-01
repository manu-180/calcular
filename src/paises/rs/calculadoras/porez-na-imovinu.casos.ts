import { definirCasos } from "@/motor/calculo";
import porezNaImovinu from "./porez-na-imovinu";

const IMO = "https://www.mfin.gov.rs//upload/media/bxqPJF_675ab24783517.docx";

export default definirCasos(porezNaImovinu, [
  {
    nombre: "Stan 12 miliona, bez knjiga",
    origen: { tipo: "recalculado", url: IMO, detalle: "Čl. 11: 10.000.000 puta 0,4 % = 40.000; 2.000.000 puta 0,6 % = 12.000; ukupno 52.000." },
    fecha: "2026-10-31",
    entrada: { osnovica: 12000000, vrsta: "fizicko" },
    esperado: { porez: 52000, kvartalno: 13000 },
  },
  {
    nombre: "Svi razredi",
    origen: { tipo: "recalculado", url: IMO, detalle: "40.000 + 90.000 + 250.000 + 10.000.000 puta 2 % = 200.000; ukupno 580.000." },
    fecha: "2026-10-31",
    entrada: { osnovica: 60000000, vrsta: "fizicko" },
    esperado: { porez: 580000 },
  },
  {
    nombre: "Zemljište 5 miliona",
    origen: { tipo: "recalculado", url: IMO, detalle: "0,30 % od 5.000.000 = 15.000." },
    fecha: "2026-10-31",
    entrada: { osnovica: 5000000, vrsta: "zemljiste" },
    esperado: { porez: 15000 },
  },
]);
