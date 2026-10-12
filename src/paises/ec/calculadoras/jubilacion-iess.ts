import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Resolución C.D. 100, art. 13: desde los 40 años de aportes el coeficiente sube 0,0125 por año.
const ANIOS_TABLA = 40;
const INCREMENTO_POR_ANIO = 0.0125;
const MINIMO_ANIOS = 5;

// Los mapas de mínimos y máximos tienen como clave el último año de cada rango.
function porRango(mapa: Readonly<Record<string, number>>, anios: number): number {
  const claves = Object.keys(mapa)
    .map(Number)
    .sort((a, b) => a - b);
  const clave = claves.find((c) => anios <= c) ?? claves[claves.length - 1];
  return mapa[String(clave)];
}

export default definirCalculadora({
  id: "ec.jubilacion-iess",
  mercado: "ec",
  concepto: "jubilacion",
  slug: "jubilacion-iess",
  estado: "borrador",
  requiere: {
    "ec.sbu": "numero",
    "ec.jubilacion-coeficientes": "mapa",
    "ec.jubilacion-requisitos": "mapa",
    "ec.pension-vejez-minima": "mapa",
    "ec.pension-vejez-maxima": "mapa",
  },
  campos: [
    { id: "edad", tipo: "entero", etiqueta: "Tu edad", min: 18, max: 110, porDefecto: 60 },
    { id: "anios", tipo: "entero", etiqueta: "Años completos de aportes al IESS", min: 0, max: 60, porDefecto: 30 },
    {
      id: "promedio",
      tipo: "moneda",
      etiqueta: "Promedio mensual de tus 5 años de mejores sueldos",
      ayuda: "Calcula el promedio mensual de cada año, elige los cinco más altos y promédialos.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.anios < MINIMO_ANIOS) throw new ErrorEntrada(`Con menos de ${MINIMO_ANIOS} años de aportes no hay pensión de vejez.`, "anios");
    const req = valores["ec.jubilacion-requisitos"];
    const cumple =
      entrada.anios >= enMapa(req, "0") ||
      (entrada.edad >= 70 && entrada.anios >= enMapa(req, "70")) ||
      (entrada.edad >= 65 && entrada.anios >= enMapa(req, "65")) ||
      (entrada.edad >= 60 && entrada.anios >= enMapa(req, "60"));
    const coeficiente =
      entrada.anios >= ANIOS_TABLA
        ? enMapa(valores["ec.jubilacion-coeficientes"], String(ANIOS_TABLA)) + (entrada.anios - ANIOS_TABLA) * INCREMENTO_POR_ANIO
        : enMapa(valores["ec.jubilacion-coeficientes"], String(entrada.anios));
    const sbu = valores["ec.sbu"];
    const minima = redondear(porcentaje(sbu, porRango(valores["ec.pension-vejez-minima"], entrada.anios)));
    const maxima = redondear(porcentaje(sbu, porRango(valores["ec.pension-vejez-maxima"], entrada.anios)));
    const calculada = redondear(entrada.promedio * coeficiente);
    const observaciones: string[] = [];
    if (!cumple) observaciones.push("Todavía no cumples la edad y los años de aportes que pide el IESS. El cálculo muestra la pensión que tendrías con esos aportes.");
    return {
      cumple: cumple ? "Sí" : "Todavía no",
      coeficiente,
      calculada,
      minima,
      maxima,
      pension: Math.min(Math.max(calculada, minima), maxima),
      observaciones,
    };
  },
  resultado: [
    { clave: "cumple", etiqueta: "Cumples los requisitos de jubilación por vejez", formato: "texto" },
    { clave: "coeficiente", etiqueta: "Coeficiente por tus años de aportes", formato: "numero", decimales: 4 },
    { clave: "calculada", etiqueta: "Pensión según tu promedio", formato: "moneda" },
    { clave: "minima", etiqueta: "Pensión mínima para tus años de aportes", formato: "moneda" },
    { clave: "maxima", etiqueta: "Pensión máxima para tus años de aportes", formato: "moneda" },
    { clave: "pension", etiqueta: "Pensión mensual estimada", formato: "moneda", destacada: true },
  ],
});
