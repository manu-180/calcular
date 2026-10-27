import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_MIN, CAMPO_NEKUDOT, CAMPO_PENSIA, nekudotZikui, REQUIERE_BL, REQUIERE_MAS, REQUIERE_PENSIA, tlush } from "../lib/sachar";

// El neto crece con el bruto (cada shekel extra paga como mucho la tasa marginal más los aportes),
// así que la búsqueda binaria encuentra el bruto que da el neto pedido.
export default definirCalculadora({
  id: "il.bruto-neto",
  mercado: "il",
  concepto: "propio",
  slug: "bruto-neto",
  estado: "publicado",
  requiere: { ...REQUIERE_MAS, ...REQUIERE_PENSIA, ...REQUIERE_BL },
  campos: [
    { id: "neto", tipo: "moneda", etiqueta: "השכר נטו שתרצו לקבל בחודש", min: 0, porDefecto: 12000 },
    CAMPO_MIN,
    CAMPO_NEKUDOT,
    CAMPO_PENSIA,
  ],
  calcular(e, v, { redondear }) {
    if (e.neto <= 0) throw new ErrorEntrada("הזינו את השכר נטו שתרצו לקבל.", "neto");
    const nekudot = nekudotZikui(v, e.min, e.nekudotNosafot);
    const netoDe = (bruto: number) => tlush(bruto, nekudot, e.pensia, v, (n) => n).neto;
    let bajo = e.neto;
    let alto = e.neto * 4;
    if (netoDe(alto) < e.neto) throw new ErrorEntrada("לא נמצא שכר ברוטו שנותן את הנטו הזה. בדקו את אחוז ההפרשה לפנסיה.", "pensia");
    for (let i = 0; i < 100; i++) {
      const medio = (bajo + alto) / 2;
      if (netoDe(medio) < e.neto) bajo = medio;
      else alto = medio;
    }
    const bruto = redondear(alto);
    const t = tlush(bruto, nekudot, e.pensia, v, redondear);
    return {
      bruto,
      netoBafoal: t.neto,
      masHachnasa: redondear(t.mas.mas),
      bituachLeumi: redondear(t.bl.bituachLeumi),
      masBriut: redondear(t.bl.masBriut),
      pensia: t.pensia,
      observaciones: ["הברוטו עוגל לאגורה, ולכן הנטו בפועל יכול להיות שונה באגורה או שתיים מהנטו שהזנתם."],
    };
  },
  resultado: [
    { clave: "bruto", etiqueta: "שכר ברוטו נדרש לחודש", formato: "moneda", destacada: true },
    { clave: "netoBafoal", etiqueta: "נטו שיתקבל מהברוטו הזה", formato: "moneda" },
    { clave: "masHachnasa", etiqueta: "מס הכנסה", formato: "moneda" },
    { clave: "bituachLeumi", etiqueta: "ביטוח לאומי", formato: "moneda" },
    { clave: "masBriut", etiqueta: "מס בריאות", formato: "moneda" },
    { clave: "pensia", etiqueta: "הפרשת העובד לפנסיה", formato: "moneda", ocultarSiCero: true },
  ],
});
