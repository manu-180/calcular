import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "hn.deposito-a-plazo",
  mercado: "hn",
  concepto: "plazo-fijo",
  slug: "deposito-a-plazo",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto a depositar", min: 0, porDefecto: 100000 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Tasa de interés anual que ofrece el banco", min: 0, max: 100 },
    { id: "dias", tipo: "entero", etiqueta: "Plazo en días", min: 1, max: 3650, porDefecto: 360 },
    {
      id: "base",
      tipo: "opcion",
      etiqueta: "Año que usa el banco para el cálculo",
      opciones: [
        { valor: "360", etiqueta: "360 días (lo más común)" },
        { valor: "365", etiqueta: "365 días" },
      ],
      porDefecto: "360",
    },
    {
      id: "retencion",
      tipo: "porcentaje",
      etiqueta: "Retención sobre los intereses (opcional)",
      min: 0,
      max: 100,
      requerido: false,
      ayuda: "La que le indique su banco. Déjela vacía si no le retienen.",
    },
  ],
  calcular(entrada, _valores, { redondear }) {
    const interes = redondear((entrada.monto * entrada.tasa * entrada.dias) / 100 / Number(entrada.base));
    const retenido = redondear(porcentaje(interes, entrada.retencion ?? 0));
    const neto = redondear(interes - retenido);
    return {
      interes,
      retenido,
      neto,
      total: redondear(entrada.monto + neto),
      observaciones: [
        "Interés simple, pagado al vencimiento. Si el banco paga intereses cada mes y usted los reinvierte, el total cambia un poco.",
        "Pregunte si el banco aplica alguna retención de impuesto sobre los intereses y cuánta.",
      ],
    };
  },
  resultado: [
    { clave: "interes", etiqueta: "Intereses del plazo", formato: "moneda" },
    { clave: "retenido", etiqueta: "Retención", formato: "moneda", ocultarSiCero: true },
    { clave: "neto", etiqueta: "Intereses netos", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Total al vencimiento", formato: "moneda" },
  ],
});
