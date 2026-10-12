import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.utilidades",
  mercado: "pe",
  concepto: "reparto-utilidades",
  slug: "utilidades",
  estado: "publicado",
  requiere: {
    "pe.utilidades-por-actividad": "mapa",
    "pe.tope-utilidades": "numero",
    "pe.minimo-trabajadores-utilidades": "numero",
  },
  campos: [
    { id: "actividad", tipo: "opcion-dato", etiqueta: "Actividad de la empresa", dato: "pe.utilidades-por-actividad", porDefecto: "otras" },
    { id: "renta", tipo: "moneda", etiqueta: "Renta de la empresa antes de impuestos", ayuda: "La renta neta del año, después de compensar pérdidas anteriores. Está en la liquidación de utilidades o en la declaración anual.", min: 0 },
    { id: "trabajadores", tipo: "entero", etiqueta: "Trabajadores de la empresa (promedio del año)", min: 1, porDefecto: 50 },
    { id: "diasTotales", tipo: "numero", etiqueta: "Días laborados por todos los trabajadores", ayuda: "La suma de los días de todos. Figura en tu liquidación de utilidades.", min: 1 },
    { id: "remuneracionesTotales", tipo: "moneda", etiqueta: "Remuneraciones pagadas a todos en el año", min: 1 },
    { id: "diasTuyos", tipo: "numero", etiqueta: "Días que trabajaste en el año", min: 0, max: 366, porDefecto: 360 },
    { id: "remuneracionesTuyas", tipo: "moneda", etiqueta: "Remuneraciones que cobraste en el año", min: 0 },
    { id: "sueldoMensual", tipo: "moneda", etiqueta: "Tu sueldo mensual al cierre del año", ayuda: "Sirve para calcular el tope de lo que puedes recibir.", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.diasTuyos > entrada.diasTotales) throw new ErrorEntrada("Tus días no pueden ser más que los de todos los trabajadores juntos.", "diasTuyos");
    if (entrada.remuneracionesTuyas > entrada.remuneracionesTotales) {
      throw new ErrorEntrada("Tus remuneraciones no pueden ser más que las de todos los trabajadores juntos.", "remuneracionesTuyas");
    }
    const tasa = enMapa(valores["pe.utilidades-por-actividad"], entrada.actividad);
    const observaciones: string[] = [];
    if (entrada.trabajadores <= valores["pe.minimo-trabajadores-utilidades"]) {
      observaciones.push(`Las empresas con ${valores["pe.minimo-trabajadores-utilidades"]} trabajadores o menos (promedio del año) no reparten utilidades.`);
      return { tasa, monto: 0, porDias: 0, porRemuneraciones: 0, tope: 0, total: 0, observaciones };
    }
    const monto = redondear(porcentaje(entrada.renta, tasa));
    const mitad = monto / 2;
    const porDias = redondear((mitad / entrada.diasTotales) * entrada.diasTuyos);
    const porRemuneraciones = redondear((mitad / entrada.remuneracionesTotales) * entrada.remuneracionesTuyas);
    const tope = redondear(entrada.sueldoMensual * valores["pe.tope-utilidades"]);
    let total = redondear(porDias + porRemuneraciones);
    if (entrada.sueldoMensual > 0 && total > tope) {
      total = tope;
      observaciones.push(`Llegaste al tope de ${valores["pe.tope-utilidades"]} sueldos mensuales. Lo que sobra no se reparte entre los demás: va a un fondo de capacitación y promoción del empleo.`);
    }
    observaciones.push("Las utilidades se pagan dentro de los 30 días siguientes al vencimiento de la declaración anual del impuesto a la renta.");
    return { tasa, monto, porDias, porRemuneraciones, tope, total, observaciones };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Porcentaje de la renta que se reparte", formato: "porcentaje" },
    { clave: "monto", etiqueta: "Monto total a repartir entre todos", formato: "moneda" },
    { clave: "porDias", etiqueta: "Tu parte por días trabajados", formato: "moneda" },
    { clave: "porRemuneraciones", etiqueta: "Tu parte por remuneraciones", formato: "moneda" },
    { clave: "tope", etiqueta: "Tope que puedes recibir", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Tus utilidades", formato: "moneda", destacada: true },
  ],
});
