import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, Calendar, MapPin, Users, Clock } from "lucide-react";
import { Badge } from "./ui/badge";
import { AddAgendaDialog } from "./add-agenda-dialog";
import { toast } from "sonner";

interface AgendaPageProps {
  isAdmin: boolean;
}

const agendaData = [
  {
    id: 1,
    judul: "Makrab HMPS Sains Data",
    tanggal: "2025-11-29",
    waktu: "09:00 WIB",
    lokasi: "Rumah Pengurus",
    deskripsi: "Malam keakraban untuk mempererat hubungan antar anggota HMPS",
    peserta: 24,
    status: "upcoming"
  },
  {
    id: 2,
    judul: "Ruang Riset",
    tanggal: "2025-11-30",
    waktu: "14:00 WIB",
    lokasi: "Online (Zoom)",
    deskripsi: "Diskusi dan sharing tentang penelitian sains data",
    peserta: 15,
    status: "upcoming"
  },
  {
    id: 3,
    judul: "Sidang Paripurna",
    tanggal: "2025-12-10",
    waktu: "10:00 WIB",
    lokasi: "Auditorium",
    deskripsi: "Rapat koordinasi dan evaluasi kegiatan HMPS",
    peserta: 24,
    status: "upcoming"
  },
  {
    id: 4,
    judul: "Seminar Sains Data",
    tanggal: "2025-05-01",
    waktu: "09:00 WIB",
    lokasi: "Gedung A Lantai 3",
    deskripsi: "Seminar nasional tentang perkembangan sains data",
    peserta: 70,
    status: "completed"
  },
];

export function AgendaPage({ isAdmin }: AgendaPageProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [agenda, setAgenda] = useState(agendaData);
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all");

  const filteredAgenda = agenda.filter(item => {
    if (filter === "all") return true;
    return item.status === filter;
  });

  const upcomingCount = agenda.filter(a => a.status === "upcoming").length;
  const completedCount = agenda.filter(a => a.status === "completed").length;

  const handleAddAgenda = (newAgenda: any) => {
    setAgenda([...agenda, newAgenda]);
    toast.success("Agenda berhasil ditambahkan");
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Agenda HMPS</h1>
          <p className="text-slate-600 mt-1">
            Jadwal kegiatan dan acara HMPS Sains Data
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Agenda
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Agenda</p>
                <p className="text-slate-900">{agenda.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Akan Datang</p>
                <p className="text-slate-900">{upcomingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-100">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Selesai</p>
                <p className="text-slate-900">{completedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              Semua Agenda
            </Button>
            <Button
              variant={filter === "upcoming" ? "default" : "outline"}
              onClick={() => setFilter("upcoming")}
            >
              Akan Datang
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              onClick={() => setFilter("completed")}
            >
              Selesai
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Agenda List */}
      <div className="space-y-4">
        {filteredAgenda.map((item) => (
          <Card key={item.id} className={`border-0 shadow-lg ${item.status === "upcoming" ? "border-l-4 border-blue-600" : ""}`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-slate-900">{item.judul}</h3>
                    <Badge variant={item.status === "upcoming" ? "default" : "secondary"}>
                      {item.status === "upcoming" ? "Akan Datang" : "Selesai"}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">{item.deskripsi}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4" />
                      <span>{item.tanggal}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="w-4 h-4" />
                      <span>{item.waktu}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>{item.lokasi}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">{item.peserta} peserta</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAgenda.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-slate-400" />
            <p className="text-slate-600">Tidak ada agenda yang ditemukan</p>
          </CardContent>
        </Card>
      )}

      <AddAgendaDialog open={dialogOpen} onOpenChange={setDialogOpen} onSuccess={handleAddAgenda} />
    </div>
  );
}
