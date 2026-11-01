import { definirCasos } from "@/motor/calculo";
import rodicovskyPrispevok from "./rodicovsky-prispevok";

const RP = "https://www.employment.gov.sk/sk/rodina-socialna-pomoc/podpora-rodinam-detmi/penazna-pomoc/rodicovsky-prispevok/vyska-prispevku.html";
const Z = "https://static.slov-lex.sk/static/SK/ZZ/2009/571/";

export default definirCasos(rodicovskyPrispevok, [
  { nombre: "Po materskom", origen: { tipo: "oficial", url: RP, detalle: "500,10 eura mesačne." }, fecha: "2026-06-15", entrada: { druh: "po-materskom", deti: 1, materske: 0 }, esperado: { vyplata: 500.1 } },
  { nombre: "Bez materského", origen: { tipo: "oficial", url: RP, detalle: "364,80 eura mesačne." }, fecha: "2026-06-15", entrada: { druh: "zakladny", deti: 1, materske: 0 }, esperado: { vyplata: 364.8 } },
  { nombre: "Dvojičky po materskom", origen: { tipo: "recalculado", url: Z, detalle: "§ 4 ods. 2: 500,10 × 1,25 = 625,125, na desať centov 625,10." }, fecha: "2026-06-15", entrada: { druh: "po-materskom", deti: 2, materske: 0 }, esperado: { suma: 625.1 } },
  { nombre: "Doplatok k nižšiemu materskému", origen: { tipo: "oficial", url: RP, detalle: "Rozdiel 500,10 − 300 = 200,10." }, fecha: "2026-06-15", entrada: { druh: "po-materskom", deti: 1, materske: 300 }, esperado: { vyplata: 200.1 } },
]);
