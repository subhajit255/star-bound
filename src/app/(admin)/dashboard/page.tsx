"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Telescope, Radar, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar
} from "recharts"

// Mock Data
const userGrowthData = [
  { name: 'May 12', users: 400 },
  { name: 'May 13', users: 300 },
  { name: 'May 14', users: 550 },
  { name: 'May 15', users: 450 },
  { name: 'May 16', users: 700 },
  { name: 'May 17', users: 600 },
  { name: 'May 18', users: 850 },
]

const topCountriesData = [
  { name: 'USA', value: 36, color: '#4F46E5' }, // Primary Indigo
  { name: 'UK', value: 24, color: '#818cf8' },
  { name: 'India', value: 16, color: '#c7d2fe' },
  { name: 'Canada', value: 12, color: '#e0e7ff' },
  { name: 'Others', value: 12, color: '#f1f5f9' },
]

const revenueData = [
  { name: 'May 12', amount: 1200 },
  { name: 'May 13', amount: 900 },
  { name: 'May 14', amount: 1600 },
  { name: 'May 15', amount: 1400 },
  { name: 'May 16', amount: 2100 },
  { name: 'May 17', amount: 1800 },
  { name: 'May 18', amount: 2400 },
]

const recentConstellations = [
  { id: 1, name: 'Aurelia', owner: 'Emma Johnson', date: 'May 18, 2025', status: 'Public' },
  { id: 2, name: 'Velorian', owner: 'Liam Smith', date: 'May 18, 2025', status: 'Public' },
  { id: 3, name: 'Nystral', owner: 'Olivia Brown', date: 'May 17, 2025', status: 'Private' },
  { id: 4, name: 'Lumiera', owner: 'Noah Williams', date: 'May 17, 2025', status: 'Public' },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      
      {/* Top Metrics Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Total Users</p>
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold tracking-tight">12,458</h2>
              <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                12.5%
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Total Constellations</p>
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Telescope className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold tracking-tight">8,742</h2>
              <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                18.2%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Total Scans</p>
              <div className="p-2 bg-primary/10 rounded-full text-primary">
                <Radar className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold tracking-tight">24,103</h2>
              <span className="flex items-center text-xs font-medium text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-full">
                <ArrowDownRight className="mr-1 h-3 w-3" />
                2.4%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Revenue</p>
              <div className="p-2 bg-emerald-100 rounded-full text-emerald-600">
                <DollarSign className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <h2 className="text-3xl font-bold tracking-tight">$28,450</h2>
              <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                <ArrowUpRight className="mr-1 h-3 w-3" />
                8.1%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Row: Charts */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-2 border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-semibold">User Growth</CardTitle>
            <div className="text-xs text-muted-foreground border px-2 py-1 rounded-md">Last 7 Days</div>
          </CardHeader>
          <CardContent>
            <div className="w-full mt-4">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={userGrowthData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="users" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, fill: "var(--primary)", strokeWidth: 0 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Top Countries</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="w-full mt-2">
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={topCountriesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {topCountriesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#0f172a' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full mt-4 space-y-2">
              {topCountriesData.map(country => (
                <div key={country.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: country.color }} />
                    <span className="text-muted-foreground">{country.name}</span>
                  </div>
                  <span className="font-medium">{country.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-2 border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base font-semibold">Recent Constellations</CardTitle>
            <div className="text-xs text-primary font-medium cursor-pointer hover:underline">View All</div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase border-b">
                  <tr>
                    <th className="px-4 py-3 font-medium">Constellation</th>
                    <th className="px-4 py-3 font-medium">Owner</th>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentConstellations.map((item, i) => (
                    <tr key={item.id} className={i !== recentConstellations.length - 1 ? "border-b border-border/50" : ""}>
                      <td className="px-4 py-3 font-medium text-foreground">{item.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                            {item.owner.split(' ').map(n => n[0]).join('')}
                          </div>
                          {item.owner}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{item.date}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === 'Public' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full mt-4">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={revenueData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} tickFormatter={(value) => `$${value/1000}k`} />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [`$${value}`, 'Revenue']}
                  />
                  <Bar dataKey="amount" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
    </div>
  )
}
