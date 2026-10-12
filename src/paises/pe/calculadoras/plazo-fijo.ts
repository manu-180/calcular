import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// En Perú la TEA se capitaliza con un año de 360 días: interés = capital × ((1 + TEA)^(días / 360) − 1).
const DIAS_ANIO = 360;

export default definirCalculadora({
  id: "pe.plazo-fijo",
  mercado: "pe",
  concepto: "plazo-fijo",
  slug: "plazo-fijo",
  estado: "publicado",
  requiere: {
    "pe.fsd-cobertura": "serie",
  },
  campos: [
    { id: "capital", tipo: "moneda", etiqueta: "Monto que depositas", min: 0, porDefecto: 10000 },
    { id: "tea", tipo: "porcentaje", etiqueta: "Tasa efectiva anual (TEA) que te ofrecen", min: 0, max: 100, porDefecto: 5 },
    { id: "dias", tipo: "entero", etiqueta: "Plazo en días", min: 1, max: 3600, porDefecto: 360 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.dias < 1) throw new ErrorEntrada("El plazo tiene que ser de al menos un día.", "dias");
    const factor = Math.pow(1 + entrada.tea / 100, entrada.dias / DIAS_ANIO);
    const interes = redondear(entrada.capital * (factor - 1));
    const total = redondear(entrada.capital + interes);
    const tem = (Math.pow(1 + entrada.tea / 100, 30 / DIAS_ANIO) - 1) * 100;
    const cobertura = valores["pe.fsd-cobertura"].valor;
    const observaciones: string[] = [];
    if (total > cobertura) {
      observaciones.push("Tu depósito más intereses pasa la cobertura del Fondo de Seguro de Depósitos en una misma entidad. Si te importa la protección total, repártelo entre varias.");
    }
    observaciones.push("No incluye impuestos ni el ITF. Compara siempre la TEA, que ya considera la capitalización.");
    return { interes, total, tem, cobertura, observaciones };
  },
  resultado: [
    { clave: "interes", etiqueta: "Intereses que ganas", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Total al vencimiento", formato: "moneda" },
    { clave: "tem", etiqueta: "Tasa efectiva mensual equivalente", formato: "porcentaje", decimales: 4 },
    { clave: "cobertura", etiqueta: "Cobertura del Fondo de Seguro de Depósitos", formato: "moneda" },
  ],
});
