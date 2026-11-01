import { definirCasos } from "@/motor/calculo";
import calculadora from "./eeljiin-amraltyn-olgovor";

export default definirCasos(calculadora, [
  { nombre: "7 дахь жил, хэвийн", origen: { tipo: "recalculado", detalle: "99.3, 99.5.1: 15 + 3 = 18 өдөр. 1,680,000 / 21 = 80,000 × 18 = 1,440,000." }, fecha: "2026-11-01", entrada: { dundaj: 1680000, jil: 7, nokhtsol: "kheviin", buurungui: false, edelsengui: false }, esperado: { olgovor: 1440000, odor: 18 } },
  { nombre: "Эдэлж чадаагүй", origen: { tipo: "recalculado", detalle: "110.2: 1,440,000 × 1.5 = 2,160,000." }, fecha: "2026-11-01", entrada: { dundaj: 1680000, jil: 7, nokhtsol: "kheviin", buurungui: false, edelsengui: true }, esperado: { olgovor: 2160000 } },
  { nombre: "32 дахь жил, хэвийн бус", origen: { tipo: "recalculado", detalle: "99.6.6: 15 + 18 = 33 өдөр." }, fecha: "2026-11-01", entrada: { dundaj: 2100000, jil: 32, nokhtsol: "bus", buurungui: false, edelsengui: false }, esperado: { odor: 33, olgovor: 3300000 } },
  { nombre: "Хөгжлийн бэрхшээлтэй, эхний жил", origen: { tipo: "recalculado", detalle: "99.4: 20 өдөр." }, fecha: "2026-11-01", entrada: { dundaj: 2100000, jil: 1, nokhtsol: "kheviin", buurungui: true, edelsengui: false }, esperado: { odor: 20 } },
]);
