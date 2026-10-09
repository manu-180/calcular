import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cl.costo-empresa",
  mercado: "cl",
  concepto: "costo-empleador",
  slug: "costo-empresa",
  estado: "publicado",
  requiere: {
    "cl.tope-imponible": "numero",
    "cl.tope-imponible-cesantia": "numero",
    "cl.cesantia-empleador": "mapa",
    "cl.cotizacion-empleador-pensiones": "numero",
    "cl.accidentes-basica": "numero",
    "cl.sanna": "numero",
    "cl.uf": "serie",
  },
  campos: [
    {
      id: "imponible",
      tipo: "moneda",
      etiqueta: "Sueldo bruto imponible",
      ayuda: "Sueldo base más gratificación, horas extra, bonos y comisiones del mes.",
      min: 0,
    },
    {
      id: "noImponible",
      tipo: "moneda",
      etiqueta: "Colación y movilización",
      ayuda: "Lo que no paga cotizaciones. Si no hay, deja 0.",
      min: 0,
      porDefecto: 0,
    },
    {
      id: "contrato",
      tipo: "opcion",
      etiqueta: "Tipo de contrato",
      opciones: [
        { valor: "indefinido", etiqueta: "Indefinido" },
        { valor: "plazo-fijo", etiqueta: "A plazo fijo, por obra o faena" },
      ],
      porDefecto: "indefinido",
    },
    {
      id: "tasaAdicional",
      tipo: "porcentaje",
      etiqueta: "Cotización adicional de tu mutual o del ISL",
      ayuda: "Depende del riesgo de la actividad y de los accidentes de la empresa. Te la informa tu mutual o el ISL. Si no la sabes, deja 0.",
      min: 0,
      max: 6.8,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.tasaAdicional > 6.8) throw new ErrorEntrada("La cotización adicional no pasa de 6,8 %.", "tasaAdicional");
    const uf = valores["cl.uf"].valor;
    const tope = redondear(valores["cl.tope-imponible"] * uf);
    const topeCesantia = redondear(valores["cl.tope-imponible-cesantia"] * uf);
    const base = Math.min(entrada.imponible, tope);

    const cesantia = redondear(porcentaje(Math.min(entrada.imponible, topeCesantia), enMapa(valores["cl.cesantia-empleador"], entrada.contrato)));
    const pensiones = redondear(porcentaje(base, valores["cl.cotizacion-empleador-pensiones"]));
    const accidentes = redondear(porcentaje(base, valores["cl.accidentes-basica"] + entrada.tasaAdicional));
    const sanna = redondear(porcentaje(base, valores["cl.sanna"]));
    const cargas = cesantia + pensiones + accidentes + sanna;
    const costoTotal = entrada.imponible + entrada.noImponible + cargas;

    const observaciones: string[] = [];
    if (entrada.imponible > tope) observaciones.push("El sueldo pasa el tope imponible: las cotizaciones se calculan solo hasta ese tope.");

    return {
      imponible: entrada.imponible,
      noImponible: entrada.noImponible,
      cesantia,
      pensiones,
      accidentes,
      sanna,
      cargas,
      costoTotal,
      recargo: entrada.imponible > 0 ? (cargas / entrada.imponible) * 100 : 0,
      tope,
      observaciones,
    };
  },
  resultado: [
    { clave: "costoTotal", etiqueta: "Costo total para la empresa", formato: "moneda", destacada: true },
    { clave: "imponible", etiqueta: "Sueldo bruto imponible", formato: "moneda" },
    { clave: "noImponible", etiqueta: "Colación y movilización", formato: "moneda", ocultarSiCero: true },
    { clave: "cesantia", etiqueta: "Seguro de cesantía (parte del empleador)", formato: "moneda" },
    { clave: "pensiones", etiqueta: "Cotización del empleador para pensiones", formato: "moneda" },
    { clave: "accidentes", etiqueta: "Seguro de accidentes del trabajo", formato: "moneda" },
    { clave: "sanna", etiqueta: "Ley SANNA", formato: "moneda" },
    { clave: "cargas", etiqueta: "Total de cotizaciones del empleador", formato: "moneda" },
    { clave: "recargo", etiqueta: "Cotizaciones sobre el sueldo imponible", formato: "porcentaje", decimales: 2 },
    { clave: "tope", etiqueta: "Tope imponible del mes", formato: "moneda" },
  ],
});
