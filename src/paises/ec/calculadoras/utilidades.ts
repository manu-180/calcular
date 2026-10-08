import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ec.utilidades",
  mercado: "ec",
  concepto: "reparto-utilidades",
  slug: "utilidades",
  estado: "publicado",
  requiere: {
    "ec.utilidades": "numero",
    "ec.utilidades-partes-iguales": "numero",
    "ec.utilidades-cargas": "numero",
  },
  campos: [
    {
      id: "utilidad",
      tipo: "moneda",
      etiqueta: "Utilidad líquida de la empresa en el año",
      ayuda: "La utilidad antes de repartir a los trabajadores. Te la tiene que informar tu empleador.",
      min: 0,
    },
    { id: "trabajadores", tipo: "entero", etiqueta: "Personas que trabajaron en la empresa en el año", min: 1, porDefecto: 10 },
    {
      id: "cargasTotales",
      tipo: "entero",
      etiqueta: "Cargas familiares de todo el personal",
      ayuda: "La suma de las cargas de todas las personas, incluidas las tuyas.",
      min: 0,
      porDefecto: 0,
    },
    {
      id: "cargas",
      tipo: "entero",
      etiqueta: "Tus cargas familiares",
      ayuda: "Cónyuge o conviviente, hijos menores de 18 años e hijos con discapacidad de cualquier edad.",
      min: 0,
      porDefecto: 0,
    },
    { id: "meses", tipo: "numero", etiqueta: "Meses que trabajaste en el año", min: 0, max: 12, porDefecto: 12 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.cargas > entrada.cargasTotales) throw new ErrorEntrada("Tus cargas no pueden ser más que las de todo el personal.", "cargas");
    if (entrada.meses > 12) throw new ErrorEntrada("El año tiene 12 meses como máximo.", "meses");
    const quince = redondear(porcentaje(entrada.utilidad, valores["ec.utilidades"]));
    const diez = porcentaje(entrada.utilidad, valores["ec.utilidades-partes-iguales"]);
    const cinco = porcentaje(entrada.utilidad, valores["ec.utilidades-cargas"]);
    // El resto del personal se toma con el año completo: el reparto es proporcional al tiempo.
    const tiempoTotal = (entrada.trabajadores - 1) * 12 + entrada.meses;
    const cargasPorTiempo = (entrada.cargasTotales - entrada.cargas) * 12 + entrada.cargas * entrada.meses;
    const parteIgual = tiempoTotal > 0 ? redondear((diez * entrada.meses) / tiempoTotal) : 0;
    const parteCargas = cargasPorTiempo > 0 ? redondear((cinco * entrada.cargas * entrada.meses) / cargasPorTiempo) : 0;
    const observaciones = ["Suponemos que el resto del personal trabajó el año completo. Tu empleador hace el cálculo exacto con los días de cada persona."];
    if (entrada.cargasTotales === 0) observaciones.push("Nadie registró cargas familiares, así que acá no calculamos el reparto por cargas.");
    return {
      quince,
      diez: redondear(diez),
      cinco: redondear(cinco),
      parteIgual,
      parteCargas,
      total: redondear(parteIgual + parteCargas),
      observaciones,
    };
  },
  resultado: [
    { clave: "quince", etiqueta: "Total para repartir entre el personal", formato: "moneda" },
    { clave: "diez", etiqueta: "Parte que se reparte en partes iguales", formato: "moneda" },
    { clave: "cinco", etiqueta: "Parte que se reparte por cargas familiares", formato: "moneda" },
    { clave: "parteIgual", etiqueta: "Tu parte igual", formato: "moneda" },
    { clave: "parteCargas", etiqueta: "Tu parte por cargas", formato: "moneda" },
    { clave: "total", etiqueta: "Tus utilidades", formato: "moneda", destacada: true },
  ],
});
