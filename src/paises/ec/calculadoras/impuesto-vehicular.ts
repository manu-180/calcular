import { aplicarEscala, definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ec.impuesto-vehicular",
  mercado: "ec",
  concepto: "propio",
  slug: "impuesto-vehicular",
  estado: "publicado",
  requiere: {
    "ec.impuesto-vehicular": "escala",
    "ec.impuesto-vehiculo-usado": "numero",
  },
  campos: [
    {
      id: "avaluo",
      tipo: "moneda",
      etiqueta: "Avalúo del vehículo registrado en el SRI",
      ayuda: "Lo encuentras en la consulta de valores a pagar del SRI con tu placa. No es el precio de compra.",
      min: 0,
    },
    { id: "compraUsado", tipo: "si-no", etiqueta: "Vas a comprar este vehículo usado", porDefecto: false },
    {
      id: "precio",
      tipo: "moneda",
      etiqueta: "Precio de compra en el contrato",
      ayuda: "Solo si es una compra de vehículo usado.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const propiedad = redondear(aplicarEscala(valores["ec.impuesto-vehicular"], entrada.avaluo));
    const baseCompra = entrada.compraUsado ? Math.max(entrada.precio, entrada.avaluo) : 0;
    const compra = redondear(porcentaje(baseCompra, valores["ec.impuesto-vehiculo-usado"]));
    const observaciones = [
      "La matrícula también incluye la tasa de la Agencia Nacional de Tránsito y el impuesto al rodaje de tu municipio. Esos valores no están en este cálculo.",
    ];
    if (entrada.compraUsado && entrada.precio < entrada.avaluo) observaciones.push(`El ${valores["ec.impuesto-vehiculo-usado"]} % de la compra se calcula sobre el avalúo, porque el precio del contrato es menor.`);
    return {
      propiedad,
      compra,
      total: redondear(propiedad + compra),
      observaciones,
    };
  },
  resultado: [
    { clave: "propiedad", etiqueta: "Impuesto a la propiedad del año", formato: "moneda" },
    { clave: "compra", etiqueta: "Impuesto a la compra del usado", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total de impuestos del SRI", formato: "moneda", destacada: true },
  ],
});
