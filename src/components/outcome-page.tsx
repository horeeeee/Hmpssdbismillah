import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, FileText, CheckCircle, Clock, Eye, BookOpen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { AddOutcomeDialog } from "./add-outcome-dialog";
import { toast } from "sonner";

interface OutcomePageProps {
  isAdmin: boolean;
}

const mockMataKuliah = [
  { id: "mk1", nama: "Bahasa Inggris Komunikasi Bisnis", dosen: "M. Alfan, S.Hum., M.Hum.", semester: "Ganjil 2024", totalOutcome: 4, selesai: 1 },
  { id: "mk2", nama: "Moderasi Beragama", dosen: "M. Romli M.S.I", semester: "Ganjil 2024", totalOutcome: 4, selesai: 1 },
  { id: "mk3", nama: "Pengantar Algoritma dan Pemrograman", dosen: "Wilda Yulia Rusyida, M.Sc.", semester: "Ganjil 2024", totalOutcome: 4, selesai: 0 },
  { id: "mk4", nama: "Pancasila dan Kewarganegaraan", dosen: "Hanik Rosyidah, S.SY., M.H", semester: "Ganjil 2024", totalOutcome: 4, selesai: 3 },
  { id: "mk5", nama: "Bahasa Arab untuk Sains", dosen: "Agus Khamid, Lc., M.pd.", semester: "Ganjil 2024", totalOutcome: 4, selesai: 4 },
  { id: "mk6", nama: "Science Entrepreneurship", dosen: "Nalim, M.Sc.", semester: "Ganjil 2024", totalOutcome: 4, selesai: 2 },
  { id: "mk7", nama: "Compendium Al-Quran dan Hadist dalam Sains", dosen: "Syamsul Arifin", semester: "Ganjil 2024", totalOutcome: 4, selesai: 2 },
  { id: "mk8", nama: "Bahasa Indonesia", dosen: "Ulfa Kurniasih, M.Hum.", semester: "Genap 2025", totalOutcome: 4, selesai: 3 },
  { id: "mk9", nama: "Analisis Numerik", dosen: "Nalim, M.Sc.", semester: "Genap 2025", totalOutcome: 4, selesai: 4 },
  { id: "mk10", nama: "Metodologi Studi Islam", dosen: "Syamsul Arifin, M.E", semester: "Genap 2025", totalOutcome: 4, selesai: 2 },
  { id: "mk11", nama: "Academic Writing", dosen: "Umi Mahmudah, M.SC., PH.D", semester: "Genap 2025", totalOutcome: 4, selesai: 1 },
  { id: "mk12", nama: "Harmonisasi Sains dan Agama", dosen: "Dr. Ahmad Hidayat", semester: "Genap 2025", totalOutcome: 4, selesai: 3 },
  { id: "mk13", nama: "Pengenalan Sains Data", dosen: "Zulaikhah Fitri Nur Ngaisah, M.ag.", semester: "Genap 2025", totalOutcome: 4, selesai: 4 },
  { id: "mk14", nama: "Statistika dan Probabilitas", dosen: "Drajat Stiawan, M.Si.", semester: "Genap 2025", totalOutcome: 4, selesai: 2 },
  { id: "mk15", nama: "Algoritma dan Pemrograman", dosen: "Rohmad Abidin, M.kom.", semester: "Genap 2025", totalOutcome: 4, selesai: 0 },
  { id: "mk16", nama: "Data Governance", dosen: "Abdul Majid, M.kom.", semester: "Genap 2025", totalOutcome: 4, selesai: 3 },
];

const mockOutcomes = [
  { id: 1, nama: "Tugas 1 - Story Telling", matkul: "Statistika dan Probabilitas", mahasiswa: "Ahmad Zulfikar", nim: "2021001", status: "selesai", deadline: "2024-11-30" },
  { id: 2, nama: "Tugas 2 - Video Presentasi", matkul: "Pengenalan Sains Data", mahasiswa: "Siti Aisyah", nim: "2021002", status: "revisi", deadline: "2024-12-05" },
  { id: 3, nama: "Project Akhir", matkul: "Algoritma dan Pemrograman", mahasiswa: "Budi Santoso", nim: "2021003", status: "belum", deadline: "2024-12-15" },
];

export function OutcomePage({ isAdmin }: OutcomePageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [outcomes, setOutcomes] = useState(mockOutcomes);
  const [selectedMatkul, setSelectedMatkul] = useState<string | null>(null);

  const totalOutcome = mockMataKuliah.reduce((sum, mk) => sum + mk.totalOutcome, 0);
  const outcomeSelesai = mockMataKuliah.reduce((sum, mk) => sum + mk.selesai, 0);
  const outcomeBelum = totalOutcome - outcomeSelesai;

  const filteredOutcomes = outcomes.filter(o =>
    o.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.mahasiswa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.nim.includes(searchTerm) ||
    o.matkul.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMataKuliah = selectedMatkul
    ? mockMataKuliah.filter(mk => mk.id === selectedMatkul)
    : mockMataKuliah;

  const handleAddOutcome = (newOutcome: any) => {
    setOutcomes([...outcomes, newOutcome]);
    toast.success("Outcome berhasil ditambahkan");
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Outcome Dashboard</h1>
          <p className="text-slate-600 mt-1">
            Kelola outcome dan tugas mahasiswa per mata kuliah
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Outcome
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Mata Kuliah</p>
                <p className="text-slate-900">{mockMataKuliah.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-100">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Outcome</p>
                <p className="text-slate-900">{totalOutcome}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Outcome Selesai</p>
                <p className="text-slate-900">{outcomeSelesai}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-orange-100">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Outcome Belum</p>
                <p className="text-slate-900">{outcomeBelum}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mata Kuliah List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Daftar Mata Kuliah</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMataKuliah.map((mk) => (
              <Card key={mk.id} className="bg-slate-50 hover:bg-slate-100 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-slate-900 mb-1">{mk.nama}</h3>
                      <p className="text-sm text-slate-600">{mk.dosen}</p>
                      <Badge variant="secondary" className="mt-2">{mk.semester}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="text-slate-600">{mk.totalOutcome} outcome</span>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-green-600">{mk.selesai}/{mk.totalOutcome}</span>
                    </div>
                  </div>
                  <div className="bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all" 
                      style={{ width: `${(mk.selesai / mk.totalOutcome) * 100}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabel Outcome Mahasiswa */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Outcome Mahasiswa</CardTitle>
            <Input
              placeholder="Cari mahasiswa atau outcome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>NIM</TableHead>
                  <TableHead>Mata Kuliah</TableHead>
                  <TableHead>Jenis Outcome</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOutcomes.map((outcome) => (
                  <TableRow key={outcome.id}>
                    <TableCell>{outcome.mahasiswa}</TableCell>
                    <TableCell>{outcome.nim}</TableCell>
                    <TableCell>{outcome.matkul}</TableCell>
                    <TableCell>{outcome.nama}</TableCell>
                    <TableCell>{outcome.deadline}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          outcome.status === "selesai"
                            ? "bg-green-100 text-green-700 border-green-300"
                            : outcome.status === "revisi"
                            ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                            : "bg-red-100 text-red-700 border-red-300"
                        }
                      >
                        {outcome.status === "selesai" ? "Selesai" : outcome.status === "revisi" ? "Revisi" : "Belum"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Lihat
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AddOutcomeDialog open={dialogOpen} onOpenChange={setDialogOpen} onSuccess={handleAddOutcome} />
    </div>
  );
}
