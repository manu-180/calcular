"use client";

// Botón "Compartir por WhatsApp": manda el resultado en el TEXTO del mensaje
// (el número viaja en el chat, no depende del preview) + link con UTM para medir.

type Props = {
  /** Texto del mensaje, ya armado, SIN el link (se agrega solo). */
  mensaje: string;
  /** Path canónico de la página, ej: "/aguinaldo". */
  path: string;
  /** Identificador para el UTM campaign, ej: "aguinaldo". */
  campania: string;
};

export function CompartirWhatsApp({ mensaje, path, campania }: Props) {
  const url = `https://calcular.ar${path}?utm_source=whatsapp&utm_medium=share&utm_campaign=${campania}`;
  const texto = encodeURIComponent(`${mensaje}\n${url}`);

  return (
    <a
      href={`https://wa.me/?text=${texto}`}
      target="_blank"
      rel="noopener"
      data-evento="compartir"
      data-canal="whatsapp"
      className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-95"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.83 14.16c-.25.69-1.42 1.32-1.96 1.37-.5.05-1.13.07-1.82-.11-.42-.11-.96-.25-1.65-.47-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.78-.36l.56.01c.18.01.42-.07.66.5.25.6.85 2.07.92 2.22.07.15.12.33.02.52-.09.19-.14.31-.28.48l-.42.49c-.14.14-.29.29-.12.57.17.28.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.42.29.14.45.12.62-.07.17-.19.71-.83.9-1.12.19-.29.38-.24.64-.14.26.09 1.66.78 1.95.93.29.14.48.22.55.34.07.12.07.69-.18 1.37z" />
      </svg>
      Compartir por WhatsApp
    </a>
  );
}
