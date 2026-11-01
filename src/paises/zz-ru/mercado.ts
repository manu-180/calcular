import type { MercadoEdicion } from "@/motor/registro";

export const mercado: MercadoEdicion = {
  codigo: "zz-ru",
  pais: "ZZ",
  nombre: "Зеталенд",
  locale: "ru-001",
  idioma: "ru",
  trato: "usted",
  estado: "interno",
  regiones: [
    { id: "norte", nombre: "Северный регион" },
    { id: "sur", nombre: "Южный регион" },
  ],
};
