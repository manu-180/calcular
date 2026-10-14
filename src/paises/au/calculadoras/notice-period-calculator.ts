import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "au.notice-period-calculator",
  mercado: "au",
  concepto: "preaviso",
  slug: "notice-period-calculator",
  estado: "publicado",
  requiere: {
    "au.preaviso-semanas": "mapa",
  },
  campos: [
    { id: "anios", tipo: "numero", etiqueta: "Years of continuous service", min: 0, max: 60, porDefecto: 4, ayuda: "Use decimals for part years, for example 2.5." },
    { id: "edad", tipo: "entero", etiqueta: "Your age when you get notice", min: 14, max: 100, porDefecto: 40 },
    { id: "semanal", tipo: "moneda", etiqueta: "Your full pay a week (optional)", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.anios < 0) throw new ErrorEntrada("Enter your years of service.", "anios");
    const t = v["au.preaviso-semanas"];
    const base = entrada.anios <= 1 ? t["hasta-1"] : entrada.anios <= 3 ? t["hasta-3"] : entrada.anios <= 5 ? t["hasta-5"] : t["mas-de-5"];
    const extra = entrada.edad > t["edad-extra"] && entrada.anios >= t["anios-extra"] ? t.extra : 0;
    const semanas = base + extra;
    return {
      semanas,
      base,
      extra,
      pago: entrada.semanal === null ? null : redondear(semanas * entrada.semanal),
      observaciones: [
        "Casual employees, fixed-term employees and people dismissed for serious misconduct are not entitled to NES notice. An award, agreement or contract can give more notice than this minimum.",
      ],
    };
  },
  resultado: [
    { clave: "semanas", etiqueta: "Minimum notice", formato: "numero", decimales: 0, destacada: true },
    { clave: "base", etiqueta: "Weeks for your length of service", formato: "numero", decimales: 0 },
    { clave: "extra", etiqueta: "Extra week for being over 45", formato: "numero", decimales: 0, ocultarSiCero: true },
    { clave: "pago", etiqueta: "Pay in lieu of notice", formato: "moneda" },
  ],
});
