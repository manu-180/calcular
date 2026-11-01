import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ge.sashemosavlo-gadasakhadi",
  mercado: "ge",
  concepto: "impuesto-renta",
  slug: "sashemosavlo-gadasakhadi",
  estado: "publicado",
  requiere: {
    "ge.sashemosavlo": "numero",
    "ge.qira": "numero",
    "ge.nameti": "numero",
    "ge.dividendi": "numero",
    "ge.protsenti": "numero",
    "ge.pensia-dasaqmebuli": "numero",
  },
  campos: [
    {
      id: "tipi",
      tipo: "opcion",
      etiqueta: "შემოსავლის სახე",
      opciones: [
        { valor: "khelpasi", etiqueta: "ხელფასი" },
        { valor: "sxva", etiqueta: "სხვა დასაბეგრი შემოსავალი" },
        { valor: "qira", etiqueta: "საცხოვრებელი ფართობის გაქირავება" },
        { valor: "nameti", etiqueta: "ბინის ან ავტომობილის გაყიდვის ნამეტი" },
        { valor: "dividendi", etiqueta: "დივიდენდი" },
        { valor: "protsenti", etiqueta: "პროცენტი (ლიცენზირებული ინსტიტუტის გარდა)" },
      ],
      porDefecto: "khelpasi",
    },
    { id: "tanxa", tipo: "moneda", etiqueta: "შემოსავლის თანხა", min: 0, porDefecto: 1000 },
    { id: "monatsile", tipo: "si-no", etiqueta: "მონაწილეობთ საპენსიო სქემაში", porDefecto: true, visibleSi: { tipi: ["khelpasi"] } },
  ],
  calcular(e, v, { redondear }) {
    if (e.tanxa <= 0) throw new ErrorEntrada("შეიყვანეთ ნულზე მეტი თანხა.", "tanxa");
    const ganakveti = {
      khelpasi: v["ge.sashemosavlo"],
      sxva: v["ge.sashemosavlo"],
      qira: v["ge.qira"],
      nameti: v["ge.nameti"],
      dividendi: v["ge.dividendi"],
      protsenti: v["ge.protsenti"],
    }[e.tipi];
    const pensia = e.tipi === "khelpasi" && e.monatsile ? redondear((e.tanxa * v["ge.pensia-dasaqmebuli"]) / 100) : 0;
    const baza = redondear(e.tanxa - pensia);
    const gadasakhadi = redondear((baza * ganakveti) / 100);
    return { gadasakhadi, ganakveti, baza, pensia, darcheni: redondear(e.tanxa - pensia - gadasakhadi) };
  },
  resultado: [
    { clave: "gadasakhadi", etiqueta: "საშემოსავლო გადასახადი", formato: "moneda", destacada: true },
    { clave: "ganakveti", etiqueta: "განაკვეთი", formato: "porcentaje" },
    { clave: "baza", etiqueta: "დასაბეგრი თანხა", formato: "moneda" },
    { clave: "pensia", etiqueta: "საპენსიო შენატანი", formato: "moneda", ocultarSiCero: true },
    { clave: "darcheni", etiqueta: "გადასახადის შემდეგ რჩება", formato: "moneda" },
  ],
});
