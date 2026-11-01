import { formaSk } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

// „o 1 percentuálny bod“, „o 2 percentuálne body“, „o 5 percentuálnych bodov“, „o 0,68 percentuálneho bodu“.
// Los puntos llegan formateados en sk-SK („0,68“): se pasan a número para elegir la forma.
const bodu = (puntos: string) =>
  formaSk(Number(puntos.replace(/\s/g, "").replace(",", ".")), "percentuálny bod", "percentuálne body", "percentuálnych bodov", "percentuálneho bodu");

export const textosSk: TextosUi<UiTasaEfectiva> = {
  slug: "efektivna-urokova-sadzba",
  ui: () => ({
    direccion: "Akú sadzbu máte?",
    nominalAEfectiva: "Nominálnu sadzbu p. a. (previesť na efektívnu)",
    efectivaANominal: "Efektívnu sadzbu (previesť na nominálnu)",
    tasa: "Ročná sadzba (%)",
    tasaAyuda: "Zadajte ju presne tak, ako je uvedená v ponuke alebo v zmluve.",
    capitalizacion: "Pripisovanie úrokov",
    capitalizacionAyuda: "Ako často sa úroky pripisujú k zostatku. Pri úveroch a kreditných kartách zvyčajne každý mesiac.",
    mensual: "Mesačne (12-krát ročne)",
    trimestral: "Štvrťročne (4-krát ročne)",
    semestral: "Polročne (2-krát ročne)",
    diaria: "Denne (365-krát ročne)",
    efectiva: "Efektívna ročná sadzba",
    nominal: "Nominálna ročná sadzba (p. a.)",
    periodica: "Sadzba za obdobie",
    errorNegativa: "Sadzba nemôže byť záporná. Zadajte číslo od 0 vyššie.",
    observacionDiferencia: (puntos) => `Efektívna sadzba je o ${puntos} ${bodu(puntos)} vyššia ako nominálna, pretože sa úročia aj pripísané úroky.`,
  }),
};
