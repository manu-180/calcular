import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosTr: TextosUi<UiImc> = {
  slug: "vucut-kitle-indeksi-hesaplama",
  ui: () => ({
    peso: (u) => `Kilo (${u})`,
    altura: (u) => `Boy (${u})`,
    pies: "Boy: fit (ft)",
    pulgadas: "Boy: inç (in)",
    imc: "Vücut kitle indeksi (VKİ)",
    categoria: "Sınıf (DSÖ)",
    pesoMin: (u) => `Sağlıklı kilo alt sınırı (${u})`,
    pesoMax: (u) => `Sağlıklı kilo üst sınırı (${u})`,
    rangoAyuda: "Bu boyda sağlıklı bir VKİ veren kilo aralığı.",
    bajo: "Zayıf",
    normal: "Normal kilo",
    sobrepeso: "Fazla kilolu",
    obesidad1: "1. derece obezite",
    obesidad2: "2. derece obezite",
    obesidad3: "3. derece obezite",
    errorPeso: "Kilo sıfırdan büyük olmalıdır.",
    errorAltura: "Boy sıfırdan büyük olmalıdır.",
    aviso:
      "VKİ yetişkinler için genel bir göstergedir: kas ile yağı ayırt etmez, gebelikte ve çocuklarda aynı şekilde kullanılmaz. Bir sağlık uzmanına danışmanın yerini tutmaz.",
  }),
};
