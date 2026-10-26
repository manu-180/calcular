import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosTr: TextosUi<UiPromedio> = {
  slug: "agirlikli-ortalama-hesaplama",
  ui: () => ({
    nota: (n) => `${n}. not`,
    notaAyuda: "Her notu ya da değeri ağırlığıyla birlikte girin. Kullanmadığınız satırları boş bırakın.",
    peso: (n) => `${n}. ağırlık`,
    pesoAyuda: "Yüzde, kredi (AKTS) ya da kaç kez sayıldığı olabilir. Ağırlık girmezseniz tüm değerler eşit sayılır.",
    ponderado: "Ağırlıklı ortalama",
    simple: "Basit ortalama",
    cantidad: "Değer sayısı",
    sumaPesos: "Ağırlıkların toplamı",
    errorSinNotas: "En az bir değer girin.",
    errorFaltaPeso: "Bu değerin ağırlığı yok. Ağırlık kullanıyorsanız her değer için doldurun.",
    errorFaltaNota: "Bu ağırlığın değeri yok. Değeri doldurun ya da ağırlığı silin.",
    errorPesosCero: "Ağırlıkların toplamı 0: en az birinin sıfırdan büyük olması gerekir.",
    sinPesos: "Ağırlık girilmediğinde ağırlıklı ortalama basit ortalamaya eşittir.",
  }),
};
