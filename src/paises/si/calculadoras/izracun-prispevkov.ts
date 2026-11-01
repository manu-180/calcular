import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { prispevkiDelavca, prispevkiDelodajalca, REQ_PLACA } from "../lib/placa";

export default definirCalculadora({
  id: "si.izracun-prispevkov",
  mercado: "si",
  concepto: "aportes-seguridad-social",
  slug: "izracun-prispevkov",
  estado: "publicado",
  requiere: { ...REQ_PLACA },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Mesečna bruto plača", min: 0, porDefecto: 2500 },
    { id: "delez", tipo: "porcentaje", etiqueta: "Delež polnega delovnega časa", min: 1, max: 100, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Vnesite bruto plačo, večjo od nič.", "bruto");
    const z = prispevkiDelavca(e.bruto, e.delez, v, redondear);
    const d = prispevkiDelodajalca(e.bruto, e.delez, v, redondear);
    return {
      delavec: z.skupaj,
      piz: z.piz,
      zz: z.zz,
      dolg: z.dolg,
      drugi: redondear(z.starsevsko + z.zaposlovanje),
      ozp: z.ozp,
      delodajalec: d.skupaj,
      skupaj: redondear(z.skupaj + d.skupaj),
      osnova: redondear(z.osnova),
    };
  },
  resultado: [
    { clave: "delavec", etiqueta: "Prispevki delavca skupaj", formato: "moneda", destacada: true },
    { clave: "piz", etiqueta: "Pokojninsko in invalidsko zavarovanje", formato: "moneda" },
    { clave: "zz", etiqueta: "Zdravstveno zavarovanje", formato: "moneda" },
    { clave: "dolg", etiqueta: "Dolgotrajna oskrba", formato: "moneda" },
    { clave: "drugi", etiqueta: "Starševsko varstvo in zaposlovanje", formato: "moneda" },
    { clave: "ozp", etiqueta: "Obvezni zdravstveni prispevek", formato: "moneda" },
    { clave: "delodajalec", etiqueta: "Prispevki, ki jih plača delodajalec", formato: "moneda" },
    { clave: "skupaj", etiqueta: "Vsi prispevki skupaj", formato: "moneda" },
    { clave: "osnova", etiqueta: "Osnova za prispevke", formato: "moneda" },
  ],
});
