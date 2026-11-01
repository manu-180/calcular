import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mr.heures-supplementaires",
  mercado: "mr",
  concepto: "horas-extra",
  slug: "heures-supplementaires",
  estado: "publicado",
  requiere: { "mr.majoration-hs": "mapa", "mr.duree-legale": "numero" },
  campos: [
    { id: "salaire", tipo: "moneda", etiqueta: "الأجر الشهري لأسبوع من 40 ساعة", min: 0, porDefecto: 20000 },
    { id: "heures", tipo: "numero", etiqueta: "ساعات العمل النهارية في الأسبوع (مجموعها)", min: 0, max: 84, porDefecto: 50 },
    { id: "nuit", tipo: "numero", etiqueta: "ساعات إضافية ليلية في الأسبوع", min: 0, max: 40, porDefecto: 0 },
    { id: "reposJour", tipo: "numero", etiqueta: "ساعات نهارية في يوم الراحة أو عطلة رسمية", min: 0, max: 24, porDefecto: 0 },
    { id: "reposNuit", tipo: "numero", etiqueta: "ساعات ليلية في يوم الراحة أو عطلة رسمية", min: 0, max: 24, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salaire <= 0) throw new ErrorEntrada("أدخل الأجر الشهري.", "salaire");
    const legal = v["mr.duree-legale"];
    const m = v["mr.majoration-hs"];
    const horaire = (entrada.salaire * 12) / (legal * 52);
    const tramo = (desde: number, hasta: number) => Math.max(0, Math.min(entrada.heures, hasta) - desde);
    const h1 = tramo(legal, 48);
    const h2 = tramo(48, 54);
    const h3 = tramo(54, Infinity);
    const paga = (horas: number, clave: string) => horas * horaire * (1 + enMapa(m, clave) / 100);
    const p1 = paga(h1, "41-48");
    const p2 = paga(h2, "49-54");
    const p3 = paga(h3, "plus-54");
    const pn = paga(entrada.nuit, "nuit");
    const prj = paga(entrada.reposJour, "repos-jour");
    const prn = paga(entrada.reposNuit, "repos-nuit");
    const semana = p1 + p2 + p3 + pn + prj + prn;
    return {
      mensuel: redondear((semana * 52) / 12),
      semaine: redondear(semana),
      horaire: redondear(horaire),
      heuresSup: h1 + h2 + h3 + entrada.nuit + entrada.reposJour + entrada.reposNuit,
      p1: redondear(p1),
      p2: redondear(p2),
      p3: redondear(p3),
      speciales: redondear(pn + prj + prn),
    };
  },
  resultado: [
    { clave: "mensuel", etiqueta: "أجر الساعات الإضافية في الشهر", formato: "moneda", destacada: true },
    { clave: "semaine", etiqueta: "أجر الساعات الإضافية في الأسبوع", formato: "moneda" },
    { clave: "horaire", etiqueta: "أجر الساعة العادية", formato: "moneda" },
    { clave: "heuresSup", etiqueta: "مجموع الساعات الإضافية في الأسبوع", formato: "horas" },
    { clave: "p1", etiqueta: "من الساعة 41 إلى 48", formato: "moneda", ocultarSiCero: true },
    { clave: "p2", etiqueta: "من الساعة 49 إلى 54", formato: "moneda", ocultarSiCero: true },
    { clave: "p3", etiqueta: "بعد الساعة 54", formato: "moneda", ocultarSiCero: true },
    { clave: "speciales", etiqueta: "ساعات الليل والراحة والعطل", formato: "moneda", ocultarSiCero: true },
  ],
});
