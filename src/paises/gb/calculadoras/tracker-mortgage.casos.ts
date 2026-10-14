import { definirCasos } from "@/motor/calculo";
import calculadora from "./tracker-mortgage";

export default definirCasos(calculadora, [
  {
    nombre: "£200,000 over 25 years at Bank Rate + 1",
    origen: {
      tipo: "recalculado",
      url: "https://www.bankofengland.co.uk/boeapps/database/_iadb-fromshowcolumns.asp?csv.x=yes&Datefrom=01/Jan/2026&Dateto=now&SeriesCodes=IUDBEDR&CSVF=TN&UsingCodes=Y&VPD=Y&VFD=N",
      detalle: "Bank Rate 3.75% on 13 October 2026, so 4.75%. r = 0.0475/12, n = 300: payment 1,140.23. At 5%: 1,169.18 (+28.95). At 4.5%: −28.57. Interest 142,070.42.",
    },
    fecha: "2026-10-14",
    entrada: { prestamo: 200000, anios: 25, margen: 1 },
    esperado: { tasa: 4.75, bankRate: 3.75, pago: 1140.23, siSube: 28.95, siBaja: 28.57, intereses: 142070.42, total: 342070.42 },
  },
  {
    nombre: "£150,000 over 20 years at Bank Rate + 0.5",
    origen: { tipo: "recalculado", detalle: "3.75 + 0.5 = 4.25%. r = 0.0425/12, n = 240: payment 928.85." },
    fecha: "2026-10-14",
    entrada: { prestamo: 150000, anios: 20, margen: 0.5 },
    esperado: { tasa: 4.25, pago: 928.85 },
  },
  {
    nombre: "Formula with a fixed Bank Rate",
    origen: { tipo: "recalculado", detalle: "Bank Rate set to 5, margin 0: 5% on 200,000 over 25 years = 1,169.18." },
    fecha: "2026-10-14",
    entrada: { prestamo: 200000, anios: 25, margen: 0 },
    valores: { "gb.bank-rate": { fecha: "2026-10-13", valor: 5 } },
    esperado: { pago: 1169.18 },
  },
]);
