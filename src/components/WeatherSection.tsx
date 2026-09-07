'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import {
  weatherApiUrl,
  isWeatherPayload,
  weatherCategory,
  windClass,
  uvClass,
  type WeatherPayload,
  type WeatherCategory,
} from '@/lib/weather';
import { weatherAdvice } from '@/lib/weatherAdvice';

function DayLabel({
  locale,
  isoDate,
  index,
}: {
  locale: string;
  isoDate: string;
  index: number;
}) {
  const t = useTranslations('weather');
  if (index === 0) return <>{t('today')}</>;
  if (index === 1) return <>{t('tomorrow')}</>;
  const [y, m, d] = isoDate.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d, 12));
  const label = new Intl.DateTimeFormat(locale === 'zh' ? 'zh-CN' : locale === 'fr' ? 'fr-FR' : 'en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'numeric',
    timeZone: 'UTC',
  }).format(date);
  return <>{label}</>;
}

function WeatherIcon({ category, size = 40 }: { category: WeatherCategory; size?: number }) {
  const stroke = 1.6;
  const attrs = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: stroke,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  switch (category) {
    case 'clear':
      return (
        <svg {...attrs}>
          <circle cx="12" cy="12" r="4.4" />
          <line x1="12" y1="2" x2="12" y2="4.6" />
          <line x1="12" y1="19.4" x2="12" y2="22" />
          <line x1="2" y1="12" x2="4.6" y2="12" />
          <line x1="19.4" y1="12" x2="22" y2="12" />
          <line x1="5" y1="5" x2="6.9" y2="6.9" />
          <line x1="17.1" y1="17.1" x2="19" y2="19" />
          <line x1="19" y1="5" x2="17.1" y2="6.9" />
          <line x1="6.9" y1="17.1" x2="5" y2="19" />
        </svg>
      );
    case 'partly':
      return (
        <svg {...attrs}>
          <circle cx="7" cy="7.5" r="3.4" fill="none" />
          <line x1="7" y1="1.6" x2="7" y2="2.6" />
          <line x1="7" y1="12.4" x2="7" y2="13.4" />
          <line x1="1.6" y1="7.5" x2="2.6" y2="7.5" />
          <line x1="11.4" y1="7.5" x2="12.4" y2="7.5" />
          <path d="M17.5 10.2a4.6 4.6 0 0 1 .3 9.1H8.6a4 4 0 0 1-.5-8c.9-3.1 4.6-4.2 7.1-1.7l1 1.5z" />
        </svg>
      );
    case 'cloudy':
      return (
        <svg {...attrs}>
          <path d="M7.4 18.5a4.2 4.2 0 0 1-.6-8.4 5.8 5.8 0 0 1 11.3.6 3.7 3.7 0 0 1-.2 7.8H7.4z" />
          <path d="M5.5 15.5H3.8a2.6 2.6 0 0 1 .3-5.2 3.8 3.8 0 0 1 1.4.3" />
        </svg>
      );
    case 'fog':
      return (
        <svg {...attrs}>
          <path d="M7.6 12.4h8.8a3 3 0 0 0 .2-6 4.9 4.9 0 0 0-9.3 1 3.4 3.4 0 0 0 .3 5z" />
          <line x1="4.5" y1="16.4" x2="19.5" y2="16.4" />
          <line x1="6" y1="19.4" x2="18" y2="19.4" />
        </svg>
      );
    case 'drizzle':
      return (
        <svg {...attrs}>
          <path d="M7.5 13.4h9a3.2 3.2 0 0 0 .2-6.4 5.2 5.2 0 0 0-9.9 1.1 3.6 3.6 0 0 0 .7 5.3z" />
          <line x1="9.3" y1="16.6" x2="8.6" y2="18.4" />
          <line x1="13" y1="16.6" x2="12.3" y2="18.4" />
          <line x1="16.7" y1="16.6" x2="16" y2="18.4" />
        </svg>
      );
    case 'rain':
      return (
        <svg {...attrs}>
          <path d="M7.5 11.8h9a3.2 3.2 0 0 0 .2-6.4 5.2 5.2 0 0 0-9.9 1.1 3.6 3.6 0 0 0 .7 5.3z" />
          <line x1="8.8" y1="15.4" x2="7.6" y2="18.4" />
          <line x1="12.4" y1="15.4" x2="11.2" y2="18.4" />
          <line x1="16" y1="15.4" x2="14.8" y2="18.4" />
          <line x1="6.6" y1="18" x2="5.6" y2="20.6" />
          <line x1="14.2" y1="18" x2="13.2" y2="20.6" />
        </svg>
      );
    case 'heavy':
      return (
        <svg {...attrs}>
          <path d="M7.5 10.6h9a3.2 3.2 0 0 0 .2-6.4 5.2 5.2 0 0 0-9.9 1.1 3.6 3.6 0 0 0 .7 5.3z" />
          <line x1="8.4" y1="14.6" x2="6.9" y2="18" />
          <line x1="12" y1="14.6" x2="10.5" y2="18" />
          <line x1="15.6" y1="14.6" x2="14.1" y2="18" />
          <line x1="5.4" y1="18.6" x2="4" y2="21.6" />
          <line x1="9" y1="18.6" x2="7.6" y2="21.6" />
          <line x1="12.6" y1="18.6" x2="11.2" y2="21.6" />
        </svg>
      );
    case 'snow':
      return (
        <svg {...attrs}>
          <path d="M7.5 11.4h9a3.2 3.2 0 0 0 .2-6.4 5.2 5.2 0 0 0-9.9 1.1 3.6 3.6 0 0 0 .7 5.3z" />
          <line x1="10" y1="15.8" x2="10" y2="18.2" />
          <line x1="10" y1="19.8" x2="10" y2="21" />
          <line x1="13.5" y1="16.6" x2="13.5" y2="17.4" />
          <circle cx="10" cy="19" r="0.4" fill="currentColor" />
          <circle cx="13.5" cy="17" r="0.4" fill="currentColor" />
        </svg>
      );
    case 'storm':
      return (
        <svg {...attrs}>
          <path d="M7.5 11.2h9a3.2 3.2 0 0 0 .2-6.4 5.2 5.2 0 0 0-9.9 1.1 3.6 3.6 0 0 0 .7 5.3z" />
          <polyline points="11.6 13.6 9.8 17.2 11.6 17.2 10.4 20.6 13.6 15.6 11.8 15.6 13.2 13.6" />
        </svg>
      );
  }
}

