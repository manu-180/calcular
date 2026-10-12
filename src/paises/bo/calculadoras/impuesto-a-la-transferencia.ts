import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "bo.impuesto-a-la-transferencia",
  mercado: "bo",
  concepto: "propio",
  slug: "impuesto-a-la-transferencia",
  estado: "publicado",
  requiere: {
    "bo.imt": "numero",
  },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "Precio de venta", min: 0 },
    {
      id: "baseImponible",
      tipo: "moneda",
      etiqueta: "Base imponible del impuesto a la propiedad de la última gestión (opcional)",
      ayuda: "Figura en la liquidación del impuesto anual del inmueble o del vehículo que emite su municipio.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const base = Math.max(entrada.precio, entrada.baseImponible ?? 0);
    const observaciones = ["Se paga en el municipio dentro de los 10 días hábiles de firmada la transferencia. Sin el comprobante, el notario no la protocoliza."];
    if (entrada.baseImponible !== null && entrada.baseImponible > entrada.precio) observaciones.push("La base imponible municipal es mayor que el precio: el impuesto se calcula sobre ella.");
    if (entrada.baseImponible === null) observaciones.push("Si la base imponible del impuesto a la propiedad es mayor que el precio, el impuesto se calcula sobre esa base.");
    return { base, impuesto: redondear(porcentaje(base, valores["bo.imt"])), observaciones };
  },
  resultado: [
    { clave: "base", etiqueta: "Base del impuesto", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Impuesto Municipal a las Transferencias (IMT)", formato: "moneda", destacada: true },
  ],
});
