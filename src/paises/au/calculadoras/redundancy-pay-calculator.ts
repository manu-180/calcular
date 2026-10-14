import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "au.redundancy-pay-calculator",
  mercado: "au",
  concepto: "indemnizacion-despido",
  slug: "redundancy-pay-calculator",
  estado: "publicado",
  requiere: {
    "au.redundancy-semanas": "mapa",
    "au.redundancy-empleados-minimo": "numero",
    "au.redundancy-libre-impuesto": "mapa",
  },
  campos: [
    { id: "anios", tipo: "entero", etiqueta: "Complete years of continuous service", min: 0, max: 60, porDefecto: 5 },
    { id: "semanal", tipo: "moneda", etiqueta: "Your base pay a week (ordinary hours)", min: 0, porDefecto: 1500 },
    { id: "grande", tipo: "si-no", etiqueta: "Your employer has 15 or more employees", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.anios < 0) throw new ErrorEntrada("Enter your complete years of service.", "anios");
    if (entrada.semanal < 0) throw new ErrorEntrada("Enter your weekly base pay.", "semanal");
    const tabla = v["au.redundancy-semanas"];
    const clave = String(Math.min(entrada.anios, 10));
    const observaciones: string[] = [];
    let semanas = entrada.anios >= 1 ? (tabla[clave] ?? 0) : 0;
    if (!entrada.grande) {
      semanas = 0;
      observaciones.push(`Most small business employers (fewer than ${v["au.redundancy-empleados-minimo"]} employees) don't have to pay redundancy pay under the National Employment Standards. An award or agreement may still give you some.`);
    } else if (entrada.anios < 1) {
      observaciones.push("You need at least one year of continuous service to get redundancy pay under the National Employment Standards.");
    }
    const pago = redondear(semanas * entrada.semanal);
    const limite = v["au.redundancy-libre-impuesto"];
    const libre = redondear(limite.base + limite["por-anio"] * entrada.anios);
    return {
      semanas,
      pago,
      libre,
      gravado: redondear(Math.max(0, pago - libre)),
      observaciones,
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "Minimum redundancy pay", formato: "moneda", destacada: true },
    { clave: "semanas", etiqueta: "Weeks of pay", formato: "numero", decimales: 0 },
    { clave: "libre", etiqueta: "Tax-free limit for a genuine redundancy", formato: "moneda" },
    { clave: "gravado", etiqueta: "Part above the tax-free limit", formato: "moneda", ocultarSiCero: true },
  ],
});
