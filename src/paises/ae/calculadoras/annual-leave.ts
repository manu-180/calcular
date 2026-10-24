import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_DIARIO, salarioDiario } from "../lib/salarios";

export default definirCalculadora({
  id: "ae.annual-leave",
  mercado: "ae",
  concepto: "vacaciones",
  slug: "annual-leave",
  estado: "publicado",
  requiere: {
    "ae.annual-leave": "mapa",
  },
  campos: [
    { id: "mesesTotales", tipo: "numero", etiqueta: "Total months of service with the employer", min: 0, max: 720, porDefecto: 30 },
    { id: "mesesAnio", tipo: "numero", etiqueta: "Months worked in the current leave year", min: 0, max: 12, porDefecto: 6 },
    { id: "tomados", tipo: "numero", etiqueta: "Days of annual leave already taken this leave year", min: 0, max: 60, porDefecto: 0 },
    { id: "arrastre", tipo: "numero", etiqueta: "Unused days carried over from earlier years", min: 0, max: 200, porDefecto: 0 },
    { id: "basico", tipo: "moneda", etiqueta: "Monthly basic wage", min: 0, porDefecto: 9000 },
    CAMPO_DIARIO,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.mesesAnio > entrada.mesesTotales) throw new ErrorEntrada("The months this leave year can't be more than your total months.", "mesesAnio");
    const tabla = v["ae.annual-leave"];
    const diario = salarioDiario(entrada.basico, entrada.metodoDiario);
    const observaciones: string[] = [];
    let ganados = 0;
    if (entrada.mesesTotales >= 12) ganados = (enMapa(tabla, "per-year") * entrada.mesesAnio) / 12;
    else if (entrada.mesesTotales > 6) ganados = enMapa(tabla, "per-month") * Math.floor(entrada.mesesAnio);
    else observaciones.push("Paid annual leave starts once your service is more than six months.");
    const pendientes = Math.max(0, ganados + entrada.arrastre - entrada.tomados);
    observaciones.push("If your job ends, unused leave is paid on your basic wage.");
    return {
      ganados: redondear(ganados),
      pendientes: redondear(pendientes),
      diario: redondear(diario),
      pago: redondear(pendientes * diario),
      anual: enMapa(tabla, "per-year"),
      observaciones,
    };
  },
  resultado: [
    { clave: "pendientes", etiqueta: "Unused annual leave", formato: "dias", destacada: true, decimales: 2 },
    { clave: "pago", etiqueta: "Value of the unused leave", formato: "moneda" },
    { clave: "ganados", etiqueta: "Leave earned this leave year", formato: "dias", decimales: 2 },
    { clave: "diario", etiqueta: "Daily basic wage", formato: "moneda" },
    { clave: "anual", etiqueta: "Full annual entitlement", formato: "dias" },
  ],
});
