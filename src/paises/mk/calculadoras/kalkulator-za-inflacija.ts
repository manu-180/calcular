import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mk.kalkulator-za-inflacija",
  mercado: "mk",
  concepto: "inflacion",
  slug: "kalkulator-za-inflacija",
  estado: "publicado",
  requiere: { "mk.inflacija-godishna": "serie" },
  campos: [
    { id: "iznos", tipo: "moneda", etiqueta: "Износ", min: 0, porDefecto: 100000 },
    { id: "godini", tipo: "numero", etiqueta: "Години", min: 0, max: 50, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.iznos <= 0) throw new ErrorEntrada("Внесете износ поголем од нула.", "iznos");
    const stapka = v["mk.inflacija-godishna"].valor;
    const faktor = (1 + stapka / 100) ** e.godini;
    return {
      potreben: redondear(e.iznos * faktor),
      vrednost: redondear(e.iznos / faktor),
      stapka,
      zaguba: redondear(e.iznos - e.iznos / faktor),
    };
  },
  resultado: [
    { clave: "potreben", etiqueta: "Потребен износ за иста куповна моќ", formato: "moneda", destacada: true },
    { clave: "vrednost", etiqueta: "Куповна моќ на денешниот износ", formato: "moneda" },
    { clave: "zaguba", etiqueta: "Загуба на куповна моќ", formato: "moneda" },
    { clave: "stapka", etiqueta: "Применета годишна стапка", formato: "porcentaje", decimales: 1 },
  ],
});
