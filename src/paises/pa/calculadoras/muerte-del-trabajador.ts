import { definirCalculadora } from "@/motor/calculo";
import { mesesConFraccion, mesesEnPeriodoDecimo, semanalDeMensual, textoTiempo, tiempoTrabajado, validarFechas } from "../reglas";

export default definirCalculadora({
  id: "pa.muerte-del-trabajador",
  mercado: "pa",
  concepto: "propio",
  slug: "muerte-del-trabajador",
  estado: "publicado",
  requiere: {
    "pa.prima-antiguedad-semanas": "numero",
    "pa.vacaciones-meses": "numero",
    "pa.decimo-divisor": "numero",
    "pa.muerte-monto-sin-edicto": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual del trabajador", min: 0 },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaFallecimiento", tipo: "fecha", etiqueta: "Fecha del fallecimiento" },
    {
      id: "indefinido",
      tipo: "si-no",
      etiqueta: "El contrato era por tiempo indefinido",
      porDefecto: true,
    },
    {
      id: "mesesVacaciones",
      tipo: "numero",
      etiqueta: "Meses trabajados desde sus últimas vacaciones",
      min: 0,
      porDefecto: 0,
    },
    {
      id: "salariosPendientes",
      tipo: "moneda",
      etiqueta: "Salarios que le quedaron sin pagar",
      ayuda: "Por ejemplo, los días trabajados de la última quincena.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const { salario, fechaIngreso, fechaFallecimiento } = entrada;
    validarFechas(fechaIngreso, fechaFallecimiento);
    const t = tiempoTrabajado(fechaIngreso, fechaFallecimiento);
    const prima = entrada.indefinido ? redondear(semanalDeMensual(salario) * (mesesConFraccion(t) / 12) * valores["pa.prima-antiguedad-semanas"]) : 0;
    const vacaciones = redondear((salario * entrada.mesesVacaciones) / valores["pa.vacaciones-meses"]);
    const decimo = redondear((salario * mesesEnPeriodoDecimo(fechaIngreso, fechaFallecimiento) + vacaciones) / valores["pa.decimo-divisor"]);
    const pendientes = redondear(entrada.salariosPendientes);
    const total = redondear(prima + vacaciones + decimo + pendientes);
    const limite = valores["pa.muerte-monto-sin-edicto"];
    const tramite =
      total <= limite
        ? "El juez de trabajo lo entrega sin juicio de sucesión ni edicto."
        : "El juez de trabajo lo entrega sin juicio de sucesión, pero antes publica un edicto de cinco días para que se presenten los interesados.";
    return {
      tiempo: textoTiempo(t),
      pendientes,
      prima,
      vacaciones,
      decimo,
      total,
      tramite,
      observaciones: [
        "El empleador deposita lo adeudado en el juzgado seccional de trabajo, o la familia lo pide ahí.",
        "Cobran primero los hijos menores (por medio de quien los represente) y, si no hay, el cónyuge o la pareja que vivía con el trabajador. En su defecto, la madre o el padre.",
      ],
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "pendientes", etiqueta: "Salarios pendientes", formato: "moneda", ocultarSiCero: true },
    { clave: "prima", etiqueta: "Prima de antigüedad", formato: "moneda", ocultarSiCero: true },
    { clave: "vacaciones", etiqueta: "Vacaciones proporcionales", formato: "moneda" },
    { clave: "decimo", etiqueta: "Décimo tercer mes proporcional", formato: "moneda" },
    { clave: "total", etiqueta: "Total que recibe la familia (bruto)", formato: "moneda", destacada: true },
    { clave: "tramite", etiqueta: "Cómo se entrega", formato: "texto" },
  ],
});
