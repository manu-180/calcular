import { definirCasos } from "@/motor/calculo";
import vypovednaDoba from "./vypovedna-doba";

const ZP = "https://static.slov-lex.sk/static/SK/ZZ/2001/311/20260901.html";

export default definirCasos(vypovednaDoba, [
  { nombre: "Organizačné dôvody, 6 rokov", origen: { tipo: "recalculado", url: ZP, detalle: "§ 62 ods. 3 písm. b): tri mesiace; doručenie 15. 3., plynie od 1. 4. do 30. 6." }, fecha: "2026-03-15", entrada: { dovod: "organizacne", roky: 6, dorucene: "2026-03-15" }, esperado: { mesiace: 3, koniec: "2026-06-30" } },
  { nombre: "Zamestnanec, 3 roky", origen: { tipo: "recalculado", url: ZP, detalle: "§ 62 ods. 6: dva mesiace." }, fecha: "2026-11-20", entrada: { dovod: "zamestnanec", roky: 3, dorucene: "2026-11-20" }, esperado: { mesiace: 2, koniec: "2027-01-31" } },
  { nombre: "Menej ako rok", origen: { tipo: "recalculado", url: ZP, detalle: "§ 62 ods. 2: jeden mesiac." }, fecha: "2026-01-10", entrada: { dovod: "ine", roky: 0.5, dorucene: "2026-01-10" }, esperado: { mesiace: 1, koniec: "2026-02-28" } },
]);
