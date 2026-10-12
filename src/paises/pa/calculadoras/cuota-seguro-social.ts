import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pa.cuota-seguro-social",
  mercado: "pa",
  concepto: "aportes-seguridad-social",
  slug: "cuota-seguro-social",
  estado: "publicado",
  requiere: {
    "pa.css-trabajador": "numero",
    "pa.css-empleador": "numero",
    "pa.seguro-educativo-trabajador": "numero",
    "pa.seguro-educativo-empleador": "numero",
    "pa.css-decimo-trabajador": "numero",
    "pa.css-decimo-empleador": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario bruto mensual", min: 0 },
    {
      id: "decimo",
      tipo: "moneda",
      etiqueta: "Partida del décimo tercer mes (si la hay este mes)",
      ayuda: "Déjalo vacío si este mes no se paga décimo.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const { salario } = entrada;
    const decimo = entrada.decimo ?? 0;
    const cssTrabajador = redondear(porcentaje(salario, valores["pa.css-trabajador"]));
    const seTrabajador = redondear(porcentaje(salario, valores["pa.seguro-educativo-trabajador"]));
    const decimoTrabajador = redondear(porcentaje(decimo, valores["pa.css-decimo-trabajador"]));
    const cssEmpleador = redondear(porcentaje(salario, valores["pa.css-empleador"]));
    const seEmpleador = redondear(porcentaje(salario, valores["pa.seguro-educativo-empleador"]));
    const decimoEmpleador = redondear(porcentaje(decimo, valores["pa.css-decimo-empleador"]));
    const trabajador = redondear(cssTrabajador + seTrabajador + decimoTrabajador);
    const empleador = redondear(cssEmpleador + seEmpleador + decimoEmpleador);
    return {
      cssTrabajador,
      seTrabajador,
      decimoTrabajador,
      trabajador,
      cssEmpleador,
      seEmpleador,
      decimoEmpleador,
      empleador,
      total: redondear(trabajador + empleador),
      observaciones: [
        "No incluye la cuota de riesgos profesionales, que paga solo el empleador con una tasa según la actividad de la empresa.",
      ],
    };
  },
  resultado: [
    { clave: "cssTrabajador", etiqueta: "Seguro Social del empleado", formato: "moneda" },
    { clave: "seTrabajador", etiqueta: "Seguro educativo del empleado", formato: "moneda" },
    { clave: "decimoTrabajador", etiqueta: "Seguro Social del empleado sobre el décimo", formato: "moneda", ocultarSiCero: true },
    { clave: "trabajador", etiqueta: "Total que se descuenta al empleado", formato: "moneda", destacada: true },
    { clave: "cssEmpleador", etiqueta: "Cuota patronal al Seguro Social", formato: "moneda" },
    { clave: "seEmpleador", etiqueta: "Seguro educativo patronal", formato: "moneda" },
    { clave: "decimoEmpleador", etiqueta: "Cuota patronal sobre el décimo", formato: "moneda", ocultarSiCero: true },
    { clave: "empleador", etiqueta: "Total que paga el empleador", formato: "moneda" },
    { clave: "total", etiqueta: "Total que recibe la Caja de Seguro Social", formato: "moneda" },
  ],
});
