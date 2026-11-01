import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosLt: TextosUi<UiAhorroRetiro> = {
  slug: "taupymas-pensijai",
  ui: () => ({
    edadActual: "Jūsų dabartinis amžius",
    edadRetiro: "Kokio amžiaus norite išeiti į pensiją",
    actual: "Kiek jau sutaupėte",
    aporte: "Mėnesinė įmoka",
    rendimiento: "Realioji metinė grąža (%)",
    rendimientoAyuda: "Kiek investicijos uždirba viršijant infliaciją. Ilgam laikotarpiui atsargi prielaida yra nuo 2 iki 5 %.",
    aniosRenta: "Kiek pensijos metų turėtų užtekti santaupų",
    aniosRentaAyuda: "Kiek metų planuojate naudotis šiomis santaupomis.",
    capital: "Santaupos išeinant į pensiją",
    renta: "Mėnesinės pajamos iš šių santaupų",
    aportado: "Iš viso įmokėta",
    intereses: "Bendra grąža",
    tabla: "Santaupų augimas pagal amžių",
    colEdad: "Amžius",
    colAportado: "Įmokėta iki tol",
    colSaldo: "Santaupos",
    errorEdades: "Pensijos amžius turi būti didesnis už dabartinį amžių.",
    errorSinAhorro: "Įveskite, kiek jau sutaupėte, arba mėnesinę įmoką.",
    observacionDineroDeHoy: "Sumos pateiktos šiandienos kainomis, nes iš grąžos jau atimta infliacija.",
    observacionPublica: "Skaičiuojamos tik jūsų pačių santaupos. Valstybinė pensija ir kitos išmokos, į kurias galite turėti teisę, neįtrauktos.",
  }),
};
