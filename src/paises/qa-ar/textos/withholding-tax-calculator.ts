import { definirTextos } from "@/motor/edicion";
import withholding from "../../qa/calculadoras/withholding-tax-calculator";

export default definirTextos(withholding, {
  calculadora: "qa-ar.withholding-tax-calculator",
  slug: "withholding-tax-calculator",
  campos: {
    monto: { etiqueta: "المبلغ" },
    modo: { etiqueta: "المبلغ هو", opciones: { bruto: "إجمالي الفاتورة قبل الاستقطاع", neto: "ما يجب أن يتسلمه غير المقيم بعد الضريبة" } },
  },
  filas: {
    retencion: { etiqueta: "الضريبة الواجب استقطاعها" },
    bruto: { etiqueta: "المبلغ الإجمالي" },
    neto: { etiqueta: "المدفوع لغير المقيم" },
  },
  mensajes: {
    "Enter the amount.": "أدخل المبلغ.",
    "Applies to royalties, interest, commissions and fees for services done wholly or partly in Qatar, paid to non-residents without a permanent establishment there.":
      "يسري على الإتاوات والفوائد والعمولات وأتعاب الخدمات المؤداة كليًا أو جزئيًا في قطر، المدفوعة لغير المقيمين دون منشأة دائمة فيها.",
    "Pay the tax to the GTA before the 16th of the month after the payment. A tax treaty may give a refund.":
      "تُورد الضريبة إلى الهيئة العامة للضرائب قبل اليوم السادس عشر من الشهر التالي للدفع. وقد تتيح اتفاقية ضريبية استردادها.",
  },
});
