import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosSq: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "pika-e-barazimit",
  ui: () => ({
    fijos: "Kostot fikse në muaj",
    fijosAyuda: "Ajo që paguani edhe nëse nuk shitni asgjë: qira, paga fikse, fatura, programe.",
    precio: "Çmimi i shitjes për njësi",
    variable: "Kostoja e ndryshueshme për njësi",
    variableAyuda: "Sa ju kushton çdo njësi e shitur: materiale, mallra, komisione, transport.",
    objetivo: "Fitimi i dëshiruar në muaj (opsional)",
    objetivoAyuda: "Për të parë sa duhet të shitni përtej mbulimit të kostove.",
    unidades: "Njësi deri te pika e barazimit",
    facturacion: "Shitje deri te pika e barazimit",
    contribucion: "Marzhi i kontributit për njësi",
    contribucionAyuda: "Ajo që lë çdo shitje për mbulimin e kostove fikse: çmimi minus kostoja e ndryshueshme.",
    contribucionPct: "Marzhi i kontributit (%)",
    unidadesObjetivo: "Njësi për fitimin e dëshiruar",
    facturacionObjetivo: "Shitje për fitimin e dëshiruar",
    errorPrecio: "Vendosni çmimin e shitjes së një njësie.",
    errorMargen: "Kostoja e ndryshueshme është e barabartë ose më e madhe se çmimi: çdo shitje sjell humbje dhe pika e barazimit nuk arrihet kurrë. Kontrolloni çmimin ose koston.",
    observacionRedondeo: "Njësitë rrumbullakohen lart, sepse nuk mund të shitet një pjesë e një njësie.",
  }),
};
