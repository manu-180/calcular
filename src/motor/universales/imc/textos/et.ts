import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosEt: TextosUi<UiImc> = {
  slug: "kmi-kalkulaator",
  ui: () => ({
    peso: (u) => `Kaal (${u})`,
    altura: (u) => `Pikkus (${u})`,
    pies: "Pikkus: jalad (ft)",
    pulgadas: "Pikkus: tollid (in)",
    imc: "Kehamassiindeks (KMI)",
    categoria: "Kategooria (WHO)",
    pesoMin: (u) => `Normaalkaal alates (${u})`,
    pesoMax: (u) => `Normaalkaal kuni (${u})`,
    rangoAyuda: "Kaaluvahemik, mille puhul on sinu KMI selle pikkuse juures normaalne.",
    bajo: "Alakaal",
    normal: "Normaalkaal",
    sobrepeso: "Ülekaal",
    obesidad1: "Rasvumine, I aste",
    obesidad2: "Rasvumine, II aste",
    obesidad3: "Rasvumine, III aste",
    errorPeso: "Kaal peab olema suurem kui 0.",
    errorAltura: "Pikkus peab olema suurem kui 0.",
    aviso:
      "KMI on täiskasvanute jaoks ligikaudne näitaja. See ei erista lihaseid ja rasva ning raseduse ajal ja lastel seda samamoodi ei kasutata. See ei asenda arsti ega õe hinnangut.",
  }),
};
