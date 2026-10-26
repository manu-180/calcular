import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_MIN, CAMPO_NEKUDOT, CAMPO_PENSIA, nekudotZikui, REQUIERE_BL, REQUIERE_MAS, REQUIERE_PENSIA, tlush } from "../lib/sachar";

export default definirCalculadora({
  id: "il.sachar-neto",
  mercado: "il",
  concepto: "sueldo-neto",
  slug: "sachar-neto",
  estado: "publicado",
  requiere: { ...REQUIERE_MAS, ...REQUIERE_PENSIA, ...REQUIERE_BL },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "שכר ברוטו חודשי", min: 0, porDefecto: 15000 },
    CAMPO_MIN,
    CAMPO_NEKUDOT,
    CAMPO_PENSIA,
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("הזינו את השכר הברוטו החודשי.", "bruto");
    const nekudot = nekudotZikui(v, e.min, e.nekudotNosafot);
    const t = tlush(e.bruto, nekudot, e.pensia, v, redondear);
    const nikuyim = redondear(e.bruto - t.neto);
    const observaciones = ["החישוב לשכיר במשרה אחת, בלי תיאום מס, הטבת יישוב מוטב, רכב צמוד או קרן השתלמות."];
    if (t.mas.masYasaf > 0) observaciones.push("השכר עובר את סף המס הנוסף, ולכן נוסף מס של 3% על החלק שמעליו.");
    if (e.bruto > t.bl.basis) observaciones.push("דמי הביטוח הלאומי ומס הבריאות חושבו עד ההכנסה המרבית. על השכר שמעליה לא משלמים אותם.");
    return {
      neto: t.neto,
      masHachnasa: redondear(t.mas.mas),
      bituachLeumi: redondear(t.bl.bituachLeumi),
      masBriut: redondear(t.bl.masBriut),
      pensia: t.pensia,
      nikuyim,
      zikui: redondear(t.mas.zikuiNekudot + t.mas.zikuiPensia),
      shiurShuli: t.mas.shiurShuli,
      shnati: redondear(t.neto * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "שכר נטו לחודש", formato: "moneda", destacada: true },
    { clave: "masHachnasa", etiqueta: "מס הכנסה", formato: "moneda" },
    { clave: "bituachLeumi", etiqueta: "ביטוח לאומי", formato: "moneda" },
    { clave: "masBriut", etiqueta: "מס בריאות", formato: "moneda" },
    { clave: "pensia", etiqueta: "הפרשת העובד לפנסיה", formato: "moneda", ocultarSiCero: true },
    { clave: "nikuyim", etiqueta: "סך כל הניכויים", formato: "moneda" },
    { clave: "zikui", etiqueta: "זיכויים שהפחיתו את המס", formato: "moneda", ayuda: "נקודות הזיכוי והזיכוי על ההפרשה לפנסיה." },
    { clave: "shiurShuli", etiqueta: "שיעור המס השולי", formato: "porcentaje" },
    { clave: "shnati", etiqueta: "נטו בשנה (12 משכורות)", formato: "moneda" },
  ],
  mundo: {
    bruto: "bruto",
    periodoBruto: "mes",
    neto: "neto",
    periodoNeto: "mes",
    entrada: { min: "gever", nekudotNosafot: 0, pensia: 6 },
  },
});
