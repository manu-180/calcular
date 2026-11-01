import { definirCasos } from "@/motor/calculo";
import otpremnina from "./otpremnina";

const RADU = "https://wapi.gov.me/download/5708ed78-5d80-492f-89f1-daa147732dc8?version=1.0";

export default definirCasos(otpremnina, [
  {
    nombre: "Osam godina, zarada iznad prosjeka: važi najniži iznos",
    origen: { tipo: "recalculado", url: RADU, detalle: "Čl. 169a: 1.200 / 3 x 8 = 3.200; najmanje 3 x 1.200 = 3.600. Prosjek jan-jun 2026 je 1.029,33." },
    fecha: "2026-10-31",
    entrada: { zarada: 1200, mjeseci: 96, datum: "2026-10-31" },
    esperado: { iznos: 3600, zaGodine: 3200, minimum: 3600, prosjekCG: 1029.33 },
  },
  {
    nombre: "Dvadeset godina: trećina po godini je više od minimuma",
    origen: { tipo: "recalculado", url: RADU, detalle: "1.200 / 3 x 20 = 8.000, više od 3.600." },
    fecha: "2026-10-31",
    entrada: { zarada: 1200, mjeseci: 240, datum: "2026-10-31" },
    esperado: { iznos: 8000 },
  },
  {
    nombre: "Niža zarada: osnov je prosjek Crne Gore",
    origen: { tipo: "recalculado", url: RADU, detalle: "800 < 1.029,33; 3 x 1.029,33 = 3.087,99." },
    fecha: "2026-10-31",
    entrada: { zarada: 800, mjeseci: 60, datum: "2026-10-31" },
    esperado: { osnov: 1029.33, iznos: 3087.99 },
  },
  {
    nombre: "Manje od 18 mjeseci rada",
    origen: { tipo: "recalculado", url: RADU, detalle: "Čl. 169a st. 2: najmanje 18 mjeseci kod tog poslodavca." },
    fecha: "2026-10-31",
    entrada: { zarada: 1200, mjeseci: 12, datum: "2026-10-31" },
    esperado: { iznos: 0 },
  },
]);
