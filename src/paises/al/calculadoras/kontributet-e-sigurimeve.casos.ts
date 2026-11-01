import { definirCasos } from "@/motor/calculo";
import kontributetESigurimeve from "./kontributet-e-sigurimeve";

const I = "https://www.issh.gov.al/sigurimi-i-detyruar/";

export default definirCasos(kontributetESigurimeve, [
  {
    nombre: "I punësuar, 100 000",
    origen: { tipo: "oficial", url: I, detalle: "ISSH: 27,9% e pagës bruto = 27 900; punonjësi 11,2%, punëdhënësi 16,7%." },
    fecha: "2026-10-30",
    entrada: { statusi: "punonjes", paga: 100000 },
    esperado: { total: 27900, punonjes: 11200, punedhenes: 16700 },
  },
  {
    nombre: "I vetëpunësuar me pagën minimale",
    origen: { tipo: "oficial", url: I, detalle: "ISSH: 23% e 50 000 = 11 500; 3,4% e dyfishit të pagës minimale = 3 400; gjithsej 14 900." },
    fecha: "2026-10-30",
    entrada: { statusi: "vetepunesuar", paga: 50000 },
    esperado: { shoqerore: 11500, shendetesore: 3400, total: 14900 },
  },
  {
    nombre: "I vetëpunësuar, baza maksimale",
    origen: { tipo: "recalculado", url: I, detalle: "23% × 186 416 = 42 876; shëndetësore 3 400; gjithsej 46 276." },
    fecha: "2026-10-30",
    entrada: { statusi: "vetepunesuar", paga: 250000 },
    esperado: { baza: 186416, shoqerore: 42876, total: 46276 },
  },
  {
    nombre: "Pagë zero",
    origen: { tipo: "recalculado", url: I, detalle: "Pa pagë nuk ka llogaritje." },
    fecha: "2026-10-30",
    entrada: { statusi: "punonjes", paga: 0 },
    esperaError: true,
  },
]);
