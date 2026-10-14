import { definirCalculadora, ErrorEntrada, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "au.car-expenses-calculator",
  mercado: "au",
  concepto: "propio",
  slug: "car-expenses-calculator",
  estado: "publicado",
  requiere: {
    "au.cents-por-km": "mapa",
    "au.km-maximo": "numero",
  },
  campos: [
    { id: "km", tipo: "numero", etiqueta: "Work-related kilometres in the year", min: 0, max: 100000, porDefecto: 3000 },
    {
      id: "anio",
      tipo: "opcion",
      etiqueta: "Income year",
      opciones: [
        { valor: "2025-26", etiqueta: "2025-26 (the tax return you lodge now)" },
        { valor: "2026-27", etiqueta: "2026-27" },
      ],
      porDefecto: "2025-26",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.km < 0) throw new ErrorEntrada("Enter the work-related kilometres.", "km");
    const tasa = enMapa(v["au.cents-por-km"], entrada.anio);
    const maximo = v["au.km-maximo"];
    const kmUsados = Math.min(entrada.km, maximo);
    const observaciones: string[] = [];
    if (entrada.km > maximo) observaciones.push(`You can claim a maximum of ${maximo.toLocaleString("en-AU")} work-related kilometres per car with this method. For more, consider the logbook method.`);
    return { deduccion: redondear(kmUsados * tasa), kmUsados, tasa, observaciones };
  },
  resultado: [
    { clave: "deduccion", etiqueta: "Car expenses deduction", formato: "moneda", destacada: true },
    { clave: "kmUsados", etiqueta: "Kilometres you can claim", formato: "numero", decimales: 0 },
    { clave: "tasa", etiqueta: "Rate per kilometre", formato: "moneda" },
  ],
});
