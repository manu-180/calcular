import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "co.incapacidad",
  mercado: "co",
  concepto: "propio",
  slug: "incapacidad",
  estado: "publicado",
  requiere: {
    "co.smmlv": "numero",
    "co.incapacidad-porcentaje": "mapa",
    "co.incapacidad-dias-empleador": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", ayuda: "Sin auxilio de transporte.", min: 0 },
    { id: "dias", tipo: "entero", etiqueta: "Días de incapacidad", ayuda: "Por enfermedad general (no laboral).", min: 1, max: 180, porDefecto: 5 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.dias < 1 || entrada.dias > 180) throw new ErrorEntrada("Esta calculadora cubre incapacidades de 1 a 180 días.", "dias");
    const p = valores["co.incapacidad-porcentaje"];
    const diaSalario = entrada.salario / 30;
    // La Corte condicionó el artículo 227: el auxilio diario no puede bajar del salario mínimo diario.
    const diaMinimo = valores["co.smmlv"] / 30;
    const valorDia = (tasa: number) => Math.max(porcentaje(diaSalario, tasa), diaMinimo);
    const diasEmpleador = Math.min(entrada.dias, valores["co.incapacidad-dias-empleador"]);
    const diasTramo1 = Math.min(entrada.dias, 90);
    const diasEps1 = diasTramo1 - diasEmpleador;
    const diasEps2 = Math.max(0, entrada.dias - 90);
    const dia1 = valorDia(enMapa(p, "hasta-90"));
    const dia2 = valorDia(enMapa(p, "desde-91"));
    const empleador = redondear(dia1 * diasEmpleador);
    const eps = redondear(dia1 * diasEps1 + dia2 * diasEps2);
    const total = redondear(empleador + eps);
    const salarioDias = redondear(diaSalario * entrada.dias);
    const observaciones: string[] = [];
    if (dia1 === diaMinimo) observaciones.push("Las dos terceras partes de tu salario dan menos que el salario mínimo, así que se paga el mínimo diario.");
    return {
      empleador,
      eps,
      total,
      diferencia: redondear(salarioDias - total),
      observaciones,
    };
  },
  resultado: [
    { clave: "empleador", etiqueta: "Lo paga la empresa (primeros días)", formato: "moneda", decimales: 0 },
    { clave: "eps", etiqueta: "Lo paga la EPS", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "total", etiqueta: "Total de la incapacidad", formato: "moneda", decimales: 0, destacada: true },
    { clave: "diferencia", etiqueta: "Diferencia frente a tu salario de esos días", formato: "moneda", decimales: 0, ocultarSiCero: true },
  ],
});
