import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "co.ganancia-ocasional",
  mercado: "co",
  concepto: "propio",
  slug: "ganancia-ocasional",
  estado: "publicado",
  requiere: {
    "co.uvt": "numero",
    "co.ganancia-ocasional": "mapa",
    "co.ganancia-ocasional-exenciones": "mapa",
    "co.ganancia-ocasional-donacion": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Qué recibiste",
      opciones: [
        { valor: "premio", etiqueta: "Un premio de lotería, rifa o apuesta" },
        { valor: "herencia", etiqueta: "Una herencia (como heredero o cónyuge)" },
        { valor: "donacion", etiqueta: "Una donación, o una herencia sin ser heredero" },
        { valor: "venta", etiqueta: "La ganancia por vender un bien que tenías hace dos años o más" },
      ],
      porDefecto: "premio",
    },
    { id: "valor", tipo: "moneda", etiqueta: "Valor recibido o ganancia", min: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    const uvt = valores["co.uvt"];
    const tarifas = valores["co.ganancia-ocasional"];
    const exenciones = valores["co.ganancia-ocasional-exenciones"];
    let exento = 0;
    if (entrada.tipo === "herencia") exento = Math.min(entrada.valor, enMapa(exenciones, "heredero") * uvt);
    if (entrada.tipo === "donacion") {
      exento = Math.min(porcentaje(entrada.valor, valores["co.ganancia-ocasional-donacion"]), enMapa(exenciones, "donacion-tope") * uvt);
    }
    exento = redondear(exento);
    const gravable = entrada.valor - exento;
    const tarifa = enMapa(tarifas, entrada.tipo === "premio" ? "loterias" : "general");
    const observaciones: string[] = [];
    if (entrada.tipo === "herencia") observaciones.push("Si la herencia incluye la vivienda del causante, hay una exención adicional que no está en este cálculo.");
    return {
      exento,
      gravable,
      tarifa,
      impuesto: redondear(porcentaje(gravable, tarifa)),
      observaciones,
    };
  },
  resultado: [
    { clave: "exento", etiqueta: "Parte exenta", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "gravable", etiqueta: "Ganancia ocasional gravable", formato: "moneda", decimales: 0 },
    { clave: "tarifa", etiqueta: "Tarifa", formato: "porcentaje" },
    { clave: "impuesto", etiqueta: "Impuesto de ganancia ocasional", formato: "moneda", decimales: 0, destacada: true },
  ],
});
