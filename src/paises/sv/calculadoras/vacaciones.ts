import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

const DIAS_DEL_MES = 30;
const DIAS_DEL_ANIO = 365;

export default definirCalculadora({
  id: "sv.vacaciones",
  mercado: "sv",
  concepto: "vacaciones",
  slug: "vacaciones",
  estado: "publicado",
  requiere: {
    "sv.vacaciones-dias": "numero",
    "sv.vacaciones-recargo": "numero",
    "sv.vacaciones-aviso": "numero",
    "sv.vacaciones-dias-trabajados-minimos": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", ayuda: "Su salario básico, sin horas extra.", min: 0 },
    {
      id: "periodo",
      tipo: "opcion",
      etiqueta: "Qué quiere calcular",
      opciones: [
        { valor: "completas", etiqueta: "Vacaciones de un año completo" },
        { valor: "proporcionales", etiqueta: "Vacaciones proporcionales (al terminar el contrato)" },
      ],
      porDefecto: "completas",
    },
    {
      id: "diasTrabajados",
      tipo: "entero",
      etiqueta: "Días trabajados desde su último aniversario",
      ayuda: "Solo para las vacaciones proporcionales.",
      min: 1,
      max: 365,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const proporcional = entrada.periodo === "proporcionales";
    if (proporcional && entrada.diasTrabajados === null) {
      throw new ErrorEntrada("Indique cuántos días trabajó desde su último aniversario.", "diasTrabajados");
    }
    const fraccion = proporcional ? (entrada.diasTrabajados ?? 0) / DIAS_DEL_ANIO : 1;
    const dias = valores["sv.vacaciones-dias"] * fraccion;
    const salarioVacaciones = redondear((entrada.salario / DIAS_DEL_MES) * dias);
    const recargo = redondear(porcentaje(salarioVacaciones, valores["sv.vacaciones-recargo"]));
    const observaciones: string[] = [];
    if (proporcional) observaciones.push("Las vacaciones proporcionales se pagan si lo despiden sin causa o si renuncia. Si ya cumplió el año, le pagan las completas.");
    return {
      dias: redondear(dias),
      salarioVacaciones,
      recargo,
      total: redondear(salarioVacaciones + recargo),
      observaciones,
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Días de vacaciones", formato: "dias" },
    { clave: "salarioVacaciones", etiqueta: "Salario de esos días", formato: "moneda" },
    { clave: "recargo", etiqueta: "Recargo de vacaciones", formato: "moneda" },
    { clave: "total", etiqueta: "Total a recibir", formato: "moneda", destacada: true },
  ],
});
