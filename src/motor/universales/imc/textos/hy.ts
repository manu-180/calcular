import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

const unidad = (u: string) => ({ kg: "կգ", lb: "ֆունտ", cm: "սմ" })[u] ?? u;

export const textosHy: TextosUi<UiImc> = {
  slug: "marmni-zangvatsi-indeks",
  ui: () => ({
    peso: (u) => `Քաշ (${unidad(u)})`,
    altura: (u) => `Հասակ (${unidad(u)})`,
    pies: "Հասակ՝ ֆուտ",
    pulgadas: "Հասակ՝ դյույմ",
    imc: "Մարմնի զանգվածի ինդեքս (ՄԶԻ)",
    categoria: "Կատեգորիա (ԱՀԿ)",
    pesoMin: (u) => `Առողջ քաշի ստորին սահման (${unidad(u)})`,
    pesoMax: (u) => `Առողջ քաշի վերին սահման (${unidad(u)})`,
    rangoAyuda: "Քաշի այն միջակայքը, որի դեպքում այս հասակի համար ՄԶԻ-ն առողջ սահմաններում է։",
    bajo: "Թերքաշ",
    normal: "Նորմալ քաշ",
    sobrepeso: "Ավելորդ քաշ",
    obesidad1: "Ճարպակալում, I աստիճան",
    obesidad2: "Ճարպակալում, II աստիճան",
    obesidad3: "Ճարպակալում, III աստիճան",
    errorPeso: "Քաշը պետք է լինի 0 արժեքից մեծ։",
    errorAltura: "Հասակը պետք է լինի 0 արժեքից մեծ։",
    aviso:
      "ՄԶԻ-ն չափահասների համար ընդհանուր ուղենիշ է։ Այն չի տարբերում մկանները ճարպից, իսկ հղիության ժամանակ և երեխաների դեպքում այլ կերպ է մեկնաբանվում։ Այն չի փոխարինում բժշկի խորհրդատվությանը։",
  }),
};
