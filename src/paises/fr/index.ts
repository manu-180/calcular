import { definirPais } from "@/motor/registro";
import avisos from "./avisos.json";
import salaireBrutNet from "./calculadoras/salaire-brut-net";
import smic from "./calculadoras/smic";
import calculTva from "./calculadoras/calcul-tva";
import impotSurLeRevenu from "./calculadoras/impot-sur-le-revenu";
import prelevementALaSource from "./calculadoras/prelevement-a-la-source";
import heuresSupplementaires from "./calculadoras/heures-supplementaires";
import congesPayes from "./calculadoras/conges-payes";
import indemniteLicenciement from "./calculadoras/indemnite-licenciement";
import ruptureConventionnelle from "./calculadoras/rupture-conventionnelle";
import preavis from "./calculadoras/preavis";
import primeDePrecarite from "./calculadoras/prime-de-precarite";
import chargesMicroEntrepreneur from "./calculadoras/charges-micro-entrepreneur";
import allocationsFamiliales from "./calculadoras/allocations-familiales";
import calculInflation from "./calculadoras/calcul-inflation";
import baremeKilometrique from "./calculadoras/bareme-kilometrique";
import contenidoSalaireBrutNet from "./contenido/salaire-brut-net";
import contenidoSmic from "./contenido/smic";
import contenidoCalculTva from "./contenido/calcul-tva";
import contenidoImpotSurLeRevenu from "./contenido/impot-sur-le-revenu";
import contenidoPrelevementALaSource from "./contenido/prelevement-a-la-source";
import contenidoHeuresSupplementaires from "./contenido/heures-supplementaires";
import contenidoCongesPayes from "./contenido/conges-payes";
import contenidoIndemniteLicenciement from "./contenido/indemnite-licenciement";
import contenidoRuptureConventionnelle from "./contenido/rupture-conventionnelle";
import contenidoPreavis from "./contenido/preavis";
import contenidoPrimeDePrecarite from "./contenido/prime-de-precarite";
import contenidoChargesMicroEntrepreneur from "./contenido/charges-micro-entrepreneur";
import contenidoAllocationsFamiliales from "./contenido/allocations-familiales";
import contenidoCalculInflation from "./contenido/calcul-inflation";
import contenidoBaremeKilometrique from "./contenido/bareme-kilometrique";
import datos from "./datos.json";
import { detectores } from "./fuentes";
import { mercado } from "./mercado";
import { novedades } from "./novedades";
import series from "./series.json";

export default definirPais({
  mercado,
  datos,
  series,
  avisos,
  novedades,
  detectores,
  calculadoras: [
    { definicion: salaireBrutNet, contenido: contenidoSalaireBrutNet, cliente: () => import("./calculadoras/salaire-brut-net.cliente") },
    { definicion: smic, contenido: contenidoSmic, cliente: () => import("./calculadoras/smic.cliente") },
    { definicion: calculTva, contenido: contenidoCalculTva, cliente: () => import("./calculadoras/calcul-tva.cliente") },
    { definicion: impotSurLeRevenu, contenido: contenidoImpotSurLeRevenu, cliente: () => import("./calculadoras/impot-sur-le-revenu.cliente") },
    { definicion: prelevementALaSource, contenido: contenidoPrelevementALaSource, cliente: () => import("./calculadoras/prelevement-a-la-source.cliente") },
    { definicion: heuresSupplementaires, contenido: contenidoHeuresSupplementaires, cliente: () => import("./calculadoras/heures-supplementaires.cliente") },
    { definicion: congesPayes, contenido: contenidoCongesPayes, cliente: () => import("./calculadoras/conges-payes.cliente") },
    { definicion: indemniteLicenciement, contenido: contenidoIndemniteLicenciement, cliente: () => import("./calculadoras/indemnite-licenciement.cliente") },
    { definicion: ruptureConventionnelle, contenido: contenidoRuptureConventionnelle, cliente: () => import("./calculadoras/rupture-conventionnelle.cliente") },
    { definicion: preavis, contenido: contenidoPreavis, cliente: () => import("./calculadoras/preavis.cliente") },
    { definicion: primeDePrecarite, contenido: contenidoPrimeDePrecarite, cliente: () => import("./calculadoras/prime-de-precarite.cliente") },
    { definicion: chargesMicroEntrepreneur, contenido: contenidoChargesMicroEntrepreneur, cliente: () => import("./calculadoras/charges-micro-entrepreneur.cliente") },
    { definicion: allocationsFamiliales, contenido: contenidoAllocationsFamiliales, cliente: () => import("./calculadoras/allocations-familiales.cliente") },
    { definicion: calculInflation, contenido: contenidoCalculInflation, cliente: () => import("./calculadoras/calcul-inflation.cliente") },
    { definicion: baremeKilometrique, contenido: contenidoBaremeKilometrique, cliente: () => import("./calculadoras/bareme-kilometrique.cliente") },
  ],
  universales: "todas",
});
