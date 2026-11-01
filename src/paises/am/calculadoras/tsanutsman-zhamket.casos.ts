import { definirCasos } from "@/motor/calculo";
import tsanutsmanZhamket from "./tsanutsman-zhamket";

const LEY = "https://www.arlis.am/hy/acts/66489/latest";

export default definirCasos(tsanutsmanZhamket, [
  { nombre: "Կրճատում՝ 2 ամիս", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 115 մաս 1: ոչ ուշ, քան երկու ամիս առաջ։ 2026-11-01 + 2 ամիս = 2027-01-01." }, fecha: "2026-11-01", entrada: { himq: "krchatum", stazh: null, sksum: "2026-11-01" }, esperado: { verj: "2027-01-01", orer: 61 } },
  { nombre: "Չհամապատասխանել՝ 1-5 տարի", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 115 մաս 1: 35 օր." }, fecha: "2026-11-01", entrada: { himq: "anhamapatasxan", stazh: "1-5", sksum: "2026-11-01" }, esperado: { verj: "2026-12-06", orer: 35 } },
  { nombre: "Աշխատող՝ 30 օր", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 112 մաս 1: առնվազն երեսուն օր." }, fecha: "2026-11-01", entrada: { himq: "ashkhatogh", stazh: null, sksum: "2026-11-01" }, esperado: { verj: "2026-12-01", orer: 30 } },
  { nombre: "Աշխատող՝ հարգելի պատճառ", origen: { tipo: "oficial", url: LEY, detalle: "Հոդված 112 մաս 2: առնվազն հինգ օր." }, fecha: "2026-11-01", entrada: { himq: "hargeli", stazh: null, sksum: "2026-12-29" }, esperado: { verj: "2027-01-03", orer: 5 } },
  { nombre: "Կրճատում՝ ամսվա վերջ", origen: { tipo: "recalculado", detalle: "2026-12-31 + 2 ամիս = 2027-02-28." }, fecha: "2026-11-01", entrada: { himq: "krchatum", stazh: null, sksum: "2026-12-31" }, esperado: { verj: "2027-02-28", orer: 59 } },
]);
