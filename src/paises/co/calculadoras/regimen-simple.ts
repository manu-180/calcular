import { definirCalculadora, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";
import { filaDe } from "../reglas";

export default definirCalculadora({
  id: "co.regimen-simple",
  mercado: "co",
  concepto: "regimen-simplificado",
  slug: "regimen-simple",
  estado: "publicado",
  requiere: {
    "co.uvt": "numero",
    "co.simple-tiendas": "escala",
    "co.simple-comercio": "escala",
    "co.simple-comidas-transporte": "escala",
    "co.simple-profesiones": "escala",
    "co.simple-reciclaje": "numero",
    "co.simple-impoconsumo": "numero",
    "co.simple-limite": "numero",
  },
  campos: [
    { id: "ingresos", tipo: "moneda", etiqueta: "Ingresos brutos del año", ayuda: "Todo lo que facturas o cobras en el año, antes de gastos.", min: 0 },
    {
      id: "actividad",
      tipo: "opcion",
      etiqueta: "Actividad",
      opciones: [
        { valor: "tiendas", etiqueta: "Tienda pequeña, minimercado, micromercado o peluquería" },
        { valor: "comercio", etiqueta: "Comercio, servicios técnicos, industria u otras" },
        { valor: "comidas", etiqueta: "Expendio de comidas y bebidas" },
        { valor: "transporte", etiqueta: "Transporte" },
        { valor: "profesiones", etiqueta: "Servicios profesionales, consultoría o científicos" },
        { valor: "reciclaje", etiqueta: "Reciclaje (CIIU 4665, 3830 y 3811)" },
      ],
      porDefecto: "comercio",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const uvt = valores["co.uvt"];
    const ingresosUvt = entrada.ingresos / uvt;
    const limite = valores["co.simple-limite"];
    if (ingresosUvt >= limite) {
      return {
        ingresosUvt,
        tarifa: null,
        impuesto: null,
        impoconsumo: null,
        total: null,
        porBimestre: null,
        observaciones: ["Esos ingresos llegan al límite del Régimen Simple, así que no puedes estar en él."],
      };
    }
    const escalas: Record<string, readonly FilaEscala[]> = {
      tiendas: valores["co.simple-tiendas"],
      comercio: valores["co.simple-comercio"],
      comidas: valores["co.simple-comidas-transporte"],
      transporte: valores["co.simple-comidas-transporte"],
      profesiones: valores["co.simple-profesiones"],
    };
    const tarifa = entrada.actividad === "reciclaje" ? valores["co.simple-reciclaje"] : filaDe(escalas[entrada.actividad], ingresosUvt).tasa;
    const impuesto = redondear(porcentaje(entrada.ingresos, tarifa));
    const impoconsumo = entrada.actividad === "comidas" ? redondear(porcentaje(entrada.ingresos, valores["co.simple-impoconsumo"])) : 0;
    const total = impuesto + impoconsumo;
    const observaciones: string[] = [
      "Durante el año pagas anticipos cada dos meses con la tabla bimestral, y en la declaración anual se ajusta con esta tarifa.",
    ];
    if (impoconsumo > 0) observaciones.push("En expendio de comidas y bebidas se suma el impuesto al consumo a la tarifa SIMPLE.");
    return { ingresosUvt, tarifa, impuesto, impoconsumo, total, porBimestre: redondear(total / 6), observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "Impuesto del año", formato: "moneda", destacada: true },
    { clave: "tarifa", etiqueta: "Tarifa SIMPLE consolidada", formato: "porcentaje", decimales: 2 },
    { clave: "impuesto", etiqueta: "Impuesto SIMPLE", formato: "moneda" },
    { clave: "impoconsumo", etiqueta: "Impuesto al consumo", formato: "moneda", ocultarSiCero: true },
    { clave: "porBimestre", etiqueta: "Promedio por bimestre", formato: "moneda" },
    { clave: "ingresosUvt", etiqueta: "Ingresos en UVT", formato: "numero", decimales: 2 },
  ],
});
