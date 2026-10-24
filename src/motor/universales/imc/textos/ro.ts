import type { TextosUi } from "../../tipos";
import type { UiImc } from "../definicion";

export const textosRo: TextosUi<UiImc> = {
  slug: "calculator-imc",
  ui: () => ({
    peso: (u) => `Greutate (${u})`,
    altura: (u) => `Înălțime (${u})`,
    pies: "Înălțime: picioare",
    pulgadas: "Înălțime: inci",
    imc: "Indicele de masă corporală (IMC)",
    categoria: "Categoria (OMS)",
    pesoMin: (u) => `Greutate sănătoasă de la (${u})`,
    pesoMax: (u) => `Greutate sănătoasă până la (${u})`,
    rangoAyuda: "Intervalul de greutate care dă un IMC sănătos la această înălțime.",
    bajo: "Subponderal",
    normal: "Greutate normală",
    sobrepeso: "Supraponderal",
    obesidad1: "Obezitate de gradul 1",
    obesidad2: "Obezitate de gradul 2",
    obesidad3: "Obezitate de gradul 3",
    errorPeso: "Greutatea trebuie să fie mai mare decât 0.",
    errorAltura: "Înălțimea trebuie să fie mai mare decât 0.",
    aviso:
      "IMC-ul este un reper general pentru adulți: nu deosebește mușchii de grăsime și nu se aplică la fel în sarcină sau la copii. Nu înlocuiește consultul la medic.",
  }),
};
