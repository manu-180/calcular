import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "es.pagas-extra",
  mercado: "es",
  concepto: "bono-semestral",
  slug: "pagas-extra",
  estado: "publicado",
  requiere: {
    "es.pagas-extra-minimo": "numero",
  },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Sueldo bruto anual", min: 0, porDefecto: 25000, ayuda: "Con todas las pagas incluidas." },
    { id: "extras", tipo: "entero", etiqueta: "Pagas extra al año", min: 0, max: 6, porDefecto: 2 },
    {
      id: "devengo",
      tipo: "opcion",
      etiqueta: "Cada paga extra se genera en",
      opciones: [
        { valor: "semestral", etiqueta: "Seis meses" },
        { valor: "anual", etiqueta: "Doce meses" },
      ],
      porDefecto: "semestral",
      ayuda: "Lo dice tu convenio. Lo más habitual es que cada paga se genere en el semestre anterior a cobrarla.",
    },
    { id: "meses", tipo: "numero", etiqueta: "Meses trabajados en ese periodo", min: 0, max: 12, porDefecto: 6 },
  ],
  calcular(entrada, valores, { redondear }) {
    const minimo = valores["es.pagas-extra-minimo"];
    if (entrada.extras < minimo) throw new ErrorEntrada(`La ley obliga a pagar al menos ${minimo} pagas extra al año, aunque se pueden prorratear.`, "extras");
    const duracion = entrada.devengo === "anual" ? 12 : 6;
    if (entrada.meses > duracion) throw new ErrorEntrada(`El periodo de generación tiene ${duracion} meses.`, "meses");
    const pagas = 12 + entrada.extras;
    const paga = redondear(entrada.bruto / pagas);
    return {
      paga,
      proporcional: redondear((paga * entrada.meses) / duracion),
      mensualProrrateado: redondear(entrada.bruto / 12),
      prorrataMensual: redondear((paga * entrada.extras) / 12),
      pagas,
    };
  },
  resultado: [
    { clave: "proporcional", etiqueta: "Paga extra que te corresponde", formato: "moneda", destacada: true },
    { clave: "paga", etiqueta: "Paga extra completa (igual que una mensualidad)", formato: "moneda" },
    { clave: "pagas", etiqueta: "Pagas al año", formato: "numero" },
    { clave: "mensualProrrateado", etiqueta: "Sueldo mensual con las extras prorrateadas", formato: "moneda" },
    { clave: "prorrataMensual", etiqueta: "Parte de las pagas extra en cada nómina prorrateada", formato: "moneda" },
  ],
});
