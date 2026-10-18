import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aportesGpssa, primaIloe } from "../lib/aportes";

export default definirCalculadora({
  id: "ae.take-home-pay",
  mercado: "ae",
  concepto: "sueldo-neto",
  slug: "take-home-pay",
  estado: "publicado",
  requiere: {
    "ae.gpssa": "mapa",
    "ae.iloe": "mapa",
  },
  campos: [
    { id: "total", tipo: "moneda", etiqueta: "Monthly salary (basic plus allowances)", min: 0, porDefecto: 15000 },
    { id: "basico", tipo: "moneda", etiqueta: "Monthly basic salary", min: 0, porDefecto: 9000 },
    { id: "emirati", tipo: "si-no", etiqueta: "You're a UAE national registered with GPSSA", porDefecto: false },
    {
      id: "baseGpssa",
      tipo: "moneda",
      etiqueta: "Salary used for GPSSA contributions",
      ayuda: "Leave it at 0 to use the full monthly salary.",
      min: 0,
      porDefecto: 0,
      visibleSi: { emirati: [true] },
    },
    { id: "iloe", tipo: "si-no", etiqueta: "You pay the unemployment insurance premium monthly", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.total <= 0) throw new ErrorEntrada("Enter your monthly salary.", "total");
    if (entrada.basico > entrada.total) throw new ErrorEntrada("The basic salary can't be more than the total salary.", "basico");
    const base = entrada.emirati ? (entrada.baseGpssa && entrada.baseGpssa > 0 ? entrada.baseGpssa : entrada.total) : 0;
    const pension = entrada.emirati ? redondear(aportesGpssa(base, v["ae.gpssa"]).empleado) : 0;
    const seguro = entrada.iloe ? primaIloe(entrada.basico, v["ae.iloe"]) : 0;
    const neto = redondear(entrada.total - pension - seguro);
    const observaciones: string[] = [];
    if (entrada.emirati) observaciones.push("Your employer adds its own GPSSA contribution on top. It doesn't come out of your pay.");
    return { neto, pension, seguro, anual: redondear(neto * 12), observaciones };
  },
  resultado: [
    { clave: "neto", etiqueta: "Monthly take-home pay", formato: "moneda", destacada: true },
    { clave: "pension", etiqueta: "Your GPSSA pension contribution", formato: "moneda", ocultarSiCero: true },
    { clave: "seguro", etiqueta: "Unemployment insurance premium", formato: "moneda", ocultarSiCero: true },
    { clave: "anual", etiqueta: "Take-home pay over 12 months", formato: "moneda" },
  ],
});
