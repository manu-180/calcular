import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.essalud",
  mercado: "pe",
  concepto: "propio",
  slug: "essalud",
  estado: "publicado",
  requiere: {
    "pe.rmv": "numero",
    "pe.aporte-essalud": "numero",
  },
  campos: [
    { id: "remuneracion", tipo: "moneda", etiqueta: "Remuneración mensual del trabajador", ayuda: "Con la asignación familiar si la cobra.", min: 0 },
    { id: "trabajadores", tipo: "entero", etiqueta: "Cantidad de trabajadores con ese sueldo", min: 1, max: 10000, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.remuneracion <= 0) throw new ErrorEntrada({ codigo: "requerido" }, "remuneracion");
    // El aporte no se calcula sobre menos que la RMV aunque el sueldo sea menor (mismo criterio que el costo laboral).
    const base = Math.max(entrada.remuneracion, valores["pe.rmv"]);
    const porTrabajador = redondear(porcentaje(base, valores["pe.aporte-essalud"]));
    const mensual = redondear(porTrabajador * entrada.trabajadores);
    const observaciones: string[] = [];
    if (entrada.remuneracion < valores["pe.rmv"]) observaciones.push("La remuneración es menor que la mínima vital: el aporte se calcula sobre la RMV.");
    observaciones.push("Lo paga el empleador, no se descuenta del sueldo. Las gratificaciones de julio y diciembre no pagan EsSalud: en su lugar el trabajador recibe la bonificación extraordinaria.");
    return { base: redondear(base), porTrabajador, mensual, anual: redondear(mensual * 12), observaciones };
  },
  resultado: [
    { clave: "base", etiqueta: "Base del aporte", formato: "moneda" },
    { clave: "porTrabajador", etiqueta: "Aporte mensual por trabajador", formato: "moneda" },
    { clave: "mensual", etiqueta: "Aporte mensual total", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Aporte en el año (12 meses)", formato: "moneda" },
  ],
});
