import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Users, Calendar, Video, Database, Activity } from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const monthlyActivityData = [
  { month: "Jul", kegiatan: 3, peserta: 50 },
  { month: "Agu", kegiatan: 5, peserta: 40 },
  { month: "Sep", kegiatan: 4, peserta: 55 },
  { month: "Okt", kegiatan: 6, peserta: 43 },
  { month: "Nov", kegiatan: 8, peserta: 30 },
];

const memberGrowthData = [
  { month: "Jan", anggota: 24 },
  { month: "Feb", anggota: 24 },
  { month: "Mar", anggota: 24 },
  { month: "Apr", anggota: 24 },
  { month: "Mei", anggota: 24 },
  { month: "Jun", anggota: 24 },
  { month: "Jul", anggota: 24 },
  { month: "Agu", anggota: 24 },
];

const divisionActivity = [
  { divisi: "BPH", kegiatan: 7 },
  { divisi: "PSDI", kegiatan: 8 },
  { divisi: "Riset", kegiatan: 5 },
  { divisi: "KBA", kegiatan: 4 },
  { divisi: "MEDPRO", kegiatan: 5 },
];

export function DashboardPage() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-slate-900">Dashboard Admin</h1>
        <p className="text-slate-600 mt-1">
          Overview dan statistik HMPS Sains Data
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-green-600">+12 bulan ini</span>
            </div>
            <p className="text-sm text-slate-600">Total Anggota</p>
            <p className="text-slate-900">24</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-green-100">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-green-600">+5 bulan ini</span>
            </div>
            <p className="text-sm text-slate-600">Total Kegiatan</p>
            <p className="text-slate-900">29</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-purple-100">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-green-600">+3 baru</span>
            </div>
            <p className="text-sm text-slate-600">Video Podcast</p>
            <p className="text-slate-900">2</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg bg-orange-100">
                <Database className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm text-blue-600">Active</span>
            </div>
            <p className="text-sm text-slate-600">Data HMPS</p>
            <p className="text-slate-900">1.3K</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Aktivitas Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="kegiatan"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="peserta"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Pertumbuhan Anggota</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={memberGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="anggota"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Kegiatan per Divisi</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={divisionActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="divisi" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="kegiatan" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Aktivitas Terkini</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Upload data HMPS", time: "2 menit lalu", type: "data" },
                { action: "Tambah anggota baru", time: "15 menit lalu", type: "member" },
                { action: "Upload foto kegiatan", time: "1 jam lalu", type: "photo" },
                { action: "Buat agenda baru", time: "2 jam lalu", type: "event" },
                { action: "Upload video podcast", time: "3 jam lalu", type: "video" },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-blue-100">
                    <Activity className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-900">{activity.action}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
