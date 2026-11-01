import { definirCasos } from "@/motor/calculo";
import varstaDePensionare from "./varsta-de-pensionare";

const CNAS = "https://cnas.gov.md/ro/servicii/servicii/pensii/pensie-pentru-limita-de-varsta";

export default definirCasos(varstaDePensionare, [
  {
    nombre: "Femeie născută la 15 martie 1964",
    origen: { tipo: "recalculado", url: CNAS, detalle: "CNAS: din 1 iulie 2024 femeile se pensionează la 61 de ani. La 15 martie 2025 are 61 de ani, cât cere regula în vigoare atunci." },
    fecha: "2026-10-26",
    entrada: { sex: "femeie", nastere: "1964-03-15" },
    esperado: { data: "2025-03-15", varsta: "61 de ani", stare: "Ați atins deja vârsta standard de pensionare." },
  },
  {
    nombre: "Femeie născută la 10 octombrie 1965",
    origen: { tipo: "recalculado", url: CNAS, detalle: "La 1 iulie 2027 vârsta devine 62 de ani și 6 luni; ea are 62 de ani la 10 octombrie 2027, prea puțin. La 10 aprilie 2028 are 62 de ani și 6 luni, înainte de 1 iulie 2028." },
    fecha: "2026-10-26",
    entrada: { sex: "femeie", nastere: "1965-10-10" },
    esperado: { data: "2028-04-10", varsta: "62 de ani și 6 luni", ramase: 17 },
  },
  {
    nombre: "Femeie născută în 1970: vârsta finală de 63 de ani",
    origen: { tipo: "recalculado", url: CNAS, detalle: "Din 1 iulie 2028 vârsta standard este 63 de ani și pentru femei: 1 februarie 2033." },
    fecha: "2026-10-26",
    entrada: { sex: "femeie", nastere: "1970-02-01" },
    esperado: { data: "2033-02-01", varsta: "63 de ani" },
  },
  {
    nombre: "Bărbat născut la 20 mai 1963",
    origen: { tipo: "recalculado", url: CNAS, detalle: "Bărbații se pensionează la 63 de ani: 20 mai 2026." },
    fecha: "2026-10-26",
    entrada: { sex: "barbat", nastere: "1963-05-20" },
    esperado: { data: "2026-05-20", varsta: "63 de ani", ramase: 0 },
  },
  {
    nombre: "Născut la 29 februarie",
    origen: { tipo: "recalculado", url: CNAS, detalle: "63 de ani de la 29 februarie 1964 cad în 2027, an fără 29 februarie: 28 februarie 2027." },
    fecha: "2026-10-26",
    entrada: { sex: "barbat", nastere: "1964-02-29" },
    esperado: { data: "2027-02-28" },
  },
  {
    nombre: "Vârstă atinsă înainte de iulie 2023",
    origen: { tipo: "recalculado", url: CNAS, detalle: "Tabelul CNAS din calculator începe cu 1 iulie 2023." },
    fecha: "2026-10-26",
    entrada: { sex: "barbat", nastere: "1958-01-01" },
    esperaError: true,
  },
]);
