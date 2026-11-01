import { definirCasos } from "@/motor/calculo";
import minimalnaMzda from "./minimalna-mzda";

const ZP = "https://static.slov-lex.sk/static/SK/ZZ/2001/311/20260901.html";

export default definirCasos(minimalnaMzda, [
  {
    nombre: "1. stupeň, plný úväzok",
    origen: { tipo: "oficial", url: "https://employment.gov.sk/sk/praca-zamestnanost/vztah-zamestnanca-zamestnavatela/odmenovanie/minimalna-mzda/sumy-minimalnej-mzdy.html", detalle: "Minimálna mzda na rok 2026 je 915 eur a 5,259 eura za hodinu." },
    fecha: "2026-06-15",
    entrada: { stupen: "s1", hodiny: 40 },
    esperado: { mesacne: 915, zaHodinu: 5.259, cista: 728.9 },
  },
  {
    nombre: "6. stupeň podľa § 120 ods. 4",
    origen: { tipo: "recalculado", url: ZP, detalle: "915 − 580 + 580 × 2,0 = 1 495 eur." },
    fecha: "2026-06-15",
    entrada: { stupen: "s6", hodiny: 40 },
    esperado: { mesacne: 1495 },
  },
  {
    nombre: "2. stupeň na polovičný úväzok",
    origen: { tipo: "recalculado", url: ZP, detalle: "915 − 580 + 696 = 1 031; pri 20 hodinách polovica 515,50." },
    fecha: "2026-06-15",
    entrada: { stupen: "s2", hodiny: 20 },
    esperado: { mesacne: 515.5 },
  },
]);
