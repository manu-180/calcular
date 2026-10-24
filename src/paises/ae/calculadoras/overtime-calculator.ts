import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { CAMPO_DIARIO, salarioDiario } from "../lib/salarios";

export default definirCalculadora({
  id: "ae.overtime-calculator",
  mercado: "ae",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "ae.overtime": "mapa",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Monthly basic wage", min: 0, porDefecto: 6000 },
    { id: "horasDia", tipo: "numero", etiqueta: "Normal working hours per day", ayuda: "The law sets 8 hours a day as the normal working time.", min: 1, max: 12, porDefecto: 8 },
    { id: "horas", tipo: "numero", etiqueta: "Overtime hours (before 10 pm or after 4 am)", min: 0, max: 400, porDefecto: 10 },
    { id: "horasNoche", tipo: "numero", etiqueta: "Overtime hours between 10 pm and 4 am", min: 0, max: 400, porDefecto: 0 },
    { id: "diasDescanso", tipo: "numero", etiqueta: "Rest days worked and paid instead of a substitute day", min: 0, max: 31, porDefecto: 0 },
    { id: "turnos", tipo: "si-no", etiqueta: "You work in shifts", ayuda: "The night rate doesn't apply to shift workers.", porDefecto: false },
    CAMPO_DIARIO,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.horas + entrada.horasNoche + entrada.diasDescanso <= 0) throw new ErrorEntrada("Enter the overtime hours or rest days worked.", "horas");
    const tabla = v["ae.overtime"];
    const diario = salarioDiario(entrada.basico, entrada.metodoDiario);
    const hora = diario / entrada.horasDia;
    const recargoNoche = entrada.turnos ? enMapa(tabla, "normal") : enMapa(tabla, "night");
    const normal = entrada.horas * (hora + porcentaje(hora, enMapa(tabla, "normal")));
    const noche = entrada.horasNoche * (hora + porcentaje(hora, recargoNoche));
    const descanso = entrada.diasDescanso * (diario + porcentaje(diario, enMapa(tabla, "rest-day")));
    const observaciones: string[] = [];
    if (entrada.turnos && entrada.horasNoche > 0) observaciones.push("As a shift worker, your night hours are paid at the normal overtime rate.");
    observaciones.push("These are the legal minimums. Your contract can pay more.");
    return {
      total: redondear(normal + noche + descanso),
      normal: redondear(normal),
      noche: redondear(noche),
      descanso: redondear(descanso),
      hora: redondear(hora),
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Overtime pay", formato: "moneda", destacada: true },
    { clave: "normal", etiqueta: "Overtime hours", formato: "moneda", ocultarSiCero: true },
    { clave: "noche", etiqueta: "Night overtime", formato: "moneda", ocultarSiCero: true },
    { clave: "descanso", etiqueta: "Rest days worked", formato: "moneda", ocultarSiCero: true },
    { clave: "hora", etiqueta: "Basic hourly wage", formato: "moneda" },
  ],
});
