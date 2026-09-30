import type { SVGProps } from "react";

function Base(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  );
}

export function IconoGuardar(p: SVGProps<SVGSVGElement>) {
  return (
    <Base {...p}>
      <path d="M6.5 3.75h11a.75.75 0 0 1 .75.75v15.2a.4.4 0 0 1-.64.32L12 15.9l-5.61 4.12a.4.4 0 0 1-.64-.32V4.5a.75.75 0 0 1 .75-.75Z" />
    </Base>
  );
}

export function IconoCompartir(p: SVGProps<SVGSVGElement>) {
  return (
    <Base {...p}>
      <path d="M10.2 13.8a3.6 3.6 0 0 0 5.1 0l3.2-3.2a3.6 3.6 0 0 0-5.1-5.1l-1 1" />
      <path d="M13.8 10.2a3.6 3.6 0 0 0-5.1 0l-3.2 3.2a3.6 3.6 0 0 0 5.1 5.1l1-1" />
    </Base>
  );
}

export function IconoImprimir(p: SVGProps<SVGSVGElement>) {
  return (
    <Base {...p}>
      <path d="M7 8.25V4.5a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 .75.75v3.75" />
      <path d="M7 16.5H5.25a1.5 1.5 0 0 1-1.5-1.5V9.75a1.5 1.5 0 0 1 1.5-1.5h13.5a1.5 1.5 0 0 1 1.5 1.5V15a1.5 1.5 0 0 1-1.5 1.5H17" />
      <path d="M7.75 13.5h8.5a.75.75 0 0 1 .75.75v5.25a.75.75 0 0 1-.75.75h-8.5a.75.75 0 0 1-.75-.75v-5.25a.75.75 0 0 1 .75-.75Z" />
      <path d="M16.5 11h.01" strokeWidth={2.2} />
    </Base>
  );
}

export function IconoCheck(p: SVGProps<SVGSVGElement>) {
  return (
    <Base {...p}>
      <path d="m5.5 12.5 4.2 4.2 8.8-9.4" />
    </Base>
  );
}

export function IconoCerrar(p: SVGProps<SVGSVGElement>) {
  return (
    <Base {...p}>
      <path d="m7 7 10 10M17 7 7 17" />
    </Base>
  );
}

export function IconoFlecha(p: SVGProps<SVGSVGElement>) {
  return (
    <Base {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Base>
  );
}
