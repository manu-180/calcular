import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import { suuremNullist } from "../lib/palk";

export default definirCalculadora({
  id: "ee.kaibemaksu-kalkulaator",
  mercado: "ee",
  concepto: "iva",
  slug: "kaibemaksu-kalkulaator",
  estado: "publicado",
  requiere: { "ee.kaibemaks": "mapa", "ee.kaibemaksu-piir": "numero" },
  campos: [
    {
      id: "suund",
      tipo: "opcion",
      etiqueta: "Mida arvutada?",
      opciones: [
        { valor: "lisa", etiqueta: "Lisa käibemaks summale" },
        { valor: "eemalda", etiqueta: "Eemalda käibemaks summast" },
      ],
      porDefecto: "lisa",
    },
    { id: "summa", tipo: "moneda", etiqueta: "Summa", min: 0, porDefecto: 100 },
    { id: "maar", tipo: "opcion-dato", dato: "ee.kaibemaks", etiqueta: "Käibemaksumäär", porDefecto: "tavamaar" },
  ],
  calcular(e, v, { redondear }) {
    suuremNullist(e.summa, "summa");
    const maar = enMapa(v["ee.kaibemaks"], e.maar);
    const ilma = e.suund === "lisa" ? e.summa : redondear(e.summa / (1 + maar / 100));
    const kaibemaks = e.suund === "lisa" ? redondear(porcentaje(ilma, maar)) : redondear(e.summa - ilma);
    return { kaibemaks, ilma, koos: redondear(ilma + kaibemaks), maar };
  },
  resultado: [
    { clave: "kaibemaks", etiqueta: "Käibemaks", formato: "moneda", destacada: true },
    { clave: "ilma", etiqueta: "Summa ilma käibemaksuta", formato: "moneda" },
    { clave: "koos", etiqueta: "Summa koos käibemaksuga", formato: "moneda" },
    { clave: "maar", etiqueta: "Kasutatud määr", formato: "porcentaje" },
  ],
});
