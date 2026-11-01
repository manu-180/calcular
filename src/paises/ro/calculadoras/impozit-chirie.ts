import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { bazaCassTrepte, leu } from "../lib/fiscal";

export default definirCalculadora({
  id: "ro.impozit-chirie",
  mercado: "ro",
  concepto: "propio",
  slug: "impozit-chirie",
  estado: "publicado",
  requiere: {
    "ro.forfetar-chirii": "numero",
    "ro.impozit-venit": "numero",
    "ro.cass": "numero",
    "ro.plafoane-cass": "mapa",
    "ro.salariu-minim-1-ianuarie": "numero",
  },
  campos: [
    { id: "chirie", tipo: "moneda", etiqueta: "Chiria lunară din contract", min: 0, porDefecto: 2500 },
    { id: "luni", tipo: "entero", etiqueta: "Luni închiriate în an", min: 1, max: 12, porDefecto: 12 },
    { id: "alteVenituri", tipo: "moneda", etiqueta: "Alte venituri nete pentru CASS în același an (dividende, dobânzi)", min: 0, porDefecto: 0 },
  ],
  calcular(e, v) {
    if (e.chirie <= 0) throw new ErrorEntrada("Introduceți chiria lunară.", "chirie");
    if (e.luni < 1 || e.luni > 12) throw new ErrorEntrada("Un an are între 1 și 12 luni de închiriere.", "luni");
    const brut = e.chirie * e.luni;
    const cheltuieli = leu((brut * v["ro.forfetar-chirii"]) / 100);
    const net = brut - cheltuieli;
    const impozit = leu((net * v["ro.impozit-venit"]) / 100);
    const bazaCass = bazaCassTrepte(net + (e.alteVenituri ?? 0), v["ro.salariu-minim-1-ianuarie"], v["ro.plafoane-cass"]);
    const cass = leu((bazaCass * v["ro.cass"]) / 100);
    return {
      impozit,
      cass,
      total: impozit + cass,
      brut,
      net,
      ramas: brut - impozit - cass,
      impozitLunar: Number((impozit / e.luni).toFixed(2)),
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total de plată pe an (impozit și CASS)", formato: "moneda", destacada: true },
    { clave: "impozit", etiqueta: "Impozit pe venitul din chirii", formato: "moneda" },
    { clave: "cass", etiqueta: "CASS", formato: "moneda" },
    { clave: "brut", etiqueta: "Venit brut din chirii", formato: "moneda" },
    { clave: "net", etiqueta: "Venit net (după cota forfetară)", formato: "moneda" },
    { clave: "impozitLunar", etiqueta: "Impozit pe lună de chirie", formato: "moneda" },
    { clave: "ramas", etiqueta: "Vă rămân din chirii", formato: "moneda" },
  ],
});
