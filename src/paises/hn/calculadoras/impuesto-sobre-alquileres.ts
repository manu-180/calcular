import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "hn.impuesto-sobre-alquileres",
  mercado: "hn",
  concepto: "propio",
  slug: "impuesto-sobre-alquileres",
  estado: "publicado",
  requiere: {
    "hn.alquiler-tasa": "numero",
    "hn.alquiler-minimo-mensual": "numero",
  },
  campos: [
    {
      id: "alquiler",
      tipo: "moneda",
      etiqueta: "Alquiler mensual de vivienda",
      ayuda: "Si alquila varios cuartos o apartamentos del mismo inmueble, sume lo de todos.",
      min: 0,
    },
    { id: "meses", tipo: "entero", etiqueta: "Meses alquilados en el año", min: 1, max: 12, porDefecto: 12 },
  ],
  calcular(entrada, valores, { redondear }) {
    const minimo = valores["hn.alquiler-minimo-mensual"];
    const tasa = valores["hn.alquiler-tasa"];
    const anual = redondear(entrada.alquiler * entrada.meses);
    const paga = entrada.alquiler > minimo;
    const impuesto = paga ? redondear(porcentaje(anual, tasa)) : 0;
    const observaciones = paga
      ? ["Es un impuesto único y definitivo de personas naturales: el alquiler no se suma a la tabla progresiva del ISR."]
      : ["Con un alquiler mensual que no pasa del mínimo, no paga este impuesto."];
    observaciones.push("No aplica a hoteles, moteles y hospedajes, ni a pensiones, mesones o cuarterías.");
    return { anual, tasa, impuesto, mensual: redondear(impuesto / entrada.meses), observaciones };
  },
  resultado: [
    { clave: "anual", etiqueta: "Alquiler del año", formato: "moneda" },
    { clave: "tasa", etiqueta: "Tasa", formato: "porcentaje" },
    { clave: "impuesto", etiqueta: "Impuesto del año", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "Equivale por mes a", formato: "moneda" },
  ],
});
