import { definirCasos } from "@/motor/calculo";
import inflaatiolaskuri from "./inflaatiolaskuri";

const KHI = "https://pxdata.stat.fi/PxWeb/api/v1/fi/StatFin/khi/11xs.px";

export default definirCasos(inflaatiolaskuri, [
  {
    nombre: "1 000 euroa tammikuusta 2015 syyskuuhun 2026",
    origen: { tipo: "recalculado", url: KHI, detalle: "Pisteluku 2000=100: 1/2015 = 126,42 ja 9/2026 = 160. 1 000 × 160 / 126,42 = 1 265,62; 1 000 × 126,42 / 160 = 790,13." },
    fecha: "2026-10-24",
    entrada: { summa: 1000, alku: "2015-01-01", loppu: "2026-09-15" },
    esperado: { nyt: 1265.62, ero: 265.62, ostovoima: 790.13 },
  },
  {
    nombre: "Tammikuu 2020 ja tammikuu 2025",
    origen: { tipo: "recalculado", url: KHI, detalle: "131,23 → 155,82: 1 000 × 155,82 / 131,23 = 1 187,38." },
    fecha: "2026-10-24",
    entrada: { summa: 1000, alku: "2020-01-10", loppu: "2025-01-20" },
    esperado: { nyt: 1187.38 },
  },
  {
    nombre: "Loppukuukautta ei ole vielä julkaistu",
    origen: { tipo: "recalculado", url: KHI, detalle: "Joulukuu 2026 puuttuu, joten laskuri käyttää syyskuuta 2026 (160)." },
    fecha: "2026-10-24",
    entrada: { summa: 500, alku: "2015-01-01", loppu: "2026-12-01" },
    esperado: { nyt: 632.81 },
  },
  {
    nombre: "Alku ennen indeksin alkua",
    origen: { tipo: "recalculado", url: KHI, detalle: "Sarja alkaa tammikuusta 2000." },
    fecha: "2026-10-24",
    entrada: { summa: 500, alku: "1999-05-01", loppu: "2026-01-01" },
    esperaError: true,
  },
]);
