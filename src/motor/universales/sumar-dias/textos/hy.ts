import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosHy: TextosUi<UiSumarDias> = {
  slug: "orer-gumarel",
  ui: () => ({
    fecha: "Սկզբի ամսաթիվ",
    operacion: "Գործողություն",
    sumar: "Ավելացնել օրեր",
    restar: "Հանել օրեր",
    dias: "Օրերի թիվ",
    tipo: "Օրերի տեսակ",
    corridos: "Օրացուցային օրեր",
    habiles: "Աշխատանքային օրեր (երկուշաբթիից ուրբաթ)",
    resultado: "Ստացված ամսաթիվ",
    diaSemana: "Շաբաթվա օր",
    diasCorridos: "Ընդամենը օրացուցային օրեր",
    nombresDias: ["կիրակի", "երկուշաբթի", "երեքշաբթի", "չորեքշաբթի", "հինգշաբթի", "ուրբաթ", "շաբաթ"],
    errorDias: "Օրերի թիվը պետք է լինի ամբողջ թիվ՝ մինչև 100 տարի։",
    notaHabiles: "Աշխատանքային օրերը բաց են թողնում շաբաթ և կիրակի օրերը, բայց ոչ պաշտոնական տոները։ Եթե միջակայքում տոն կա, ավելացրեք այն առանձին։",
  }),
};
