import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ge.saprotsento-shemosavlis-gadasakhadi",
  mercado: "ge",
  concepto: "propio",
  slug: "saprotsento-shemosavlis-gadasakhadi",
  estado: "borrador",
  requiere: { "ge.protsenti": "numero", "ge.mpr": "numero" },
  campos: [
    { id: "tanxa", tipo: "moneda", etiqueta: "სესხის ან ანაბრის თანხა", min: 0, porDefecto: 10000 },
    { id: "ganakveti", tipo: "porcentaje", etiqueta: "წლიური საპროცენტო განაკვეთი", min: 0, max: 100, porDefecto: 10 },
    { id: "tve", tipo: "entero", etiqueta: "ვადა თვეებში", min: 1, max: 600, porDefecto: 12 },
    {
      id: "gamcemi",
      tipo: "opcion",
      etiqueta: "ვინ გიხდით პროცენტს",
      opciones: [
        { valor: "sxva", etiqueta: "კომპანია ან მეწარმე" },
        { valor: "licenzirebuli", etiqueta: "ლიცენზირებული ფინანსური ინსტიტუტი" },
      ],
      porDefecto: "sxva",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.tanxa <= 0) throw new ErrorEntrada("შეიყვანეთ ნულზე მეტი თანხა.", "tanxa");
    const protsenti = redondear((e.tanxa * e.ganakveti * e.tve) / 1200);
    const licenzirebuli = e.gamcemi === "licenzirebuli";
    const gadasakhadi = licenzirebuli ? 0 : redondear((protsenti * v["ge.protsenti"]) / 100);
    const observaciones = licenzirebuli ? ["კოდექსის 131-ე მუხლის მე-5 ნაწილი ამ პროცენტს წყაროსთან არ ბეგრავს. ანაბრის ფაქტობრივი დაკავება ბანკის ამონაწერში შეამოწმეთ."] : [];
    return { kheze: redondear(protsenti - gadasakhadi), protsenti, gadasakhadi, mpr: v["ge.mpr"], observaciones };
  },
  resultado: [
    { clave: "kheze", etiqueta: "პროცენტი გადასახადის შემდეგ", formato: "moneda", destacada: true },
    { clave: "protsenti", etiqueta: "დარიცხული პროცენტი", formato: "moneda" },
    { clave: "gadasakhadi", etiqueta: "გადასახადი გადახდის წყაროსთან", formato: "moneda" },
    { clave: "mpr", etiqueta: "ეროვნული ბანკის განაკვეთი შესადარებლად", formato: "porcentaje" },
  ],
});
