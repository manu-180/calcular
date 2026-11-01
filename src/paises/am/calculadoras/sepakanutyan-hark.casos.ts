import { definirCasos } from "@/motor/calculo";
import sepakanutyanHark from "./sepakanutyan-hark";

const LEY = "https://www.arlis.am/hy/acts/123521/latest";

export default definirCasos(sepakanutyanHark, [
  { nombre: "Բնակարան՝ 20 միլիոն", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 229 մաս 1 կետ 3: 5000 + 10 000 000 × 0,1% = 15 000." }, fecha: "2026-11-01", entrada: { tesak: "bnakaran", arzheq: 20000000 }, esperado: { hark: 15000 } },
  { nombre: "Բնակարան՝ 5 միլիոն", origen: { tipo: "oficial", url: LEY, detalle: "Առաջին աստիճան: 0,05% = 2500." }, fecha: "2026-11-01", entrada: { tesak: "bnakaran", arzheq: 5000000 }, esperado: { hark: 2500 } },
  { nombre: "Տուն՝ 30 միլիոն", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 229 մաս 1 կետ 4: 19 500 + 7 000 000 × 0,2% = 33 500." }, fecha: "2026-11-01", entrada: { tesak: "tun", arzheq: 30000000 }, esperado: { hark: 33500 } },
  { nombre: "Բնակարան՝ 250 միլիոն", origen: { tipo: "oficial", url: LEY, detalle: "1 326 000 + 50 000 000 × 1,5% = 2 076 000." }, fecha: "2026-11-01", entrada: { tesak: "bnakaran", arzheq: 250000000 }, esperado: { hark: 2076000 } },
]);
