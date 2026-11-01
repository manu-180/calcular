import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { sakhelmtsipoTslshi } from "../lib/khelpasi";

export default definirCalculadora({
  id: "ge.sapensio-shenatani",
  mercado: "ge",
  concepto: "aportes-seguridad-social",
  slug: "sapensio-shenatani",
  estado: "publicado",
  requiere: {
    "ge.pensia-dasaqmebuli": "numero",
    "ge.pensia-damsaqmebeli": "numero",
    "ge.pensia-sakhelmtsipo": "numero",
    "ge.pensia-sakhelmtsipo-2": "numero",
    "ge.pensia-zghvari-1": "numero",
    "ge.pensia-zghvari-2": "numero",
  },
  campos: [
    { id: "khelpasi", tipo: "moneda", etiqueta: "დარიცხული ხელფასი ან შემოსავალი თვეში", min: 0, porDefecto: 2000 },
    {
      id: "tipi",
      tipo: "opcion",
      etiqueta: "თქვენი სტატუსი",
      opciones: [
        { valor: "dasaqmebuli", etiqueta: "დასაქმებული" },
        { valor: "tvitdasaqmebuli", etiqueta: "თვითდასაქმებული" },
      ],
      porDefecto: "dasaqmebuli",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.khelpasi <= 0) throw new ErrorEntrada("შეიყვანეთ ნულზე მეტი თანხა.", "khelpasi");
    const tslshi = e.khelpasi * 12;
    const piradi = (e.khelpasi * v["ge.pensia-dasaqmebuli"]) / 100;
    const damsaqmebeli = (e.khelpasi * v["ge.pensia-damsaqmebeli"]) / 100;
    const sakhelmtsipoTsl = sakhelmtsipoTslshi(tslshi, { pirveli: v["ge.pensia-sakhelmtsipo"], meore: v["ge.pensia-sakhelmtsipo-2"], zghvari1: v["ge.pensia-zghvari-1"], zghvari2: v["ge.pensia-zghvari-2"] });
    const tvit = e.tipi === "tvitdasaqmebuli";
    return {
      sul: redondear(piradi + damsaqmebeli + sakhelmtsipoTsl / 12),
      piradi: redondear(tvit ? piradi + damsaqmebeli : piradi),
      damsaqmebeli: redondear(tvit ? 0 : damsaqmebeli),
      sakhelmtsipo: redondear(sakhelmtsipoTsl / 12),
      tslshi: redondear((piradi + damsaqmebeli) * 12 + sakhelmtsipoTsl),
    };
  },
  resultado: [
    { clave: "sul", etiqueta: "საპენსიო ანგარიშზე თვეში სულ", formato: "moneda", destacada: true },
    { clave: "piradi", etiqueta: "თქვენი შენატანი", formato: "moneda" },
    { clave: "damsaqmebeli", etiqueta: "დამსაქმებლის შენატანი", formato: "moneda", ocultarSiCero: true },
    { clave: "sakhelmtsipo", etiqueta: "სახელმწიფოს შენატანი, თვის საშუალო", formato: "moneda" },
    { clave: "tslshi", etiqueta: "ანგარიშზე წელიწადში სულ", formato: "moneda" },
  ],
});
