import { definirCalculadora } from "@/motor/calculo";
import { izracunPlace, prispevkiDelodajalca, REQ_PLACA } from "../lib/placa";

export default definirCalculadora({
  id: "si.minimalna-placa",
  mercado: "si",
  concepto: "salario-minimo",
  slug: "minimalna-placa",
  estado: "publicado",
  requiere: { ...REQ_PLACA, "si.minimalna-placa": "numero" },
  campos: [{ id: "delez", tipo: "porcentaje", etiqueta: "Delež polnega delovnega časa", min: 1, max: 100, porDefecto: 100 }],
  calcular(e, v, { redondear }) {
    const bruto = redondear((v["si.minimalna-placa"] * e.delez) / 100);
    const p = izracunPlace(bruto, { otroci: 0, do29: false, delez: e.delez }, v, redondear);
    const d = prispevkiDelodajalca(bruto, e.delez, v, redondear);
    return { bruto, neto: p.neto, akontacija: p.akontacija, prispevki: p.prispevki.skupaj, strosek: redondear(bruto + d.skupaj) };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Minimalna bruto plača", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Neto plača brez otrok", formato: "moneda" },
    { clave: "prispevki", etiqueta: "Prispevki delavca z OZP", formato: "moneda" },
    { clave: "akontacija", etiqueta: "Akontacija dohodnine", formato: "moneda" },
    { clave: "strosek", etiqueta: "Mesečni strošek delodajalca", formato: "moneda" },
  ],
});
