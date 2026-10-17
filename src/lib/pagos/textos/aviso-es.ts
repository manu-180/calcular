import { T, type DiccionarioVenta } from "./tipos";

// Aparte del resto del diccionario porque es lo único que el navegador necesita sin el JSON de
// ofertas: la página de compra arma el aviso solo con el trato (ver AvisoPronto en Oferta.tsx).
export const avisoEs: DiccionarioVenta["aviso"] = {
  pronto: "Pronto a la venta",
  titulo: T("Avísame cuando esté disponible", "Avíseme cuando esté disponible", "Avisame cuando esté disponible"),
  ayuda: T("Te escribimos una sola vez, cuando se pueda comprar.", "Le escribimos una sola vez, cuando se pueda comprar.", "Te escribimos una sola vez, cuando se pueda comprar."),
  boton: "Avisarme",
  listo: T("Listo. Te avisamos a ese correo apenas esté a la venta.", "Listo. Le avisamos a ese correo apenas esté a la venta.", "Listo. Te avisamos a ese correo apenas esté a la venta."),
  error: T(
    "No pudimos guardar el correo. Revisa que esté bien escrito y prueba de nuevo.",
    "No pudimos guardar el correo. Revise que esté bien escrito y pruebe de nuevo.",
    "No pudimos guardar el correo. Revisá que esté bien escrito y probá de nuevo.",
  ),
  correo: T("Tu correo", "Su correo", "Tu correo"),
};
