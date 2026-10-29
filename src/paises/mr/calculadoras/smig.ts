import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mr.smig",
  mercado: "mr",
  concepto: "salario-minimo",
  slug: "smig",
  estado: "publicado",
  requiere: { "mr.smig-horaire": "numero", "mr.smig-horaire-agricole": "numero", "mr.duree-legale": "numero" },
  campos: [
    {
      id: "secteur",
      tipo: "opcion",
      etiqueta: "القطاع",
      opciones: [
        { valor: "general", etiqueta: "المهن غير الزراعية" },
        { valor: "agricole", etiqueta: "المؤسسات الزراعية وما يماثلها" },
      ],
      porDefecto: "general",
    },
    { id: "heures", tipo: "numero", etiqueta: "ساعات العمل في الأسبوع", min: 1, max: 60, porDefecto: 40 },
    { id: "salaire", tipo: "moneda", etiqueta: "أجرك الشهري الحالي (اختياري)", requerido: false, min: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.heures <= 0) throw new ErrorEntrada("أدخل عدد ساعات العمل في الأسبوع.", "heures");
    const horaire = entrada.secteur === "agricole" ? v["mr.smig-horaire-agricole"] : v["mr.smig-horaire"];
    const legales = Math.min(entrada.heures, v["mr.duree-legale"]);
    const mensuel = (horaire * legales * 52) / 12;
    const observaciones: string[] = [];
    if (entrada.heures > v["mr.duree-legale"]) observaciones.push("الساعات التي تتجاوز 40 في الأسبوع ساعات إضافية تُدفع بزيادة، ولا تدخل في الحد الأدنى المحسوب هنا.");
    let ecart: number | null = null;
    if (entrada.salaire !== null) {
      ecart = redondear(entrada.salaire - mensuel);
      observaciones.push(ecart >= 0 ? "أجرك لا يقل عن الحد الأدنى لهذه الساعات." : "أجرك أقل من الحد الأدنى لهذه الساعات. المادة 196 من مدونة الشغل تمنع أجرًا دون الأجر الأدنى المضمون.");
    }
    return {
      mensuel: redondear(mensuel),
      horaire,
      journalier: redondear(horaire * 8),
      hebdomadaire: redondear(horaire * legales),
      annuel: redondear(mensuel * 12),
      ecart,
      observaciones,
    };
  },
  resultado: [
    { clave: "mensuel", etiqueta: "ما يعادل الأجر الأدنى في الشهر", formato: "moneda", destacada: true },
    { clave: "horaire", etiqueta: "الأجر الأدنى للساعة", formato: "moneda", decimales: 3 },
    { clave: "journalier", etiqueta: "يوم عمل من 8 ساعات", formato: "moneda" },
    { clave: "hebdomadaire", etiqueta: "في الأسبوع", formato: "moneda" },
    { clave: "annuel", etiqueta: "في السنة", formato: "moneda" },
    { clave: "ecart", etiqueta: "الفرق بين أجرك والحد الأدنى", formato: "moneda" },
  ],
});
