import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

function aMinutos(hora: string): number {
  const [h, m] = hora.split(":").map(Number);
  return h * 60 + m;
}

function aHora(minutos: number): string {
  const total = ((minutos % 1440) + 1440) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

export default definirCalculadora({
  id: "qa.ramadan-working-hours",
  mercado: "qa",
  concepto: "propio",
  slug: "ramadan-working-hours",
  estado: "publicado",
  requiere: {
    "qa.working-hours": "mapa",
    "qa.overtime": "mapa",
  },
  campos: [
    { id: "inicio", tipo: "hora", etiqueta: "Start time", porDefecto: "08:00" },
    { id: "descanso", tipo: "entero", etiqueta: "Break in minutes", ayuda: "Breaks for prayer, rest and meals don't count as working time.", min: 0, max: 180, porDefecto: 60 },
    { id: "horasReales", tipo: "numero", etiqueta: "Hours you actually work per day in Ramadan", min: 0, max: 16, porDefecto: 6 },
    { id: "dias", tipo: "entero", etiqueta: "Working days per week", min: 1, max: 6, porDefecto: 6 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.horasReales <= 0) throw new ErrorEntrada("Enter the hours you work per day.", "horasReales");
    const h = v["qa.working-hours"];
    const limiteDia = enMapa(h, "ramadan-daily");
    const limiteSemana = enMapa(h, "ramadan-weekly");
    const fin = aHora(aMinutos(entrada.inicio) + limiteDia * 60 + entrada.descanso);
    const semana = entrada.horasReales * entrada.dias;
    const extraDia = Math.max(0, entrada.horasReales - limiteDia) * entrada.dias;
    const extra = Math.max(extraDia, semana - limiteSemana, 0);
    const observaciones: string[] = [];
    if (entrada.descanso < 60) observaciones.push("The Labour Law requires breaks of at least one hour a day, so no one works more than five hours in a row.");
    if (extra > 0) observaciones.push("Hours above the Ramadan limit are overtime, paid at your basic hourly pay plus at least " + enMapa(v["qa.overtime"], "normal") + "%.");
    if (entrada.horasReales > enMapa(h, "max-daily")) observaciones.push("Total daily work, overtime included, can't normally go over " + enMapa(h, "max-daily") + " hours.");
    return { fin, semana: redondear(semana), extra: redondear(extra), limiteDia, observaciones };
  },
  resultado: [
    { clave: "fin", etiqueta: "Finish time with the Ramadan limit", formato: "texto", destacada: true },
    { clave: "limiteDia", etiqueta: "Ramadan limit per day", formato: "horas" },
    { clave: "semana", etiqueta: "Hours you work per week", formato: "horas", decimales: 2 },
    { clave: "extra", etiqueta: "Overtime hours per week", formato: "horas", decimales: 2, ocultarSiCero: true },
  ],
});
