import { definirCasos } from "@/motor/calculo";
import priplatkyZaPracu from "./priplatky-za-pracu";

const ZP = "https://static.slov-lex.sk/static/SK/ZZ/2001/311/20260901.html";

export default definirCasos(priplatkyZaPracu, [
  { nombre: "Osem hodín v sobotu", origen: { tipo: "recalculado", url: ZP, detalle: "§ 122a: 50 % z 5,259 × 8 = 21,04." }, fecha: "2026-06-15", entrada: { sobota: 8, nedela: 0, noc: 0, riziko: false, sviatok: 0, priemerny: 12 }, esperado: { spolu: 21.04 } },
  { nombre: "Nedeľa, noc a sviatok", origen: { tipo: "recalculado", url: ZP, detalle: "§ 122b: 8 × 5,259 = 42,07; § 123: 40 % × 5,259 × 10 = 21,04; § 122: 12 × 8 = 96; spolu 159,11." }, fecha: "2026-06-15", entrada: { sobota: 0, nedela: 8, noc: 10, riziko: false, sviatok: 8, priemerny: 12 }, esperado: { zaNedelu: 42.07, zaNoc: 21.04, zaSviatok: 96, spolu: 159.11 } },
  { nombre: "Noc pri rizikovej práci", origen: { tipo: "recalculado", url: ZP, detalle: "§ 123 ods. 1: 50 % × 5,259 × 10 = 26,30." }, fecha: "2026-06-15", entrada: { sobota: 0, nedela: 0, noc: 10, riziko: true, sviatok: 0, priemerny: 12 }, esperado: { zaNoc: 26.3 } },
]);
