import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { nahor10, nahor4 } from "../lib/zaokruhlenie";

export default definirCalculadora({
  id: "sk.kalkulacka-dochodku",
  mercado: "sk",
  concepto: "jubilacion",
  slug: "kalkulacka-dochodku",
  estado: "publicado",
  requiere: { "sk.adh": "numero", "sk.dochodok-koef": "mapa" },
  campos: [
    { id: "body", tipo: "numero", etiqueta: "Priemerný osobný mzdový bod", min: 0.01, max: 10, porDefecto: 1, ayuda: "Hodnota 1 znamená, že ste celý život zarábali presne priemernú mzdu. Polovičná mzda je 0,5." },
    { id: "roky", tipo: "numero", etiqueta: "Roky dôchodkového poistenia", min: 1, max: 60, porDefecto: 40 },
  ],
  calcular(e, v) {
    if (e.body <= 0) throw new ErrorEntrada("Zadajte kladný mzdový bod.", "body");
    const k = v["sk.dochodok-koef"];
    let upraveny = e.body;
    if (e.body < 1) upraveny = e.body + (1 - e.body) * k["nizky-prijem"];
    else if (e.body > k.hranica) upraveny = k.hranica + (Math.min(e.body, k.strop) - k.hranica) * k["nad-hranicou"];
    upraveny = nahor4(upraveny);
    return { dochodok: nahor10(upraveny * e.roky * v["sk.adh"]), upraveny, adh: v["sk.adh"] };
  },
  resultado: [
    { clave: "dochodok", etiqueta: "Odhad starobného dôchodku za mesiac", formato: "moneda", destacada: true },
    { clave: "upraveny", etiqueta: "Mzdový bod po úprave podľa § 63", formato: "numero", decimales: 4 },
    { clave: "adh", etiqueta: "Aktuálna dôchodková hodnota", formato: "moneda", decimales: 4 },
  ],
});
