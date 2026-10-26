import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosHu: TextosUi<UiImc> = {
  slug: "bmi-kalkulator",
  ui: () => ({
    peso: (u) => `Testsúly (${u})`,
    altura: (u) => `Testmagasság (${u})`,
    pies: "Magasság: láb (ft)",
    pulgadas: "Magasság: hüvelyk (in)",
    imc: "Testtömegindex (BMI)",
    categoria: "Kategória (WHO)",
    pesoMin: (u) => `Egészséges testsúly alsó határa (${u})`,
    pesoMax: (u) => `Egészséges testsúly felső határa (${u})`,
    rangoAyuda: "Az a testsúlytartomány, amelyben a BMI-d ennél a magasságnál normál marad.",
    bajo: "Soványság",
    normal: "Normál testsúly",
    sobrepeso: "Túlsúly",
    obesidad1: "I. fokú elhízás",
    obesidad2: "II. fokú elhízás",
    obesidad3: "III. fokú elhízás",
    errorPeso: "A testsúlynak nullánál nagyobbnak kell lennie.",
    errorAltura: "A magasságnak nullánál nagyobbnak kell lennie.",
    aviso:
      "A BMI felnőtteknek szóló általános mutató: nem tesz különbséget izom és zsír között, várandósság alatt és gyerekeknél pedig másképp kell értékelni. Nem helyettesíti az orvossal való konzultációt.",
  }),
};
