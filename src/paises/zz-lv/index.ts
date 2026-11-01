import { definirEdicion } from "@/motor/registro";
import zz from "../zz";
import contenidoBono from "./contenido/bono";
import { mercado } from "./mercado";
import textosBono from "./textos/bono";

// Edición de prueba de zz en letón (ADR 0002, D35): ejercita los diacríticos, los plurales one/zero/other
// y los casos del país («Zetalandē», «Zetalandes», «Zetalandei») sin publicar un país.
export default definirEdicion(zz, {
  mercado,
  traducciones: [{ textos: textosBono, contenido: contenidoBono }],
  universales: "todas",
  avisos: {
    "zz.mercado-de-prueba": { texto: "Zetalande ir testa valsts. Vērtības paredzētas kalkulatoru pārbaudei un īstenībā nepastāv." },
  },
  datos: {
    "zz.minimo": { nombre: "Minimālā alga pa reģioniem" },
    "zz.bonificacion": { nombre: "Piemaksa pie prēmijas" },
  },
});
