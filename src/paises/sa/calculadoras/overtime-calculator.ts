import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "sa.overtime-calculator",
  mercado: "sa",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "sa.overtime-premium": "numero",
    "sa.month-days": "numero",
    "sa.working-hours": "mapa",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "الراتب الأساسي الشهري", min: 0, porDefecto: 6000 },
    { id: "total", tipo: "moneda", etiqueta: "الأجر الشهري الكامل", ayuda: "الأساسي مع البدلات الثابتة مثل السكن والنقل.", min: 0, porDefecto: 8000 },
    { id: "horasDia", tipo: "numero", etiqueta: "ساعات العمل العادية في اليوم", ayuda: "ثماني ساعات في أغلب العقود، وست ساعات للمسلمين في رمضان.", min: 1, max: 12, porDefecto: 8 },
    { id: "horas", tipo: "numero", etiqueta: "عدد الساعات الإضافية", min: 0, max: 400, porDefecto: 10 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.basico <= 0) throw new ErrorEntrada("أدخل الراتب الأساسي الشهري.", "basico");
    if (entrada.total < entrada.basico) throw new ErrorEntrada("الأجر الكامل لا يقل عن الراتب الأساسي.", "total");
    const dias = v["sa.month-days"];
    const horaTotal = entrada.total / dias / entrada.horasDia;
    const horaBasica = entrada.basico / dias / entrada.horasDia;
    const recargo = porcentaje(horaBasica, v["sa.overtime-premium"]);
    const porHora = horaTotal + recargo;
    const observaciones = ["تُعد كل ساعات العمل في أيام العطل والأعياد ساعات إضافية."];
    if (entrada.horasDia > enMapa(v["sa.working-hours"], "daily")) observaciones.push("ساعات العمل العادية التي أدخلتها أكثر من الحد اليومي في نظام العمل.");
    return {
      pago: redondear(porHora * entrada.horas),
      porHora: redondear(porHora),
      horaTotal: redondear(horaTotal),
      recargo: redondear(recargo),
      observaciones,
    };
  },
  resultado: [
    { clave: "pago", etiqueta: "أجر الساعات الإضافية", formato: "moneda", destacada: true },
    { clave: "porHora", etiqueta: "أجر الساعة الإضافية الواحدة", formato: "moneda" },
    { clave: "horaTotal", etiqueta: "أجر الساعة العادية", formato: "moneda" },
    { clave: "recargo", etiqueta: "الزيادة عن كل ساعة (من الأساسي)", formato: "moneda" },
  ],
});
