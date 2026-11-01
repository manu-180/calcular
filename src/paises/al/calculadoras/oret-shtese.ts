import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "al.oret-shtese",
  mercado: "al",
  concepto: "horas-extra",
  slug: "oret-shtese",
  estado: "borrador",
  requiere: { "al.ore-shtese": "mapa", "al.ore-mujore": "numero" },
  campos: [
    { id: "paga", tipo: "moneda", etiqueta: "Paga bruto në muaj", min: 0, porDefecto: 90000 },
    { id: "ore", tipo: "numero", etiqueta: "Orë shtesë", min: 0, porDefecto: 10 },
    {
      id: "lloji",
      tipo: "opcion",
      etiqueta: "Kur janë kryer?",
      opciones: [
        { valor: "zakonshme", etiqueta: "Në ditë pune" },
        { valor: "pushim", etiqueta: "Në pushim javor ose festë" },
      ],
      porDefecto: "zakonshme",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.paga <= 0) throw new ErrorEntrada("Vendosni një pagë më të madhe se zero.", "paga");
    const orare = e.paga / v["al.ore-mujore"];
    const shtesa = enMapa(v["al.ore-shtese"], e.lloji);
    return { pagesa: redondear(orare * (1 + shtesa / 100) * e.ore), orare: redondear(orare), shtesa };
  },
  resultado: [
    { clave: "pagesa", etiqueta: "Pagesa për orët shtesë", formato: "moneda", destacada: true },
    { clave: "orare", etiqueta: "Paga për një orë", formato: "moneda" },
    { clave: "shtesa", etiqueta: "Shtesa", formato: "porcentaje" },
  ],
});
