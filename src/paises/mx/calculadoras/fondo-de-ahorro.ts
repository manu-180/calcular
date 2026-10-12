import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mx.fondo-de-ahorro",
  mercado: "mx",
  concepto: "propio",
  slug: "fondo-de-ahorro",
  estado: "publicado",
  requiere: {
    "mx.tope-fondo-ahorro-porcentaje": "numero",
    "mx.tope-fondo-ahorro-uma": "numero",
    "mx.uma-mensual": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Sueldo bruto mensual", min: 0 },
    { id: "porcentaje", tipo: "porcentaje", etiqueta: "Porcentaje que aportan tú y tu empresa", min: 0, max: 100, porDefecto: 13 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.porcentaje < 0) throw new ErrorEntrada("El porcentaje no puede ser negativo.", "porcentaje");
    const aportacionMensual = redondear(porcentaje(entrada.sueldo, entrada.porcentaje));
    const anualEmpresa = redondear(aportacionMensual * 12);
    const topePorcentaje = redondear(porcentaje(entrada.sueldo, valores["mx.tope-fondo-ahorro-porcentaje"]) * 12);
    const topeUma = redondear(valores["mx.tope-fondo-ahorro-uma"] * valores["mx.uma-mensual"] * 12);
    const tope = Math.min(topePorcentaje, topeUma);
    const exento = Math.min(anualEmpresa, tope);
    return {
      aportacionMensual,
      anualEmpresa,
      ahorroAnual: redondear(anualEmpresa * 2),
      tope,
      exento,
      gravado: redondear(anualEmpresa - exento),
      observaciones: ["Tú aportas lo mismo que tu empresa. Tu parte sale de tu sueldo, que ya pagó ISR."],
    };
  },
  resultado: [
    { clave: "aportacionMensual", etiqueta: "Aportación de cada parte al mes", formato: "moneda" },
    { clave: "anualEmpresa", etiqueta: "Aportación de la empresa al año", formato: "moneda" },
    { clave: "ahorroAnual", etiqueta: "Ahorro total del año (tú y tu empresa)", formato: "moneda", destacada: true },
    { clave: "tope", etiqueta: "Tope anual exento de la aportación de la empresa", formato: "moneda" },
    { clave: "exento", etiqueta: "Parte de la empresa que no paga ISR", formato: "moneda" },
    { clave: "gravado", etiqueta: "Parte de la empresa que paga ISR", formato: "moneda", ocultarSiCero: true },
  ],
});
