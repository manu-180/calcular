import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosHy: TextosUi<UiAhorroRetiro> = {
  slug: "kensatoshakayin-khnayoghutyun",
  ui: () => ({
    edadActual: "Ձեր տարիքը հիմա",
    edadRetiro: "Ո՞ր տարիքում եք ուզում կենսաթոշակի անցնել",
    actual: "Որքա՞ն եք արդեն խնայել",
    aporte: "Ամսական մուծում",
    rendimiento: "Իրական տարեկան եկամտաբերություն (%)",
    rendimientoAyuda: "Որքան է ներդրումը վաստակում գնաճից բարձր։ Երկար ժամկետում զգուշավոր ենթադրություն է 2% մինչև 5%։",
    aniosRenta: "Քանի՞ տարվա կենսաթոշակ պետք է ապահովի խնայողությունը",
    aniosRentaAyuda: "Քանի տարի եք ուզում գումար հանել այս խնայողությունից։",
    capital: "Խնայողությունը կենսաթոշակի անցնելիս",
    renta: "Ամսական եկամուտ խնայողությունից",
    aportado: "Ընդամենը մուծված",
    intereses: "Ընդհանուր աճ",
    tabla: "Աճն ըստ տարիքի",
    colEdad: "Տարիք",
    colAportado: "Մուծված մինչ այդ",
    colSaldo: "Խնայողություն",
    errorEdades: "Կենսաթոշակի անցնելու տարիքը պետք է մեծ լինի Ձեր ներկայիս տարիքից։",
    errorSinAhorro: "Մուտքագրեք Ձեր ներկայիս խնայողությունը կամ ամսական մուծումը։",
    observacionDineroDeHoy: "Գումարներն այսօրվա գներով են, քանի որ եկամտաբերությունից գնաճն արդեն հանված է։",
    observacionPublica: "Սրանք միայն Ձեր անձնական խնայողություններն են։ Պետական և կուտակային կենսաթոշակները ներառված չեն։",
  }),
};
