import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "ve.ingreso-minimo-mayo-2026",
    fecha: "2026-05-04",
    titulo: "El aumento de mayo de 2026 fue por bonos, no por salario",
    texto:
      "El 30 de abril de 2026 el Gobierno anunció un nuevo ingreso mínimo integral pagado con el bono de guerra económica y el cestaticket. El salario mínimo sigue en el monto del decreto de 2022, y es el que se usa para prestaciones, utilidades y vacaciones. A la fecha no encontramos el decreto del aumento en la Gaceta Oficial.",
    vigenteDesde: "2026-05-01",
    calculadoras: ["ve.salario-minimo", "ve.prestaciones-sociales", "ve.liquidacion"],
    fuente: {
      organismo: "Efecto Cocuyo",
      titulo: "Ministro del Trabajo confirma que no hubo aumento del salario mínimo",
      url: "https://efectococuyo.com/politica/ministro-del-trabajo-confirma-que-no-hubo-aumento-del-salario-minimo-el-incremento-fue-200-de-bono-de-guerra-y-40-de-cestatickets/",
      tipo: "secundaria",
      verificadoEl: "2026-10-06",
      nota: "Sin Gaceta: la consulta de gacetaoficial.gob.ve para el 1/05/2026 no devuelve ninguna edición.",
    },
  },
];
