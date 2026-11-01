import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mr.preavis",
  mercado: "mr",
  concepto: "preaviso",
  slug: "preavis",
  estado: "publicado",
  requiere: { "mr.preavis-manoeuvre": "numero", "mr.preavis-mois": "mapa" },
  campos: [
    {
      id: "categorie",
      tipo: "opcion",
      etiqueta: "الفئة المهنية",
      opciones: [
        { valor: "manoeuvre", etiqueta: "عامل يدوي (الفئتان 1 و2)" },
        { valor: "ouvrier", etiqueta: "عامل أو مستخدم من الفئة 3 فما فوق" },
        { valor: "maitrise", etiqueta: "عون تأطير أو تقني" },
        { valor: "cadre", etiqueta: "مهندس أو إطار" },
      ],
      porDefecto: "ouvrier",
    },
    { id: "salaire", tipo: "moneda", etiqueta: "الأجر الشهري مع المنافع", min: 0, porDefecto: 30000 },
    { id: "effectues", tipo: "entero", etiqueta: "أيام الإشعار التي احتُرمت فعلًا", min: 0, max: 90, porDefecto: 0 },
    { id: "conge", tipo: "si-no", etiqueta: "قُطع العقد أثناء عطلة العامل", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire <= 0) throw new ErrorEntrada("أدخل الأجر الشهري.", "salaire");
    const manoeuvre = entrada.categorie === "manoeuvre";
    const jours = manoeuvre ? v["mr.preavis-manoeuvre"] : enMapa(v["mr.preavis-mois"], entrada.categorie) * 30;
    const mois = manoeuvre ? null : enMapa(v["mr.preavis-mois"], entrada.categorie);
    if (entrada.effectues > jours) throw new ErrorEntrada("الأيام المحترمة أكثر من مدة الإشعار.", "effectues");
    const restants = jours - entrada.effectues;
    const base = (entrada.salaire / 30) * restants;
    const indemnite = entrada.conge ? base * 2 : base;
    const observaciones = ["خلال مهلة الإشعار للعامل ساعتان عاديتان في اليوم للبحث عن عمل جديد."];
    if (entrada.conge) observaciones.push("يتضاعف تعويض الإشعار إذا قُطع العقد أثناء عطلة العامل (المادة 50 من مدونة الشغل).");
    return {
      indemnite: redondear(indemnite),
      jours,
      mois,
      restants,
      observaciones,
    };
  },
  resultado: [
    { clave: "indemnite", etiqueta: "تعويض الإشعار المستحق", formato: "moneda", destacada: true },
    { clave: "mois", etiqueta: "مدة الإشعار بالأشهر", formato: "meses" },
    { clave: "jours", etiqueta: "مدة الإشعار بالأيام", formato: "dias" },
    { clave: "restants", etiqueta: "أيام الإشعار غير المحترمة", formato: "dias" },
  ],
});
