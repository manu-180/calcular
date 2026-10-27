import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_SEMANAL, salarioSemanal } from "../lib/salarios";

export default definirCalculadora({
  id: "qa.final-settlement",
  mercado: "qa",
  concepto: "liquidacion-final",
  slug: "final-settlement",
  estado: "publicado",
  requiere: {
    "qa.gratuity-weeks": "numero",
    "qa.gratuity-min-service": "numero",
    "qa.notice": "mapa",
    "qa.notice-threshold": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Last monthly basic salary", min: 0, porDefecto: 9000 },
    { id: "anios", tipo: "numero", etiqueta: "Years of continuous service", min: 0, max: 60, porDefecto: 4 },
    { id: "vacaciones", tipo: "numero", etiqueta: "Weeks of annual leave not taken", min: 0, max: 20, porDefecto: 1.5 },
    { id: "pendiente", tipo: "moneda", etiqueta: "Salary still unpaid", ayuda: "Days worked in the last month and any earlier pay not received.", min: 0, porDefecto: 0 },
    {
      id: "preaviso",
      tipo: "opcion",
      etiqueta: "Notice",
      opciones: [
        { valor: "cumplido", etiqueta: "Full notice was given or worked" },
        { valor: "empleador", etiqueta: "The employer ended the contract without notice" },
        { valor: "empleado", etiqueta: "I left without giving notice" },
      ],
      porDefecto: "cumplido",
    },
    { id: "articulo61", tipo: "si-no", etiqueta: "Dismissed for one of the serious reasons in Article 61", porDefecto: false },
    CAMPO_SEMANAL,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.anios <= 0) throw new ErrorEntrada("Enter your years of service.", "anios");
    const semanal = salarioSemanal(entrada.basico, entrada.metodoSemanal);
    const observaciones: string[] = [];
    let gratuidad = 0;
    if (entrada.articulo61) observaciones.push("A dismissal under Article 61 loses the gratuity and the notice period.");
    else if (entrada.anios >= v["qa.gratuity-min-service"]) gratuidad = redondear(v["qa.gratuity-weeks"] * entrada.anios * semanal);
    else observaciones.push("There's no gratuity before one full year of service.");
    const vacaciones = redondear(entrada.vacaciones * semanal);
    const meses = enMapa(v["qa.notice"], entrada.anios > v["qa.notice-threshold"] ? "later-years" : "first-years");
    let preaviso = 0;
    if (!entrada.articulo61 && entrada.preaviso === "empleador") preaviso = redondear(entrada.basico * meses);
    if (entrada.preaviso === "empleado") {
      preaviso = -redondear(entrada.basico * meses);
      observaciones.push("Leaving without notice means you owe the employer the basic salary for the notice period, so it's taken off the total.");
    }
    observaciones.push("This uses the legal minimum gratuity. The employer may deduct money you owe it.");
    const total = redondear(Math.max(0, gratuidad + vacaciones + preaviso + entrada.pendiente));
    return { total, gratuidad, vacaciones, preaviso, pendiente: redondear(entrada.pendiente), observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "Final settlement", formato: "moneda", destacada: true },
    { clave: "gratuidad", etiqueta: "End-of-service gratuity", formato: "moneda" },
    { clave: "vacaciones", etiqueta: "Pay for unused annual leave", formato: "moneda" },
    { clave: "preaviso", etiqueta: "Notice compensation", formato: "moneda", ocultarSiCero: true },
    { clave: "pendiente", etiqueta: "Unpaid salary", formato: "moneda", ocultarSiCero: true },
  ],
});
