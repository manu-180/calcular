import { definirCalculadora, porcentaje } from "@/motor/calculo";
import sueldoLiquido from "./sueldo-liquido";

export default definirCalculadora({
  id: "cl.licencia-medica",
  mercado: "cl",
  concepto: "propio",
  slug: "licencia-medica",
  estado: "publicado",
  requiere: {
    "cl.cotizacion-afp": "numero",
    "cl.comision-afp": "mapa",
    "cl.salud": "numero",
    "cl.cesantia-trabajador": "numero",
    "cl.tope-imponible": "numero",
    "cl.tope-imponible-cesantia": "numero",
    "cl.impuesto-unico": "escala",
    "cl.uf": "serie",
    "cl.utm": "serie",
    "cl.imm": "numero",
    "cl.licencia-dias-sin-carencia": "numero",
    "cl.licencia-dias-carencia": "numero",
    "cl.subsidio-minimo": "numero",
  },
  campos: [
    {
      id: "imponible",
      tipo: "moneda",
      etiqueta: "Promedio de tu sueldo imponible",
      ayuda: "De los tres meses anteriores al mes en que empieza la licencia.",
      min: 0,
    },
    { id: "afp", tipo: "opcion-dato", etiqueta: "Tu AFP", dato: "cl.comision-afp" },
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
    { id: "dias", tipo: "entero", etiqueta: "Días de licencia", min: 1, max: 365, porDefecto: 7 },
  ],
  calcular(entrada, valores, contexto) {
    const { redondear } = contexto;
    // DFL 44, artículo 7: remuneración neta = imponible menos cotizaciones personales e impuesto. Es
    // lo mismo que el líquido sin colación ni movilización, con la cotización legal de salud.
    const r = sueldoLiquido.calcular(
      { imponible: entrada.imponible, noImponible: 0, afp: entrada.afp, salud: "fonasa", planIsapre: 0, contrato: entrada.contrato },
      valores,
      contexto,
    );
    const neta = r.liquido;
    const minimoDiario = porcentaje(valores["cl.imm"], valores["cl.subsidio-minimo"]) / 30;
    const diario = Math.max(neta / 30, minimoDiario);
    const sinCarencia = entrada.dias > valores["cl.licencia-dias-sin-carencia"];
    const diasPagados = sinCarencia ? entrada.dias : Math.max(0, entrada.dias - valores["cl.licencia-dias-carencia"]);
    const observaciones: string[] = [];
    if (!sinCarencia) observaciones.push("En licencias de 10 días o menos, los primeros 3 días no se pagan.");
    if (neta / 30 < minimoDiario) observaciones.push("Tu subsidio diario sube al mínimo legal.");
    observaciones.push("Durante la licencia se siguen pagando tus cotizaciones de pensión y salud, sobre tu última remuneración imponible.");
    return {
      neta,
      diario: redondear(diario),
      diasPagados,
      diasSinPago: entrada.dias - diasPagados,
      subsidio: redondear(diario * diasPagados),
      observaciones,
    };
  },
  resultado: [
    { clave: "subsidio", etiqueta: "Subsidio por la licencia", formato: "moneda", destacada: true },
    { clave: "diario", etiqueta: "Subsidio por día", formato: "moneda" },
    { clave: "diasPagados", etiqueta: "Días pagados", formato: "dias" },
    { clave: "diasSinPago", etiqueta: "Días sin pago", formato: "dias", ocultarSiCero: true },
    { clave: "neta", etiqueta: "Remuneración neta usada", formato: "moneda" },
  ],
});
