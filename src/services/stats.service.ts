import { api } from "./http";
import type { AdminStats, LabeledValue } from "@/types";

type Json = Record<string, unknown>;

const LABEL_KEYS = ["module", "code", "error_code", "error", "name", "label", "endpoint", "type", "message"];
const REQUEST_KEYS = ["total_requests", "count", "total", "requests", "value"];
const RATE_KEYS = ["success_rate", "success_rate_percent", "rate", "percentage", "percent", "value"];
const ERROR_KEYS = ["count", "total", "occurrences", "total_errors", "value"];
const SIZE_KEYS = ["average_size_bytes", "avg_size_bytes", "average_size", "avg_size", "average", "value"];
const OVERALL_KEYS = [
  "overall_success_rate",
  "overall",
  "global",
  "total_success_rate",
  "success_rate",
  "success_rate_percent",
  "rate",
  "percentage",
];

const isString = (value: unknown): value is string => typeof value === "string" && value.length > 0;
const isNumber = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value);

function isRecord(value: unknown): value is Json {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function unwrap(body: unknown): unknown {
  return isRecord(body) && "data" in body ? body.data : body;
}

function firstOf<T>(item: Json, keys: string[], guard: (value: unknown) => value is T): T | undefined {
  for (const key of keys) if (guard(item[key])) return item[key] as T;
  return undefined;
}

function findList(payload: Json): unknown[] | null {
  return Object.values(payload).find((value): value is unknown[] => Array.isArray(value)) ?? null;
}

function toEntries(payload: unknown, valueKeys: string[]): LabeledValue[] {
  if (Array.isArray(payload)) {
    return payload.flatMap((item) => {
      if (!isRecord(item)) return [];
      const label = firstOf(item, LABEL_KEYS, isString);
      const value = firstOf(item, valueKeys, isNumber);
      return label !== undefined && value !== undefined ? [{ label, value }] : [];
    });
  }
  if (!isRecord(payload)) return [];
  const list = findList(payload);
  if (list) return toEntries(list, valueKeys);
  const nested = Object.values(payload).find(isRecord);
  if (nested && !Object.values(payload).some(isNumber)) return toEntries(nested, valueKeys);
  return Object.entries(payload).flatMap(([label, value]) => (isNumber(value) ? [{ label, value }] : []));
}

function toPercent(items: LabeledValue[]): LabeledValue[] {
  const isFraction = items.length > 0 && items.every((item) => item.value <= 1);
  return isFraction ? items.map((item) => ({ ...item, value: item.value * 100 })) : items;
}

function toSuccessRate(payload: unknown): AdminStats["successRate"] {
  if (isNumber(payload)) return { overall: payload <= 1 ? payload * 100 : payload, byModule: [] };
  if (!isRecord(payload)) return { overall: null, byModule: toPercent(toEntries(payload, RATE_KEYS)) };
  const overallKey = OVERALL_KEYS.find((key) => isNumber(payload[key]));
  const overall = overallKey ? (payload[overallKey] as number) : null;
  const rest = Object.fromEntries(Object.entries(payload).filter(([key]) => key !== overallKey));
  return {
    overall: overall !== null && overall <= 1 ? overall * 100 : overall,
    byModule: toPercent(toEntries(rest, RATE_KEYS)),
  };
}

async function get(path: string, token: string): Promise<unknown> {
  const { data } = await api.get<unknown>(`/stats/${path}`, { headers: { Authorization: `Bearer ${token}` } });
  return unwrap(data);
}

export async function fetchStats(token: string): Promise<AdminStats> {
  const [requests, success, errors, sizes] = await Promise.all([
    get("requests-by-module", token),
    get("success-rate", token),
    get("common-errors", token),
    get("average-size-by-module", token),
  ]);
  return {
    requestsByModule: toEntries(requests, REQUEST_KEYS),
    successRate: toSuccessRate(success),
    commonErrors: toEntries(errors, ERROR_KEYS),
    averageSizeByModule: toEntries(sizes, SIZE_KEYS),
  };
}
