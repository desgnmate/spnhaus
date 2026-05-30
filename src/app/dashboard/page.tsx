"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const overviewMetrics = [
  { label: "Sessions", value: "124,892", delta: "+8.2%" },
  { label: "Users", value: "86,430", delta: "+5.6%" },
  { label: "Leads", value: "1,248", delta: "+12.1%" },
  { label: "Bounce Rate", value: "41.3%", delta: "-3.4%" },
  { label: "Avg. Session", value: "3m 24s", delta: "+6.9%" },
  { label: "Conversions", value: "2.8%", delta: "+0.4%" },
];

const trafficTrend = [
  { name: "Mon", visits: 14200, leads: 180 },
  { name: "Tue", visits: 15400, leads: 220 },
  { name: "Wed", visits: 16850, leads: 260 },
  { name: "Thu", visits: 16100, leads: 240 },
  { name: "Fri", visits: 17250, leads: 310 },
  { name: "Sat", visits: 14800, leads: 210 },
  { name: "Sun", visits: 13950, leads: 190 },
];

const channelMix = [
  { name: "Organic", value: 46 },
  { name: "Direct", value: 24 },
  { name: "Social", value: 16 },
  { name: "Referral", value: 9 },
  { name: "Email", value: 5 },
];

const deviceMix = [
  { name: "Mobile", value: 62 },
  { name: "Desktop", value: 32 },
  { name: "Tablet", value: 6 },
];

const seoQueries = [
  { query: "event dj collective", clicks: 1640, impressions: 28400, ctr: "5.8%", position: 3.2 },
  { query: "private event djs", clicks: 1220, impressions: 23100, ctr: "5.3%", position: 4.1 },
  { query: "corporate dj services", clicks: 980, impressions: 19850, ctr: "4.9%", position: 5.6 },
  { query: "luxury party djs", clicks: 740, impressions: 16400, ctr: "4.5%", position: 6.2 },
];

const topPages = [
  { page: "/book", clicks: 920, impressions: 14200, ctr: "6.5%", position: 2.8 },
  { page: "/contact", clicks: 680, impressions: 12650, ctr: "5.4%", position: 3.6 },
  { page: "/", clicks: 540, impressions: 11140, ctr: "4.8%", position: 4.2 },
  { page: "/events", clicks: 420, impressions: 9800, ctr: "4.3%", position: 5.0 },
];

const recentLeads = [
  { name: "Kara W.", type: "Wedding", status: "Qualified", source: "Instagram", date: "Today" },
  { name: "James L.", type: "Corporate", status: "Contacted", source: "Organic", date: "Today" },
  { name: "Priya S.", type: "Private Event", status: "New", source: "Direct", date: "Yesterday" },
  { name: "Marcus J.", type: "Brand Launch", status: "Qualified", source: "Referral", date: "Yesterday" },
];

