import { definirCalculadora, enMapa } from "@/motor/calculo";
import { CAMPO_DIARIO, salarioDiario } from "../lib/salarios";

export default definirCalculadora({
  id: "ae.maternity-leave-pay",
  mercado: "ae",
  concepto: "propio",
  slug: "maternity-leave-pay",
  estado: "publicado",
  requiere: {
    "ae.maternity-leave": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Monthly wage", min: 0, porDefecto: 10000 },
    { id: "hijoEnfermo", tipo: "si-no", etiqueta: "The baby is sick or disabled and needs constant care", ayuda: "Adds 30 days on full pay after the maternity leave, with a medical report.", porDefecto: false },
    CAMPO_DIARIO,
  ],
  calcular(entrada, v, { redondear }) {
    const t = v["ae.maternity-leave"];
    const diario = salarioDiario(entrada.salario, entrada.metodoDiario, "salario");
    const llena = enMapa(t, "full-pay");
    const media = enMapa(t, "half-pay");
    const pagoLlena = diario * llena;
    const pagoMedia = (diario * media) / 2;
    const extra = entrada.hijoEnfermo ? diario * 30 : 0;
    return {
      total: redondear(pagoLlena + pagoMedia + extra),
      llena: redondear(pagoLlena),
      media: redondear(pagoMedia),
      extra: redondear(extra),
      dias: llena + media,
      observaciones: ["After the leave, you can be absent up to 45 more days without pay if an illness from the pregnancy or birth keeps you from working."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Maternity leave pay", formato: "moneda", destacada: true },
    { clave: "llena", etiqueta: "Days at full pay", formato: "moneda" },
    { clave: "media", etiqueta: "Days at half pay", formato: "moneda" },
    { clave: "extra", etiqueta: "Extra leave for a sick or disabled child", formato: "moneda", ocultarSiCero: true },
    { clave: "dias", etiqueta: "Maternity leave", formato: "dias" },
  ],
});
