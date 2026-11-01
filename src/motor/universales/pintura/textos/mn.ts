import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "литр" : "галлон");

export const textosMn: TextosUi<UiPintura> = {
  slug: "budgiin-tootsooluur",
  ui: () => ({
    modo: "Танд ямар хэмжээс байна вэ?",
    modoMedidas: "Ханын урт ба өндөр",
    modoSuperficie: "Нийт талбай",
    largo: (u) => `Ханын нийт урт (${u})`,
    largoAyuda: "Будах бүх ханын уртын нийлбэр. Өрөөний хувьд энэ нь периметр юм.",
    alto: (u) => `Ханын өндөр (${u})`,
    superficie: (u) => `Будах талбай (${u})`,
    aberturas: (u) => `Будахгүй хаалга, цонх (${u})`,
    aberturasAyuda: "Нэг хаалга ойролцоогоор 2 м² (21 кв. фут), энгийн цонх 1 ба 2 м² хооронд байдаг.",
    manos: "Будах давхрын тоо",
    rendimiento: (u) => `Будгийн зарцуулалт (${u})`,
    rendimientoAyuda: "Савны шошгон дээр бичсэн байдаг: нэг давхраар хэр их талбай будах вэ. Мэдэхгүй бол санал болгосон утгыг үлдээнэ үү.",
    recomendado: (u) => `Худалдан авах будаг (${volumen(u)})`,
    recomendadoAyuda: "Засвар болон булын дээр үлдэх будагт зориулсан 10 хувийн нөөц багтсан.",
    necesario: (u) => `Яг шаардлагатай хэмжээ (${volumen(u)})`,
    neta: (u) => `Будах талбай (${u})`,
    errorMedidas: "Ханын урт, өндрийг оруулна уу.",
    errorSuperficie: "Будах талбайг оруулна уу.",
    errorAberturas: "Хаалга, цонх бүх ханыг эзэлж болохгүй.",
    errorRendimiento: "Будгийн зарцуулалт 0 тооноос их байх ёстой.",
  }),
};
