import { definirCalculadora } from "@/motor/calculo";
import { aportesTrabajador, isrMensual } from "../lib/tss";

export default definirCalculadora({
  id: "do.isr-asalariados",
  mercado: "do",
  concepto: "impuesto-renta",
  slug: "isr-asalariados",
  estado: "publicado",
  requiere: {
    "do.sfs-trabajador": "numero",
    "do.afp-trabajador": "numero",
    "do.tope-sfs": "numero",
    "do.tope-afp": "numero",
    "do.isr-asalariados": "escala",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    {
      id: "tipoMonto",
      tipo: "opcion",
      etiqueta: "Qué monto escribiste",
      opciones: [
        { valor: "bruto", etiqueta: "El bruto (antes de AFP y SFS)" },
        { valor: "sin-tss", etiqueta: "El salario ya sin AFP ni SFS" },
      ],
      porDefecto: "bruto",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const escala = valores["do.isr-asalariados"];
    const aportes =
      entrada.tipoMonto === "bruto"
        ? aportesTrabajador(
            entrada.salario,
            { sfs: valores["do.sfs-trabajador"], afp: valores["do.afp-trabajador"], topeSfs: valores["do.tope-sfs"], topeAfp: valores["do.tope-afp"] },
            redondear,
          )
        : { sfs: 0, afp: 0 };
    const base = redondear(entrada.salario - aportes.sfs - aportes.afp);
    const isr = isrMensual(base, escala, redondear);
    const exentoAnual = escala[0].tasa === 0 && escala[0].hasta !== null ? escala[0].hasta : 0;
    return {
      sfs: entrada.tipoMonto === "bruto" ? aportes.sfs : null,
      afp: entrada.tipoMonto === "bruto" ? aportes.afp : null,
      base,
      baseAnual: redondear(base * 12),
      exentoMensual: redondear(exentoAnual / 12),
      tasa: isr.tasa,
      isrAnual: isr.anual,
      isrMensual: isr.mensual,
    };
  },
  resultado: [
    { clave: "sfs", etiqueta: "SFS que se resta", formato: "moneda" },
    { clave: "afp", etiqueta: "AFP que se resta", formato: "moneda" },
    { clave: "base", etiqueta: "Salario sujeto a ISR (mensual)", formato: "moneda" },
    { clave: "baseAnual", etiqueta: "Renta anual", formato: "moneda" },
    { clave: "exentoMensual", etiqueta: "Monto exento por mes", formato: "moneda" },
    { clave: "tasa", etiqueta: "Tasa de tu tramo", formato: "porcentaje" },
    { clave: "isrAnual", etiqueta: "ISR del año", formato: "moneda" },
    { clave: "isrMensual", etiqueta: "Retención mensual de ISR", formato: "moneda", destacada: true },
  ],
});
