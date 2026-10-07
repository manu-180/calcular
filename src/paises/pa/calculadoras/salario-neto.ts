import { aplicarEscala, definirCalculadora, porcentaje } from "@/motor/calculo";

// Retención estimada: el salario de un año son 13 pagos (12 salarios y el décimo, que también paga
// renta). El impuesto anual se reparte en esos 13 pagos.
const PAGOS_POR_ANIO = 13;

export default definirCalculadora({
  id: "pa.salario-neto",
  mercado: "pa",
  concepto: "sueldo-neto",
  slug: "salario-neto",
  estado: "publicado",
  requiere: {
    "pa.css-trabajador": "numero",
    "pa.seguro-educativo-trabajador": "numero",
    "pa.isr-personas-naturales": "escala",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario bruto mensual", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const { salario } = entrada;
    const css = redondear(porcentaje(salario, valores["pa.css-trabajador"]));
    const seguroEducativo = redondear(porcentaje(salario, valores["pa.seguro-educativo-trabajador"]));
    const isrAnual = aplicarEscala(valores["pa.isr-personas-naturales"], salario * PAGOS_POR_ANIO);
    const isr = redondear(isrAnual / PAGOS_POR_ANIO);
    const neto = redondear(salario - css - seguroEducativo - isr);
    return {
      css,
      seguroEducativo,
      isr,
      neto,
      quincena: redondear(neto / 2),
      observaciones: [
        "El impuesto sobre la renta es una estimación sin deducciones. Si tienes gastos deducibles, la retención real puede ser menor.",
      ],
    };
  },
  resultado: [
    { clave: "css", etiqueta: "Seguro Social", formato: "moneda" },
    { clave: "seguroEducativo", etiqueta: "Seguro educativo", formato: "moneda" },
    { clave: "isr", etiqueta: "Impuesto sobre la renta (estimado)", formato: "moneda" },
    { clave: "neto", etiqueta: "Salario neto mensual", formato: "moneda", destacada: true },
    { clave: "quincena", etiqueta: "Neto por quincena", formato: "moneda" },
  ],
});
