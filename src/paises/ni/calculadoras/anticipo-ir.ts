import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ni.anticipo-ir",
  mercado: "ni",
  concepto: "propio",
  slug: "anticipo-ir",
  estado: "publicado",
  requiere: {
    "ni.pago-minimo": "mapa",
  },
  campos: [
    { id: "ingresos", tipo: "moneda", etiqueta: "Ingresos brutos del mes", min: 0 },
    { id: "contribuyente", tipo: "opcion-dato", dato: "ni.pago-minimo", etiqueta: "Tipo de contribuyente", porDefecto: "demas" },
    { id: "retenciones", tipo: "moneda", etiqueta: "Retenciones que te hicieron en el mes", min: 0, requerido: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = enMapa(valores["ni.pago-minimo"], entrada.contribuyente);
    const anticipo = redondear(porcentaje(entrada.ingresos, tasa));
    const retenciones = entrada.retenciones ?? 0;
    const aPagar = redondear(Math.max(0, anticipo - retenciones));
    const observaciones = ["Se declara y paga en la DGI en el mes siguiente. Al cerrar el año, los anticipos se restan del IR anual."];
    if (retenciones > anticipo) observaciones.push("Las retenciones superan el anticipo: el saldo a favor lo podés aplicar en los meses siguientes del mismo año.");
    return { tasa, anticipo, aPagar, observaciones };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Alícuota del anticipo", formato: "porcentaje" },
    { clave: "anticipo", etiqueta: "Anticipo del mes", formato: "moneda" },
    { clave: "aPagar", etiqueta: "A pagar después de restar retenciones", formato: "moneda", destacada: true },
  ],
});
