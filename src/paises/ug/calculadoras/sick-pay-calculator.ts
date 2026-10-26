import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ug.sick-pay-calculator",
  mercado: "ug",
  concepto: "propio",
  slug: "sick-pay-calculator",
  estado: "publicado",
  requiere: {
    "ug.sick-min-service-months": "numero",
    "ug.sick-full-pay-months": "numero",
    "ug.sick-half-pay-months": "numero",
  },
  campos: [
    { id: "mensual", tipo: "moneda", etiqueta: "Monthly pay", min: 0, porDefecto: 1000000 },
    { id: "meses", tipo: "numero", etiqueta: "Months off sick", min: 0, max: 24, porDefecto: 3, ayuda: "Use decimals for part of a month, for example 1.5." },
    { id: "servicio", tipo: "si-no", etiqueta: "You had worked for this employer for at least one month", porDefecto: true },
  ],
  calcular(e, v, { redondear }) {
    if (e.mensual <= 0) throw new ErrorEntrada("Enter your monthly pay.", "mensual");
    const observaciones: string[] = [];
    if (!e.servicio) {
      observaciones.push("Sick pay under the Act starts after one month of continuous service.");
      return { total: 0, completo: 0, mitad: 0, mesesCompletos: 0, mesesMitad: 0, observaciones };
    }
    const tope1 = v["ug.sick-full-pay-months"];
    const tope2 = v["ug.sick-half-pay-months"];
    const mesesCompletos = Math.min(e.meses, tope1);
    const mesesMitad = Math.min(Math.max(0, e.meses - tope1), tope2);
    const completo = redondear(e.mensual * mesesCompletos);
    const mitad = redondear((e.mensual / 2) * mesesMitad);
    if (e.meses > tope1 + tope2) observaciones.push("After six months of sickness the employer may end the contract, paying what the contract owes up to that date.");
    return { total: redondear(completo + mitad), completo, mitad, mesesCompletos, mesesMitad, observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "Sick pay for the period", formato: "moneda", destacada: true },
    { clave: "completo", etiqueta: "On full pay", formato: "moneda" },
    { clave: "mitad", etiqueta: "On half pay", formato: "moneda", ocultarSiCero: true },
    { clave: "mesesCompletos", etiqueta: "Months on full pay", formato: "meses", decimales: 1 },
    { clave: "mesesMitad", etiqueta: "Months on half pay", formato: "meses", decimales: 1 },
  ],
});
