import { definirCasos } from "@/motor/calculo";
import semesterersattning from "./semesterersattning";

const LAG = "https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/semesterlag-1977480_sfs-1977-480/";

export default definirCasos(semesterersattning, [
  {
    nombre: "Procentregeln: 250 000 kr i lön",
    origen: { tipo: "recalculado", url: LAG, detalle: "16 b § semesterlagen: 12 % av 250 000 = 30 000 kr." },
    fecha: "2026-10-24",
    entrada: { regel: "procent", lonesumma: 250000, lon: null, dagar: null },
    esperado: { semesterlon: 30000 },
  },
  {
    nombre: "Sammalöneregeln: 32 000 kr i månaden och 25 dagar",
    origen: { tipo: "recalculado", url: LAG, detalle: "16 a §: 0,43 % av 32 000 = 137,60 kr per dag, gånger 25 = 3 440 kr." },
    fecha: "2026-10-24",
    entrada: { regel: "manad", lonesumma: null, lon: 32000, dagar: 25 },
    esperado: { tillaggPerDag: 137.6, semesterlon: 3440 },
  },
  {
    nombre: "Veckolön 8 000 kr och 10 dagar",
    origen: { tipo: "recalculado", url: LAG, detalle: "16 a §: 1,82 % av 8 000 = 145,60 kr per dag, gånger 10 = 1 456 kr." },
    fecha: "2026-10-24",
    entrada: { regel: "vecka", lonesumma: null, lon: 8000, dagar: 10 },
    esperado: { tillaggPerDag: 145.6, semesterlon: 1456 },
  },
  {
    nombre: "Ingen lön",
    origen: { tipo: "recalculado", url: LAG, detalle: "Utan lön finns inget att räkna på." },
    fecha: "2026-10-24",
    entrada: { regel: "procent", lonesumma: 0, lon: null, dagar: null },
    esperaError: true,
  },
]);
