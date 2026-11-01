import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { OPCIONES_SEMANA } from "../lib/comun";

export default definirCalculadora({
  id: "ls.sick-leave",
  mercado: "ls",
  concepto: "propio",
  slug: "sick-leave",
  estado: "publicado",
  requiere: {
    "ls.sick-leave": "mapa",
    "ls.hours-divisor": "mapa",
    "ls.daily-hours": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Your monthly wage", min: 0, porDefecto: 6000 },
    { id: "semana", tipo: "opcion", etiqueta: "You normally work", opciones: OPCIONES_SEMANA, porDefecto: "five-day" },
    { id: "meses", tipo: "entero", etiqueta: "Months of continuous employment with this employer", min: 0, max: 600, porDefecto: 24 },
    { id: "dias", tipo: "numero", etiqueta: "Working days off sick in this 12-month period (with a medical certificate)", min: 0, max: 366, porDefecto: 5 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("Enter your monthly wage.", "salario");
    const s = v["ls.sick-leave"];
    let completos = 0;
    let medios = 0;
    if (entrada.meses >= 12) {
      completos = s["full-pay-yearly"];
      medios = s["half-pay-yearly"];
    } else if (entrada.meses >= 6) {
      completos = s["full-pay-second-half"];
    }
    const diario = redondear((entrada.salario / v["ls.hours-divisor"]["monthly"]) * enMapa(v["ls.daily-hours"], entrada.semana));
    const usadosCompletos = Math.min(entrada.dias, completos);
    const usadosMedios = Math.min(entrada.dias - usadosCompletos, medios);
    const sinPago = entrada.dias - usadosCompletos - usadosMedios;
    const observaciones: string[] = [];
    if (entrada.meses < 6) observaciones.push("In the first six months with an employer the law does not require sick pay.");
    return {
      pago: redondear(usadosCompletos * diario + usadosMedios * diario * 0.5),
      completos,
      medios,
      usadosCompletos,
      usadosMedios,
      sinPago,
      diario,
      observaciones,
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "Sick pay for these days", formato: "moneda", destacada: true },
    { clave: "completos", etiqueta: "Full-pay sick days you are entitled to", formato: "dias" },
    { clave: "medios", etiqueta: "Half-pay sick days you are entitled to", formato: "dias" },
    { clave: "usadosCompletos", etiqueta: "Days paid in full", formato: "dias" },
    { clave: "usadosMedios", etiqueta: "Days paid at half pay", formato: "dias", ocultarSiCero: true },
    { clave: "sinPago", etiqueta: "Days without sick pay", formato: "dias", ocultarSiCero: true },
    { clave: "diario", etiqueta: "One day's full pay", formato: "moneda" },
  ],
});
