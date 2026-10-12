import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "do.subsidio-lactancia",
  mercado: "do",
  concepto: "propio",
  slug: "subsidio-lactancia",
  estado: "publicado",
  requiere: {
    "do.lactancia-porcentaje": "mapa",
    "do.lactancia-meses": "numero",
    "do.salario-minimo-nacional": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario cotizable promedio de los últimos 6 meses",
      ayuda: "El que reporta tu empleador a la TSS. Si siempre ganaste lo mismo, pon tu salario.",
      min: 0,
    },
    { id: "hijos", tipo: "entero", etiqueta: "Niños nacidos vivos en el parto", min: 1, max: 6, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.hijos < 1) throw new ErrorEntrada("Pon al menos un niño.", "hijos");
    const smn = valores["do.salario-minimo-nacional"];
    const tabla = valores["do.lactancia-porcentaje"];
    const clave = entrada.salario <= smn ? "hasta-1" : entrada.salario <= 2 * smn ? "hasta-2" : entrada.salario <= 3 * smn ? "hasta-3" : null;
    const tasa = clave ? enMapa(tabla, clave) : 0;
    const meses = valores["do.lactancia-meses"];
    const mensual = redondear(porcentaje(entrada.salario, tasa) * entrada.hijos);
    const observaciones: string[] = [];
    if (!clave) observaciones.push("Con un salario cotizable de más de 3 salarios mínimos nacionales no corresponde el subsidio por lactancia.");
    else observaciones.push("Hace falta haber cotizado al menos 8 meses en los 12 anteriores al parto. Lo paga la SISALRIL, mes a mes.");
    return { tasa, mensual, meses, total: redondear(mensual * meses), observaciones };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Porcentaje que te toca", formato: "porcentaje" },
    { clave: "mensual", etiqueta: "Subsidio por mes", formato: "moneda", destacada: true },
    { clave: "meses", etiqueta: "Meses de pago", formato: "meses" },
    { clave: "total", etiqueta: "Total del subsidio", formato: "moneda" },
  ],
});
