import { definirCasos } from "@/motor/calculo";
import pokharzhekiHashvich from "./pokharzheki-hashvich";

const CBA = "https://api.cba.am/ExchangeRatesToCSV.ashx?DateFrom=2026-10-30&DateTo=2026-10-30&ISOCodes=USD,EUR,RUB,GBP,GEL";

export default definirCasos(pokharzhekiHashvich, [
  { nombre: "100 դոլար", origen: { tipo: "oficial", url: CBA, detalle: "30/10/2026, USD 360,14. 100 × 360,14 = 36 014." }, fecha: "2026-11-01", entrada: { arzhuyt: "usd", ughghutyun: "dram", gumar: 100 }, esperado: { ardyunq: 36014, kurs: 360.14, fecha: "2026-10-30" } },
  { nombre: "100 000 դրամ եվրոյով", origen: { tipo: "oficial", url: CBA, detalle: "EUR 403,36. 100 000 / 403,36 = 247,92." }, fecha: "2026-11-01", entrada: { arzhuyt: "eur", ughghutyun: "arzhuyt", gumar: 100000 }, esperado: { ardyunq: 247.92 } },
  { nombre: "1000 ռուբլի", origen: { tipo: "oficial", url: CBA, detalle: "RUB 4,4854. 1000 × 4,4854 = 4485,4." }, fecha: "2026-11-01", entrada: { arzhuyt: "rub", ughghutyun: "dram", gumar: 1000 }, esperado: { ardyunq: 4485.4 } },
]);
