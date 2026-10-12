import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// El sueldo mensual paga treinta días, descanso incluido, sin importar cuántos días tenga el mes
// (Código del Trabajo, art. 53): cada día vale la treintava parte.
const DIAS_DEL_MES = 30;

export default definirCalculadora({
  id: "ec.sueldo-por-dias",
  mercado: "ec",
  concepto: "propio",
  slug: "sueldo-por-dias",
  estado: "publicado",
  requiere: { "ec.sbu": "numero" },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual", min: 0 },
    {
      id: "dias",
      tipo: "numero",
      etiqueta: "Días trabajados en el mes",
      ayuda: "Si entraste o saliste a mitad de mes, cuenta los días desde tu ingreso o hasta tu salida.",
      min: 0,
      max: 31,
      porDefecto: 15,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.dias > 31) throw new ErrorEntrada("Un mes tiene 31 días como máximo.", "dias");
    const dias = Math.min(entrada.dias, DIAS_DEL_MES);
    const observaciones: string[] = [];
    if (entrada.dias > DIAS_DEL_MES) observaciones.push("Un mes completo se paga como 30 días, aunque tenga 31.");
    if (entrada.sueldo > 0 && entrada.sueldo < valores["ec.sbu"]) observaciones.push("Tu sueldo mensual está por debajo del salario básico. Con jornada completa, el mínimo legal es el básico.");
    return {
      dia: redondear(entrada.sueldo / DIAS_DEL_MES),
      dias,
      total: redondear((entrada.sueldo * dias) / DIAS_DEL_MES),
      observaciones,
    };
  },
  resultado: [
    { clave: "dia", etiqueta: "Valor de un día", formato: "moneda" },
    { clave: "dias", etiqueta: "Días que se pagan", formato: "dias" },
    { clave: "total", etiqueta: "Sueldo por los días trabajados", formato: "moneda", destacada: true },
  ],
});
