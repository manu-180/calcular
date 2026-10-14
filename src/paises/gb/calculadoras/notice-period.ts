import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "gb.notice-period",
  mercado: "gb",
  concepto: "preaviso",
  slug: "notice-period",
  estado: "publicado",
  requiere: {
    "gb.notice-max-weeks": "numero",
  },
  campos: [
    { id: "anios", tipo: "entero", etiqueta: "Full years with your employer", min: 0, max: 60, porDefecto: 3 },
    { id: "meses", tipo: "entero", etiqueta: "Extra months", min: 0, max: 11, porDefecto: 0 },
    { id: "semanal", tipo: "moneda", etiqueta: "Weekly pay before tax (optional, for pay in lieu of notice)", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.anios === 0 && entrada.meses === 0) throw new ErrorEntrada("Statutory notice starts once you have worked for a month. Enter at least one month.", "meses");
    const tope = v["gb.notice-max-weeks"];
    const observaciones: string[] = [];
    const semanas = entrada.anios < 2 ? 1 : Math.min(entrada.anios, tope);
    const tuPreaviso = 1;
    observaciones.push("These are the legal minimums. If your contract gives a longer notice period, the contract applies.");
    return {
      semanas,
      tuPreaviso,
      pago: entrada.semanal === null ? null : redondear(semanas * entrada.semanal),
      observaciones,
    };
  },
  resultado: [
    { clave: "semanas", etiqueta: "Minimum notice your employer must give you (weeks)", formato: "numero", decimales: 0, destacada: true },
    { clave: "tuPreaviso", etiqueta: "Minimum notice you must give (weeks)", formato: "numero", decimales: 0 },
    { clave: "pago", etiqueta: "Pay in lieu of the statutory notice", formato: "moneda" },
  ],
});
