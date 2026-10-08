import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { tiempoEntre } from "../lib/fechas";

export default definirCalculadora({
  id: "bo.bono-de-antiguedad",
  mercado: "bo",
  concepto: "propio",
  slug: "bono-de-antiguedad",
  estado: "publicado",
  requiere: {
    "bo.bono-antiguedad": "escala",
    "bo.salario-minimo": "numero",
    "bo.bono-antiguedad-base-productiva": "numero",
    "bo.bono-antiguedad-base-general": "numero",
  },
  campos: [
    { id: "ingreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    {
      id: "empleador",
      tipo: "opcion",
      etiqueta: "Su empleador es",
      ayuda: "La base de tres salarios mínimos la fija el D.S. 23474 para empresas productivas. Si tiene un convenio con otra base, vale el convenio.",
      opciones: [
        { valor: "productiva", etiqueta: "Una empresa productiva (base de tres salarios mínimos)" },
        { valor: "general", etiqueta: "Otro empleador (base de un salario mínimo)" },
      ],
      porDefecto: "productiva",
    },
  ],
  calcular(entrada, valores, { fecha, redondear }) {
    if (entrada.ingreso > fecha) throw new ErrorEntrada("La fecha de ingreso no puede ser posterior a hoy.", "ingreso");
    const anios = tiempoEntre(entrada.ingreso, fecha).anios;
    const escala = valores["bo.bono-antiguedad"];
    let tasa = 0;
    for (const f of escala) if (anios >= f.desde) tasa = f.tasa;
    const salarios = entrada.empleador === "productiva" ? valores["bo.bono-antiguedad-base-productiva"] : valores["bo.bono-antiguedad-base-general"];
    const base = redondear(valores["bo.salario-minimo"] * salarios);
    const siguiente = escala.find((f) => f.desde > anios);
    const observaciones: string[] = ["El bono se paga cada mes y sube cuando sube el salario mínimo."];
    const primera = escala.find((f) => f.tasa > 0);
    if (tasa === 0 && primera) observaciones.push(`El bono empieza a pagarse con ${primera.desde} años de trabajo cumplidos.`);
    else if (siguiente) observaciones.push(`Con ${siguiente.desde} años cumplidos pasa al ${siguiente.tasa} %.`);
    return {
      anios,
      tasa,
      base,
      bono: redondear(porcentaje(base, tasa)),
      observaciones,
    };
  },
  resultado: [
    { clave: "anios", etiqueta: "Años de trabajo cumplidos", formato: "anios" },
    { clave: "tasa", etiqueta: "Porcentaje que le corresponde", formato: "porcentaje" },
    { clave: "base", etiqueta: "Base de cálculo", formato: "moneda" },
    { clave: "bono", etiqueta: "Bono de antigüedad por mes", formato: "moneda", destacada: true },
  ],
});
