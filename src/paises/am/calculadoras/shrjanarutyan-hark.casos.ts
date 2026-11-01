import { definirCasos } from "@/motor/calculo";
import shrjanarutyanHark from "./shrjanarutyan-hark";

const LEY = "https://www.arlis.am/hy/acts/123521/latest";

export default definirCasos(shrjanarutyanHark, [
  { nombre: "Ծառայություններ՝ ծախսերով", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 258: 10% × 3 000 000 = 300 000. մաս 5: 6% × 1 000 000 = 60 000. Նվազագույն 4,5% = 135 000. Արդյունք 240 000." }, fecha: "2026-11-01", entrada: { gortuneutyun: "ayl", shrjanarutyun: 3000000, tsakhser: 1000000 }, esperado: { hark: 240000, nvazetsum: 60000 } },
  { nombre: "Առևտուր՝ նվազեցում", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 258 մաս 2: 1 000 000 - 9,5% × 9 000 000 = 145 000." }, fecha: "2026-11-01", entrada: { gortuneutyun: "arevtur", shrjanarutyun: 10000000, tsakhser: 9000000 }, esperado: { hark: 145000 } },
  { nombre: "Առևտուր՝ նվազագույն", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 258 մաս 2: նվազագույնը բազայի 1 տոկոսն է։ 100 000." }, fecha: "2026-11-01", entrada: { gortuneutyun: "arevtur", shrjanarutyun: 10000000, tsakhser: 11000000 }, esperado: { hark: 100000 } },
  { nombre: "Արտադրություն՝ նվազագույն", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 258 մաս 3: 7% × 1 000 000 = 70 000. 5% × 2 000 000 = 100 000. Նվազագույն 3% = 30 000." }, fecha: "2026-11-01", entrada: { gortuneutyun: "artadrutyun", shrjanarutyun: 1000000, tsakhser: 2000000 }, esperado: { hark: 30000 } },
  { nombre: "Բարձր տեխնոլոգիաներ", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 258 մաս 1 կետ 8: 1 տոկոս." }, fecha: "2026-11-01", entrada: { gortuneutyun: "bartsr-tekh", shrjanarutyun: 3000000, tsakhser: null }, esperado: { hark: 30000, nvazetsum: 0 } },
  { nombre: "Հանրային սնունդ", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 258 մաս 4: 12% × 2 000 000 = 240 000. 9% × 1 000 000 = 90 000. Արդյունք 150 000, նվազագույն 3,5% = 70 000." }, fecha: "2026-11-01", entrada: { gortuneutyun: "snund", shrjanarutyun: 2000000, tsakhser: 1000000 }, esperado: { hark: 150000 } },
]);
