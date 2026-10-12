import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cl.cotizaciones-previsionales",
  mercado: "cl",
  concepto: "aportes-seguridad-social",
  slug: "cotizaciones-previsionales",
  estado: "publicado",
  requiere: {
    "cl.cotizacion-afp": "numero",
    "cl.comision-afp": "mapa",
    "cl.salud": "numero",
    "cl.cesantia-trabajador": "numero",
    "cl.cesantia-empleador": "mapa",
    "cl.cotizacion-empleador-pensiones": "numero",
    "cl.accidentes-basica": "numero",
    "cl.sanna": "numero",
    "cl.tope-imponible": "numero",
    "cl.tope-imponible-cesantia": "numero",
    "cl.uf": "serie",
  },
  campos: [
    { id: "imponible", tipo: "moneda", etiqueta: "Sueldo bruto imponible", min: 0 },
    { id: "afp", tipo: "opcion-dato", etiqueta: "AFP", dato: "cl.comision-afp" },
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
  ],
  calcular(entrada, valores, { redondear }) {
    const uf = valores["cl.uf"].valor;
    const tope = redondear(valores["cl.tope-imponible"] * uf);
    const topeCesantia = redondear(valores["cl.tope-imponible-cesantia"] * uf);
    const base = Math.min(entrada.imponible, tope);
    const baseCesantia = Math.min(entrada.imponible, topeCesantia);
    const indefinido = entrada.contrato === "indefinido";

    const afpFondo = redondear(porcentaje(base, valores["cl.cotizacion-afp"]));
    const comision = redondear(porcentaje(base, enMapa(valores["cl.comision-afp"], entrada.afp)));
    const salud = redondear(porcentaje(base, valores["cl.salud"]));
    const cesantiaTrabajador = indefinido ? redondear(porcentaje(baseCesantia, valores["cl.cesantia-trabajador"])) : 0;
    const totalTrabajador = afpFondo + comision + salud + cesantiaTrabajador;

    const cesantiaEmpleador = redondear(porcentaje(baseCesantia, enMapa(valores["cl.cesantia-empleador"], entrada.contrato)));
    const pensionesEmpleador = redondear(porcentaje(base, valores["cl.cotizacion-empleador-pensiones"]));
    const accidentes = redondear(porcentaje(base, valores["cl.accidentes-basica"] + valores["cl.sanna"]));
    const totalEmpleador = cesantiaEmpleador + pensionesEmpleador + accidentes;

    return {
      afpFondo,
      comision,
      salud,
      cesantiaTrabajador,
      totalTrabajador,
      cesantiaEmpleador,
      pensionesEmpleador,
      accidentes,
      totalEmpleador,
      total: totalTrabajador + totalEmpleador,
      observaciones: entrada.imponible > tope ? ["El sueldo pasa el tope imponible: las cotizaciones se calculan hasta ese tope."] : [],
    };
  },
  resultado: [
    { clave: "totalTrabajador", etiqueta: "Lo que te descuentan a ti", formato: "moneda", destacada: true },
    { clave: "afpFondo", etiqueta: "AFP: a tu cuenta", formato: "moneda" },
    { clave: "comision", etiqueta: "AFP: comisión", formato: "moneda" },
    { clave: "salud", etiqueta: "Salud (cotización legal)", formato: "moneda" },
    { clave: "cesantiaTrabajador", etiqueta: "Seguro de cesantía (tu parte)", formato: "moneda", ocultarSiCero: true },
    { clave: "totalEmpleador", etiqueta: "Lo que paga tu empleador aparte", formato: "moneda", destacada: true },
    { clave: "cesantiaEmpleador", etiqueta: "Seguro de cesantía (parte del empleador)", formato: "moneda" },
    { clave: "pensionesEmpleador", etiqueta: "Cotización del empleador para pensiones", formato: "moneda" },
    { clave: "accidentes", etiqueta: "Accidentes del trabajo y Ley SANNA (tasa básica)", formato: "moneda" },
    { clave: "total", etiqueta: "Total de cotizaciones del mes", formato: "moneda" },
  ],
});
