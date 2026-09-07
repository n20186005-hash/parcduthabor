import type { WeatherCategory } from './weather';
import { windClass } from './weather';

/**
 * Advice groups returned for one day.
 * Every string is a *message key* looked up under `weather.advice.*`
 * in the locale files, so copy can be translated per language.
 */
export type AdviceGroups = {
  /** Severe conditions — rendered as a top red banner. */
  risk: string[];
  /** 出行穿搭 */
  dress: string[];
  /** 游玩安排 */
  plan: string[];
  /** 随身物品 — hidden entirely when empty. */
  items: string[];
};

export type AdviceInput = {
  category: WeatherCategory;
  tempNow: number;
  /** Day maximum temperature (°C). */
  tempMax: number;
  /** Day minimum temperature (°C). */
  tempMin: number;
  /** Day precipitation probability (0–100). */
  pop: number;
  /** Day peak UV index. */
  uvMax: number;
  /** Day maximum wind speed (km/h). */
  windMax: number;
};

function pushUnique(list: string[], keys: string[]) {
  for (const key of keys) {
    if (key && !list.includes(key)) list.push(key);
  }
}

/**
 * Turn raw weather numbers into visitor-facing advice.
 * Rules are independent of locale: each matching rule appends message
 * keys to the relevant group. Only conditions that actually match are
 * emitted, so the UI stays dynamic instead of dumping every scenario.
 */
export function weatherAdvice(input: AdviceInput): AdviceGroups {
  const { category } = input;
  const risk: string[] = [];
  const dress: string[] = [];
  const plan: string[] = [];
  const items: string[] = [];

  const wind = windClass(input.windMax);
  const heat = input.tempMax >= 32 || input.tempNow >= 30;
  const cold = input.tempMax <= 10;
  const swing = input.tempMax - input.tempMin >= 8;
  const popHigh = input.pop >= 60;
  const sunny = category === 'clear' || category === 'partly' || category === 'cloudy';
  const raining = category === 'drizzle' || category === 'rain' || category === 'heavy';

  // ── Risk-level conditions (priority: keep them first) ────────────────
  if (category === 'storm') pushUnique(risk, ['stormRisk']);
  if (category === 'heavy') pushUnique(risk, ['heavyRisk']);
  if (category === 'fog') pushUnique(risk, ['fogRisk']);
  if (wind === 'gale') pushUnique(risk, ['wind7Risk']);
  const hasRisk = risk.length > 0;

  // ── Condition-specific play & packing advice ─────────────────────────
  if (category === 'storm') {
    pushUnique(plan, ['stormPlan']);
  } else if (category === 'heavy') {
    pushUnique(plan, ['heavyPlan']);
    pushUnique(items, ['heavyItems']);
  } else if (category === 'fog') {
    pushUnique(plan, ['fogPlan']);
  } else if (category === 'drizzle') {
    pushUnique(plan, ['drizzlePlan']);
    pushUnique(items, ['drizzleItems']);
  } else if (category === 'rain') {
    pushUnique(plan, ['rainPlan']);
    pushUnique(items, ['rainItems']);
  } else if (category === 'snow') {
    pushUnique(plan, ['snowPlan']);
  }

  // ── Wind ─────────────────────────────────────────────────────────────
  if (wind === 'gale') {
    pushUnique(plan, ['wind7Plan']);
  } else if (wind === 'strong' || wind === 'fresh') {
    pushUnique(plan, ['wind56Plan']);
    pushUnique(items, ['wind56Items']);
  }

  // ── Rain probability without current rain ────────────────────────────
  if (popHigh && !raining && sunny && !hasRisk) {
    pushUnique(plan, ['popHighPlan']);
  }

  // ── Comfort (temperature & UV) ───────────────────────────────────────
  if (heat && !hasRisk) {
    pushUnique(dress, ['heatDress']);
    pushUnique(plan, ['heatPlan']);
    pushUnique(items, ['heatItems']);
  }
  if (cold) {
    pushUnique(dress, ['coldDress']);
    pushUnique(items, ['coldItems']);
  }
  if (swing && !cold && !heat) {
    pushUnique(dress, ['diffDress']);
  }
  if (input.uvMax >= 5 && !raining && !hasRisk) {
    pushUnique(dress, ['uvDress']);
    pushUnique(items, ['uvItems']);
  }

  // ── Pleasant day general plans (when nothing to worry about) ─────────
  if (sunny && !hasRisk && !heat && !popHigh && input.uvMax < 5) {
    if (category === 'clear') pushUnique(plan, ['clearPlan']);
    else if (category === 'cloudy') pushUnique(plan, ['cloudyPlan']);
    else pushUnique(plan, ['partlyPlan']);
  }

  // Fallbacks so a group is never empty.
  if (dress.length === 0) pushUnique(dress, ['defaultDress']);
  if (plan.length === 0) pushUnique(plan, ['defaultPlan']);

  return { risk, dress, plan, items };
}
