import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cl.seguro-de-cesantia",
  mercado: "cl",
  concepto: "propio",
  slug: "seguro-de-cesantia",
  estado: "publicado",
  requiere: {
    "cl.fcs-porcentaje": "mapa",
    "cl.fcs-valor-superior": "mapa",
    "cl.fcs-valor-inferior": "mapa",
  },
  campos: [
    {
      id: "contrato",
      tipo: "opcion",
      etiqueta: "Tipo de contrato que terminó",
      opciones: [
        { valor: "indefinido", etiqueta: "Indefinido" },
        { valor: "plazo-fijo", etiqueta: "A plazo fijo, por obra o faena" },
      ],
      porDefecto: "indefinido",
    },
    {
      id: "promedio",
      tipo: "moneda",
      etiqueta: "Promedio de tus remuneraciones imponibles",
      ayuda: "De los últimos 10 meses antes del despido. Lo ves en tu certificado de cotizaciones de la AFC.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.promedio <= 0) throw new ErrorEntrada({ codigo: "requerido" }, "promedio");
    const giro = (n: number) => {
      const clave = `${entrada.contrato}-${n}`;
      const bruto = porcentaje(entrada.promedio, enMapa(valores["cl.fcs-porcentaje"], clave));
      return redondear(Math.min(Math.max(bruto, enMapa(valores["cl.fcs-valor-inferior"], clave)), enMapa(valores["cl.fcs-valor-superior"], clave)));
    };
    const giros = [1, 2, 3, 4, 5].map(giro);
    return {
      giro1: giros[0],
      giro2: giros[1],
      giro3: giros[2],
      giro4: giros[3],
      giro5: giros[4],
      total: giros.reduce((a, b) => a + b, 0),
      observaciones: [
        "Primero se paga con lo que tengas en tu cuenta individual de cesantía. El Fondo de Cesantía Solidario completa estos montos si tu saldo no alcanza y cumples sus requisitos.",
      ],
    };
  },
  resultado: [
    { clave: "giro1", etiqueta: "Primer pago", formato: "moneda", destacada: true },
    { clave: "giro2", etiqueta: "Segundo pago", formato: "moneda" },
    { clave: "giro3", etiqueta: "Tercer pago", formato: "moneda" },
    { clave: "giro4", etiqueta: "Cuarto pago", formato: "moneda" },
    { clave: "giro5", etiqueta: "Quinto pago", formato: "moneda" },
    { clave: "total", etiqueta: "Total en cinco meses", formato: "moneda" },
  ],
});
