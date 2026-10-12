import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.jubilacion-ips",
  mercado: "py",
  concepto: "jubilacion",
  slug: "jubilacion-ips",
  estado: "publicado",
  requiere: {
    "py.jubilacion-ips": "mapa",
  },
  campos: [
    { id: "edad", tipo: "entero", etiqueta: "Edad al jubilarte", min: 18, max: 100, porDefecto: 60 },
    { id: "anios", tipo: "numero", etiqueta: "Años de aporte al IPS", ayuda: "Cada 50 semanas de aporte cuentan como un año.", min: 0, max: 60 },
    {
      id: "promedio",
      tipo: "moneda",
      etiqueta: "Salario promedio de los últimos 36 meses",
      ayuda: "Sumá los salarios por los que aportaste en los últimos tres años y dividilo por 36.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const m = valores["py.jubilacion-ips"];
    const v = (k: string) => enMapa(m, k);
    let tasa: number | null = null;
    let tipo = "Todavía no reunís los requisitos";
    if (entrada.edad >= v("edad-ordinaria") && entrada.anios >= v("anios-ordinaria")) {
      tasa = v("tasa-ordinaria");
      tipo = "Jubilación ordinaria";
    } else if (entrada.edad >= v("edad-anticipada") && entrada.anios >= v("anios-anticipada")) {
      // Art. 60 del DL 1860/50 (Ley 98/92): sube un tramo fijo por cada año cumplido después de los 55.
      tasa = v("tasa-anticipada") + v("aumento-por-anio") * (Math.min(entrada.edad, v("edad-ordinaria") - 1) - v("edad-anticipada"));
      tipo = `Jubilación ordinaria con ${v("anios-anticipada")} años de aporte`;
    }
    const observaciones: string[] = [];
    if (tasa === null) {
      observaciones.push(`Necesitás ${v("edad-ordinaria")} años de edad y ${v("anios-ordinaria")} de aporte, o ${v("edad-anticipada")} de edad y ${v("anios-anticipada")} de aporte.`);
      if (entrada.edad >= 65 && entrada.anios >= 15) observaciones.push("Con 65 años y 750 semanas de aporte podés pedir la jubilación proporcional. Su monto lo fija el IPS según tus aportes.");
    }
    observaciones.push("El IPS actualiza los salarios del promedio y aplica topes. Tomalo como una estimación.");
    return {
      tipo,
      tasa,
      jubilacion: tasa === null ? null : redondear(porcentaje(entrada.promedio, tasa)),
      observaciones,
    };
  },
  resultado: [
    { clave: "tipo", etiqueta: "Tipo de jubilación", formato: "texto" },
    { clave: "tasa", etiqueta: "Porcentaje del promedio", formato: "porcentaje", decimales: 0 },
    { clave: "jubilacion", etiqueta: "Jubilación mensual estimada", formato: "moneda", destacada: true },
  ],
});
