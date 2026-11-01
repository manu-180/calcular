import { definirCalculadora, ErrorEntrada, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mk.ddv-kalkulator",
  mercado: "mk",
  concepto: "iva",
  slug: "ddv-kalkulator",
  estado: "publicado",
  requiere: { "mk.ddv": "mapa", "mk.ddv-prag": "numero" },
  campos: [
    { id: "iznos", tipo: "moneda", etiqueta: "Износ", min: 0, porDefecto: 10000 },
    { id: "stapka", tipo: "opcion-dato", etiqueta: "Стапка на ДДВ", dato: "mk.ddv", porDefecto: "opshta" },
    {
      id: "pravec",
      tipo: "opcion",
      etiqueta: "Што внесовте",
      porDefecto: "bez",
      opciones: [
        { valor: "bez", etiqueta: "Износ без ДДВ" },
        { valor: "so", etiqueta: "Износ со ДДВ" },
      ],
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.iznos <= 0) throw new ErrorEntrada("Внесете износ поголем од нула.", "iznos");
    const s = enMapa(v["mk.ddv"], e.stapka);
    const bez = e.pravec === "bez" ? e.iznos : e.iznos / (1 + s / 100);
    return { bez: redondear(bez), ddv: redondear(porcentaje(bez, s)), so: redondear(e.pravec === "so" ? e.iznos : bez + porcentaje(bez, s)) };
  },
  resultado: [
    { clave: "so", etiqueta: "Износ со ДДВ", formato: "moneda", destacada: true },
    { clave: "bez", etiqueta: "Износ без ДДВ", formato: "moneda" },
    { clave: "ddv", etiqueta: "ДДВ", formato: "moneda" },
  ],
});
