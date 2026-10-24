import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { diaria } from "../lib/laboral";

export default definirCalculadora({
  id: "bd.notice-period-calculator",
  mercado: "bd",
  concepto: "preaviso",
  slug: "notice-period-calculator",
  estado: "publicado",
  requiere: {
    "bd.notice-days": "mapa",
  },
  campos: [
    {
      id: "quien",
      tipo: "opcion",
      etiqueta: "কে চাকরি শেষ করছেন",
      opciones: [
        { valor: "employer", etiqueta: "মালিক" },
        { valor: "worker", etiqueta: "শ্রমিক (ইস্তফা)" },
      ],
      porDefecto: "worker",
    },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "শ্রমিকের ধরন",
      opciones: [
        { valor: "permanent", etiqueta: "স্থায়ী" },
        { valor: "temporary", etiqueta: "অস্থায়ী" },
      ],
      porDefecto: "permanent",
    },
    { id: "mensual", tipo: "si-no", etiqueta: "মাসিক মজুরির ভিত্তিতে নিযুক্ত", porDefecto: true },
    { id: "salario", tipo: "moneda", etiqueta: "মাসিক মজুরি", ayuda: "নোটিশের বদলে কত মজুরি দিতে হবে তা দেখতে।", min: 0, porDefecto: 25000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario < 0) throw new ErrorEntrada("মজুরি শূন্যের কম হতে পারে না।", "salario");
    const m = v["bd.notice-days"];
    let clave: string;
    if (entrada.quien === "worker") clave = entrada.tipo === "permanent" ? "worker-permanent" : entrada.mensual ? "worker-temporary-monthly" : "worker-temporary-other";
    else clave = `employer-${entrada.tipo}-${entrada.mensual ? "monthly" : "other"}`;
    const dias = enMapa(m, clave);
    const observaciones: string[] = [];
    observaciones.push(
      entrada.quien === "worker"
        ? "নোটিশ ছাড়া ইস্তফা দিলে নোটিশের মেয়াদের মজুরির সমান অর্থ মালিককে দিতে হয়।"
        : "নোটিশ ছাড়া চাকরি শেষ করলে মালিককে নোটিশের মেয়াদের মজুরি দিতে হয়।",
    );
    return { dias, pago: redondear(diaria(entrada.salario) * dias), observaciones };
  },
  resultado: [
    { clave: "dias", etiqueta: "লিখিত নোটিশের মেয়াদ", formato: "dias", destacada: true },
    { clave: "pago", etiqueta: "নোটিশের বদলে মজুরি", formato: "moneda" },
  ],
});
