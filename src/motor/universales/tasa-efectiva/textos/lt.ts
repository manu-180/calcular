import { formaLt } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

// «1 procentinis punktas», «2 procentiniai punktai», «10 procentinių punktų», «0,68 procentinio punkto».
// Los puntos llegan formateados en lt-LT («0,68»): se pasan a número para elegir la forma.
const punktai = (puntos: string) =>
  formaLt(Number(puntos.replace(/\s/g, "").replace(",", ".")), "procentinis punktas", "procentiniai punktai", "procentinių punktų", "procentinio punkto");

export const textosLt: TextosUi<UiTasaEfectiva> = {
  slug: "efektyvioji-palukanu-norma",
  ui: () => ({
    direccion: "Kokią normą turite?",
    nominalAEfectiva: "Nominalią metinę normą (perskaičiuoti į efektyviąją)",
    efectivaANominal: "Efektyviąją normą (perskaičiuoti į nominalią)",
    tasa: "Metinė norma (%)",
    tasaAyuda: "Įveskite ją tiksliai taip, kaip nurodyta pasiūlyme arba sutartyje.",
    capitalizacion: "Palūkanų priskaičiavimas",
    capitalizacionAyuda: "Kaip dažnai palūkanos pridedamos prie likučio. Paskolų ir kredito kortelių atveju paprastai kas mėnesį.",
    mensual: "Kas mėnesį (12 k. per metus)",
    trimestral: "Kas ketvirtį (4 k. per metus)",
    semestral: "Kas pusmetį (2 k. per metus)",
    diaria: "Kas dieną (365 k. per metus)",
    efectiva: "Efektyvioji metinė norma",
    nominal: "Nominali metinė norma",
    periodica: "Laikotarpio norma",
    errorNegativa: "Norma negali būti neigiama. Įveskite skaičių nuo 0.",
    observacionDiferencia: (puntos) => `Efektyvioji norma didesnė už nominalią, nes palūkanos skaičiuojamos ir nuo priskaičiuotų palūkanų. Skirtumas yra ${puntos} ${punktai(puntos)}.`,
  }),
};
