import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { diasEntre, mesesCompletos } from "../lib/fechas";
import { CAMPOS_PROMEDIO, salarioDiarioPromedio } from "../lib/salarios";

function diasDeVacaciones(tabla: Readonly<Record<string, number>>, anios: number): number {
  if (anios < 1) return 0;
  const clave = String(Math.min(9, Math.floor(anios)));
  return tabla[clave] ?? 0;
}

export default definirCalculadora({
  id: "hk.annual-leave",
  mercado: "hk",
  concepto: "vacaciones",
  slug: "annual-leave",
  estado: "publicado",
  requiere: {
    "hk.annual-leave-days": "mapa",
  },
  campos: [
    { id: "anios", tipo: "entero", etiqueta: "Completed years of service", min: 0, max: 60, porDefecto: 3 },
    ...CAMPOS_PROMEDIO,
    { id: "termina", tipo: "si-no", etiqueta: "Your job is ending", porDefecto: false },
    { id: "inicioAnio", tipo: "fecha", etiqueta: "First day of the current leave year", visibleSi: { termina: [true] } },
    { id: "fin", tipo: "fecha", etiqueta: "Date your job ends", visibleSi: { termina: [true] } },
    { id: "sumaria", tipo: "si-no", etiqueta: "You were summarily dismissed for serious misconduct", porDefecto: false, visibleSi: { termina: [true] } },
  ],
  calcular(entrada, v, { redondear }) {
    const diario = salarioDiarioPromedio(entrada);
    const tabla = v["hk.annual-leave-days"];
    const dias = diasDeVacaciones(tabla, entrada.anios);
    let diasProporcionales = 0;
    const observaciones: string[] = [];
    if (entrada.termina) {
      if (!entrada.inicioAnio || !entrada.fin) throw new ErrorEntrada("Enter the start of the leave year and the end date.", "fin");
      if (entrada.fin < entrada.inicioAnio) throw new ErrorEntrada("The end date has to be after the start of the leave year.", "fin");
      const diasAnio = diasEntre(entrada.inicioAnio, entrada.fin) + 1;
      if (diasAnio > 366) throw new ErrorEntrada("A leave year lasts 12 months. Check the start date.", "inicioAnio");
      const meses = mesesCompletos(entrada.inicioAnio, entrada.fin);
      if (entrada.sumaria) observaciones.push("After a summary dismissal there's no pro rata leave pay for the current leave year.");
      else if (meses < 3) observaciones.push("Less than 3 months in the current leave year gives no pro rata leave pay.");
      else diasProporcionales = (diasDeVacaciones(tabla, entrada.anios + 1) * diasAnio) / 365;
      if (entrada.anios >= 1) observaciones.push("Any leave from the previous leave year you haven't taken is also paid when the job ends.");
    }
    if (entrada.anios < 1) observaciones.push("Paid annual leave starts after 12 months of continuous employment.");
    return {
      dias,
      diario: redondear(diario),
      paga: redondear(diario * dias),
      diasProporcionales: redondear(diasProporcionales),
      pagaProporcional: redondear(diario * diasProporcionales),
      observaciones,
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Annual leave earned for the last leave year", formato: "dias", destacada: true },
    { clave: "paga", etiqueta: "Pay for those days", formato: "moneda" },
    { clave: "diario", etiqueta: "Average daily wages", formato: "moneda" },
    { clave: "diasProporcionales", etiqueta: "Pro rata leave for the current leave year", formato: "dias", decimales: 2, ocultarSiCero: true },
    { clave: "pagaProporcional", etiqueta: "Pro rata leave pay", formato: "moneda", ocultarSiCero: true },
  ],
});
