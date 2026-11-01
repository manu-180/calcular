import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "am.yekamtayin-hark",
  mercado: "am",
  concepto: "impuesto-renta",
  slug: "yekamtayin-hark",
  estado: "publicado",
  requiere: { "am.yekamut-dedq": "mapa" },
  campos: [
    {
      id: "tesak",
      tipo: "opcion-dato",
      etiqueta: "Եկամտի տեսակը",
      dato: "am.yekamut-dedq",
      porDefecto: "ashkhatavardz",
    },
    { id: "yekamut", tipo: "moneda", etiqueta: "Եկամուտը մինչև հարկումը", min: 0, porDefecto: 500000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.yekamut <= 0) throw new ErrorEntrada("Մուտքագրեք զրոյից մեծ եկամուտ։", "yekamut");
    const dedq = enMapa(v["am.yekamut-dedq"], e.tesak);
    const hark = redondear(porcentaje(e.yekamut, dedq));
    return { hark, dedq, zut: e.yekamut - hark };
  },
  resultado: [
    { clave: "hark", etiqueta: "Եկամտային հարկ", formato: "moneda", destacada: true },
    { clave: "dedq", etiqueta: "Դրույքաչափ", formato: "porcentaje" },
    { clave: "zut", etiqueta: "Գումարը հարկումից հետո", formato: "moneda" },
  ],
});
