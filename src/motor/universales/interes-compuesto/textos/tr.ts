import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosTr: TextosUi<UiInteresCompuesto> = {
  slug: "bilesik-faiz-hesaplama",
  ui: () => ({
    capital: "Başlangıç tutarı",
    aporte: "Aylık ek yatırım (isteğe bağlı)",
    aporteAyuda: "Her ay eklemek istediğiniz tutar. Her ayın sonunda eklenir.",
    tasa: "Yıllık faiz oranı (%)",
    anios: "Süre (yıl)",
    capitalizacion: "Faiz işleme sıklığı",
    anual: "Yıllık",
    semestral: "Altı aylık",
    trimestral: "Üç aylık",
    mensual: "Aylık",
    diaria: "Günlük",
    saldo: "Dönem sonu bakiye",
    aportado: "Toplam yatırılan",
    intereses: "Kazanılan faiz",
    tabla: "Yıllara göre büyüme",
    colAnio: "Yıl",
    colAportado: "Yatırılan",
    colIntereses: "Faiz",
    colSaldo: "Yıl sonu bakiye",
    errorSinDinero: "Bir başlangıç tutarı ya da aylık ek yatırım girin.",
    observacionIntereses: (porcentaje) => `Dönem sonu bakiyenin %${porcentaje} kadarı faizden geliyor.`,
  }),
};
