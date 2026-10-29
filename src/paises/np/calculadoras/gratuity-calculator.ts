import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "np.gratuity-calculator",
  mercado: "np",
  concepto: "fondo-cesantia",
  slug: "gratuity-calculator",
  estado: "publicado",
  requiere: {
    "np.gratuity-rate": "numero",
    "np.ssf-provident-rate": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Basic pay for the month", min: 0, porDefecto: 40000, ayuda: "The calculator assumes your basic pay stayed the same." },
    { id: "meses", tipo: "entero", etiqueta: "Months of service", min: 1, max: 600, porDefecto: 60 },
  ],
  calcular(e, v, { redondear }) {
    if (e.basico <= 0) throw new ErrorEntrada("Enter your basic pay for the month.", "basico");
    const mensual = redondear(porcentaje(e.basico, v["np.gratuity-rate"]));
    const previsionalMensual = redondear(porcentaje(e.basico, v["np.ssf-provident-rate"]));
    return {
      gratificacion: redondear(mensual * e.meses),
      mensual,
      anual: redondear(mensual * 12),
      previsionalTrabajador: redondear(previsionalMensual * e.meses),
      previsionalEmpleador: redondear(previsionalMensual * e.meses),
    };
  },
  resultado: [
    { clave: "gratificacion", etiqueta: "Gratuity built up over your service", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Set aside by the employer each month", formato: "moneda" },
    { clave: "anual", etiqueta: "Set aside each year", formato: "moneda" },
    { clave: "previsionalTrabajador", etiqueta: "Provident fund, your share over the period", formato: "moneda" },
    { clave: "previsionalEmpleador", etiqueta: "Provident fund, employer share over the period", formato: "moneda" },
  ],
});
