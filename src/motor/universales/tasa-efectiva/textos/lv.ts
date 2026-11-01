import { formaLv } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

// «1 procentpunkts», «2 procentpunkti», «10 procentpunkti», «0,68 procentpunkti». Los puntos llegan
// formateados en lv-LV («0,68»): se pasan a número para elegir la forma.
const punkti = (puntos: string) =>
  formaLv(Number(puntos.replace(/\s/g, "").replace(",", ".")), "procentpunkts", "procentpunkti", "procentpunktu");

export const textosLv: TextosUi<UiTasaEfectiva> = {
  slug: "efektivas-likmes-kalkulators",
  ui: () => ({
    direccion: "Kāda likme jums ir?",
    nominalAEfectiva: "Nominālā gada likme (pārrēķināt uz efektīvo)",
    efectivaANominal: "Efektīvā likme (pārrēķināt uz nominālo)",
    tasa: "Gada likme (%)",
    tasaAyuda: "Ievadiet to tieši tā, kā norādīts piedāvājumā vai līgumā.",
    capitalizacion: "Procentu pieskaitīšana",
    capitalizacionAyuda: "Cik bieži procentus pieskaita atlikumam. Kredītiem un kredītkartēm parasti katru mēnesi.",
    mensual: "Katru mēnesi (12 reizes gadā)",
    trimestral: "Katru ceturksni (4 reizes gadā)",
    semestral: "Katru pusgadu (2 reizes gadā)",
    diaria: "Katru dienu (365 reizes gadā)",
    efectiva: "Efektīvā gada likme",
    nominal: "Nominālā gada likme",
    periodica: "Perioda likme",
    errorNegativa: "Likme nevar būt negatīva. Ievadiet skaitli no 0.",
    observacionDiferencia: (puntos) => `Efektīvā likme ir lielāka par nominālo, jo procentus rēķina arī no pieskaitītajiem procentiem. Starpība ir ${puntos} ${punkti(puntos)}.`,
  }),
};
