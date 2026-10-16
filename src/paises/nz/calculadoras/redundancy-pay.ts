import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "nz.redundancy-pay",
  mercado: "nz",
  concepto: "indemnizacion-despido",
  slug: "redundancy-pay",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "semanal", tipo: "moneda", etiqueta: "Your weekly pay before tax", min: 0, porDefecto: 1300 },
    { id: "anios", tipo: "numero", etiqueta: "Years you've worked for the employer", min: 0, max: 60, porDefecto: 6 },
    { id: "semanasPrimer", tipo: "numero", etiqueta: "Weeks of pay for the first year (from your agreement)", min: 0, max: 52, porDefecto: 4 },
    { id: "semanasAdicional", tipo: "numero", etiqueta: "Weeks of pay for each extra year (from your agreement)", min: 0, max: 52, porDefecto: 2 },
    { id: "tope", tipo: "numero", etiqueta: "Maximum weeks in your agreement (0 if there's no cap)", min: 0, max: 260, porDefecto: 0 },
    { id: "preaviso", tipo: "numero", etiqueta: "Weeks of notice paid instead of worked", min: 0, max: 52, porDefecto: 0 },
  ],
  calcular(entrada, _v, { redondear }) {
    if (entrada.semanal <= 0) throw new ErrorEntrada("Enter your weekly pay.", "semanal");
    if (entrada.anios <= 0) throw new ErrorEntrada("Enter how long you've worked there.", "anios");
    const sinTope = entrada.semanasPrimer + Math.max(0, entrada.anios - 1) * entrada.semanasAdicional;
    const semanas = entrada.tope > 0 ? Math.min(sinTope, entrada.tope) : sinTope;
    const indemnizacion = redondear(semanas * entrada.semanal);
    const preaviso = redondear(entrada.preaviso * entrada.semanal);
    const observaciones = [
      "New Zealand law doesn't set a minimum redundancy payment. You only get one if your employment agreement provides for it, so use the numbers in your agreement.",
    ];
    if (entrada.tope > 0 && sinTope > entrada.tope) observaciones.push("Your agreement's maximum limits the payment.");
    return {
      indemnizacion,
      semanas,
      preaviso,
      total: redondear(indemnizacion + preaviso),
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total before tax", formato: "moneda", destacada: true },
    { clave: "indemnizacion", etiqueta: "Redundancy compensation", formato: "moneda" },
    { clave: "semanas", etiqueta: "Weeks of pay", formato: "numero", decimales: 2 },
    { clave: "preaviso", etiqueta: "Notice pay", formato: "moneda", ocultarSiCero: true },
  ],
});
