import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { bazaCassTrepte, leu } from "../lib/fiscal";

export default definirCalculadora({
  id: "ro.impozit-dividende",
  mercado: "ro",
  concepto: "propio",
  slug: "impozit-dividende",
  estado: "publicado",
  requiere: {
    "ro.impozit-dividende": "numero",
    "ro.cass": "numero",
    "ro.plafoane-cass": "mapa",
    "ro.salariu-minim-1-ianuarie": "numero",
  },
  campos: [
    { id: "dividende", tipo: "moneda", etiqueta: "Dividende brute distribuite în an", min: 0, porDefecto: 100000 },
    { id: "alteVenituri", tipo: "moneda", etiqueta: "Alte venituri pentru CASS în același an (chirii, dobânzi, drepturi de autor)", min: 0, porDefecto: 0, ayuda: "Venitul net din aceste surse. Dobânzile se trec după impozit." },
  ],
  calcular(e, v) {
    if (e.dividende <= 0) throw new ErrorEntrada("Introduceți dividendele brute.", "dividende");
    const impozit = leu((e.dividende * v["ro.impozit-dividende"]) / 100);
    const net = e.dividende - impozit;
    const sm = v["ro.salariu-minim-1-ianuarie"];
    const total = net + (e.alteVenituri ?? 0);
    const bazaCass = bazaCassTrepte(total, sm, v["ro.plafoane-cass"]);
    const cass = leu((bazaCass * v["ro.cass"]) / 100);
    return {
      impozit,
      net,
      bazaCass,
      cass,
      ramas: net - cass,
      observaciones: cass > 0 ? ["CASS se plătește prin Declarația unică, până la 25 mai a anului următor, pentru toate veniturile din alte surse luate împreună."] : [],
    };
  },
  resultado: [
    { clave: "ramas", etiqueta: "Vă rămân după impozit și CASS", formato: "moneda", destacada: true },
    { clave: "impozit", etiqueta: "Impozit pe dividende reținut de firmă", formato: "moneda" },
    { clave: "net", etiqueta: "Dividende nete încasate", formato: "moneda" },
    { clave: "bazaCass", etiqueta: "Baza CASS", formato: "moneda" },
    { clave: "cass", etiqueta: "CASS datorată", formato: "moneda" },
  ],
});
