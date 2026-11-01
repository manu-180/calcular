import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Borrador: las tasas las fija un decreto (art. 71 y 73) que no se pudo leer. Los topes sí están leídos.
export default definirCalculadora({
  id: "lb.nssf-contributions",
  mercado: "lb",
  concepto: "aportes-seguridad-social",
  slug: "nssf-contributions",
  estado: "borrador",
  requiere: { "lb.nssf-rates": "mapa", "lb.nssf-ceiling-health": "numero", "lb.nssf-ceiling-family": "numero" },
  campos: [{ id: "salario", tipo: "moneda", etiqueta: "الأجر الشهري بالليرة", min: 0, porDefecto: 30000000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("أدخل الأجر.", "salario");
    const t = v["lb.nssf-rates"];
    const salud = Math.min(entrada.salario, v["lb.nssf-ceiling-health"]);
    const familia = Math.min(entrada.salario, v["lb.nssf-ceiling-family"]);
    const trabajador = redondear(porcentaje(salud, enMapa(t, "health-worker")));
    const patronal = redondear(porcentaje(salud, enMapa(t, "health-employer")) + porcentaje(familia, enMapa(t, "family")) + porcentaje(entrada.salario, enMapa(t, "eos")));
    return { trabajador, patronal, total: redondear(trabajador + patronal) };
  },
  resultado: [
    { clave: "trabajador", etiqueta: "ما يدفعه الأجير", formato: "moneda", destacada: true },
    { clave: "patronal", etiqueta: "ما يدفعه صاحب العمل", formato: "moneda" },
    { clave: "total", etiqueta: "مجموع الاشتراكات", formato: "moneda" },
  ],
});
