import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosSq: TextosUi<UiAhorroRetiro> = {
  slug: "kalkulator-kursimi-pension",
  ui: () => ({
    edadActual: "Mosha aktuale",
    edadRetiro: "Mosha në të cilën dëshironi të dilni në pension",
    actual: "Kursimet që keni tashmë",
    aporte: "Kontributi mujor",
    rendimiento: "Kthimi real vjetor (%)",
    rendimientoAyuda: "Sa fiton investimi mbi inflacionin. Në afat të gjatë, një vlerë midis 2% dhe 5% është një përllogaritje e kujdesshme.",
    aniosRenta: "Vite pensioni për t'u mbuluar",
    aniosRentaAyuda: "Sa vjet dëshironi të jetoni nga këto kursime.",
    capital: "Kursimet në daljen në pension",
    renta: "Të ardhura mujore nga kursimet",
    aportado: "Totali i kontribuar",
    intereses: "Fitimi total nga kthimi",
    tabla: "Ecuria sipas moshës",
    colEdad: "Mosha",
    colAportado: "Kontribuar deri atëherë",
    colSaldo: "Kursimet",
    errorEdades: "Mosha e daljes në pension duhet të jetë më e madhe se mosha aktuale.",
    errorSinAhorro: "Vendosni kursimet aktuale ose një kontribut mujor.",
    observacionDineroDeHoy: "Shumat janë në paratë e sotme, sepse kthimi real e ka zbritur tashmë inflacionin.",
    observacionPublica: "Këto janë vetëm kursimet tuaja. Nuk përfshihet pensioni shtetëror që mund të merrni.",
  }),
};
