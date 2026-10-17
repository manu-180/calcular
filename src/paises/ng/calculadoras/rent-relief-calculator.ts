import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ng.rent-relief-calculator",
  mercado: "ng",
  concepto: "propio",
  slug: "rent-relief-calculator",
  estado: "publicado",
  requiere: {
    "ng.rent-relief-rate": "numero",
    "ng.rent-relief-cap": "numero",
    "ng.paye-bands": "escala",
  },
  campos: [
    { id: "alquiler", tipo: "moneda", etiqueta: "Rent you pay for your home a year", min: 0, porDefecto: 1800000 },
    { id: "gravable", tipo: "moneda", etiqueta: "Your chargeable income before rent relief (optional)", requerido: false, min: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.alquiler < 0) throw new ErrorEntrada("Rent cannot be negative.", "alquiler");
    const sinTope = porcentaje(entrada.alquiler, v["ng.rent-relief-rate"]);
    const relief = redondear(Math.min(sinTope, v["ng.rent-relief-cap"]));
    let ahorro: number | null = null;
    if (entrada.gravable !== null) {
      const bandas = v["ng.paye-bands"];
      ahorro = redondear(aplicarEscalaMarginal(bandas, entrada.gravable) - aplicarEscalaMarginal(bandas, Math.max(0, entrada.gravable - relief)));
    }
    return { relief, sinTope: redondear(sinTope), ahorro, topeAlcanzado: sinTope > v["ng.rent-relief-cap"] ? "Yes" : "No" };
  },
  resultado: [
    { clave: "relief", etiqueta: "Rent relief for the year", formato: "moneda", destacada: true },
    { clave: "sinTope", etiqueta: "Share of rent before the cap", formato: "moneda" },
    { clave: "topeAlcanzado", etiqueta: "Capped", formato: "texto" },
    { clave: "ahorro", etiqueta: "Tax saved", formato: "moneda" },
  ],
});
