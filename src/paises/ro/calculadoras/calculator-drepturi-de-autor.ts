import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { bazaCassTrepte, leu } from "../lib/fiscal";

export default definirCalculadora({
  id: "ro.calculator-drepturi-de-autor",
  mercado: "ro",
  concepto: "propio",
  slug: "calculator-drepturi-de-autor",
  estado: "publicado",
  requiere: {
    "ro.forfetar-drepturi-autor": "numero",
    "ro.impozit-venit": "numero",
    "ro.cas": "numero",
    "ro.cass": "numero",
    "ro.plafoane-cas": "mapa",
    "ro.plafoane-cass": "mapa",
    "ro.salariu-minim-1-ianuarie": "numero",
  },
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Drepturi de autor brute încasate în an", min: 0, porDefecto: 60000 },
    { id: "salariat", tipo: "si-no", etiqueta: "Aveți și venituri din salarii", porDefecto: false, ayuda: "Cu salariu nu datorați CAS pentru drepturile de autor." },
    { id: "pensionar", tipo: "si-no", etiqueta: "Sunteți pensionar", porDefecto: false },
  ],
  calcular(e, v) {
    if (e.brut <= 0) throw new ErrorEntrada("Introduceți suma brută a drepturilor de autor.", "brut");
    const cheltuieli = leu((e.brut * v["ro.forfetar-drepturi-autor"]) / 100);
    const net = e.brut - cheltuieli;
    const impozit = leu((net * v["ro.impozit-venit"]) / 100);
    const sm = v["ro.salariu-minim-1-ianuarie"];
    const pc = v["ro.plafoane-cas"];
    let bazaCas = 0;
    if (!e.salariat && !e.pensionar) {
      if (net >= enMapa(pc, "maxim") * sm) bazaCas = enMapa(pc, "maxim") * sm;
      else if (net >= enMapa(pc, "minim") * sm) bazaCas = enMapa(pc, "minim") * sm;
    }
    const cas = leu((bazaCas * v["ro.cas"]) / 100);
    const bazaCass = bazaCassTrepte(net, sm, v["ro.plafoane-cass"]);
    const cass = leu((bazaCass * v["ro.cass"]) / 100);
    return {
      ramas: e.brut - impozit - cas - cass,
      net,
      impozit,
      cas,
      cass,
      total: impozit + cas + cass,
      observaciones: ["CAS și CASS se stabilesc pe an, după totalul veniturilor. Dacă aveți și alte venituri din chirii sau dividende, CASS se calculează pe toate împreună."],
    };
  },
  resultado: [
    { clave: "ramas", etiqueta: "Vă rămân în an", formato: "moneda", destacada: true },
    { clave: "net", etiqueta: "Venit net (după cota forfetară)", formato: "moneda" },
    { clave: "impozit", etiqueta: "Impozit pe venit (reținut de plătitor)", formato: "moneda" },
    { clave: "cas", etiqueta: "CAS", formato: "moneda" },
    { clave: "cass", etiqueta: "CASS", formato: "moneda" },
    { clave: "total", etiqueta: "Total impozit și contribuții", formato: "moneda" },
  ],
});
