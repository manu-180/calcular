import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "in.fd-calculator",
  mercado: "in",
  concepto: "plazo-fijo",
  slug: "fd-calculator",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Deposit amount", min: 0, porDefecto: 100000 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Interest rate a year", min: 0, max: 20, porDefecto: 7 },
    { id: "meses", tipo: "entero", etiqueta: "Tenure in months", min: 1, max: 240, porDefecto: 12 },
    {
      id: "capitalizacion",
      tipo: "opcion",
      etiqueta: "Interest compounding",
      opciones: [
        { valor: "4", etiqueta: "Quarterly" },
        { valor: "12", etiqueta: "Monthly" },
        { valor: "2", etiqueta: "Half-yearly" },
        { valor: "1", etiqueta: "Yearly" },
      ],
      porDefecto: "4",
    },
  ],
  calcular(entrada, _v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter the deposit amount.", "monto");
    const k = Number(entrada.capitalizacion);
    const madurez = entrada.monto * (1 + entrada.tasa / 100 / k) ** ((k * entrada.meses) / 12);
    const efectiva = ((1 + entrada.tasa / 100 / k) ** k - 1) * 100;
    return {
      madurez: redondear(madurez),
      interes: redondear(madurez - entrada.monto),
      efectiva,
    };
  },
  resultado: [
    { clave: "madurez", etiqueta: "Maturity amount", formato: "moneda", destacada: true },
    { clave: "interes", etiqueta: "Interest earned", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Effective yearly yield", formato: "porcentaje", decimales: 2 },
  ],
});
