import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "jm.vacation-leave-calculator",
  mercado: "jm",
  concepto: "vacaciones",
  slug: "vacation-leave-calculator",
  estado: "publicado",
  requiere: {
    "jm.vacation-min-days": "numero",
    "jm.vacation-full-days": "numero",
    "jm.leave-days-per": "numero",
    "jm.vacation-weeks": "numero",
    "jm.vacation-weeks-long-service": "numero",
    "jm.vacation-long-service-years": "numero",
  },
  campos: [
    { id: "dias", tipo: "entero", etiqueta: "Days you worked for this employer in the qualifying year", min: 0, max: 366, porDefecto: 240 },
    { id: "anios", tipo: "entero", etiqueta: "Years you have worked for this employer", min: 0, max: 60, porDefecto: 3 },
    { id: "diasSemana", tipo: "entero", etiqueta: "Days in your normal working week", min: 1, max: 7, porDefecto: 5 },
    { id: "semanal", tipo: "moneda", etiqueta: "Your normal pay for a week", min: 0, porDefecto: 40000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.diasSemana < 1 || e.diasSemana > 7) throw new ErrorEntrada("A working week has between 1 and 7 days.", "diasSemana");
    if (e.dias > 366) throw new ErrorEntrada("A year has 366 days at most.", "dias");
    let dias = 0;
    let semanas = 0;
    let regla = "";
    if (e.dias < v["jm.vacation-min-days"]) {
      regla = `Fewer than ${v["jm.vacation-min-days"]} days worked: no vacation leave earned this year`;
    } else if (e.dias <= v["jm.vacation-full-days"]) {
      dias = Math.ceil(e.dias / v["jm.leave-days-per"]);
      regla = `${v["jm.vacation-min-days"]} to ${v["jm.vacation-full-days"]} days worked: one day for every ${v["jm.leave-days-per"]} days`;
    } else {
      semanas = e.anios >= v["jm.vacation-long-service-years"] ? v["jm.vacation-weeks-long-service"] : v["jm.vacation-weeks"];
      dias = semanas * e.diasSemana;
      regla =
        e.anios >= v["jm.vacation-long-service-years"]
          ? `More than ${v["jm.vacation-full-days"]} days and ${v["jm.vacation-long-service-years"]} or more years of service`
          : `More than ${v["jm.vacation-full-days"]} days worked`;
    }
    const pago = semanas > 0 ? redondear(semanas * e.semanal) : redondear((e.semanal / e.diasSemana) * dias);
    const observaciones: string[] = [];
    if (dias > 0) observaciones.push("Public holidays that fall in your vacation do not count as vacation days.");
    return { dias, semanas, pago, regla, observaciones };
  },
  resultado: [
    { clave: "dias", etiqueta: "Vacation leave with pay", formato: "dias", destacada: true },
    { clave: "semanas", etiqueta: "In normal working weeks", formato: "semanas", ocultarSiCero: true },
    { clave: "pago", etiqueta: "Vacation pay", formato: "moneda" },
    { clave: "regla", etiqueta: "Rule that applies", formato: "texto" },
  ],
});
