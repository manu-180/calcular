import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { diasEntre } from "../fechas";

export default definirCalculadora({
  id: "pe.intereses-sunat",
  mercado: "pe",
  concepto: "propio",
  slug: "intereses-moratorios-sunat",
  estado: "publicado",
  requiere: {
    "pe.tim": "mapa",
  },
  campos: [
    { id: "tributo", tipo: "moneda", etiqueta: "Tributo que no pagaste a tiempo", ayuda: "El impuesto, sin multas.", min: 0 },
    { id: "moneda", tipo: "opcion-dato", etiqueta: "Moneda de la deuda", dato: "pe.tim", porDefecto: "soles" },
    { id: "vencimiento", tipo: "fecha", etiqueta: "Fecha de vencimiento" },
    { id: "pago", tipo: "fecha", etiqueta: "Fecha en que vas a pagar", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.pago < entrada.vencimiento) throw new ErrorEntrada("La fecha de pago tiene que ser posterior al vencimiento.", "pago");
    const tim = enMapa(valores["pe.tim"], entrada.moneda);
    // Código Tributario, art. 33: TIM diaria = TIM mensual / 30, desde el día siguiente al vencimiento
    // hasta el día de pago inclusive.
    const timDiaria = tim / 30;
    const dias = diasEntre(entrada.vencimiento, entrada.pago);
    const interes = redondear(porcentaje(entrada.tributo, timDiaria * dias));
    return {
      tim,
      timDiaria,
      dias,
      interes,
      total: redondear(entrada.tributo + interes),
      observaciones: [
        "Se usa la TIM vigente hoy para todo el periodo. Si la deuda es de antes de un cambio de tasa, el monto real puede variar un poco.",
        "Desde 2024 las multas no usan la TIM: generan interés legal. Esta calculadora es solo para tributos.",
      ],
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Días de atraso", formato: "dias" },
    { clave: "tim", etiqueta: "TIM mensual", formato: "porcentaje", decimales: 2 },
    { clave: "timDiaria", etiqueta: "TIM diaria", formato: "porcentaje", decimales: 4 },
    { clave: "interes", etiqueta: "Intereses moratorios", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Tributo más intereses", formato: "moneda" },
  ],
});
