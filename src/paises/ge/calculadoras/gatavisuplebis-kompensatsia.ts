import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ge.gatavisuplebis-kompensatsia",
  mercado: "ge",
  concepto: "indemnizacion-despido",
  slug: "gatavisuplebis-kompensatsia",
  estado: "publicado",
  requiere: {
    "ge.kompensatsia-30": "numero",
    "ge.kompensatsia-3": "numero",
    "ge.gaprtkhileba-30": "numero",
    "ge.gaprtkhileba-3": "numero",
    "ge.angarishsworeba": "numero",
  },
  campos: [
    { id: "khelpasi", tipo: "moneda", etiqueta: "თვიური შრომის ანაზღაურება", min: 0, porDefecto: 2100 },
    {
      id: "gaprtkhileba",
      tipo: "opcion",
      etiqueta: "რამდენი დღით ადრე გაგაფრთხილათ დამსაქმებელმა",
      opciones: [
        { valor: "30", etiqueta: "არანაკლებ 30 კალენდარული დღით ადრე" },
        { valor: "3", etiqueta: "არანაკლებ 3 კალენდარული დღით ადრე" },
      ],
      porDefecto: "30",
    },
    { id: "dghe", tipo: "entero", etiqueta: "გამოუყენებელი შვებულების სამუშაო დღეები", min: 0, porDefecto: 0 },
    { id: "samushao", tipo: "entero", etiqueta: "სამუშაო დღეები თვეში", min: 1, max: 31, porDefecto: 21 },
  ],
  calcular(e, v, { redondear }) {
    if (e.khelpasi <= 0) throw new ErrorEntrada("შეიყვანეთ ნულზე მეტი თანხა.", "khelpasi");
    const tveebi = e.gaprtkhileba === "30" ? v["ge.kompensatsia-30"] : v["ge.kompensatsia-3"];
    const kompensatsia = redondear(e.khelpasi * tveebi);
    const shvebuleba = redondear((e.khelpasi / e.samushao) * e.dghe);
    return { sul: redondear(kompensatsia + shvebuleba), kompensatsia, shvebuleba, tveebi, vada: v["ge.angarishsworeba"] };
  },
  resultado: [
    { clave: "sul", etiqueta: "მინიმალური თანხა სულ (ბრუტო)", formato: "moneda", destacada: true },
    { clave: "kompensatsia", etiqueta: "კომპენსაცია", formato: "moneda" },
    { clave: "tveebi", etiqueta: "კომპენსაცია თვეებში", formato: "meses" },
    { clave: "shvebuleba", etiqueta: "გამოუყენებელი შვებულება", formato: "moneda", ocultarSiCero: true },
    { clave: "vada", etiqueta: "საბოლოო ანგარიშსწორების ვადა", formato: "dias" },
  ],
});
