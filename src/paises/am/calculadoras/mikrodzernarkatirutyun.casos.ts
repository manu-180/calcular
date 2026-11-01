import { definirCasos } from "@/motor/calculo";
import mikrodzernarkatirutyun from "./mikrodzernarkatirutyun";

const LEY = "https://www.arlis.am/hy/acts/123521/latest";

export default definirCasos(mikrodzernarkatirutyun, [
  { nombre: "20 միլիոն՝ աշխատողով", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 267 մաս 3: շեմ 24 միլիոն։ 300 000 × 12 × 20% = 720 000. ՀՕ-245-Ն հոդ։ 12: 120 000. 10% × 20 000 000 = 2 000 000." }, fecha: "2026-11-01", entrada: { shrjanarutyun: 20000000, ashkhatavardz: 300000, dzernarkater: true }, esperado: { kargavichak: "Համապատասխանում է շեմին", mnatsord: 4000000, yekamtayin: 720000, drosh: 120000, shrjanarutyanHark: 2000000 } },
  { nombre: "Շեմի վրա՝ կազմակերպություն", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 267 մաս 3: չի գերազանցել 24 միլիոն դրամը." }, fecha: "2026-11-01", entrada: { shrjanarutyun: 24000000, ashkhatavardz: 0, dzernarkater: false }, esperado: { kargavichak: "Համապատասխանում է շեմին", mnatsord: 0, drosh: 0 } },
  { nombre: "Շեմից բարձր", origen: { tipo: "oficial", url: LEY, detalle: "24 000 001 դրամը գերազանցում է շեմը." }, fecha: "2026-11-01", entrada: { shrjanarutyun: 24000001, ashkhatavardz: 0, dzernarkater: true }, esperado: { kargavichak: "Չի համապատասխանում շեմին", mnatsord: 0 } },
]);
