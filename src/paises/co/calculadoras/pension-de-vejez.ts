import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "co.pension-de-vejez",
  mercado: "co",
  concepto: "jubilacion",
  slug: "pension-de-vejez",
  estado: "publicado",
  requiere: {
    "co.smmlv": "numero",
    "co.pension-edad": "mapa",
    "co.pension-semanas": "mapa",
    "co.pension-monto": "mapa",
  },
  campos: [
    {
      id: "sexo",
      tipo: "opcion",
      etiqueta: "Eres",
      opciones: [
        { valor: "mujeres", etiqueta: "Mujer" },
        { valor: "hombres", etiqueta: "Hombre" },
      ],
      porDefecto: "mujeres",
    },
    { id: "edad", tipo: "entero", etiqueta: "Tu edad", min: 18, max: 100 },
    { id: "semanas", tipo: "entero", etiqueta: "Semanas cotizadas", ayuda: "Las ves en tu historia laboral de Colpensiones.", min: 0, max: 3000 },
    {
      id: "ibl",
      tipo: "moneda",
      etiqueta: "Salario promedio de cotización (IBL)",
      ayuda: "El promedio de lo que cotizaste en los últimos 10 años, actualizado por inflación.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const smmlv = valores["co.smmlv"];
    const m = valores["co.pension-monto"];
    const edadMinima = enMapa(valores["co.pension-edad"], entrada.sexo);
    const semanasMinimas = enMapa(valores["co.pension-semanas"], entrada.sexo);
    const s = entrada.ibl / smmlv;
    const rMaximo = enMapa(m, "r-maximo");
    const r = Math.min(rMaximo, Math.max(enMapa(m, "r-minimo"), enMapa(m, "r-base") - enMapa(m, "r-por-smmlv") * s));
    const bloques = Math.floor(Math.max(0, entrada.semanas - semanasMinimas) / 50);
    // La ley lleva el tope del 80 % (con r en 65 %) al 70,5 % en los ingresos altos: el margen sobre r
    // es siempre el mismo, 80 − 65.
    const tope = Math.min(enMapa(m, "maximo"), r + enMapa(m, "maximo") - rMaximo);
    const tasa = Math.min(r + bloques * enMapa(m, "por-50-semanas"), tope);
    const calculada = redondear(porcentaje(entrada.ibl, tasa));
    const pension = Math.max(calculada, smmlv);
    const faltanSemanas = Math.max(0, semanasMinimas - entrada.semanas);
    const faltanAnios = Math.max(0, edadMinima - entrada.edad);
    const cumple = faltanSemanas === 0 && faltanAnios === 0;
    const observaciones: string[] = [];
    if (calculada < smmlv) observaciones.push("El porcentaje da menos que el salario mínimo, así que la pensión sube al mínimo.");
    if (!cumple) observaciones.push("Todavía no cumples los requisitos. El valor es lo que recibirías con tus datos actuales.");
    return {
      requisitos: cumple ? "Sí, cumples edad y semanas" : "Todavía no",
      edadMinima,
      semanasMinimas,
      faltanSemanas,
      faltanAnios,
      tasa,
      pension,
      observaciones,
    };
  },
  resultado: [
    { clave: "requisitos", etiqueta: "¿Cumples los requisitos hoy?", formato: "texto" },
    { clave: "edadMinima", etiqueta: "Edad mínima", formato: "anios" },
    { clave: "semanasMinimas", etiqueta: "Semanas mínimas", formato: "numero" },
    { clave: "faltanSemanas", etiqueta: "Semanas que te faltan", formato: "numero", ocultarSiCero: true },
    { clave: "faltanAnios", etiqueta: "Años que te faltan", formato: "anios", ocultarSiCero: true },
    { clave: "tasa", etiqueta: "Porcentaje de tu IBL", formato: "porcentaje", decimales: 2 },
    { clave: "pension", etiqueta: "Pensión estimada al mes", formato: "moneda", decimales: 0, destacada: true },
  ],
});
