import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "qa.overtime-calculator",
  mercado: "qa",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "qa.overtime": "mapa",
    "qa.working-hours": "mapa",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Monthly basic salary", min: 0, porDefecto: 5200 },
    { id: "horasSemana", tipo: "numero", etiqueta: "Normal working hours per week", ayuda: "From your contract. The law allows up to 48.", min: 1, max: 48, porDefecto: 48 },
    { id: "extra", tipo: "numero", etiqueta: "Overtime hours (day)", min: 0, max: 400, porDefecto: 10 },
    { id: "nocturnas", tipo: "numero", etiqueta: "Overtime hours between 9 pm and 3 am", min: 0, max: 400, porDefecto: 0 },
    { id: "turnos", tipo: "si-no", etiqueta: "You work in shifts", ayuda: "The higher night rate doesn't apply to shift workers.", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("Enter your monthly basic salary.", "basico");
    const recargos = v["qa.overtime"];
    // La ley no fija el divisor horario: se usa el salario de un año repartido en 52 semanas de la jornada del contrato.
    const hora = (entrada.basico * 12) / 52 / entrada.horasSemana;
    const tasaNoche = entrada.turnos ? enMapa(recargos, "normal") : enMapa(recargos, "night");
    const diurno = redondear(entrada.extra * (hora + porcentaje(hora, enMapa(recargos, "normal"))));
    const nocturno = redondear(entrada.nocturnas * (hora + porcentaje(hora, tasaNoche)));
    const observaciones = [`Daily work, overtime included, can't go over ${enMapa(v["qa.working-hours"], "max-daily")} hours except to prevent serious loss or a serious accident.`];
    if (entrada.turnos && entrada.nocturnas > 0) observaciones.push("As a shift worker, your night hours are paid at the normal overtime rate.");
    return { total: redondear(diurno + nocturno), diurno, nocturno, hora: redondear(hora), observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "Overtime pay", formato: "moneda", destacada: true },
    { clave: "diurno", etiqueta: "Pay for day overtime", formato: "moneda" },
    { clave: "nocturno", etiqueta: "Pay for night overtime", formato: "moneda", ocultarSiCero: true },
    { clave: "hora", etiqueta: "Hourly basic salary", formato: "moneda" },
  ],
});
