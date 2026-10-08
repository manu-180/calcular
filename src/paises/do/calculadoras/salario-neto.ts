import { definirCalculadora } from "@/motor/calculo";
import { aportesTrabajador, isrMensual } from "../lib/tss";

export default definirCalculadora({
  id: "do.salario-neto",
  mercado: "do",
  concepto: "sueldo-neto",
  slug: "salario-neto",
  estado: "publicado",
  requiere: {
    "do.sfs-trabajador": "numero",
    "do.afp-trabajador": "numero",
    "do.tope-sfs": "numero",
    "do.tope-afp": "numero",
    "do.isr-asalariados": "escala",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario bruto mensual",
      ayuda: "Lo que dice tu contrato antes de los descuentos.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const { sfs, afp } = aportesTrabajador(
      entrada.salario,
      { sfs: valores["do.sfs-trabajador"], afp: valores["do.afp-trabajador"], topeSfs: valores["do.tope-sfs"], topeAfp: valores["do.tope-afp"] },
      redondear,
    );
    const base = redondear(entrada.salario - sfs - afp);
    const isr = isrMensual(base, valores["do.isr-asalariados"], redondear).mensual;
    const descuentos = redondear(sfs + afp + isr);
    const observaciones: string[] = [];
    if (entrada.salario > valores["do.tope-sfs"]) observaciones.push("Tu salario pasa el tope del SFS: ese seguro se descuenta solo hasta el tope.");
    if (entrada.salario > valores["do.tope-afp"]) observaciones.push("Tu salario pasa el tope de la AFP: la pensión se descuenta solo hasta el tope.");
    if (isr === 0) observaciones.push("Tu salario queda dentro del monto exento: no te retienen ISR.");
    return { bruto: entrada.salario, sfs, afp, base, isr, descuentos, neto: redondear(entrada.salario - descuentos), observaciones };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Salario bruto", formato: "moneda" },
    { clave: "sfs", etiqueta: "Seguro Familiar de Salud (SFS)", formato: "moneda" },
    { clave: "afp", etiqueta: "Pensión (AFP)", formato: "moneda" },
    { clave: "base", etiqueta: "Salario sujeto a ISR", formato: "moneda" },
    { clave: "isr", etiqueta: "Retención de ISR", formato: "moneda" },
    { clave: "descuentos", etiqueta: "Total de descuentos", formato: "moneda" },
    { clave: "neto", etiqueta: "Salario neto", formato: "moneda", destacada: true },
  ],
});
