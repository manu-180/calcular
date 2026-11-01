import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosMn: TextosUi<UiCeramicos> = {
  slug: "shaazan-plita-tootsooluur",
  ui: () => ({
    superficie: (u) => `Плита наах талбай (${u})`,
    largo: (u) => `Плитаны урт (${u})`,
    ancho: (u) => `Плитаны өргөн (${u})`,
    desperdicio: "Хаягдлын нөөц (%)",
    desperdicioAyuda: "Зүсэлт болон хагарсан плитанд зориулсан нөөц. Шулуун өрөлтөд 10 хувь, диагональ өрөлтөд 15 хувь оруулна уу.",
    porCaja: "Нэг хайрцаг дахь плитаны тоо",
    porCajaAyuda: "Заавал биш. Хэдэн хайрцаг авахаа мэдэхийн тулд бөглөнө үү.",
    piezas: "Шаардлагатай плитаны тоо",
    cajas: "Худалдан авах хайрцагны тоо",
    conDesperdicio: (u) => `Нөөцтэй талбай (${u})`,
    cubre: (u) => `Хайрцгуудын хамрах талбай (${u})`,
    errorSuperficie: "Талбай тэгээс их байх ёстой.",
    errorPieza: "Плитаны хэмжээ тэгээс их байх ёстой.",
  }),
};
