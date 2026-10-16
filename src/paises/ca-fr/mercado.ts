import type { MercadoEdicion } from "@/motor/registro";

export const mercado: MercadoEdicion = {
  codigo: "ca-fr",
  pais: "CA",
  nombre: "Canada",
  locale: "fr-CA",
  idioma: "fr",
  trato: "usted",
  estado: "publicado",
  regiones: [
    { id: "ab", nombre: "Alberta" },
    { id: "bc", nombre: "Colombie-Britannique" },
    { id: "mb", nombre: "Manitoba" },
    { id: "nb", nombre: "Nouveau-Brunswick" },
    { id: "nl", nombre: "Terre-Neuve-et-Labrador" },
    { id: "ns", nombre: "Nouvelle-Écosse" },
    { id: "nt", nombre: "Territoires du Nord-Ouest" },
    { id: "nu", nombre: "Nunavut" },
    { id: "on", nombre: "Ontario" },
    { id: "pe", nombre: "Île-du-Prince-Édouard" },
    { id: "qc", nombre: "Québec" },
    { id: "sk", nombre: "Saskatchewan" },
    { id: "yt", nombre: "Yukon" },
  ],
};
