import { definirCasos } from "@/motor/calculo";
import calculadora from "./cotisations-cnas";

const DECRET = "https://www.joradp.dz/FTP/jo-francais/2006/F2006060.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Assiette de 60 000 DA",
    origen: { tipo: "recalculado", url: DECRET, detalle: "Travailleur 9 % = 5 400 ; employeur 25 % = 15 000 ; œuvres sociales 0,5 % = 300 ; total 34,5 % = 20 700." },
    fecha: "2026-10-27",
    entrada: { assiette: 60000 },
    esperado: { salarie: 5400, employeur: 15000, oeuvres: 300, total: 20700, tauxGlobal: 34.5 },
  },
  {
    nombre: "SNMG de 24 000 DA",
    origen: { tipo: "recalculado", url: DECRET, detalle: "9 % = 2 160 ; 25 % = 6 000 ; 0,5 % = 120 ; total 8 280." },
    fecha: "2026-10-27",
    entrada: { assiette: 24000 },
    esperado: { salarie: 2160, employeur: 6000, oeuvres: 120, total: 8280 },
  },
  {
    nombre: "Assiette nulle",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-27",
    entrada: { assiette: 0 },
    esperaError: true,
  },
]);
