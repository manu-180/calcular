import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ph.service-incentive-leave",
  mercado: "ph",
  concepto: "vacaciones",
  slug: "service-incentive-leave",
  estado: "publicado",
  requiere: {
    "ph.service-incentive-leave": "numero",
  },
  campos: [
    { id: "diario", tipo: "moneda", etiqueta: "Your regular daily wage", min: 0, porDefecto: 755 },
    { id: "meses", tipo: "entero", etiqueta: "Months of service with your employer", min: 0, max: 600, porDefecto: 12 },
    { id: "usados", tipo: "numero", etiqueta: "Leave days already used this year", min: 0, max: 5, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.diario <= 0) throw new ErrorEntrada("Enter your daily wage.", "diario");
    const dias = v["ph.service-incentive-leave"];
    if (entrada.usados > dias) throw new ErrorEntrada(`The yearly leave is ${dias} days.`, "usados");
    const califica = entrada.meses >= 12;
    const restantes = califica ? dias - entrada.usados : 0;
    const observaciones: string[] = [];
    if (!califica) observaciones.push("You earn service incentive leave after at least one year (12 months) of service.");
    observaciones.push("Employers with fewer than 10 employees, and those already giving at least 5 days of paid vacation leave, do not have to grant it.");
    return {
      efectivo: redondear(restantes * entrada.diario),
      restantes,
      dias: califica ? dias : 0,
      valorAnual: redondear(dias * entrada.diario),
      observaciones,
    };
  },
  resultado: [
    { clave: "efectivo", etiqueta: "Cash value of your unused leave", formato: "moneda", destacada: true },
    { clave: "restantes", etiqueta: "Unused leave days", formato: "dias" },
    { clave: "dias", etiqueta: "Leave days you are entitled to this year", formato: "dias" },
    { clave: "valorAnual", etiqueta: "Value of the full yearly leave", formato: "moneda" },
  ],
});
