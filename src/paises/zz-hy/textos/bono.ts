import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-hy.bono",
  slug: "kisamyakayin-pargev",
  campos: {
    sueldo: { etiqueta: "Ամսական աշխատավարձը՝ մինչև հարկերը" },
    meses: { etiqueta: "Կիսամյակի քանի ամիս եք աշխատել" },
    region: { etiqueta: "Մարզը, որտեղ աշխատում եք" },
    regimen: { etiqueta: "Ձեռնարկության չափը", opciones: { general: "Միջին կամ խոշոր ձեռնարկություն", pequena: "Փոքր ձեռնարկություն" } },
  },
  filas: {
    base: { etiqueta: "Հաշվարկի աշխատավարձը" },
    bono: { etiqueta: "Պարգև" },
    bonificacion: { etiqueta: "Հավելում" },
    total: { etiqueta: "Ստացվող ընդհանուր գումարը" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Ամիսների թիվը պետք է լինի 1 և 6 թվերի միջև։",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Ձեր աշխատավարձը ցածր է Ձեր մարզի նվազագույնից, ուստի պարգևը հաշվարկվում է նվազագույնով։",
  },
});
