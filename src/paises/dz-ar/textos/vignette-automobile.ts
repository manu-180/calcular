import { definirTextos } from "@/motor/edicion";
import vignetteAutomobile from "../../dz/calculadoras/vignette-automobile";

export default definirTextos(vignetteAutomobile, {
  calculadora: "dz-ar.vignette-automobile",
  slug: "vignette-automobile",
  campos: {
    puissance: {
      etiqueta: "القوة الجبائية",
      opciones: { "6": "إلى غاية 6 أحصنة", "9": "من 7 إلى 9 أحصنة", "10": "10 أحصنة فأكثر" },
    },
    age: {
      etiqueta: "عمر المركبة منذ أول سير لها",
      opciones: {
        "moins-3": "أقل من 3 سنوات",
        "3-6": "من 3 إلى 6 سنوات",
        "6-10": "أكثر من 6 سنوات وإلى غاية 10 سنوات",
        "plus-10": "أكثر من 10 سنوات",
      },
    },
    energie: {
      etiqueta: "نوع المحرك",
      opciones: {
        thermique: "بنزين أو مازوت أو غاز البترول المميع",
        gnc: "الغاز الطبيعي للوقود",
        electrique: "كهربائية أو هجينة",
      },
    },
  },
  filas: {
    montant: { etiqueta: "القسيمة الواجب دفعها" },
    tarif: { etiqueta: "تعريفة الجدول لهذه المركبة" },
  },
  mensajes: {
    "Depuis la loi de finances pour 2026, les véhicules au GNC, électriques ou hybrides sont exemptés de la vignette.":
      "منذ قانون المالية لسنة 2026، تُعفى من القسيمة المركبات التي تسير بالغاز الطبيعي للوقود والمركبات الكهربائية أو الهجينة.",
    "Tarif des véhicules de tourisme et des véhicules aménagés en utilitaire. Les utilitaires, camions et autocars ont un barème différent.":
      "تعريفة السيارات السياحية والسيارات المهيأة كنفعية. أما السيارات النفعية والشاحنات والحافلات فلها جدول مختلف.",
  },
});
