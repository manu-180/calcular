import { definirCasos } from "@/motor/calculo";
import odstupne from "./odstupne";

const ZP = "https://static.slov-lex.sk/static/SK/ZZ/2001/311/20260901.html";

export default definirCasos(odstupne, [
  { nombre: "Výpoveď, 6 rokov", origen: { tipo: "recalculado", url: ZP, detalle: "§ 76 ods. 1 písm. b): dvojnásobok." }, fecha: "2026-06-15", entrada: { zarobok: 1800, roky: 6, sposob: "vypoved" }, esperado: { odstupne: 3600, nasobok: 2 } },
  { nombre: "Dohoda, 6 rokov", origen: { tipo: "recalculado", url: ZP, detalle: "§ 76 ods. 2 písm. c): trojnásobok." }, fecha: "2026-06-15", entrada: { zarobok: 1800, roky: 6, sposob: "dohoda" }, esperado: { odstupne: 5400 } },
  { nombre: "Dohoda, 20 rokov", origen: { tipo: "recalculado", url: ZP, detalle: "§ 76 ods. 2 písm. e): päťnásobok." }, fecha: "2026-06-15", entrada: { zarobok: 1000, roky: 20, sposob: "dohoda" }, esperado: { odstupne: 5000 } },
  { nombre: "Výpoveď, jeden rok", origen: { tipo: "recalculado", url: ZP, detalle: "§ 76 ods. 1: pod dva roky bez nároku." }, fecha: "2026-06-15", entrada: { zarobok: 1800, roky: 1, sposob: "vypoved" }, esperado: { odstupne: 0 } },
]);
