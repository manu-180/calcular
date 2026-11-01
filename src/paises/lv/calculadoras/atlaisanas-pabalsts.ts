import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "lv.atlaisanas-pabalsts",
  mercado: "lv",
  concepto: "indemnizacion-despido",
  slug: "atlaisanas-pabalsts",
  estado: "publicado",
  requiere: { "lv.atlaisanas-pabalsts": "mapa", "lv.videja-izpelna-periods": "numero" },
  campos: [
    { id: "izpelna", tipo: "moneda", etiqueta: "Mēneša vidējā izpeļņa", min: 0, porDefecto: 1500, ayuda: "Darba samaksas vidējais par pēdējiem sešiem kalendāra mēnešiem." },
    { id: "stazs", tipo: "opcion-dato", dato: "lv.atlaisanas-pabalsts", etiqueta: "Nodarbinātības ilgums pie šī darba devēja", porDefecto: "lidz-5" },
  ],
  calcular(e, v, { redondear }) {
    if (e.izpelna <= 0) throw new ErrorEntrada("Ievadiet izpeļņu, kas lielāka par nulli.", "izpelna");
    const menesi = enMapa(v["lv.atlaisanas-pabalsts"], e.stazs);
    return { pabalsts: redondear(e.izpelna * menesi), menesi };
  },
  resultado: [
    { clave: "pabalsts", etiqueta: "Atlaišanas pabalsts", formato: "moneda", destacada: true },
    { clave: "menesi", etiqueta: "Vidējās izpeļņas apmērs", formato: "meses" },
  ],
});
