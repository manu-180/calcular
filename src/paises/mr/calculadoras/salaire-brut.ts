import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_CNAM, REQUIERE_SALARIO, retenciones } from "../lib/comun";

export default definirCalculadora({
  id: "mr.salaire-brut",
  mercado: "mr",
  concepto: "propio",
  slug: "salaire-brut",
  estado: "publicado",
  requiere: { ...REQUIERE_SALARIO, "mr.cnss-employeur": "numero", "mr.cnam-employeur": "numero" },
  campos: [
    { id: "net", tipo: "moneda", etiqueta: "الصافي الشهري المطلوب", min: 0, porDefecto: 25000 },
    CAMPO_CNAM,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.net <= 0) throw new ErrorEntrada("أدخل الصافي الشهري المطلوب.", "net");
    // El neto crece con el bruto (ningún tramo pasa del 100 %): búsqueda binaria hasta el centavo.
    let bajo = entrada.net;
    let alto = entrada.net * 3 + 20000;
    for (let i = 0; i < 80; i++) {
      const medio = (bajo + alto) / 2;
      if (retenciones(v, medio, entrada.cnam).neto < entrada.net) bajo = medio;
      else alto = medio;
    }
    const brut = Math.ceil(alto * 100 - 1e-6) / 100;
    const r = retenciones(v, brut, entrada.cnam);
    return {
      brut: redondear(brut),
      cnss: redondear(r.cnss),
      cnam: redondear(r.cnam),
      its: redondear(r.its),
      net: redondear(r.neto),
      observaciones: ["الأجر الإجمالي المقترح يُجبر إلى الأوقية الجزئية الأعلى، فقد يزيد الصافي بأوقية واحدة على الأكثر."],
    };
  },
  resultado: [
    { clave: "brut", etiqueta: "الأجر الإجمالي اللازم", formato: "moneda", destacada: true },
    { clave: "cnss", etiqueta: "اشتراك الضمان الاجتماعي", formato: "moneda" },
    { clave: "cnam", etiqueta: "اشتراك التأمين الصحي", formato: "moneda", ocultarSiCero: true },
    { clave: "its", etiqueta: "الضريبة على الرواتب", formato: "moneda" },
    { clave: "net", etiqueta: "الصافي الناتج", formato: "moneda" },
  ],
});
