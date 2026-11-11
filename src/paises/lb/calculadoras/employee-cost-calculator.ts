import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Borrador por el mismo motivo que nssf-contributions.
export default definirCalculadora({
  id: "lb.employee-cost-calculator",
  mercado: "lb",
  concepto: "costo-empleador",
  slug: "employee-cost-calculator",
  estado: "borrador",
  requiere: { "lb.nssf-rates": "mapa", "lb.nssf-ceiling-health": "numero", "lb.nssf-ceiling-family": "numero" },
  campos: [{ id: "salario", tipo: "moneda", etiqueta: "الأجر الشهري بالليرة", min: 0, porDefecto: 30000000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر.", "salario");
    const t = v["lb.nssf-rates"];
    const aportes = redondear(
      porcentaje(Math.min(entrada.salario, v["lb.nssf-ceiling-health"]), enMapa(t, "health-employer")) +
        porcentaje(Math.min(entrada.salario, v["lb.nssf-ceiling-family"]), enMapa(t, "family")) +
        porcentaje(entrada.salario, enMapa(t, "eos")),
    );
    return { costo: redondear(entrada.salario + aportes), aportes };
  },
  resultado: [
    { clave: "costo", etiqueta: "كلفة الموظف على صاحب العمل", formato: "moneda", destacada: true },
    { clave: "aportes", etiqueta: "اشتراكات صاحب العمل", formato: "moneda" },
  ],
});
