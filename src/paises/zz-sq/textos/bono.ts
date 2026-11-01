import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-sq.bono",
  slug: "bonus-gjashtemujor",
  campos: {
    sueldo: { etiqueta: "Paga bruto mujore" },
    meses: { etiqueta: "Sa muaj keni punuar në gjashtëmujor" },
    region: { etiqueta: "Rajoni ku punoni" },
    regimen: { etiqueta: "Madhësia e shoqërisë", opciones: { general: "Shoqëri e mesme ose e madhe", pequena: "Shoqëri e vogël" } },
  },
  filas: {
    base: { etiqueta: "Paga për llogaritje" },
    bono: { etiqueta: "Bonusi" },
    bonificacion: { etiqueta: "Shtesa" },
    total: { etiqueta: "Totali për pagesë" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Numri i muajve është nga 1 deri në 6.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Paga juaj është më e ulët se paga minimale e rajonit tuaj, prandaj bonusi llogaritet mbi pagën minimale.",
  },
});
