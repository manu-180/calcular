import { aplicarEscalaMarginal, definirCalculadora, porcentaje } from "@/motor/calculo";

const PARTIDAS = 3;

export default definirCalculadora({
  id: "pa.impuesto-de-inmueble",
  mercado: "pa",
  concepto: "propio",
  slug: "impuesto-de-inmueble",
  estado: "publicado",
  requiere: {
    "pa.inmueble-vivienda-principal": "escala",
    "pa.inmueble-general": "escala",
    "pa.inmueble-descuento-pronto-pago": "numero",
  },
  campos: [
    {
      id: "valor",
      tipo: "moneda",
      etiqueta: "Valor catastral (terreno y mejoras)",
      ayuda: "El que figura para tu finca en la Dirección General de Ingresos o en el Registro Público.",
      min: 0,
    },
    {
      id: "uso",
      tipo: "opcion",
      etiqueta: "El inmueble es",
      opciones: [
        { valor: "vivienda-principal", etiqueta: "Mi vivienda principal o patrimonio familiar tributario" },
        { valor: "otro", etiqueta: "Otra vivienda, local, oficina o terreno" },
      ],
      porDefecto: "vivienda-principal",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const vivienda = entrada.uso === "vivienda-principal";
    const tarifa = vivienda ? valores["pa.inmueble-vivienda-principal"] : valores["pa.inmueble-general"];
    const anual = redondear(aplicarEscalaMarginal(tarifa, entrada.valor));
    const descuento = redondear(porcentaje(anual, valores["pa.inmueble-descuento-pronto-pago"]));
    const exento = tarifa[0]?.hasta ?? 0;
    const observaciones: string[] = [];
    if (vivienda) observaciones.push("La tarifa de vivienda principal se aplica solo si la registraste así ante la Dirección General de Ingresos.");
    observaciones.push("Si pagas una partida después de su vencimiento, te cobran un recargo.");
    return {
      exento,
      anual,
      descuento,
      conDescuento: redondear(anual - descuento),
      partida: redondear(anual / PARTIDAS),
      observaciones,
    };
  },
  resultado: [
    { clave: "exento", etiqueta: "Valor que no paga impuesto", formato: "moneda" },
    { clave: "anual", etiqueta: "Impuesto de inmueble al año", formato: "moneda", destacada: true },
    { clave: "partida", etiqueta: "Cada una de las tres partidas", formato: "moneda" },
    { clave: "descuento", etiqueta: "Descuento si pagas todo hasta fin de febrero", formato: "moneda", ocultarSiCero: true },
    { clave: "conDescuento", etiqueta: "A pagar con el descuento", formato: "moneda" },
  ],
});
