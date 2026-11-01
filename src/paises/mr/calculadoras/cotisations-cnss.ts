import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { CAMPO_CNAM } from "../lib/comun";

export default definirCalculadora({
  id: "mr.cotisations-cnss",
  mercado: "mr",
  concepto: "aportes-seguridad-social",
  slug: "cotisations-cnss",
  estado: "publicado",
  requiere: {
    "mr.cnss-plafond": "numero",
    "mr.cnss-total": "numero",
    "mr.cnss-salarie": "numero",
    "mr.cnss-employeur": "numero",
    "mr.cnss-branches": "mapa",
    "mr.cnam-salarie": "numero",
    "mr.cnam-employeur": "numero",
  },
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "الأجر الإجمالي الشهري", min: 0, porDefecto: 30000 },
    { id: "periode", tipo: "opcion", etiqueta: "الفترة", opciones: [{ valor: "mois", etiqueta: "شهر" }, { valor: "trimestre", etiqueta: "فصل (ثلاثة أشهر)" }], porDefecto: "mois" },
    CAMPO_CNAM,
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("أدخل الأجر الإجمالي الشهري.", "brut");
    const meses = entrada.periode === "trimestre" ? 3 : 1;
    const base = Math.min(entrada.brut, v["mr.cnss-plafond"]) * meses;
    const b = v["mr.cnss-branches"];
    const cnssSal = porcentaje(base, v["mr.cnss-salarie"]);
    const cnssEmp = porcentaje(base, v["mr.cnss-employeur"]);
    const cnamSal = entrada.cnam ? porcentaje(entrada.brut * meses, v["mr.cnam-salarie"]) : 0;
    const cnamEmp = entrada.cnam ? porcentaje(entrada.brut * meses, v["mr.cnam-employeur"]) : 0;
    return {
      total: redondear(cnssSal + cnssEmp + cnamSal + cnamEmp),
      base: redondear(base),
      cnssSal: redondear(cnssSal),
      cnssEmp: redondear(cnssEmp),
      cnss: redondear(porcentaje(base, v["mr.cnss-total"])),
      pensions: redondear(porcentaje(base, enMapa(b, "pensions"))),
      risques: redondear(porcentaje(base, enMapa(b, "risques"))),
      famille: redondear(porcentaje(base, enMapa(b, "famille"))),
      cnamSal: redondear(cnamSal),
      cnamEmp: redondear(cnamEmp),
      salarie: redondear(cnssSal + cnamSal),
      employeur: redondear(cnssEmp + cnamEmp),
      observaciones: entrada.periode === "trimestre" ? ["يصرح المشغل بالاشتراكات ويدفعها كل فصل في أجل أقصاه 15 يومًا بعد نهاية الفصل."] : [],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "مجموع الاشتراكات", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "الأجر الخاضع لاشتراك CNSS (بعد السقف)", formato: "moneda" },
    { clave: "cnss", etiqueta: "اشتراك CNSS الكامل", formato: "moneda" },
    { clave: "pensions", etiqueta: "منه فرع المعاشات", formato: "moneda" },
    { clave: "risques", etiqueta: "منه فرع الأخطار المهنية", formato: "moneda" },
    { clave: "famille", etiqueta: "منه فرع التعويضات العائلية", formato: "moneda" },
    { clave: "cnssSal", etiqueta: "CNSS على العامل", formato: "moneda" },
    { clave: "cnssEmp", etiqueta: "CNSS على المشغل", formato: "moneda" },
    { clave: "cnamSal", etiqueta: "CNAM على العامل", formato: "moneda", ocultarSiCero: true },
    { clave: "cnamEmp", etiqueta: "CNAM على المشغل", formato: "moneda", ocultarSiCero: true },
    { clave: "salarie", etiqueta: "مجموع ما يُقتطع من العامل", formato: "moneda" },
    { clave: "employeur", etiqueta: "مجموع ما يدفعه المشغل", formato: "moneda" },
  ],
});
