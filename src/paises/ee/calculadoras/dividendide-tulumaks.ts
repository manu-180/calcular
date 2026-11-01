import { definirCalculadora } from "@/motor/calculo";
import { suuremNullist } from "../lib/palk";

export default definirCalculadora({
  id: "ee.dividendide-tulumaks",
  mercado: "ee",
  concepto: "propio",
  slug: "dividendide-tulumaks",
  estado: "publicado",
  requiere: { "ee.tulumaks": "numero" },
  campos: [
    {
      id: "suund",
      tipo: "opcion",
      etiqueta: "Mis summa on sul teada?",
      opciones: [
        { valor: "neto", etiqueta: "Omanikule makstav netodividend" },
        { valor: "kasum", etiqueta: "Jaotamiseks kasutatav kasum (koos maksuga)" },
      ],
      porDefecto: "neto",
    },
    { id: "summa", tipo: "moneda", etiqueta: "Summa", min: 0, porDefecto: 7800 },
  ],
  calcular(e, v, { redondear }) {
    suuremNullist(e.summa, "summa");
    const t = v["ee.tulumaks"];
    const neto = e.suund === "neto" ? e.summa : redondear((e.summa * (100 - t)) / 100);
    const maks = e.suund === "neto" ? redondear((neto * t) / (100 - t)) : redondear(e.summa - neto);
    return { maks, neto, kasum: redondear(neto + maks), kordaja: `${t}/${100 - t}` };
  },
  resultado: [
    { clave: "maks", etiqueta: "Ettevõtte tulumaks", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Omanikule makstav dividend", formato: "moneda" },
    { clave: "kasum", etiqueta: "Kasutatud kasum kokku", formato: "moneda" },
    { clave: "kordaja", etiqueta: "Maksumäär netodividendilt", formato: "texto" },
  ],
});
