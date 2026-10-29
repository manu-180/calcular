import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

function tramo(cv: number): string {
  if (cv <= 4) return "4";
  if (cv <= 7) return "5-7";
  if (cv <= 11) return "8-11";
  if (cv <= 16) return "12-16";
  return "17";
}

export default definirCalculadora({
  id: "mr.vignette-automobile",
  mercado: "mr",
  concepto: "propio",
  slug: "vignette-automobile",
  estado: "publicado",
  requiere: { "mr.vignette": "mapa" },
  campos: [
    {
      id: "usage",
      tipo: "opcion",
      etiqueta: "استعمال السيارة",
      opciones: [
        { valor: "perso", etiqueta: "استعمال شخصي" },
        { valor: "transport", etiqueta: "نقل عمومي للأشخاص أو البضائع" },
      ],
      porDefecto: "perso",
    },
    { id: "cv", tipo: "entero", etiqueta: "القوة الجبائية (عدد الأحصنة في البطاقة الرمادية)", min: 1, max: 60, porDefecto: 8 },
    { id: "vehicules", tipo: "entero", etiqueta: "عدد السيارات", min: 1, max: 500, porDefecto: 1 },
  ],
  calcular(entrada, v) {
    if (entrada.cv < 1) throw new ErrorEntrada("أدخل القوة الجبائية.", "cv");
    const unitaire = enMapa(v["mr.vignette"], `${entrada.usage}-${tramo(entrada.cv)}`);
    return {
      total: unitaire * entrada.vehicules,
      unitaire,
      observaciones: ["تُدفع الضريبة قبل 1 فبراير من كل سنة، وتُحفظ الوصولات في السيارة لتقديمها عند المراقبة."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "الضريبة السنوية المستحقة", formato: "moneda", destacada: true },
    { clave: "unitaire", etiqueta: "لكل سيارة", formato: "moneda" },
  ],
});
