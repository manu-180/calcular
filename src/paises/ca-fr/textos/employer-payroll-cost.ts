import { definirTextos } from "@/motor/edicion";
import costo from "../../ca/calculadoras/employer-payroll-cost";
import { MENSAJES_COMUNES } from "../lib/comun";

export default definirTextos(costo, {
  calculadora: "ca-fr.employer-payroll-cost",
  slug: "cout-employeur-salarie",
  campos: {
    salario: { etiqueta: "Salaire annuel du salarié" },
    lugar: { etiqueta: "Où travaille le salarié", opciones: { canada: "Hors Québec", qc: "Au Québec" }, porDefecto: "qc" },
  },
  filas: {
    total: { etiqueta: "Coût annuel total de ce salaire" },
    mensual: { etiqueta: "Coût par mois" },
    cargas: { etiqueta: "Cotisations de l'employeur" },
    pension: { etiqueta: "Cotisations de l'employeur au RRQ ou au RPC" },
    seguro: { etiqueta: "Cotisations de l'employeur à l'assurance-emploi" },
    qpip: { etiqueta: "Cotisations de l'employeur au RQAP" },
    porcentajeCargas: { etiqueta: "Cotisations en pourcentage du salaire" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "Provincial employer health taxes, workers' compensation premiums and benefits plans are not included.":
      "Les cotisations provinciales de l'employeur pour la santé, les primes d'indemnisation des accidents du travail et les avantages sociaux ne sont pas inclus.",
  },
});
