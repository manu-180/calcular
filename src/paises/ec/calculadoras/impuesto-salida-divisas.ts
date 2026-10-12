import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ec.impuesto-salida-divisas",
  mercado: "ec",
  concepto: "propio",
  slug: "impuesto-salida-divisas",
  estado: "publicado",
  requiere: {
    "ec.sbu": "numero",
    "ec.isd": "numero",
    "ec.isd-exento-sbu": "numero",
    "ec.isd-exento-tarjetas": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Cómo sale el dinero",
      opciones: [
        { valor: "tarjeta", etiqueta: "Compras o retiros con tarjeta en el exterior" },
        { valor: "efectivo", etiqueta: "Efectivo que llevo al viajar" },
        { valor: "transferencia", etiqueta: "Transferencia o envío al exterior" },
      ],
      porDefecto: "tarjeta",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Monto", min: 0 },
    {
      id: "previo",
      tipo: "moneda",
      etiqueta: "Lo que ya usaste con tarjeta en el exterior este año",
      ayuda: "Solo para tarjetas: el monto exento es anual y se va consumiendo.",
      min: 0,
      porDefecto: 0,
    },
    {
      id: "menores",
      tipo: "entero",
      etiqueta: "Menores de edad que viajan contigo",
      ayuda: "Solo para efectivo: cada menor suma un salario básico al monto exento.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const sbu = valores["ec.sbu"];
    let exento: number;
    if (entrada.tipo === "tarjeta") exento = Math.max(valores["ec.isd-exento-tarjetas"] - entrada.previo, 0);
    else if (entrada.tipo === "efectivo") exento = sbu * (valores["ec.isd-exento-sbu"] + entrada.menores);
    else if (entrada.tipo === "transferencia") exento = sbu * valores["ec.isd-exento-sbu"];
    else throw new ErrorEntrada({ codigo: "opcion-invalida" });
    const gravado = Math.max(entrada.monto - exento, 0);
    const observaciones: string[] = [];
    if (entrada.tipo === "transferencia") observaciones.push("El monto exento de las transferencias se aplica según la periodicidad que fija el SRI. Tu banco retiene el impuesto al enviar.");
    if (entrada.tipo === "efectivo") observaciones.push("El efectivo que pase el monto exento se declara y se paga antes de salir del país.");
    if (entrada.tipo === "tarjeta") observaciones.push("No cuentan los pagos de estudios ni de tratamientos de enfermedades catastróficas, raras o huérfanas, que están exentos.");
    return {
      exento: redondear(Math.min(exento, entrada.monto)),
      gravado: redondear(gravado),
      impuesto: redondear(porcentaje(gravado, valores["ec.isd"])),
      observaciones,
    };
  },
  resultado: [
    { clave: "exento", etiqueta: "Parte exenta", formato: "moneda" },
    { clave: "gravado", etiqueta: "Parte que paga ISD", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Impuesto a la salida de divisas", formato: "moneda", destacada: true },
  ],
});
