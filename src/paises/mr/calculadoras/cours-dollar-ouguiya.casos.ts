import { definirCasos } from "@/motor/calculo";
import calculadora from "./cours-dollar-ouguiya";

export default definirCasos(calculadora, [
  {
    nombre: "100 USD al curso del BCM del 28/10/2026",
    origen: { tipo: "oficial", url: "https://connect.bcm.mr/api/cours_change_reference?from=2026-10-28&to=2026-10-28&currency=USD", detalle: "Curso de referencia USD del 28/10/2026: 40,41 MRU. 100 x 40,41 = 4.041." },
    fecha: "2026-10-29",
    entrada: { devise: "usd", sens: "vers-mru", montant: 100 },
    esperado: { ouguiyas: 4041, cours: 40.41, date: "2026-10-28", devise: null },
  },
  {
    nombre: "10.000 MRU a euros",
    origen: { tipo: "oficial", url: "https://connect.bcm.mr/api/cours_change_reference?from=2026-10-28&to=2026-10-28&currency=EUR", detalle: "Curso EUR del 28/10/2026: 44,96. 10.000 / 44,96 = 222,42." },
    fecha: "2026-10-29",
    entrada: { devise: "eur", sens: "depuis-mru", montant: 10000 },
    esperado: { devise: 222.42, cours: 44.96, ouguiyas: null },
  },
  {
    nombre: "Fecha anterior toma el punto vigente",
    origen: { tipo: "recalculado", detalle: "El 23/10/2026 rige el punto del 22/10: 40,07. 50 x 40,07 = 2.003,50." },
    fecha: "2026-10-23",
    entrada: { devise: "usd", sens: "vers-mru", montant: 50 },
    esperado: { ouguiyas: 2003.5, date: "2026-10-22" },
  },
  {
    nombre: "Monto cero",
    origen: { tipo: "recalculado", detalle: "Sin monto." },
    fecha: "2026-10-29",
    entrada: { devise: "usd", sens: "vers-mru", montant: 0 },
    esperaError: true,
  },
]);
