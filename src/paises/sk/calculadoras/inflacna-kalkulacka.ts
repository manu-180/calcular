import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sk.inflacna-kalkulacka",
  mercado: "sk",
  concepto: "inflacion",
  slug: "inflacna-kalkulacka",
  estado: "borrador",
  requiere: { "sk.inflacia-rocna": "numero" },
  campos: [
    { id: "suma", tipo: "moneda", etiqueta: "Suma", min: 0, porDefecto: 1000 },
    { id: "roky", tipo: "numero", etiqueta: "Počet rokov", min: 0, max: 50, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.suma <= 0) throw new ErrorEntrada("Zadajte sumu vyššiu ako nula.", "suma");
    return { hodnota: redondear(e.suma * (1 + v["sk.inflacia-rocna"] / 100) ** e.roky) };
  },
  resultado: [{ clave: "hodnota", etiqueta: "Suma s rovnakou kúpnou silou", formato: "moneda", destacada: true }],
});
