import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "do.ipi",
  mercado: "do",
  concepto: "propio",
  slug: "ipi",
  estado: "publicado",
  requiere: {
    "do.ipi-exento": "numero",
    "do.ipi-tasa": "numero",
  },
  campos: [
    {
      id: "valor",
      tipo: "moneda",
      etiqueta: "Valor total de tus viviendas y solares urbanos",
      ayuda: "La suma de todos tus inmuebles, con el valor que tiene registrado la DGII.",
      min: 0,
    },
    { id: "mayor65", tipo: "si-no", etiqueta: "Tienes 65 años o más y es tu única vivienda", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const exento = valores["do.ipi-exento"];
    if (entrada.mayor65) {
      return { exento, excedente: 0, anual: 0, cuota: 0, observaciones: ["Si tienes 65 años o más y esa vivienda es tu único inmueble, no pagas IPI."] };
    }
    const excedente = redondear(Math.max(0, entrada.valor - exento));
    const anual = redondear(porcentaje(excedente, valores["do.ipi-tasa"]));
    const observaciones: string[] = [];
    if (anual === 0) observaciones.push("Tu patrimonio no pasa del monto exento: no pagas IPI.");
    else observaciones.push("Se paga en dos cuotas iguales: hasta el 11 de marzo y hasta el 11 de septiembre.");
    return { exento, excedente, anual, cuota: redondear(anual / 2), observaciones };
  },
  resultado: [
    { clave: "exento", etiqueta: "Monto exento de este año", formato: "moneda" },
    { clave: "excedente", etiqueta: "Valor sobre el que pagas", formato: "moneda" },
    { clave: "anual", etiqueta: "IPI del año", formato: "moneda", destacada: true },
    { clave: "cuota", etiqueta: "Cada cuota", formato: "moneda", ocultarSiCero: true },
  ],
});