const colors = ["#F2F2F2", "#BFBFBF", "#888888", "#5A5A5A", "#2F2F2F"];
const deviceColors = ["#F4F4F4", "#9E9E9E", "#5E5E5E"];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12 py-12">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] tracking-[0.4em] text-white/50 uppercase">
            Admin Dashboard
          </span>
          <div className="flex items-center justify-between">
            <h1 className="font-druk text-4xl md:text-5xl uppercase tracking-wide">
              SPNHAUS Performance
            </h1>
            <a
              href="/design-board"
              className="flex items-center gap-2 px-4 py-2 bg-[#F4C542] text-black rounded-full hover:bg-[#E0B530] transition-colors font-medium text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Design Board
            </a>
          </div>
          <p className="text-sm md:text-base text-white/70 max-w-2xl">
            Monitor traffic, leads, and SEO visibility in one place. Data below is seeded for layout and can be wired to analytics providers.
          </p>
        </div>

        <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {overviewMetrics.map((metric) => (
            <div
              key={metric.label}
              className="border border-white/10 bg-white/5 rounded-2xl p-5 flex flex-col gap-2"
            >
              <span className="text-[11px] tracking-[0.3em] uppercase text-white/50">
                {metric.label}
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl md:text-3xl font-semibold">{metric.value}</span>
                <span className="text-xs text-white/60">{metric.delta}</span>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 border border-white/10 bg-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm tracking-[0.25em] uppercase text-white/70">
                Traffic Trend
              </h2>
              <span className="text-xs text-white/50">Last 7 days</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trafficTrend}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.4)" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.1)" }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="visits"
                    stroke="#FFFFFF"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="leads"
                    stroke="#6B6B6B"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="border border-white/10 bg-white/5 rounded-2xl p-6">
            <h2 className="text-sm tracking-[0.25em] uppercase text-white/70 mb-4">
              Channel Mix
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channelMix}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.4)" tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.4)" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.1)" }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {channelMix.map((entry, index) => (
                      <Cell key={`cell-${entry.name}`} fill={colors[index % colors.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="border border-white/10 bg-white/5 rounded-2xl p-6">
            <h2 className="text-sm tracking-[0.25em] uppercase text-white/70 mb-4">
              Device Share
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.1)" }}
                    labelStyle={{ color: "#fff" }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Pie dataKey="value" data={deviceMix} innerRadius={60} outerRadius={90} paddingAngle={4}>
                    {deviceMix.map((entry, index) => (
                      <Cell key={`slice-${entry.name}`} fill={deviceColors[index % deviceColors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2 text-sm text-white/70">
              {deviceMix.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <span>{item.name}</span>
                  <span className="text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 border border-white/10 bg-white/5 rounded-2xl p-6">
            <h2 className="text-sm tracking-[0.25em] uppercase text-white/70 mb-4">
              SEO Visibility
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-white/10 rounded-xl p-4">
                <span className="text-[11px] tracking-[0.3em] uppercase text-white/50">
                  Top Queries
                </span>
                <div className="mt-3 space-y-3 text-sm">
                  {seoQueries.map((item) => (
                    <div key={item.query} className="flex items-center justify-between">
                      <span className="text-white/80">{item.query}</span>
                      <span className="text-white">{item.clicks}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border border-white/10 rounded-xl p-4">
                <span className="text-[11px] tracking-[0.3em] uppercase text-white/50">
                  Top Pages
                </span>
                <div className="mt-3 space-y-3 text-sm">
                  {topPages.map((item) => (
                    <div key={item.page} className="flex items-center justify-between">
                      <span className="text-white/80">{item.page}</span>
                      <span className="text-white">{item.ctr}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="border border-white/10 rounded-xl p-4">
                <div className="text-white/50 uppercase text-[11px] tracking-[0.3em]">Index Coverage</div>
                <div className="mt-2 text-2xl font-semibold">98%</div>
                <div className="text-xs text-white/60 mt-1">2 pages excluded</div>
              </div>
              <div className="border border-white/10 rounded-xl p-4">
                <div className="text-white/50 uppercase text-[11px] tracking-[0.3em]">Core Web Vitals</div>
                <div className="mt-2 text-2xl font-semibold">Good</div>
                <div className="text-xs text-white/60 mt-1">LCP 2.1s · CLS 0.06</div>
              </div>
              <div className="border border-white/10 rounded-xl p-4">
                <div className="text-white/50 uppercase text-[11px] tracking-[0.3em]">Backlinks</div>
                <div className="mt-2 text-2xl font-semibold">412</div>
                <div className="text-xs text-white/60 mt-1">+28 this month</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-white/10 bg-white/5 rounded-2xl p-6">
            <h2 className="text-sm tracking-[0.25em] uppercase text-white/70 mb-4">
              Recent Leads
            </h2>
            <div className="space-y-4 text-sm">
              {recentLeads.map((lead) => (
                <div
                  key={`${lead.name}-${lead.date}`}
                  className="flex items-center justify-between border-b border-white/10 pb-3 last:border-b-0 last:pb-0"
                >
                  <div>
                    <div className="text-white">{lead.name}</div>
                    <div className="text-white/50 text-xs">{lead.type} · {lead.source}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/80">{lead.status}</div>
                    <div className="text-white/50 text-xs">{lead.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-white/10 bg-white/5 rounded-2xl p-6">
            <h2 className="text-sm tracking-[0.25em] uppercase text-white/70 mb-4">
              Integrations
            </h2>
            <div className="space-y-3 text-sm">
              {[
                { name: "Google Analytics 4", status: "Connect" },
                { name: "Search Console", status: "Connect" },
                { name: "Meta Pixel", status: "Connect" },
                { name: "CRM Sync", status: "Connect" },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between border border-white/10 rounded-xl px-4 py-3">
                  <span className="text-white/80">{item.name}</span>
                  <button className="text-xs tracking-[0.3em] uppercase border border-white/30 px-3 py-1 rounded-full hover:bg-white hover:text-black transition-colors">
                    {item.status}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
