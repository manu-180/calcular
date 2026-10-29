import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { semanalDesdeMensual } from "../lib/pago";

export default definirCalculadora({
  id: "bz.sick-leave-pay-calculator",
  mercado: "bz",
  concepto: "propio",
  slug: "sick-leave-pay-calculator",
  estado: "publicado",
  requiere: {
    "bz.sick-leave-days": "numero",
    "bz.sick-leave-qualifying-days": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly pay", min: 0, porDefecto: 2000 },
    {
      id: "diasSemana",
      tipo: "opcion",
      etiqueta: "Working days in your week",
      opciones: [
        { valor: "5", etiqueta: "5 days" },
        { valor: "6", etiqueta: "6 days" },
      ],
      porDefecto: "5",
    },
    { id: "pedidos", tipo: "numero", etiqueta: "Working days you are off sick", min: 0, porDefecto: 5 },
    { id: "usados", tipo: "numero", etiqueta: "Paid sick days already used in the last 12 months", min: 0, porDefecto: 0 },
    { id: "servicio", tipo: "entero", etiqueta: "Days you worked for this employer in the last 12 months", min: 0, max: 366, porDefecto: 250 },
  ],
  calcular(e, v, { redondear }) {
    if (e.sueldo <= 0) throw new ErrorEntrada("Enter your monthly pay.", "sueldo");
    const diario = redondear(semanalDesdeMensual(e.sueldo) / Number(e.diasSemana));
    const elegible = e.servicio >= v["bz.sick-leave-qualifying-days"];
    const tope = v["bz.sick-leave-days"];
    const disponibles = elegible ? Math.max(0, tope - e.usados) : 0;
    const pagados = Math.min(e.pedidos, disponibles);
    const observaciones = [
      "If you are also entitled to a Social Security sickness benefit, the Board pays the benefit and your employer pays the top up described in section 131(4). That top up depends on a percentage the Act leaves to be fixed, so it is not included here.",
      "Your employer can ask for a medical certificate within 48 hours of a written request. Without it you lose the paid leave.",
    ];
    if (!elegible) observaciones.unshift(`You need at least ${v["bz.sick-leave-qualifying-days"]} days of service in the last 12 months to claim paid sick leave.`);
    return { pago: redondear(diario * pagados), pagados, disponibles, sinPago: Math.max(0, e.pedidos - pagados), diario, observaciones };
  },
  resultado: [
    { clave: "pago", etiqueta: "Sick pay from your employer", formato: "moneda", destacada: true },
    { clave: "pagados", etiqueta: "Paid sick days", formato: "dias", decimales: 1 },
    { clave: "disponibles", etiqueta: "Paid sick days left in the 12 months", formato: "dias", decimales: 1 },
    { clave: "sinPago", etiqueta: "Days off without sick pay", formato: "dias", decimales: 1, ocultarSiCero: true },
    { clave: "diario", etiqueta: "Pay for one working day", formato: "moneda" },
  ],
});
