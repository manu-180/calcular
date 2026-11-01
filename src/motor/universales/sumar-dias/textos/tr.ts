import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosTr: TextosUi<UiSumarDias> = {
  slug: "tarihe-gun-ekleme",
  ui: () => ({
    fecha: "Başlangıç tarihi",
    operacion: "İşlem",
    sumar: "Gün ekle",
    restar: "Gün çıkar",
    dias: "Gün sayısı",
    tipo: "Gün türü",
    corridos: "Takvim günü",
    habiles: "İş günü (pazartesiden cumaya)",
    resultado: "Sonuç tarihi",
    diaSemana: "Haftanın günü",
    diasCorridos: "Toplam takvim günü",
    nombresDias: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
    errorDias: "Gün sayısı en fazla 100 yıllık bir tam sayı olmalıdır.",
    notaHabiles: "İş günlerinde cumartesi ve pazar atlanır, resmî tatiller atlanmaz. Arada bir tatil varsa onu ayrıca ekleyin.",
  }),
};
