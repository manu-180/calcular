import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.monto-asignacion-familiar",
  mercado: "pe",
  concepto: "propio",
  slug: "asignacion-familiar",
  estado: "publicado",
  requiere: {
    "pe.rmv": "numero",
    "pe.asignacion-familiar": "numero",
    "pe.bonificacion-extraordinaria": "mapa",
  },
  campos: [
    {
      id: "beneficios",
      tipo: "si-no",
      etiqueta: "Cobras gratificación y CTS",
      ayuda: "Sí, si trabajas en planilla en el régimen general.",
      porDefecto: true,
    },
    { id: "seguro", tipo: "opcion-dato", etiqueta: "Tu seguro de salud", dato: "pe.bonificacion-extraordinaria", porDefecto: "essalud" },
  ],
  calcular(entrada, valores, { redondear }) {
    const mensual = redondear(porcentaje(valores["pe.rmv"], valores["pe.asignacion-familiar"]));
    const enSueldos = redondear(mensual * 12);
    // Entra en la remuneración de cada gratificación (con su bonificación) y, por la CTS, suma
    // la asignación más un sexto de la gratificación en cada semestre: siete sextos al año.
    const enGratificaciones = entrada.beneficios
      ? redondear(mensual * 2 + porcentaje(mensual * 2, enMapa(valores["pe.bonificacion-extraordinaria"], entrada.seguro)))
      : 0;
    const enCts = entrada.beneficios ? redondear((mensual * 7) / 6) : 0;
    return {
      rmv: valores["pe.rmv"],
      mensual,
      enSueldos,
      enGratificaciones,
      enCts,
      anual: redondear(enSueldos + enGratificaciones + enCts),
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Asignación familiar mensual", formato: "moneda", destacada: true },
    { clave: "rmv", etiqueta: "Remuneración mínima que se usa", formato: "moneda" },
    { clave: "enSueldos", etiqueta: "En tus 12 sueldos del año", formato: "moneda" },
    { clave: "enGratificaciones", etiqueta: "Lo que suma en tus dos gratificaciones", formato: "moneda", ocultarSiCero: true },
    { clave: "enCts", etiqueta: "Lo que suma en tus dos depósitos de CTS", formato: "moneda", ocultarSiCero: true },
    { clave: "anual", etiqueta: "Total al año por asignación familiar", formato: "moneda" },
  ],
});
