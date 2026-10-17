// Generado por `npx tsx scripts/check_motor.ts --generar-cargadores`. No editar a mano: check_motor
// falla si no coincide con el registro.
export type Cargador = () => Promise<{ default: unknown }>;
export type CargadoresMercado = () => Promise<{ CARGADORES: Readonly<Record<string, Cargador>> }>;
