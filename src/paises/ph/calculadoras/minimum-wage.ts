import { definirCalculadora, ErrorEntrada, porRegion } from "@/motor/calculo";

export default definirCalculadora({
  id: "ph.minimum-wage",
  mercado: "ph",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "ph.minimum-wage-low": "numero-por-region",
    "ph.minimum-wage-high": "numero-por-region",
  },
  campos: [
    { id: "region", tipo: "region", etiqueta: "Region where you work", porDefecto: "ncr" },
    { id: "dias", tipo: "entero", etiqueta: "Days you work in a month", min: 1, max: 31, porDefecto: 22 },
    { id: "diario", tipo: "moneda", etiqueta: "Your daily wage (optional)", min: 0, requerido: false, ayuda: "Enter it to check it against the minimum of your region." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.dias < 1 || entrada.dias > 31) throw new ErrorEntrada("Enter between 1 and 31 days.", "dias");
    const bajo = porRegion(v["ph.minimum-wage-low"], entrada.region);
    const alto = porRegion(v["ph.minimum-wage-high"], entrada.region);
    const observaciones: string[] = [];
    let diferencia: number | null = null;
    if (entrada.diario !== null) {
      diferencia = redondear(entrada.diario - bajo);
      if (entrada.diario < bajo) observaciones.push("Your daily wage is below the lowest minimum wage in your region.");
      else if (entrada.diario < alto) observaciones.push("Your wage is within the regional range. Check which category applies to your employer (sector, size or area).");
    }
    if (bajo !== alto) observaciones.push("The minimum changes with the sector, the size of the business and the area. The wage order of your region lists each case.");
    return {
      alto,
      bajo,
      mensualAlto: redondear(alto * entrada.dias),
      mensualBajo: redondear(bajo * entrada.dias),
      horaAlto: redondear(alto / 8),
      diferencia,
      observaciones,
    };
  },
  resultado: [
    { clave: "alto", etiqueta: "Highest daily minimum wage in the region", formato: "moneda", destacada: true },
    { clave: "bajo", etiqueta: "Lowest daily minimum wage in the region", formato: "moneda" },
    { clave: "mensualAlto", etiqueta: "Monthly pay at the highest rate", formato: "moneda" },
    { clave: "mensualBajo", etiqueta: "Monthly pay at the lowest rate", formato: "moneda" },
    { clave: "horaAlto", etiqueta: "Hourly equivalent of the highest rate (8 hours)", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Your wage above the lowest minimum", formato: "moneda" },
  ],
});
