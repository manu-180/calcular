import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.costo-laboral",
  mercado: "pe",
  concepto: "costo-empleador",
  slug: "costo-laboral",
  estado: "publicado",
  requiere: {
    "pe.rmv": "numero",
    "pe.asignacion-familiar": "numero",
    "pe.aporte-essalud": "numero",
    "pe.bonificacion-extraordinaria": "mapa",
    "pe.gratificacion-por-regimen": "mapa",
    "pe.cts-por-regimen": "mapa",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo mensual bruto", min: 0 },
    { id: "asignacionFamiliar", tipo: "si-no", etiqueta: "Recibe asignación familiar", porDefecto: false },
    {
      id: "regimen",
      tipo: "opcion",
      etiqueta: "Régimen laboral de la empresa",
      opciones: [
        { valor: "general", etiqueta: "Régimen general" },
        { valor: "pequena", etiqueta: "Pequeña empresa (REMYPE)" },
      ],
      porDefecto: "general",
    },
    { id: "seguro", tipo: "opcion-dato", etiqueta: "Seguro de salud del trabajador", dato: "pe.bonificacion-extraordinaria", porDefecto: "essalud" },
  ],
  calcular(entrada, valores, { redondear }) {
    const asignacion = entrada.asignacionFamiliar ? redondear(porcentaje(valores["pe.rmv"], valores["pe.asignacion-familiar"])) : 0;
    const remuneracion = redondear(entrada.sueldo + asignacion);
    const essalud = redondear(porcentaje(Math.max(remuneracion, valores["pe.rmv"]), valores["pe.aporte-essalud"]));
    const gratificacion = redondear(remuneracion * enMapa(valores["pe.gratificacion-por-regimen"], entrada.regimen));
    const bonificacion = redondear(porcentaje(gratificacion, enMapa(valores["pe.bonificacion-extraordinaria"], entrada.seguro)));
    const remuneracionComputable = redondear(remuneracion + gratificacion / 6);
    const cts = redondear(((remuneracionComputable * enMapa(valores["pe.cts-por-regimen"], entrada.regimen)) / 12) * 6);

    const sueldosAnio = redondear(remuneracion * 12);
    const essaludAnio = redondear(essalud * 12);
    const gratificacionesAnio = redondear((gratificacion + bonificacion) * 2);
    const ctsAnio = redondear(cts * 2);
    const costoAnual = redondear(sueldosAnio + essaludAnio + gratificacionesAnio + ctsAnio);

    const observaciones: string[] = [];
    if (remuneracion < valores["pe.rmv"]) observaciones.push("La remuneración es menor que la mínima vital. Con jornada completa no puede serlo, y EsSalud se calcula como mínimo sobre la RMV.");
    if (entrada.regimen === "pequena") observaciones.push("En la pequeña empresa la gratificación es media remuneración y la CTS, 15 remuneraciones diarias por año.");

    return {
      remuneracion,
      essalud,
      gratificacion,
      bonificacion,
      cts,
      sueldosAnio,
      essaludAnio,
      gratificacionesAnio,
      ctsAnio,
      costoAnual,
      costoMensual: redondear(costoAnual / 12),
      recargo: remuneracion > 0 ? (costoAnual / sueldosAnio - 1) * 100 : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "costoMensual", etiqueta: "Costo mensual promedio", formato: "moneda", destacada: true },
    { clave: "costoAnual", etiqueta: "Costo total al año", formato: "moneda" },
    { clave: "remuneracion", etiqueta: "Remuneración mensual (con asignación familiar)", formato: "moneda" },
    { clave: "essalud", etiqueta: "Aporte mensual a EsSalud", formato: "moneda" },
    { clave: "gratificacion", etiqueta: "Gratificación de julio y de diciembre (cada una)", formato: "moneda" },
    { clave: "bonificacion", etiqueta: "Bonificación extraordinaria (con cada gratificación)", formato: "moneda" },
    { clave: "cts", etiqueta: "CTS de mayo y de noviembre (cada depósito)", formato: "moneda" },
    { clave: "sueldosAnio", etiqueta: "Remuneraciones del año (12 meses)", formato: "moneda" },
    { clave: "essaludAnio", etiqueta: "EsSalud del año", formato: "moneda" },
    { clave: "gratificacionesAnio", etiqueta: "Gratificaciones y bonificaciones del año", formato: "moneda" },
    { clave: "ctsAnio", etiqueta: "CTS del año", formato: "moneda" },
    { clave: "recargo", etiqueta: "Costo extra sobre las 12 remuneraciones", formato: "porcentaje", decimales: 2 },
  ],
});
