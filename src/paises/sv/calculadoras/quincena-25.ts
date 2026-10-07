import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

const DIAS_DEL_ANIO = 365;

// Art. 2 y 3 de la Ley Especial Quincena Veinticinco: los requisitos y el proporcional son los del
// aguinaldo, así que con menos de un año se paga en proporción a los días trabajados.
export default definirCalculadora({
  id: "sv.quincena-25",
  mercado: "sv",
  concepto: "propio",
  slug: "quincena-25",
  estado: "publicado",
  requiere: {
    "sv.quincena25-porcentaje": "numero",
    "sv.quincena25-salario-maximo": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", ayuda: "Su salario básico o nominal del mes, antes de descuentos.", min: 0 },
    { id: "anioCompleto", tipo: "si-no", etiqueta: "Tiene un año o más con el mismo patrono", porDefecto: true },
    {
      id: "diasTrabajados",
      tipo: "entero",
      etiqueta: "Días trabajados (solo si tiene menos de 1 año)",
      ayuda: "Cuente desde su primer día de trabajo.",
      min: 1,
      max: 365,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (!entrada.anioCompleto && entrada.diasTrabajados === null) {
      throw new ErrorEntrada("Indique cuántos días lleva trabajando.", "diasTrabajados");
    }
    const maximo = valores["sv.quincena25-salario-maximo"];
    const observaciones: string[] = [];
    if (entrada.salario > maximo) {
      observaciones.push(`La Quincena 25 es para salarios de hasta $${maximo.toLocaleString("en-US")} al mes. Con su salario no le corresponde.`);
      return { completa: 0, quincena: 0, observaciones };
    }
    const completa = redondear(porcentaje(entrada.salario, valores["sv.quincena25-porcentaje"]));
    const quincena = entrada.anioCompleto ? completa : redondear((completa * (entrada.diasTrabajados ?? 0)) / DIAS_DEL_ANIO);
    if (!entrada.anioCompleto) observaciones.push("Con menos de un año cobra la parte proporcional a los días trabajados.");
    observaciones.push("Se paga entre el 15 y el 25 de enero, sin descuentos de renta, ISSS ni AFP.");
    return { completa, quincena, observaciones };
  },
  resultado: [
    { clave: "completa", etiqueta: "Quincena 25 de un año completo", formato: "moneda", ocultarSiCero: true },
    { clave: "quincena", etiqueta: "Quincena 25 que le corresponde", formato: "moneda", destacada: true },
  ],
});
