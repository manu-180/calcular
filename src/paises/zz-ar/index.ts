import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en árabe: ejercita ar (rtl, plurales, dígitos latinos) sin publicar un país.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "زيتالاند دولة تجريبية. الأرقام هنا لاختبار المحرك وليست حقيقية." },
  },
  datos: {
    "zz.minimo": { nombre: "الحد الأدنى للأجور حسب المنطقة" },
    "zz.bonificacion": { nombre: "المبلغ الإضافي على المكافأة" },
  },
});
