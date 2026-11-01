import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "np.ssf-calculator",
  mercado: "np",
  concepto: "aportes-seguridad-social",
  slug: "ssf-calculator",
  estado: "publicado",
  requiere: {
    "np.ssf-employee-rate": "numero",
    "np.ssf-employer-rate": "numero",
    "np.ssf-provident-rate": "numero",
    "np.gratuity-rate": "numero",
    "np.ssf-split": "mapa",
  },
  campos: [{ id: "basico", tipo: "moneda", etiqueta: "Basic pay for the month", min: 0, porDefecto: 40000, ayuda: "Basic pay only, without allowances." }],
  calcular(e, v, { redondear }) {
    if (e.basico <= 0) throw new ErrorEntrada("Enter your basic pay for the month.", "basico");
    const trabajador = redondear(porcentaje(e.basico, v["np.ssf-employee-rate"]));
    const empleador = redondear(porcentaje(e.basico, v["np.ssf-employer-rate"]));
    const total = redondear(trabajador + empleador);
    const split = v["np.ssf-split"];
    return {
      trabajador,
      empleador,
      total,
      anual: redondear(total * 12),
      previsional: redondear(porcentaje(e.basico, v["np.ssf-provident-rate"] * 2)),
      gratificacion: redondear(porcentaje(e.basico, v["np.gratuity-rate"])),
      salud: redondear(porcentaje(e.basico, enMapa(split, "health"))),
      accidente: redondear(porcentaje(e.basico, enMapa(split, "accident"))),
      dependientes: redondear(porcentaje(e.basico, enMapa(split, "dependants"))),
      vejez: redondear(porcentaje(e.basico, enMapa(split, "old-age"))),
    };
  },
  resultado: [
    { clave: "trabajador", etiqueta: "Deducted from the worker", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Paid by the employer on top", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Total paid into the Fund each month", formato: "moneda" },
    { clave: "anual", etiqueta: "Total over 12 months", formato: "moneda" },
    { clave: "previsional", etiqueta: "Provident fund share (worker 10% plus employer 10%)", formato: "moneda" },
    { clave: "gratificacion", etiqueta: "Gratuity set aside by the employer", formato: "moneda" },
    { clave: "vejez", etiqueta: "Old-age scheme", formato: "moneda" },
    { clave: "salud", etiqueta: "Medical, health and maternity scheme", formato: "moneda" },
    { clave: "accidente", etiqueta: "Accident and disability scheme", formato: "moneda" },
    { clave: "dependientes", etiqueta: "Dependent family scheme", formato: "moneda" },
  ],
});
