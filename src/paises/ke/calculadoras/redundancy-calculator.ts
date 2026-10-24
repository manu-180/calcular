import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { DIVISORES, NOTA_DIVISOR } from "../lib/salario-diario";

export default definirCalculadora({
  id: "ke.redundancy-calculator",
  mercado: "ke",
  concepto: "indemnizacion-despido",
  slug: "redundancy-calculator",
  estado: "publicado",
  requiere: {
    "ke.redundancy-severance-days": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly basic pay", min: 0, porDefecto: 60000 },
    { id: "anios", tipo: "entero", etiqueta: "Completed years of service", min: 0, porDefecto: 5 },
    { id: "diasLicencia", tipo: "numero", etiqueta: "Leave days still due to you", min: 0, porDefecto: 0 },
    { id: "divisor", tipo: "opcion", etiqueta: "How to work out a day's pay", opciones: DIVISORES, porDefecto: "30" },
    { id: "conPreaviso", tipo: "si-no", etiqueta: "You were given one month's notice in writing" },
  ],
  calcular(e, v, { redondear }) {
    if (e.sueldo <= 0) throw new ErrorEntrada("Enter your monthly basic pay.", "sueldo");
    const diario = e.sueldo / Number(e.divisor);
    const severance = redondear(diario * v["ke.redundancy-severance-days"] * e.anios);
    const licencia = redondear(diario * e.diasLicencia);
    const preaviso = e.conPreaviso ? 0 : e.sueldo;
    const observaciones = [NOTA_DIVISOR];
    if (e.anios === 0) observaciones.push("Severance pay is for each completed year, so less than a year gives none.");
    return {
      total: redondear(severance + licencia + preaviso),
      severance,
      licencia,
      preaviso,
      diario: redondear(diario),
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total redundancy package", formato: "moneda", destacada: true },
    { clave: "severance", etiqueta: "Severance pay", formato: "moneda" },
    { clave: "preaviso", etiqueta: "One month's pay in lieu of notice", formato: "moneda", ocultarSiCero: true },
    { clave: "licencia", etiqueta: "Pay for leave days due", formato: "moneda", ocultarSiCero: true },
    { clave: "diario", etiqueta: "A day's pay used", formato: "moneda" },
  ],
});
