import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosSq: TextosUi<UiIva> = {
  slug: "kalkulator-tvsh",
  ui: () => ({
    operacion: "Çfarë dëshironi të llogaritni?",
    agregar: "Shtoni TVSH-në te një çmim pa TVSH",
    quitar: "Hiqni TVSH-në nga një çmim me TVSH",
    monto: "Çmimi",
    montoAyuda: "Pa TVSH nëse e shtoni tatimin; me TVSH të përfshirë nëse e hiqni.",
    otraTasa: "Normë tjetër TVSH (%)",
    otraTasaAyuda: "Opsionale. Nëse produkti ka normë të reduktuar, vendoseni këtu. Përndryshe zbatohet norma standarde.",
    neto: "Çmimi pa TVSH",
    impuesto: "TVSH",
    total: "Çmimi me TVSH",
    tasaUsada: "Norma e zbatuar",
    errorTasa: "Norma e TVSH-së nuk është e vlefshme.",
  }),
};
