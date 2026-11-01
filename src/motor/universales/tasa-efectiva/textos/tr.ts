import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosTr: TextosUi<UiTasaEfectiva> = {
  slug: "efektif-faiz-hesaplama",
  ui: () => ({
    direccion: "Elinizdeki oran hangisi?",
    nominalAEfectiva: "Yıllık nominal faiz (efektif faize çevir)",
    efectivaANominal: "Yıllık efektif faiz (nominal faize çevir)",
    tasa: "Yıllık oran (%)",
    tasaAyuda: "Teklifte ya da sözleşmede yazdığı gibi girin.",
    capitalizacion: "Faiz işleme sıklığı",
    capitalizacionAyuda: "Faizin anaparaya ne sıklıkla eklendiği. Kredilerde ve kredi kartlarında genellikle aylıktır.",
    mensual: "Aylık (yılda 12 kez)",
    trimestral: "Üç aylık (yılda 4 kez)",
    semestral: "Altı aylık (yılda 2 kez)",
    diaria: "Günlük (yılda 365 kez)",
    efectiva: "Yıllık efektif faiz oranı",
    nominal: "Yıllık nominal faiz oranı",
    periodica: "Dönemlik faiz oranı",
    errorNegativa: "Oran negatif olamaz. Sıfır ya da daha büyük bir sayı girin.",
    observacionDiferencia: (puntos) => `Faiz de faiz kazandığı için efektif oran nominal orandan yüksektir. Aradaki fark: ${puntos} puan.`,
  }),
};
