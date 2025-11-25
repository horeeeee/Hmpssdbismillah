import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Users,
  Calendar,
  Video,
  TrendingUp,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useState } from "react";

const stats = [
  {
    title: "Total Anggota",
    value: "24",
    icon: Users,
    color: "bg-blue-100 text-blue-600",
    trend: "+12 bulan ini",
  },
  {
    title: "Kegiatan HMPS",
    value: "29",
    icon: Calendar,
    color: "bg-green-100 text-green-600",
    trend: "Tahun 2024",
  },
  {
    title: "Video Podcast",
    value: "1",
    icon: Video,
    color: "bg-purple-100 text-purple-600",
    trend: "+5 baru",
  },
  {
    title: "Data HMPS",
    value: "2",
    icon: TrendingUp,
    color: "bg-orange-100 text-orange-600",
    trend: "Records",
  },
];

const recentActivities = [
  {
    id: 1,
    title: "Seminar Sains Data",
    date: "1 Mei 2025",
    type: "Seminar",
    participants: 70,
  },
  {
    id: 2,
    title: "Polisinta",
    date: "7 April - 1 Mei 2025",
    type: "Perlombaan",
    participants: 40,
  },
  {
    id: 3,
    title: "Saintavid",
    date: "7 April - 30 April 2025",
    type: "Pelatihan",
    participants: 33,
  },
  {
    id: 4,
    title: "Workshop Skill-UP",
    date: "14 Juni 2025",
    type: "Workshop",
    participants: 50,
  },
  {
    id: 5,
    title: "Workshop Big Data Analytics",
    date: "28 Oktober 2024",
    type: "Workshop",
    participants: 70,
  },
  {
    id: 6,
    title: "Pelatihan Dasar Kepemimpinan",
    date: "18 - 19 Oktober 2025",
    type: "Pelatihan",
    participants: 55,
  },
  {
    id: 7,
    title: "ILMIAHXPERT",
    date: "10 November 2025",
    type: "Pelatihan",
    participants: 50,
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: "Makrab",
    date: "29 November 2025",
    time: "09:00 WIB",
    location: "Rumah Pengurus",
  },
  {
    id: 2,
    title: "Ruang Riset",
    date: "30 November 2025",
    time: "14:00 WIB",
    location: "Online (Zoom)",
  },
  {
    id: 3,
    title: "Sidang Paripurna",
    date: "10 Desember 2025",
    time: "10:00 WIB",
    location: "Auditorium",
  },
];

export function HomePage() {
  const [showAllActivities, setShowAllActivities] = useState(false);
  const displayedActivities = showAllActivities ? recentActivities : recentActivities.slice(0, 4);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-slate-900">Selamat Datang di HMPS Sains Data</h1>
        <p className="text-slate-600">
          Platform manajemen dan statistik untuk Himpunan Mahasiswa Program Studi Sains Data
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-600 text-sm">{stat.title}</p>
                  <p className="text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500">{stat.trend}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activities */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Kegiatan Terbaru</CardTitle>
              {!showAllActivities && recentActivities.length > 4 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowAllActivities(true)}
                >
                  Selengkapnya
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {displayedActivities.map((activity) => (
              <div
                key={activity.id}
                className="p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-slate-900">{activity.title}</h3>
                  <Badge variant="secondary">{activity.type}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <p className="text-slate-600">{activity.date}</p>
                  <p className="text-slate-500">{activity.participants} peserta</p>
                </div>
              </div>
            ))}
            {showAllActivities && (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => setShowAllActivities(false)}
              >
                Tampilkan Lebih Sedikit
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Agenda Mendatang</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="p-4 rounded-lg border-l-4 border-blue-600 bg-blue-50"
              >
                <h3 className="text-slate-900 mb-2">{event.title}</h3>
                <div className="space-y-1 text-sm text-slate-600">
                  <p>📅 {event.date} - {event.time}</p>
                  <p>📍 {event.location}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Welcome Message */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <CardContent className="p-8">
          <h2 className="text-white mb-3">Sambutan Ketua HMPS Sains Data</h2>
          <p className="text-blue-50 leading-relaxed">
            Selamat datang di platform resmi HMPS Sains Data. Website ini dirancang untuk
            memudahkan pengelolaan data, dokumentasi kegiatan, dan informasi terkait
            himpunan mahasiswa. Mari bersama-sama memajukan organisasi dan mengembangkan
            kompetensi di bidang sains data.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <p className="text-white">Kaifa Robby</p>
              <p className="text-sm text-blue-200">Ketua HMPS Sains Data 2024/2025</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
