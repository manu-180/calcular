import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { esFechaISO } from "@/motor/vigencia";
import { semanalDesdeMensual, tramoDeAviso } from "../lib/pago";
import { MOTIVOS_SEVERANCE, semanasDeSeverance } from "../lib/terminacion";

export default definirCalculadora({
  id: "bz.final-pay-calculator",
  mercado: "bz",
  concepto: "liquidacion-final",
  slug: "final-pay-calculator",
  estado: "publicado",
  requiere: {
    "bz.notice-weeks": "mapa",
    "bz.average-pay-divisor": "numero",
    "bz.holiday-pay-minimum-months": "numero",
    "bz.severance-weeks-mid": "numero",
    "bz.severance-weeks-long": "numero",
    "bz.severance-min-years": "numero",
    "bz.severance-long-years": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly basic pay", min: 0, porDefecto: 2000 },
    { id: "inicio", tipo: "fecha", etiqueta: "First day of work", porDefecto: "2015-02-02" },
    { id: "fin", tipo: "fecha", etiqueta: "Last day of work", porDefecto: "hoy" },
    { id: "motivo", tipo: "opcion", etiqueta: "Why the job ended", opciones: MOTIVOS_SEVERANCE, porDefecto: "empleador" },
    { id: "avisoDado", tipo: "si-no", etiqueta: "Your employer gave you the full notice period" },
    { id: "mesesSinVacaciones", tipo: "entero", etiqueta: "Months worked since your last annual holiday", min: 0, max: 12, porDefecto: 6 },
  ],
  calcular(e, v, { redondear }) {
    if (e.sueldo <= 0) throw new ErrorEntrada("Enter your monthly basic pay.", "sueldo");
    if (!esFechaISO(e.inicio)) throw new ErrorEntrada("Enter the first day of work.", "inicio");
    if (!esFechaISO(e.fin)) throw new ErrorEntrada("Enter the last day of work.", "fin");
    if (e.fin < e.inicio) throw new ErrorEntrada("The last day cannot be before the first day.", "fin");
    const semanal = semanalDesdeMensual(e.sueldo);

    const r = semanasDeSeverance(e.inicio, e.fin, e.motivo, {
      semanasMedio: v["bz.severance-weeks-mid"],
      semanasLargo: v["bz.severance-weeks-long"],
      aniosMinimo: v["bz.severance-min-years"],
      aniosLargo: v["bz.severance-long-years"],
    });
    const severance = redondear(semanal * r.semanas);

    const tramo = tramoDeAviso(e.inicio, e.fin, 14);
    const semanasAviso = e.motivo === "empleador" && !e.avisoDado && tramo !== "none" ? enMapa(v["bz.notice-weeks"], tramo) : 0;
    const aviso = redondear(semanal * semanasAviso);

    const completo = e.mesesSinVacaciones >= 12;
    const cuentaVacaciones = completo || e.mesesSinVacaciones >= v["bz.holiday-pay-minimum-months"];
    const vacaciones = cuentaVacaciones ? redondear((e.sueldo * e.mesesSinVacaciones) / v["bz.average-pay-divisor"]) : 0;

    const observaciones = [
      "Wages already earned and not yet paid are not included.",
      "Severance pay, notice pay and holiday pay follow sections 37, 38, 129, 130 and 183 of the Labour Act.",
    ];
    if (e.motivo !== "empleador") observaciones.push("Notice pay is added only when the employer ends the job without the full notice.");
    return { total: redondear(severance + aviso + vacaciones), severance, aviso, vacaciones, anios: r.anios, observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "Final pay on top of unpaid wages", formato: "moneda", destacada: true },
    { clave: "severance", etiqueta: "Severance pay", formato: "moneda", ocultarSiCero: true },
    { clave: "aviso", etiqueta: "Pay in place of notice", formato: "moneda", ocultarSiCero: true },
    { clave: "vacaciones", etiqueta: "Holiday pay", formato: "moneda", ocultarSiCero: true },
    { clave: "anios", etiqueta: "Complete years of service", formato: "anios" },
  ],
});
