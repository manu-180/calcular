import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mr.conges-payes",
  mercado: "mr",
  concepto: "vacaciones",
  slug: "conges-payes",
  estado: "publicado",
  requiere: { "mr.conges-par-mois": "mapa", "mr.conges-anciennete": "mapa", "mr.conges-mere": "numero" },
  campos: [
    { id: "categorie", tipo: "opcion-dato", dato: "mr.conges-par-mois", etiqueta: "وضعية العامل", porDefecto: "adulte" },
    { id: "mois", tipo: "entero", etiqueta: "أشهر العمل الفعلي منذ آخر عطلة", min: 1, max: 36, porDefecto: 12 },
    { id: "salaire", tipo: "moneda", etiqueta: "متوسط ما تقاضيته في الشهر خلال هذه المدة", ayuda: "الأجر مع العلاوات، دون تعويضات المصاريف ودون تعويضي الإبعاد والتنقل.", min: 0, porDefecto: 20000 },
    { id: "anciennete", tipo: "entero", etiqueta: "الأقدمية في المؤسسة بالسنوات", min: 0, max: 50, porDefecto: 3 },
    { id: "enfants", tipo: "entero", etiqueta: "عدد الأطفال دون 14 سنة (للعاملة الأم)", min: 0, max: 20, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire <= 0) throw new ErrorEntrada("أدخل متوسط الأجر الشهري.", "salaire");
    const porMes = enMapa(v["mr.conges-par-mois"], entrada.categorie);
    const base = entrada.mois * porMes;
    const anios = Math.floor(entrada.mois / 12);
    const a = v["mr.conges-anciennete"];
    const porAnciennete = entrada.anciennete > 20 ? enMapa(a, "plus-20") : entrada.anciennete >= 15 ? enMapa(a, "15-20") : entrada.anciennete >= 10 ? enMapa(a, "10-15") : 0;
    const anciennete = porAnciennete * anios;
    const mere = entrada.enfants * v["mr.conges-mere"] * anios;
    const jours = base + anciennete + mere;
    const allocation = (entrada.salaire * entrada.mois) / 12;
    const observaciones: string[] = [];
    if (entrada.mois < 12) observaciones.push("الحق في أخذ العطلة يُكتسب بعد 12 شهرًا من العمل الفعلي. قبل ذلك، إن انتهى العقد، تُدفع هذه الأيام تعويضًا.");
    if (entrada.mois > 12) observaciones.push("يجوز تأجيل العطلة باتفاق الطرفين ما لم تتجاوز المدة ثلاث سنوات، مع ستة أيام عمل إجبارية كل سنة.");
    return {
      jours,
      base,
      anciennete,
      mere,
      allocation: redondear(allocation),
      parJour: jours > 0 ? redondear(allocation / jours) : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "jours", etiqueta: "أيام العطلة المدفوعة", formato: "dias", destacada: true },
    { clave: "base", etiqueta: "أيام مكتسبة بالأشهر", formato: "dias" },
    { clave: "anciennete", etiqueta: "أيام الأقدمية", formato: "dias", ocultarSiCero: true },
    { clave: "mere", etiqueta: "أيام الأم عن الأطفال", formato: "dias", ocultarSiCero: true },
    { clave: "allocation", etiqueta: "تعويض العطلة", formato: "moneda", destacada: true },
    { clave: "parJour", etiqueta: "ما يعادل كل يوم عطلة", formato: "moneda" },
  ],
});
