import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "et.pension-calculator",
  mercado: "et",
  concepto: "jubilacion",
  slug: "pension-calculator",
  estado: "publicado",
  requiere: {
    "et.pension-base-rate": "numero",
    "et.pension-yearly-rate": "numero",
    "et.pension-min-years": "numero",
    "et.pension-salary-months": "numero",
    "et.retirement-age": "numero",
  },
  campos: [
    { id: "promedio", tipo: "moneda", etiqueta: "Average monthly salary over your last 36 months", min: 0, porDefecto: 16000 },
    { id: "anios", tipo: "entero", etiqueta: "Completed years of service", min: 0, max: 50, porDefecto: 25 },
    { id: "meses", tipo: "entero", etiqueta: "Extra months of service", min: 0, max: 11, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.promedio <= 0) throw new ErrorEntrada("Enter your average monthly salary.", "promedio");
    const minimo = v["et.pension-min-years"];
    if (e.anios < minimo) throw new ErrorEntrada(`A service pension needs at least ${minimo} years of service.`, "anios");
    const extra = e.anios - minimo + e.meses / 12;
    // POESSA redondea el porcentaje a un decimal en su ejemplo (36 años y 2 meses dan 62,7 %).
    const porcentajePension = Math.round((v["et.pension-base-rate"] + extra * v["et.pension-yearly-rate"]) * 10) / 10;
    const pension = redondear((e.promedio * porcentajePension) / 100);
    return {
      pension,
      porcentajePension,
      servicio: e.anios + e.meses / 12,
      anual: redondear(pension * 12),
    };
  },
  resultado: [
    { clave: "pension", etiqueta: "Estimated monthly service pension", formato: "moneda", destacada: true },
    { clave: "porcentajePension", etiqueta: "Share of your average salary", formato: "porcentaje", decimales: 1 },
    { clave: "servicio", etiqueta: "Service counted", formato: "anios", decimales: 2 },
    { clave: "anual", etiqueta: "Pension over 12 months", formato: "moneda" },
  ],
});
