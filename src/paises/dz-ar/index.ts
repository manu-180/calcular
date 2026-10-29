import { definirEdicion } from "@/motor/registro";
import dz from "../dz";
import contenidoCalculSalaireNet from "./contenido/calcul-salaire-net";
import { traducciones as grupoA } from "./grupo-a";
import { traducciones as grupoB } from "./grupo-b";
import { traducciones as grupoC } from "./grupo-c";
import { DATOS } from "./lib/datos";
import { mercado } from "./mercado";
import textosCalculSalaireNet from "./textos/calcul-salaire-net";

export default definirEdicion(dz, {
  mercado,
  traducciones: [{ textos: textosCalculSalaireNet, contenido: contenidoCalculSalaireNet }, ...grupoA, ...grupoB, ...grupoC],
  universales: "todas",
  datos: DATOS,
});
