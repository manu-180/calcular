import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

const unidad = (u: string) => ({ "m²": "մ²", "ft²": "քառակուսի ֆուտ", cm: "սմ", in: "դյույմ" })[u] ?? u;

export const textosHy: TextosUi<UiCeramicos> = {
  slug: "salikneri-hashvich",
  ui: () => ({
    superficie: (u) => `Սալապատվող մակերես (${unidad(u)})`,
    largo: (u) => `Սալիկի երկարություն (${unidad(u)})`,
    ancho: (u) => `Սալիկի լայնություն (${unidad(u)})`,
    desperdicio: "Կորստի պաշար (%)",
    desperdicioAyuda: "Կտրելու և ջարդված սալիկների համար։ Դրեք 10% ուղիղ շարվածքի և 15% անկյունագծային շարվածքի դեպքում։",
    porCaja: "Սալիկների քանակը տուփում",
    porCajaAyuda: "Պարտադիր չէ։ Լրացրեք, որպեսզի տեսնեք, թե քանի տուփ գնել։",
    piezas: "Անհրաժեշտ սալիկներ",
    cajas: "Գնելու տուփեր",
    conDesperdicio: (u) => `Մակերես պաշարով (${unidad(u)})`,
    cubre: (u) => `Տուփերով ծածկվող մակերես (${unidad(u)})`,
    errorSuperficie: "Մակերեսը պետք է լինի 0 արժեքից մեծ։",
    errorPieza: "Սալիկի չափերը պետք է լինեն 0 արժեքից մեծ։",
  }),
};
