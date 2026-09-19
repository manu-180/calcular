import Link from "next/link";

// La firma de quien responde por los números. Existe por E-E-A-T: en YMYL (plata, impuestos,
// derechos) Google evalúa si se sabe quién está detrás, y hasta el 19/9/2026 el sitio decía
// "un equipo chico", que no es nadie. El nombre va con link a /sobre, donde está el contexto.
export function FirmaAutor({ prefijo = "Verificado por" }: { prefijo?: string }) {
  return (
    <span>
      {prefijo}{" "}
      <Link href="/sobre" className="font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-2 hover:text-emerald-700">
        Manuel Navarro
      </Link>
    </span>
  );
}
