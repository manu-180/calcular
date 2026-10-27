import { definirTextos } from "@/motor/edicion";
import plusValueImmobiliere from "../../dz/calculadoras/plus-value-immobiliere";
import { MENSAJES_COMUNES } from "../lib/comun";

export default definirTextos(plusValueImmobiliere, {
  calculadora: "dz-ar.plus-value-immobiliere",
  slug: "plus-value-immobiliere",
  campos: {
    cession: { etiqueta: "سعر التنازل" },
    fraisCession: { etiqueta: "الحقوق والرسوم والمصاريف التي دفعها البائع", ayuda: "المصاريف المبررة التي تحملها البائع بمناسبة البيع." },
    acquisition: {
      etiqueta: "سعر الاقتناء",
      ayuda: "بالنسبة لعقار آل إليك بهبة أو إرث، قيمته التجارية في ذلك التاريخ. اترك 0 إذا تعذر تحديد السعر.",
    },
    fraisAcquisition: { etiqueta: "مصاريف الاقتناء والصيانة والتحسين المبررة" },
    annees: { etiqueta: "سنوات الحيازة" },
    unique: { etiqueta: "السكن الوحيد والمسكن الرئيسي" },
  },
  filas: {
    impot: { etiqueta: "الضريبة على الدخل الإجمالي الواجب دفعها عن فائض القيمة" },
    plusValue: { etiqueta: "فائض القيمة الخام" },
    prixRevient: { etiqueta: "سعر الاقتناء المعتمد بما فيه المصاريف" },
    tauxAbattement: { etiqueta: "التخفيض حسب مدة الحيازة" },
    abattement: { etiqueta: "مبلغ التخفيض" },
    imposable: { etiqueta: "فائض القيمة الخاضع للضريبة" },
    brut: { etiqueta: "الضريبة قبل التخفيض" },
    reduction: { etiqueta: "التخفيض الخاص بالسكن الوحيد" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "Les frais du vendeur doivent rester inférieurs au prix de cession.": "يجب أن تبقى مصاريف البائع أقل من سعر التنازل.",
    "L'impôt est libératoire. Le vendeur le calcule et le paie lui-même à la recette des impôts du lieu du bien, dans les 30 jours qui suivent l'acte de vente.":
      "الضريبة محررة. يحسبها البائع ويدفعها بنفسه لدى قباضة الضرائب لمكان وجود العقار، في أجل 30 يومًا من تاريخ عقد البيع.",
    "La cession d'un bien reçu en succession pour liquider des droits réels indivis est exonérée lorsque l'indivisibilité du bien est justifiée, tout comme la cession dans le cadre d'un financement Mourabaha ou Ijara Mountahia Bitamlik.":
      "يُعفى التنازل عن عقار موروث لتصفية حقوق عينية مشاعة متى ثبت عدم قابلية العقار للقسمة، وكذا التنازل في إطار تمويل المرابحة أو الإجارة المنتهية بالتمليك.",
  },
  traducir: (t) => {
    let m = /^Sans prix d'acquisition connu, la valeur d'acquisition est fixée forfaitairement à ([\d.,]+) % du prix de vente et les frais ne sont pas ajoutés\.$/.exec(t);
    if (m) return `عند عدم معرفة سعر الاقتناء، تُحدَّد قيمة الاقتناء جزافيًا بـ${m[1]} % من سعر البيع ولا تُضاف المصاريف.`;
    m = /^Les frais déclarés dépassent ([\d.,]+) % du prix d'acquisition : seule cette limite est retenue\.$/.exec(t);
    if (m) return `تتجاوز المصاريف المصرح بها ${m[1]} % من سعر الاقتناء، فلا يُعتمد إلا هذا الحد.`;
    return undefined;
  },
});
