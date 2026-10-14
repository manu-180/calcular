import { definirCasos } from "@/motor/calculo";
import saeule3aRechner from "./saeule-3a-rechner";

const BSV = "https://www.bsv.admin.ch/de/newnsb/BqB41FVYi5FB";
const BVV3 = "https://www.fedlex.admin.ch/eli/cc/1985/1778_1778_1778/de#art_7";

export default definirCasos(saeule3aRechner, [
  {
    nombre: "Mit Pensionskasse, Maximum 2026",
    origen: {
      tipo: "recalculado",
      url: BSV,
      detalle: "Maximum 7258. Bundessteuer auf 80 000: 1378,22. Auf 72 742 (gerechnet 72 700): 612 + 147 × 2,97 = 1048,59. Ersparnis 329,63.",
    },
    fecha: "2026-10-14",
    entrada: { mitPk: true, erwerbseinkommen: null, beitrag: null, steuerbar: 80000, zivilstand: "alleinstehend", kinder: 0 },
    esperado: { maximum: 7258, abziehbar: 7258, vorher: 1378.22, nachher: 1048.59, ersparnis: 329.63 },
  },
  {
    nombre: "Ohne Pensionskasse, 20 % des Erwerbseinkommens",
    origen: {
      tipo: "recalculado",
      url: BVV3,
      detalle: "20 % von 50 000 = 10 000 (unter 36 288). Bundessteuer auf 50 000: 229,20 + 65 × 2,64 = 400,80; auf 40 000: 138,60 + 68 × 0,88 = 198,44. Ersparnis 202,36.",
    },
    fecha: "2026-10-14",
    entrada: { mitPk: false, erwerbseinkommen: 50000, beitrag: null, steuerbar: 50000, zivilstand: "alleinstehend", kinder: 0 },
    esperado: { maximum: 10000, abziehbar: 10000, ersparnis: 202.36 },
  },
  {
    nombre: "Einzahlung über dem Maximum",
    origen: { tipo: "recalculado", url: BSV, detalle: "Geplant 9000, abziehbar nur 7258." },
    fecha: "2026-10-14",
    entrada: { mitPk: true, erwerbseinkommen: null, beitrag: 9000, steuerbar: 80000, zivilstand: "alleinstehend", kinder: 0 },
    esperado: { abziehbar: 7258 },
  },
  {
    nombre: "Maximum ab 2027",
    origen: { tipo: "recalculado", url: BSV, detalle: "Ab 1. Januar 2027 mit Pensionskasse 7373 Franken." },
    fecha: "2027-02-01",
    entrada: { mitPk: true, erwerbseinkommen: null, beitrag: 3000, steuerbar: 80000, zivilstand: "alleinstehend", kinder: 0 },
    esperado: { maximum: 7373, abziehbar: 3000 },
  },
]);
