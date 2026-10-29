import type { Detector } from "@/motor/tipos";

// Sem detetores por agora: o Banco de Cabo Verde e o Boletim Oficial não têm API de dados que se possa
// ler com o cliente do cron, e o site do banco não abriu na verificação. Ver INFORME.md.
export const detectores: readonly Detector[] = [];