function GroupCard({
  icon,
  title,
  keys,
  t,
}: {
  icon: React.ReactNode;
  title: string;
  keys: string[];
  t: (key: string) => string;
}) {
  if (keys.length === 0) return null;
  return (
    <div
      className="rounded-xl p-4 sm:p-5"
      style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <span
          className="flex items-center justify-center w-8 h-8 rounded-full text-sm"
          style={{ background: 'var(--card-bg)', color: 'var(--accent)' }}
        >
          {icon}
        </span>
        <h4 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          {title}
        </h4>
      </div>
      <ul className="space-y-2">
        {keys.map((key) => (
          <li
            key={key}
            className="text-sm leading-relaxed pl-4 relative"
            style={{ color: 'var(--text-secondary)' }}
          >
            <span
              className="absolute left-0 top-[0.55em] w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--accent)' }}
              aria-hidden
            />
            {t(`advice.${key}`)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function WeatherSection() {
  const t = useTranslations('weather');
  const locale = useLocale();
  const [data, setData] = useState<WeatherPayload | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch(weatherApiUrl(), {
          headers: { Accept: 'application/json' },
          cache: 'no-store',
        });
        const payload = res.ok ? await res.json() : null;
        if (alive && isWeatherPayload(payload)) setData(payload);
      } catch {
        // Weather is an enhancement: silently hide when the feed is unreachable.
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (!data) return null;

  const current = data.current;
  const daily = data.daily;
  const todayPop = daily.precipitation_probability_max[0] ?? 0;
  const uvToday = daily.uv_index_max?.[0] ?? 0;
  const windToday = daily.wind_speed_10m_max?.[0] ?? current.wind_speed_10m;
  const category = weatherCategory(current.weather_code);
  const currentTime = (current.time || '').slice(11, 16);

  const advice = weatherAdvice({
    category,
    tempNow: current.temperature_2m,
    tempMax: daily.temperature_2m_max[0] ?? current.temperature_2m,
    tempMin: daily.temperature_2m_min[0] ?? current.temperature_2m,
    pop: todayPop,
    uvMax: uvToday,
    windMax: windToday,
  });

  const metrics = [
    { label: t('feelsLike'), value: `${Math.round(current.apparent_temperature)}°C` },
    { label: t('popLabel'), value: `${Math.round(todayPop)}%` },
    { label: t('wind'), value: t(`windLv.${windClass(current.wind_speed_10m)}`) },
    { label: t('uvLabel'), value: t(`uvLv.${uvClass(uvToday)}`) },
  ];

  const groupTitles = {
    dress: t('advice.dress'),
    plan: t('advice.plan'),
    items: t('advice.items'),
  };

  return (
    <section id="weather" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-4" style={{ background: 'var(--accent)' }} />
        <p className="text-base mb-10" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>

        {/* ── Current conditions ─────────────────────────────────────── */}
        <div
          className="rounded-2xl p-6 sm:p-8 mb-6"
          style={{
            background: 'var(--card-bg)',
            boxShadow: 'var(--card-shadow)',
            border: '1px solid var(--border-color)',
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex items-center gap-4 flex-shrink-0">
              <span style={{ color: 'var(--accent)' }}>
                <WeatherIcon category={category} size={64} />
              </span>
              <div>
                <div
                  className="font-display text-5xl font-semibold leading-none"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {Math.round(current.temperature_2m)}°C
                </div>
                <div className="mt-2 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {t(`conditions.${category}`)}
                </div>
                <div className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                  {t('today')} {Math.round(daily.temperature_2m_max[0] ?? current.temperature_2m)}° /{' '}
                  {Math.round(daily.temperature_2m_min[0] ?? current.temperature_2m)}°
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:ml-auto">
              {metrics.map((m) => (
                <div key={m.label} className="rounded-xl px-4 py-3 text-center" style={{ background: 'var(--bg-tertiary)' }}>
                  <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                    {m.label}
                  </div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Smart advice panel ─────────────────────────────────────── */}
        <div
          className="rounded-2xl p-6 sm:p-8 mb-6"
          style={{
            background: 'var(--card-bg)',
            boxShadow: 'var(--card-shadow)',
            border: '1px solid var(--border-color)',
          }}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-5">
            <h3 className="font-display text-xl sm:text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              {t('advice.panelTitle')}
            </h3>
            {currentTime ? (
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {t('updatedAt')} {currentTime}
              </span>
            ) : null}
          </div>

          {advice.risk.length > 0 ? (
            <div
              className="rounded-xl px-4 py-3.5 mb-5 border"
              style={{
                background: 'var(--risk-bg)',
                borderColor: 'var(--risk-border)',
                color: 'var(--risk-text)',
              }}
            >
              <div className="flex items-center gap-2 text-sm font-semibold mb-1.5">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                {t('advice.riskTitle')}
              </div>
              <ul className="space-y-1">
                {advice.risk.map((key) => (
                  <li key={key} className="text-sm leading-relaxed">
                    · {t(`advice.${key}`)}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div
              className="flex items-center gap-2 rounded-xl px-4 py-2.5 mb-5 text-sm"
              style={{ background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {t('advice.noRisk')}
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <GroupCard icon="👕" title={groupTitles.dress} keys={advice.dress} t={t} />
            <GroupCard icon="🗺️" title={groupTitles.plan} keys={advice.plan} t={t} />
            <GroupCard icon="🎒" title={groupTitles.items} keys={advice.items} t={t} />
          </div>
        </div>

        {/* ── 7-day forecast ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {daily.time.map((day, i) => {
            const cat = weatherCategory(daily.weather_code[i] ?? 0);
            return (
              <div
                key={i}
                className="rounded-xl px-3 py-4 text-center flex flex-col items-center gap-1.5"
                style={{
                  background: 'var(--card-bg)',
                  boxShadow: 'var(--card-shadow)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                  <DayLabel locale={locale} isoDate={day} index={i} />
                </div>
                <span style={{ color: 'var(--accent)' }}>
                  <WeatherIcon category={cat} size={30} />
                </span>
                <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {t(`conditions.${cat}`)}
                </div>
                <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {Math.round(daily.temperature_2m_max[i] ?? 0)}° /{' '}
                  <span className="font-normal" style={{ color: 'var(--text-secondary)' }}>
                    {Math.round(daily.temperature_2m_min[i] ?? 0)}°
                  </span>
                </div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {t('rainChanceShort', { pop: Math.round(daily.precipitation_probability_max[i] ?? 0) })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
