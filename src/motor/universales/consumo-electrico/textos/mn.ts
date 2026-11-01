import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosMn: TextosUi<UiConsumoElectrico> = {
  slug: "tsakhilgaany-khereglee-tootsooluur",
  ui: () => ({
    potencia: "Төхөөрөмжийн чадал (W)",
    potenciaAyuda: "Шошго эсвэл ашиглалтын зааварт ваттаар (W) заасан байдаг. kW гэж бичсэн бол 1000 тоогоор үржүүлнэ үү.",
    cantidad: "Ижил төхөөрөмжийн тоо",
    horas: "Өдөрт ажиллах цаг",
    dias: "Сард ажиллах өдөр",
    precio: "Нэг kWh цахилгааны үнэ",
    precioAyuda: "Цахилгааны төлбөрийн баримтад заасан байдаг. Бүрэн дүнг харахыг хүсвэл татвартай үнийг оруулна уу.",
    kwhDia: "Өдрийн хэрэглээ (kWh)",
    kwhMes: "Сарын хэрэглээ (kWh)",
    kwhAnio: "Жилийн хэрэглээ (kWh)",
    costoDia: "Өдрийн зардал",
    costoMes: "Сарын зардал",
    costoAnio: "Жилийн зардал",
    errorHoras: "Өдөрт 24 цаг байдаг: ажиллах хугацаа 0-24 цагийн хооронд байх ёстой.",
  }),
};
