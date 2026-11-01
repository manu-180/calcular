import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mr.pension-retraite",
  mercado: "mr",
  concepto: "jubilacion",
  slug: "pension-retraite",
  estado: "publicado",
  requiere: {
    "mr.age-retraite": "numero",
    "mr.pension-anciennete-min": "numero",
    "mr.pension-mois-recents": "numero",
    "mr.pension-taux-base": "numero",
    "mr.pension-majoration": "numero",
    "mr.pension-mois-base": "numero",
    "mr.pension-minimum": "numero",
    "mr.pension-plafond-minimum": "numero",
    "mr.cnss-plafond": "numero",
    "mr.smig-horaire": "numero",
    "mr.duree-legale": "numero",
  },
  campos: [
    { id: "salaire", tipo: "moneda", etiqueta: "متوسط الأجر الشهري الخاضع للاشتراك", ayuda: "متوسط آخر 3 أو 5 سنوات، أيهما أفضل لك. لا يُحسب ما فوق سقف الاشتراك.", min: 0, porDefecto: 15000 },
    { id: "mois", tipo: "entero", etiqueta: "مجموع أشهر التأمين والأشهر المماثلة", min: 0, max: 600, porDefecto: 300 },
    { id: "immatriculation", tipo: "entero", etiqueta: "سنوات التسجيل في الصندوق", min: 0, max: 60, porDefecto: 25 },
    { id: "recents", tipo: "si-no", etiqueta: "لي 60 شهر تأمين على الأقل في السنوات العشر الأخيرة", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire <= 0) throw new ErrorEntrada("أدخل متوسط الأجر الشهري.", "salaire");
    if (entrada.mois < 12) throw new ErrorEntrada("يلزم 12 شهر تأمين على الأقل لأي حق في الصندوق.", "mois");
    const moyen = Math.min(entrada.salaire, v["mr.cnss-plafond"]);
    const ouvrePension = entrada.immatriculation >= v["mr.pension-anciennete-min"] && entrada.recents;
    const observaciones: string[] = [];
    if (entrada.salaire > v["mr.cnss-plafond"]) observaciones.push("حُسب المتوسط على سقف الأجر الخاضع للاشتراك.");
    if (!ouvrePension) {
      observaciones.push("لا تتوفر شروط المعاش (20 سنة تسجيل و60 شهر تأمين في السنوات العشر الأخيرة). لك منحة شيخوخة تُدفع مرة واحدة.");
      return { pension: null, allocation: redondear(moyen * Math.floor(entrada.mois / 12)), taux: null, moyen: redondear(moyen), minimum: null, observaciones };
    }
    const sup = Math.max(0, entrada.mois - v["mr.pension-mois-base"]);
    const taux = v["mr.pension-taux-base"] + v["mr.pension-majoration"] * Math.floor(sup / 12);
    const calculee = porcentaje(moyen, taux);
    const smigMensuel = (v["mr.smig-horaire"] * v["mr.duree-legale"] * 52) / 12;
    const minimum = Math.min(porcentaje(smigMensuel, v["mr.pension-minimum"]), porcentaje(moyen, v["mr.pension-plafond-minimum"]));
    if (calculee < minimum) observaciones.push("رُفع المعاش إلى حده الأدنى القانوني.");
    return {
      pension: redondear(Math.max(calculee, minimum)),
      allocation: null,
      taux,
      moyen: redondear(moyen),
      minimum: redondear(minimum),
      observaciones,
    };
  },
  resultado: [
    { clave: "pension", etiqueta: "معاش الشيخوخة الشهري", formato: "moneda", destacada: true },
    { clave: "allocation", etiqueta: "منحة الشيخوخة (دفعة واحدة)", formato: "moneda", destacada: true },
    { clave: "taux", etiqueta: "نسبة المعاش من متوسط الأجر", formato: "porcentaje", decimales: 2 },
    { clave: "moyen", etiqueta: "متوسط الأجر المعتمد", formato: "moneda" },
    { clave: "minimum", etiqueta: "الحد الأدنى للمعاش في حالتك", formato: "moneda" },
  ],
});
