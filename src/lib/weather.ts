import { SITE } from './site';

export type CurrentWeather = {
  time: string;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  precipitation: number;
  weather_code: number;
  wind_speed_10m: number;
};

export type DailyWeather = {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
  /** Peak UV index of each day (Open-Meteo uv_index_max). */
  uv_index_max?: number[];
  /** Daytime maximum wind speed of each day in km/h. */
  wind_speed_10m_max?: number[];
};

export type WeatherPayload = {
  timezone: string;
  utc_offset_seconds: number;
  current: CurrentWeather;
  daily: DailyWeather;
};

const API_BASE = 'https://api.open-meteo.com/v1/forecast';

/** Build the Open-Meteo request URL (shared by the server and client loaders). */
export function weatherApiUrl(): string {
  const params = new URLSearchParams({
    latitude: String(SITE.latitude),
    longitude: String(SITE.longitude),
    current:
      'temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,weather_code,wind_speed_10m',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max,wind_speed_10m_max',
    timezone: 'auto',
    forecast_days: '7',
    wind_speed_unit: 'kmh',
  });
  return `${API_BASE}?${params.toString()}`;
}

/**
 * Server-side loader (cached at most every 30 minutes). The page itself is
 * statically generated; the visible weather block is hydrated by the client
 * loader below, which keeps the SSR output free of build-time network calls.
 */
export async function fetchWeather(): Promise<WeatherPayload | null> {
  try {
    const res = await fetch(weatherApiUrl(), {
      next: { revalidate: 1800 },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const data: WeatherPayload = await res.json();
    if (!data?.current || !Array.isArray(data?.daily?.time)) return null;
    return data;
  } catch {
    return null;
  }
}

/** Validate a raw JSON payload parsed in the browser. */
export function isWeatherPayload(value: unknown): value is WeatherPayload {
  const v = value as WeatherPayload | null;
  return Boolean(
    v &&
      typeof v === 'object' &&
      v.current &&
      typeof v.current === 'object' &&
      Array.isArray(v.daily?.time),
  );
}

export type WeatherCategory =
  | 'clear'
  | 'partly'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'heavy'
  | 'snow'
  | 'storm';

/** Group WMO weather codes into a small set of display categories. */
export function weatherCategory(code: number): WeatherCategory {
  if (code === 0) return 'clear';
  if (code === 1 || code === 2) return 'partly';
  if (code === 3) return 'cloudy';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if (code === 61 || code === 63) return 'rain';
  if (code === 65 || code === 80 || code === 81 || code === 82) return 'heavy';
  if (code === 66 || code === 67 || code === 71 || code === 73 || code === 75 || code === 77 || code === 85 || code === 86) return 'snow';
  if (code >= 95) return 'storm';
  return 'partly';
}

export type WindClass = 'calm' | 'moderate' | 'fresh' | 'strong' | 'gale';

/** Wind speed (km/h) → a small set of classes for display + advice logic. */
export function windClass(speed: number): WindClass {
  if (speed >= 50) return 'gale';
  if (speed >= 39) return 'strong';
  if (speed >= 29) return 'fresh';
  if (speed >= 13) return 'moderate';
  return 'calm';
}

export type UvClass = 'low' | 'moderate' | 'high';

/** Daily UV index → a small set of classes. */
export function uvClass(index: number): UvClass {
  if (index >= 6) return 'high';
  if (index >= 3) return 'moderate';
  return 'low';
}
