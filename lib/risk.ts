import type { RiskLevel } from './safety';

export const RISK_ORDER: RiskLevel[] = ['green', 'yellow', 'orange', 'red'];

/** The deterministic guard may only ESCALATE risk, never lower the model's. */
export function escalate(a: RiskLevel, b: RiskLevel): RiskLevel {
  return RISK_ORDER.indexOf(a) >= RISK_ORDER.indexOf(b) ? a : b;
}
