import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosMk: TextosUi<UiVariacion> = {
  slug: "kalkulator-za-procentualna-promena",
  ui: () => ({
    inicial: "Почетна вредност",
    final: "Крајна вредност",
    variacion: "Процентуална промена",
    diferencia: "Разлика",
    vuelta: "За враќање на почетокот",
    vueltaAyuda: "За колку треба да се промени крајната вредност за да се врати на почетната.",
    errorInicialCero: "Почетната вредност не може да биде 0, бидејќи од нула нема процентуална промена.",
    subio: (p) => `Зголемување за ${p} %.`,
    bajo: (p) => `Намалување за ${p} %.`,
    igual: "Нема промена: двете вредности се еднакви.",
  }),
};
