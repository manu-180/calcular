import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ge.kiris-gadasakhadi",
  mercado: "ge",
  concepto: "propio",
  slug: "kiris-gadasakhadi",
  estado: "publicado",
  requiere: { "ge.qira": "numero", "ge.sashemosavlo": "numero" },
  campos: [
    { id: "qira", tipo: "moneda", etiqueta: "ქირა თვეში", min: 0, porDefecto: 1500 },
    {
      id: "tipi",
      tipo: "opcion",
      etiqueta: "რას აქირავებთ",
      opciones: [
        { valor: "sacxovrebeli", etiqueta: "საცხოვრებელს, საცხოვრებლად, ხარჯების გამოქვითვის გარეშე" },
        { valor: "sxva", etiqueta: "სხვა ფართს ან სხვა მიზნით" },
      ],
      porDefecto: "sacxovrebeli",
    },
    { id: "tve", tipo: "entero", etiqueta: "რამდენი თვე აქირავებთ წელიწადში", min: 1, max: 12, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.qira <= 0) throw new ErrorEntrada("შეიყვანეთ ნულზე მეტი თანხა.", "qira");
    const ganakveti = e.tipi === "sacxovrebeli" ? v["ge.qira"] : v["ge.sashemosavlo"];
    const shemosavali = redondear(e.qira * e.tve);
    const tslis = redondear((shemosavali * ganakveti) / 100);
    return { tslis, tvis: redondear((e.qira * ganakveti) / 100), ganakveti, shemosavali, darcheni: redondear(shemosavali - tslis) };
  },
  resultado: [
    { clave: "tslis", etiqueta: "გადასახადი წელიწადში", formato: "moneda", destacada: true },
    { clave: "tvis", etiqueta: "გადასახადი თვეში", formato: "moneda" },
    { clave: "ganakveti", etiqueta: "განაკვეთი", formato: "porcentaje" },
    { clave: "shemosavali", etiqueta: "ქირით მიღებული შემოსავალი", formato: "moneda" },
    { clave: "darcheni", etiqueta: "გადასახადის შემდეგ რჩება", formato: "moneda" },
  ],
});
