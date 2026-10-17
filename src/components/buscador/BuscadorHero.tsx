"use client";

import { useAtajo } from "./atajo";
import { abrirBuscador, precargarMotor } from "./control";
import { IconoLupa } from "./iconos";

// Parece un campo pero es un botón: el campo de verdad vive en el buscador, que en el celular
// ocupa la pantalla entera y deja el teclado sin tapar los resultados. Si alguien empieza a
// tipear con el foco acá, esa primera letra viaja al buscador.
export function BuscadorHero() {
  const atajo = useAtajo();
  return (
    <button
      type="button"
      onClick={() => abrirBuscador()}
      onKeyDown={(e) => {
        if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey && e.key !== " ") {
          e.preventDefault();
          abrirBuscador({ q: e.key });
        }
      }}
      onPointerEnter={precargarMotor}
      onTouchStart={precargarMotor}
      onFocus={precargarMotor}
      aria-haspopup="dialog"
      aria-keyshortcuts="Control+K Meta+K"
      className="ca-hero-buscar group"
    >
      <span className="ca-hero-buscar-lupa">
        <IconoLupa className="size-5" />
      </span>
      <span className="min-w-0 flex-1 truncate text-left">
        <span className="sr-only">Buscar una calculadora. </span>
        <span className="text-zinc-600">Probá con </span>
        <span className="text-zinc-700">aguinaldo, me echaron o monotributo</span>
      </span>
      <kbd className="ca-tecla hidden sm:inline-flex">{atajo}</kbd>
    </button>
  );
}
