import { definirCalculadora } from "@/motor/calculo";
import { calcularSueldo, REQUIERE_SUELDO } from "../lib/sueldo";

export default definirCalculadora({
  id: "uy.aportes-bps",
  mercado: "uy",
  concepto: "aportes-seguridad-social",
  slug: "aportes-bps",
  estado: "publicado",
  requiere: REQUIERE_SUELDO,
  campos: [
    { id: "nominal", tipo: "moneda", etiqueta: "Sueldo nominal mensual", min: 0 },
    { id: "hijos", tipo: "entero", etiqueta: "Hijos menores de 18 a tu cargo", min: 0, max: 15, porDefecto: 0 },
    {
      id: "conyuge",
      tipo: "si-no",
      etiqueta: "Tenés cónyuge o concubino a cargo en el Fonasa",
      ayuda: "Solo si no tiene cobertura del Fonasa por su propio trabajo o jubilación.",
      porDefecto: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const s = calcularSueldo(valores, { nominal: entrada.nominal, hijos: entrada.hijos, hijosDiscapacidad: 0, conyuge: entrada.conyuge }, redondear);
    const total = redondear(s.montepio + s.fonasa + s.frl);
    const observaciones: string[] = [];
    if (s.superaTope) observaciones.push("Tu sueldo pasa el tope de aportación: el aporte jubilatorio se calcula solo hasta el tope.");
    observaciones.push("El IRPF es aparte. Lo podés calcular en la calculadora de sueldo líquido.");
    return {
      montepio: s.montepio,
      fonasa: s.fonasa,
      tasaFonasa: s.tasaFonasa,
      frl: s.frl,
      total,
      porcentajeTotal: entrada.nominal > 0 ? (total / entrada.nominal) * 100 : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "montepio", etiqueta: "Aporte jubilatorio (montepío)", formato: "moneda" },
    { clave: "fonasa", etiqueta: "Fonasa", formato: "moneda" },
    { clave: "tasaFonasa", etiqueta: "Tasa de Fonasa que te corresponde", formato: "porcentaje" },
    { clave: "frl", etiqueta: "Fondo de Reconversión Laboral", formato: "moneda" },
    { clave: "total", etiqueta: "Total de aportes personales", formato: "moneda", destacada: true },
    { clave: "porcentajeTotal", etiqueta: "Parte de tu sueldo nominal", formato: "porcentaje" },
  ],
});
