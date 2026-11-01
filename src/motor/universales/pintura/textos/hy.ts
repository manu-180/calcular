import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const unidad = (u: string) =>
  ({ m: "մ", ft: "ֆուտ", "m²": "մ²", "ft²": "քառակուսի ֆուտ", "m²/L": "մ²/լիտր", "ft²/gal": "քառակուսի ֆուտ/գալոն" })[u] ?? u;
const volumen = (u: string) => (u === "L" ? "լիտր" : "գալոն");

export const textosHy: TextosUi<UiPintura> = {
  slug: "nerki-hashvich",
  ui: () => ({
    modo: "Ի՞նչ չափեր ունեք",
    modoMedidas: "Պատերի երկարությունը և բարձրությունը",
    modoSuperficie: "Ընդհանուր մակերեսը",
    largo: (u) => `Պատերի ընդհանուր երկարություն (${unidad(u)})`,
    largoAyuda: "Բոլոր այն պատերը, որոնք ներկելու եք, միասին։ Սենյակի դեպքում դա պարագիծն է։",
    alto: (u) => `Պատերի բարձրություն (${unidad(u)})`,
    superficie: (u) => `Ներկվող մակերես (${unidad(u)})`,
    aberturas: (u) => `Չներկվող դռներ և պատուհաններ (${unidad(u)})`,
    aberturasAyuda: "Մեկ դուռը մոտ 2 մ² է (21 քառակուսի ֆուտ), իսկ սովորական պատուհանը՝ 1-2 մ²։",
    manos: "Շերտերի քանակ",
    rendimiento: (u) => `Ներկի ծախսի նորմա (${unidad(u)})`,
    rendimientoAyuda: "Նշված է տարայի վրա՝ որքան մակերես է ծածկում մեկ շերտով։ Եթե չգիտեք, թողեք առաջարկվող արժեքը։",
    recomendado: (u) => `Գնելու ներկ (${volumen(u)})`,
    recomendadoAyuda: "Ներառում է 10% պաշար ուղղումների և գլանակի վրա մնացող ներկի համար։",
    necesario: (u) => `Ճշգրիտ քանակ (${volumen(u)})`,
    neta: (u) => `Ներկվող մակերես (${unidad(u)})`,
    errorMedidas: "Լրացրեք պատերի երկարությունը և բարձրությունը։",
    errorSuperficie: "Լրացրեք ներկվող մակերեսը։",
    errorAberturas: "Դռները և պատուհանները չեն կարող զբաղեցնել ամբողջ պատը։",
    errorRendimiento: "Ծախսի նորման պետք է լինի 0 արժեքից մեծ։",
  }),
};
