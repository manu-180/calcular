import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosHy: TextosUi<UiConversorSueldo> = {
  slug: "ashkhatavardzi-pokharkich",
  ui: () => ({
    monto: "Վարձատրություն",
    periodo: "Վարձատրությունը տրվում է",
    hora: "Ժամ",
    dia: "Օր",
    semana: "Շաբաթ",
    quincena: "Կես ամիս (տարեկան 24 անգամ)",
    mes: "Ամիս",
    anio: "Տարի",
    horasSemana: "Աշխատանքային ժամեր շաբաթական",
    diasSemana: "Աշխատանքային օրեր շաբաթական",
    semanasAnio: "Վճարվող շաբաթներ տարեկան",
    semanasAnioAyuda: "52, եթե ստանում եք վճարովի արձակուրդ։ Եթե Ձեզ վճարում են միայն աշխատած շաբաթների համար, հանեք մնացածը։",
    porHora: "Ժամում",
    porDia: "Օրական",
    porSemana: "Շաբաթական",
    porQuincena: "Կես ամսում",
    porMes: "Ամսական",
    porAnio: "Տարեկան",
    errorHoras: "Մուտքագրեք, թե շաբաթական քանի ժամ եք աշխատում։",
    errorSemanas: "Տարեկան վճարվող շաբաթները պետք է զրոյից շատ լինեն։",
    observacionBruto: "Սա նույն գումարն է՝ արտահայտված այլ ժամանակահատվածների համար։ Պարգևավճարները չեն ավելացվում, իսկ հարկերը չեն հանվում։",
  }),
};
