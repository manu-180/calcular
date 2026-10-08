import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pa.vacaciones",
  mercado: "pa",
  concepto: "vacaciones",
  slug: "vacaciones",
  estado: "publicado",
  requiere: {
    "pa.vacaciones-dias": "numero",
    "pa.vacaciones-meses": "numero",
    "pa.css-trabajador": "numero",
    "pa.seguro-educativo-trabajador": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual",
      ayuda: "Si ganas comisiones o horas extra, usa el promedio de los últimos once meses si es más alto que tu salario base.",
      min: 0,
    },
    {
      id: "meses",
      tipo: "numero",
      etiqueta: "Meses trabajados para estas vacaciones",
      ayuda: "Once meses dan el período completo. Si te vas antes, pon los meses que llevas.",
      min: 0,
      porDefecto: 11,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const mesesPeriodo = valores["pa.vacaciones-meses"];
    if (entrada.meses > mesesPeriodo * 2) {
      throw new ErrorEntrada("Pon como máximo dos períodos de vacaciones acumulados. Si debes más, calcúlalos por separado.", "meses");
    }
    const proporcion = entrada.meses / mesesPeriodo;
    const bruto = redondear(entrada.salario * proporcion);
    const css = redondear(porcentaje(bruto, valores["pa.css-trabajador"]));
    const seguroEducativo = redondear(porcentaje(bruto, valores["pa.seguro-educativo-trabajador"]));
    return {
      dias: redondear(valores["pa.vacaciones-dias"] * proporcion),
      bruto,
      css,
      seguroEducativo,
      neto: redondear(bruto - css - seguroEducativo),
      observaciones: ["Al pago de vacaciones también se le retiene el impuesto sobre la renta, si tu salario anual pasa el mínimo exento."],
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Días de vacaciones", formato: "dias" },
    { clave: "bruto", etiqueta: "Pago de vacaciones (bruto)", formato: "moneda" },
    { clave: "css", etiqueta: "Seguro Social", formato: "moneda" },
    { clave: "seguroEducativo", etiqueta: "Seguro educativo", formato: "moneda" },
    { clave: "neto", etiqueta: "Vacaciones a recibir", formato: "moneda", destacada: true },
  ],
});
