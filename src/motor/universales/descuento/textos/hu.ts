import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosHu: TextosUi<UiDescuento> = {
  slug: "kedvezmeny-kalkulator",
  ui: () => ({
    precio: "Eredeti ár",
    descuento: "Kedvezmény (%)",
    segundoDescuento: "További kedvezmény (%)",
    segundoDescuentoAyuda: "Ha az akció mellé még egy kedvezmény jár, ide írd be.",
    ahorro: "Ennyit spórolsz",
    final: "Akciós ár",
    descuentoTotal: "Teljes kedvezmény",
    errorMayorA100: "A kedvezmény legfeljebb 100% lehet.",
    observacionDoble: (efectivo) => `Két egymás utáni kedvezmény nem adódik össze. Együtt ennyi a kedvezmény: ${efectivo}%.`,
  }),
};
