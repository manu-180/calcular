import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosSq: TextosUi<UiMargenDeGanancia> = {
  slug: "kalkulator-marzhi-fitimi",
  ui: () => ({
    modo: "Çfarë dëshironi të llogaritni?",
    modoPrecio: "Marzhin dhe shtesën mbi kosto, nga kostoja dhe çmimi",
    modoMargen: "Çmimin për një marzh të dëshiruar",
    modoMarkup: "Çmimin për një shtesë të dëshiruar mbi kosto",
    costo: "Kostoja e blerjes për njësi",
    costoAyuda: "Sa ju kushton të blini ose të prodhoni një njësi, pa TVSH-në që mblidhni nga klienti.",
    precio: "Çmimi i shitjes",
    precioAyuda: "Vetëm nëse dëshironi të gjeni marzhin. Pa TVSH.",
    objetivo: "Marzhi ose shtesa e dëshiruar (%)",
    objetivoAyuda: "Vetëm nëse dëshironi të gjeni çmimin.",
    precioResultado: "Çmimi i shitjes",
    margen: "Marzhi i fitimit",
    margenAyuda: "Fitimi si përqindje e çmimit të shitjes.",
    markup: "Shtesa mbi kosto",
    markupAyuda: "Fitimi si përqindje e kostos.",
    ganancia: "Fitimi për njësi",
    errorCosto: "Vendosni koston e një njësie.",
    errorFaltaPrecio: "Vendosni çmimin e shitjes për të gjetur marzhin.",
    errorFaltaObjetivo: "Vendosni marzhin ose shtesën që synoni.",
    errorMargen100: "Marzhi duhet të jetë nën 100%: përndryshe i gjithë çmimi do të ishte fitim, pa asnjë kosto.",
    observacionPerdida: "Me këtë çmim shitni nën kosto: humbni para në çdo shitje.",
  }),
};
