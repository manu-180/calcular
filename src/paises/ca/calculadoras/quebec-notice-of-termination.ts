import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ca.quebec-notice-of-termination",
  mercado: "ca",
  concepto: "propio",
  slug: "quebec-notice-of-termination",
  estado: "borrador",
  requiere: {
    "ca.qc-notice": "mapa",
  },
  campos: [
    { id: "meses", tipo: "entero", etiqueta: "Months of continuous service", min: 0, max: 720, porDefecto: 24 },
    { id: "semanal", tipo: "moneda", etiqueta: "Usual weekly wage", min: 0, porDefecto: 1000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.semanal < 0) throw new ErrorEntrada("Enter your weekly wage.", "semanal");
    // Claves del mapa: meses de servicio desde los que rige ese número de semanas de aviso.
    const tabla = Object.entries(v["ca.qc-notice"])
      .map(([desde, semanas]) => [Number(desde), semanas] as const)
      .sort((a, b) => a[0] - b[0]);
    let semanas = 0;
    for (const [desde, s] of tabla) if (entrada.meses >= desde) semanas = s;
    const observaciones: string[] = [];
    if (semanas === 0) observaciones.push("With less than three months of continuous service, the Act does not require notice.");
    return {
      semanas,
      indemnizacion: redondear(semanas * entrada.semanal),
      observaciones,
    };
  },
  resultado: [
    { clave: "semanas", etiqueta: "Notice your employer has to give", formato: "semanas", destacada: true },
    { clave: "indemnizacion", etiqueta: "Pay in lieu of notice if no notice is given", formato: "moneda" },
  ],
});
