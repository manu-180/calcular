import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosLt: TextosUi<UiHorasTrabajadas> = {
  slug: "dirbtu-valandu-skaiciuokle",
  ui: () => ({
    dias: ["Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis", "Sekmadienis"],
    entrada: (dia) => `${dia}: pradžia`,
    salida: (dia) => `${dia}: pabaiga`,
    horarioAyuda: "Nedarbo dienas palikite tuščias. Jei pamaina baigiasi po vidurnakčio, ji skaičiuojama kaip ta pati pamaina.",
    pausa: "Neapmokama pertrauka per dieną (minutėmis)",
    pausaAyuda: "Pietų ir poilsio pertrauka, už kurią nemokama. Atimama už kiekvieną darbo dieną.",
    pagoHora: "Valandinis atlygis",
    umbral: "Įprastos valandos per savaitę (neprivaloma)",
    umbralAyuda: "Valandos virš šio skaičiaus apmokamos kaip viršvalandžiai. Jei viršvalandžių neturite, palikite lauką tuščią.",
    recargo: "Priedas už viršvalandžius (%)",
    recargoAyuda: "Kiek daugiau mokama už kiekvieną viršvalandį. 50 % reiškia pusantro karto didesnį atlygį.",
    horasTotales: "Dirbtos valandos",
    horasReloj: "Valandomis ir minutėmis",
    horasNormales: "Įprastos valandos",
    horasExtra: "Viršvalandžiai",
    pagoNormal: "Atlygis už įprastas valandas",
    pagoExtra: "Atlygis už viršvalandžius",
    pagoTotal: "Iš viso per savaitę",
    tabla: "Pagal dienas",
    colDia: "Diena",
    colEntrada: "Pradžia",
    colSalida: "Pabaiga",
    colHoras: "Valandos",
    errorFaltaSalida: (dia) => `${dia}: trūksta pabaigos laiko.`,
    errorFaltaEntrada: (dia) => `${dia}: trūksta pradžios laiko.`,
    errorIguales: (dia) => `${dia}: pradžios ir pabaigos laikas sutampa.`,
    errorPausa: (dia) => `${dia}: pertrauka tokia pat ilga arba ilgesnė už pamainą.`,
    errorSinDias: "Įveskite pradžią ir pabaigą bent vienai dienai.",
    observacionNoche: "Kai kurios pamainos baigiasi kitą dieną: jos visos priskiriamos tai dienai, kurią prasidėjo.",
    observacionGenerico:
      "Tai bendras skaičiavimas. Didžiausią darbo laiko trukmę, viršvalandžių taisykles ir priedus už naktinį darbą bei švenčių dienas nustato įstatymai ir jūsų darbo sutartis.",
  }),
};
