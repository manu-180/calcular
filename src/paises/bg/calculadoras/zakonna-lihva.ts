import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bg.zakonna-lihva",
  mercado: "bg",
  concepto: "propio",
  slug: "zakonna-lihva",
  estado: "borrador",
  requiere: { "bg.ecb-mro": "numero", "bg.zakonna-lihva-nadbavka": "numero" },
  campos: [
    { id: "glavnitsa", tipo: "moneda", etiqueta: "Главница", min: 0, porDefecto: 1000 },
    { id: "dni", tipo: "entero", etiqueta: "Дни забава", min: 1, max: 3650, porDefecto: 30 },
  ],
  calcular(e, v, { redondear }) {
    if (e.glavnitsa <= 0) throw new ErrorEntrada("Въведете главница над нула.", "glavnitsa");
    const stavka = v["bg.ecb-mro"] + v["bg.zakonna-lihva-nadbavka"];
    return { lihva: redondear((e.glavnitsa * stavka * e.dni) / 36000), stavka };
  },
  resultado: [
    { clave: "lihva", etiqueta: "Законна лихва", formato: "moneda", destacada: true },
    { clave: "stavka", etiqueta: "Годишна ставка", formato: "porcentaje", decimales: 2 },
  ],
});
