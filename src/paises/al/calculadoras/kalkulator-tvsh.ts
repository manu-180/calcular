import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "al.kalkulator-tvsh",
  mercado: "al",
  concepto: "iva",
  slug: "kalkulator-tvsh",
  estado: "publicado",
  redondeo: { decimales: 2, modo: "mitad-arriba" },
  requiere: { "al.tvsh": "mapa" },
  campos: [
    {
      id: "drejtimi",
      tipo: "opcion",
      etiqueta: "Çfarë doni të llogaritni?",
      opciones: [
        { valor: "shto", etiqueta: "Shto TVSH-në mbi çmimin pa TVSH" },
        { valor: "hiq", etiqueta: "Hiq TVSH-në nga çmimi me TVSH" },
      ],
      porDefecto: "shto",
    },
    { id: "shuma", tipo: "moneda", etiqueta: "Shuma", min: 0, porDefecto: 10000 },
    { id: "shkalla", tipo: "opcion-dato", dato: "al.tvsh", etiqueta: "Shkalla e TVSH-së", porDefecto: "standarde" },
  ],
  calcular(e, v, { redondear }) {
    if (e.shuma <= 0) throw new ErrorEntrada("Vendosni një shumë më të madhe se zero.", "shuma");
    const s = enMapa(v["al.tvsh"], e.shkalla);
    const paTvsh = e.drejtimi === "shto" ? e.shuma : redondear(e.shuma / (1 + s / 100));
    const tvsh = e.drejtimi === "shto" ? redondear((paTvsh * s) / 100) : redondear(e.shuma - paTvsh);
    return { tvsh, paTvsh, meTvsh: redondear(paTvsh + tvsh), s };
  },
  resultado: [
    { clave: "tvsh", etiqueta: "TVSH", formato: "moneda", destacada: true },
    { clave: "paTvsh", etiqueta: "Çmimi pa TVSH", formato: "moneda" },
    { clave: "meTvsh", etiqueta: "Çmimi me TVSH", formato: "moneda" },
    { clave: "s", etiqueta: "Shkalla e zbatuar", formato: "porcentaje" },
  ],
});
