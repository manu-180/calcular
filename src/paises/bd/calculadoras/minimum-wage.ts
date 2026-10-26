import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "bd.minimum-wage",
  mercado: "bd",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: {
    "bd.minimum-wage-total": "mapa",
    "bd.minimum-wage-basic": "mapa",
  },
  campos: [
    { id: "sector", tipo: "opcion-dato", dato: "bd.minimum-wage-total", etiqueta: "শিল্প সেক্টর", porDefecto: "garments" },
    { id: "salario", tipo: "moneda", etiqueta: "আপনার মাসিক মোট মজুরি", ayuda: "ঐচ্ছিক। লিখলে নিম্নতম মজুরির সঙ্গে তুলনা দেখাবে।", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    const total = enMapa(v["bd.minimum-wage-total"], entrada.sector);
    const basico = enMapa(v["bd.minimum-wage-basic"], entrada.sector);
    const diferencia = entrada.salario === null ? null : redondear(entrada.salario - total);
    const observaciones: string[] = [];
    if (diferencia !== null && diferencia < 0) observaciones.push("আপনার মজুরি এই সেক্টরের সর্বনিম্ন গ্রেডের নিম্নতম মজুরির চেয়ে কম।");
    return {
      total,
      basico,
      otros: redondear(total - basico),
      diferencia,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "নিম্নতম মোট মাসিক মজুরি", formato: "moneda", destacada: true },
    { clave: "basico", etiqueta: "এর মধ্যে মূল মজুরি", formato: "moneda" },
    { clave: "otros", etiqueta: "বাড়ি ভাড়া, চিকিৎসা, যাতায়াত ও অন্যান্য ভাতা", formato: "moneda" },
    { clave: "diferencia", etiqueta: "আপনার মজুরি নিম্নতমের চেয়ে বেশি (+) বা কম (−)", formato: "moneda" },
  ],
});
