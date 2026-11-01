import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "am.droshmanishayin-vchar",
  mercado: "am",
  concepto: "propio",
  slug: "droshmanishayin-vchar",
  estado: "publicado",
  requiere: {
    "am.drosh-tsatsr": "numero",
    "am.drosh-bardzr": "numero",
    "am.drosh-shem": "numero",
    "am.drosh-dz-tsatsr": "numero",
    "am.drosh-dz-bardzr": "numero",
    "am.drosh-dz-shem": "numero",
  },
  campos: [
    {
      id: "tesak",
      tipo: "opcion",
      etiqueta: "Ո՞վ է վճարողը",
      opciones: [
        { valor: "ashkhatogh", etiqueta: "Աշխատող (ամսական աշխատավարձ)" },
        { valor: "dzernarkater", etiqueta: "Անհատ ձեռնարկատեր կամ նոտար (տարեկան եկամուտ)" },
      ],
      porDefecto: "ashkhatogh",
    },
    { id: "gumar", tipo: "moneda", etiqueta: "Հաշվարկման բազա", ayuda: "Աշխատողի համար՝ ամսական աշխատավարձը, ձեռնարկատիրոջ համար՝ տարեկան եկամուտը կամ շրջանառությունը։", min: 0, porDefecto: 400000 },
  ],
  calcular(e, v) {
    if (e.gumar <= 0) throw new ErrorEntrada("Մուտքագրեք զրոյից մեծ գումար։", "gumar");
    const ashkhatogh = e.tesak === "ashkhatogh";
    const vchar = ashkhatogh
      ? e.gumar > v["am.drosh-shem"] ? v["am.drosh-bardzr"] : v["am.drosh-tsatsr"]
      : e.gumar > v["am.drosh-dz-shem"] ? v["am.drosh-dz-bardzr"] : v["am.drosh-dz-tsatsr"];
    return { vchar, tarekan: ashkhatogh ? vchar * 12 : vchar };
  },
  resultado: [
    { clave: "vchar", etiqueta: "Դրոշմանիշային վճար հաշվետու ժամանակաշրջանի համար", formato: "moneda", destacada: true },
    { clave: "tarekan", etiqueta: "Դրոշմանիշային վճարը տարեկան", formato: "moneda" },
  ],
});
