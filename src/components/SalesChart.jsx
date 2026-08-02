import { useMemo, useRef, useState, useEffect } from 'react';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const PERIODS = [
  { key: '7d', label: '7 jours', days: 7, bucket: 'day' },
  { key: '30d', label: '30 jours', days: 30, bucket: 'week' },
  { key: '90d', label: '3 mois', days: 90, bucket: 'week' },
  { key: 'year', label: 'Année', days: 365, bucket: 'month' },
];

const MONTHS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];

function parseDate(d) {
  const date = new Date(d);
  return isNaN(date.getTime()) ? null : date;
}

function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function startOfWeek(d) {
  const day = (d.getDay() + 6) % 7;
  const copy = new Date(d);
  copy.setDate(copy.getDate() - day);
  return startOfDay(copy);
}

function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addDays(d, n) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}

function addMonths(d, n) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function bucketStart(date, bucket) {
  if (bucket === 'day') return startOfDay(date);
  if (bucket === 'week') return startOfWeek(date);
  return startOfMonth(date);
}

function bucketKey(date) {
  return date.toISOString().split('T')[0];
}

function bucketLabel(date, bucket) {
  if (bucket === 'day') {
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  }
  if (bucket === 'week') {
    return `Sem. du ${date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}`;
  }
  return `${MONTHS[date.getMonth()]} ${String(date.getFullYear()).slice(2)}`;
}

function generateBuckets(start, end, bucket) {
  const out = [];
  let cursor;
  if (bucket === 'day') {
    cursor = startOfDay(start);
    while (cursor <= end) {
      out.push(cursor);
      cursor = addDays(cursor, 1);
    }
  } else if (bucket === 'week') {
    cursor = startOfWeek(start);
    while (cursor <= end) {
      out.push(cursor);
      cursor = addDays(cursor, 7);
    }
  } else {
    cursor = startOfMonth(start);
    while (cursor <= end) {
      out.push(cursor);
      cursor = addMonths(cursor, 1);
    }
  }
  return out;
}

function trendLine(points) {
  const n = points.length;
  if (n < 2) return points;
  const sumX = (n - 1) * n / 2;
  const sumY = points.reduce((a, p) => a + p.ventes, 0);
  const sumXY = points.reduce((a, p, i) => a + i * p.ventes, 0);
  const sumXX = points.reduce((a, _, i) => a + i * i, 0);
  const denom = n * sumXX - sumX * sumX;
  const slope = denom === 0 ? 0 : (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;
  return points.map((p, i) => ({ ...p, tendance: Math.max(0, intercept + slope * i) }));
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;
  const ventes = payload.find(p => p.dataKey === 'ventes')?.value ?? 0;
  return (
    <div className="rounded-xl border border-white/10 bg-carbon px-3.5 py-2.5 shadow-xl text-sm">
      <p className="font-semibold text-white mb-1">{label}</p>
      <p className="text-white/60">
        {ventes} réservation{ventes > 1 ? 's' : ''}
      </p>
    </div>
  );
}

export default function SalesChart({ reservations, cars }) {
  const [period, setPeriod] = useState('30d');
  const chartRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = chartRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      });
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const { data, total, variation } = useMemo(() => {
    const saleDates = [];
    (cars || []).forEach(c => {
      if (c.status === 'vendue' && c.soldDate) saleDates.push(parseDate(c.soldDate));
    });
    (reservations || []).forEach(r => {
      const d = parseDate(r.date);
      if (d) saleDates.push(d);
    });

    const dated = saleDates.filter(d => d);

    const cfg = PERIODS.find(p => p.key === period);
    const end = new Date();
    const start = new Date(end.getTime() - cfg.days * 86400000);

    const buckets = generateBuckets(start, end, cfg.bucket);
    const counts = new Map(buckets.map(b => [bucketKey(b), 0]));

    dated.forEach(d => {
      const b = bucketStart(d, cfg.bucket);
      const key = bucketKey(b);
      if (counts.has(key)) counts.set(key, counts.get(key) + 1);
    });

    const series = buckets.map(b => ({ name: bucketLabel(b, cfg.bucket), ventes: counts.get(bucketKey(b)) }));

    let totalSales = 0;
    let prevTotal = 0;
    dated.forEach(d => {
      if (d >= start && d <= end) totalSales++;
    });

    const prevStart = new Date(start.getTime() - cfg.days * 86400000);
    dated.forEach(d => {
      if (d >= prevStart && d < start) prevTotal++;
    });

    let variation = null;
    if (prevTotal > 0 && dated.length > 0) {
      variation = Math.round(((totalSales - prevTotal) / prevTotal) * 100);
    }

    return { data: trendLine(series), total: totalSales, variation };
  }, [reservations, cars, period]);

  const hasData = useMemo(() => {
    if ((reservations || []).some(r => parseDate(r.date))) return true;
    return (cars || []).some(c => c.status === 'vendue' && parseDate(c.soldDate));
  }, [reservations, cars]);

  if (!hasData) {
    return (
      <div className="flex items-center justify-center h-56 sm:h-64 text-sm text-gray-500 text-center px-4">
        Pas encore assez de données pour un graphique.
      </div>
    );
  }

  const cfg = PERIODS.find(p => p.key === period);
  const angle = data.length > 10 ? -35 : 0;
  const tickInterval = Math.ceil(data.length / 8);

  return (
    <div ref={chartRef}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div>
          <p className="text-2xl font-extrabold text-white">
            {total} réservation{total > 1 ? 's' : ''}
            {variation !== null && variation !== 0 && (
              <span className={`ml-2 text-sm font-bold ${variation > 0 ? 'text-success' : 'text-red-400'}`}>
                {variation > 0 ? '+' : ''}{variation}%
              </span>
            )}
          </p>
          <p className="text-xs text-white/50">
            {variation !== null
              ? 'vs période précédente'
              : `sur ${cfg.label.toLowerCase()} (pas de période précédente comparable)`}
          </p>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap bg-white/[0.02] rounded-xl border border-white/10 p-1 overflow-x-auto">
          {PERIODS.map(p => (
            <button
              key={p.key}
              type="button"
              onClick={() => setPeriod(p.key)}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                period === p.key
                  ? 'bg-accent text-black shadow-[0_0_12px_rgba(225,29,46,0.4)]'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full h-56 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: angle === -35 ? 28 : 0 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e11d2e" />
                <stop offset="100%" stopColor="#c4182b" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: '#9ca3af', fontSize: 10, angle, textAnchor: angle === -35 ? 'end' : 'middle' }}
              axisLine={{ stroke: '#2a2a2a' }}
              tickLine={false}
              interval={data.length > 8 ? tickInterval : 0}
              height={angle === -35 ? 42 : 30}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: '#9ca3af', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 'auto']}
            />
            <Tooltip cursor={{ fill: 'rgba(225, 29, 46, 0.1)' }} content={<CustomTooltip />} />
            <Bar
              dataKey="ventes"
              fill="url(#salesGradient)"
              radius={[6, 6, 0, 0]}
              maxBarSize={40}
              isAnimationActive={inView}
              animationDuration={700}
              animationEasing="ease-out"
            />
            <Line
              dataKey="tendance"
              type="monotone"
              stroke="#fff3b0"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              activeDot={false}
              isAnimationActive={inView}
              animationDuration={900}
              animationEasing="ease-out"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
