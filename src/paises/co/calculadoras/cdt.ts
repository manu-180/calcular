import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "co.cdt",
  mercado: "co",
  concepto: "plazo-fijo",
  slug: "cdt",
  estado: "publicado",
  requiere: {
    "co.cdt-retencion": "numero",
  },
  campos: [
    { id: "capital", tipo: "moneda", etiqueta: "Valor a invertir", min: 0 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Tasa efectiva anual (E.A.) que te ofrece el banco", min: 0, max: 100 },
    { id: "dias", tipo: "entero", etiqueta: "Plazo en días", min: 1, max: 3650, porDefecto: 360 },
    { id: "retencion", tipo: "si-no", etiqueta: "Te aplican retención en la fuente", ayuda: "Casi siempre sí.", porDefecto: true },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.dias < 1) throw new ErrorEntrada("El plazo tiene que ser de al menos un día.", "dias");
    const rendimiento = redondear(entrada.capital * ((1 + entrada.tasa / 100) ** (entrada.dias / 365) - 1));
    const retencion = entrada.retencion ? redondear(porcentaje(rendimiento, valores["co.cdt-retencion"])) : 0;
    const neto = rendimiento - retencion;
    return {
      rendimiento,
      retencion,
      neto,
      total: entrada.capital + neto,
      tasaPeriodo: entrada.capital > 0 ? (neto / entrada.capital) * 100 : 0,
    };
  },
  resultado: [
    { clave: "rendimiento", etiqueta: "Intereses ganados", formato: "moneda", decimales: 0 },
    { clave: "retencion", etiqueta: "Retención en la fuente", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "neto", etiqueta: "Ganancia neta", formato: "moneda", decimales: 0 },
    { clave: "tasaPeriodo", etiqueta: "Rentabilidad neta en el plazo", formato: "porcentaje", decimales: 2 },
    { clave: "total", etiqueta: "Lo que recibes al vencimiento", formato: "moneda", decimales: 0, destacada: true },
  ],
});
