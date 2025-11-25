import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, Search, Mail, Phone, User } from "lucide-react";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { AddAnggotaDialog } from "./add-anggota-dialog";

interface AnggotaPageProps {
  isAdmin: boolean;
}

const anggotaData = [
  { id: 1, nama: "Kaifa Robby", nim: "2021001", angkatan: "2024", email: "kaifa@example.com", phone: "08123456789", divisi: "BPH", jabatan: "Ketua HMPS" },
  { id: 2, nama: "M. Syahril Ramadhan", nim: "2021002", angkatan: "2024", email: "syahril@example.com", phone: "08123456790", divisi: "BPH", jabatan: "Wakil Ketua" },
  { id: 3, nama: "Yusufi Noviati", nim: "2021003", angkatan: "202", email: "yusufi@example.com", phone: "08123456791", divisi: "BPH", jabatan: "Sekretaris 1" },
  { id: 4, nama: "Devita Rizqi Maulida", nim: "2021004", angkatan: "2024", email: "devita@example.com", phone: "08123456792", divisi: "BPH", jabatan: "Sekretaris 2" },
  { id: 5, nama: "Devi Mustika", nim: "2021005", angkatan: "2021", email: "devi@example.com", phone: "08123456793", divisi: "BPH", jabatan: "Bendahara 1" },
  { id: 6, nama: "Nabila Juanita Enas", nim: "2021006", angkatan: "2024", email: "nabila@example.com", phone: "08123456794", divisi: "BPH", jabatan: "Bendahara 2" },
  { id: 7, nama: "Fitri Amelia", nim: "2021007", angkatan: "2024", email: "fitri@example.com", phone: "08123456795", divisi: "PSDI", jabatan: "Ketua PSDI" },
  { id: 8, nama: "Amalia Putri Setya Aryana", nim: "2021008", angkatan: "2024", email: "amalia@example.com", phone: "08123456796", divisi: "KBA", jabatan: "Ketua KBA" },
];

export function AnggotaPage({ isAdmin }: AnggotaPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDivisi, setFilterDivisi] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [anggota, setAnggota] = useState(anggotaData);

  const filteredAnggota = anggota.filter(item => {
    const matchesSearch = item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.nim.includes(searchTerm);
    const matchesDivisi = filterDivisi === "all" || item.divisi === filterDivisi;
    return matchesSearch && matchesDivisi;
  });

  const handleAddAnggota = (newAnggota: any) => {
    setAnggota([...anggota, newAnggota]);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Anggota HMPS</h1>
          <p className="text-slate-600 mt-1">
            Daftar lengkap anggota HMPS Sains Data
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah Anggota
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Anggota</p>
                <p className="text-slate-900">{anggota.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100">
                <User className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">BPH</p>
                <p className="text-slate-900">{anggota.filter(a => a.divisi === "BPH").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-100">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">PSDI</p>
                <p className="text-slate-900">{anggota.filter(a => a.divisi === "PSDI").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-orange-100">
                <User className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Lainnya</p>
                <p className="text-slate-900">{anggota.filter(a => !["BPH", "PSDI"].includes(a.divisi)).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Cari nama atau NIM..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterDivisi === "all" ? "default" : "outline"}
                onClick={() => setFilterDivisi("all")}
              >
                Semua
              </Button>
              <Button
                variant={filterDivisi === "BPH" ? "default" : "outline"}
                onClick={() => setFilterDivisi("BPH")}
              >
                BPH
              </Button>
              <Button
                variant={filterDivisi === "PSDI" ? "default" : "outline"}
                onClick={() => setFilterDivisi("PSDI")}
              >
                PSDI
              </Button>
              <Button
                variant={filterDivisi === "KBA" ? "default" : "outline"}
                onClick={() => setFilterDivisi("KBA")}
              >
                KBA
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Anggota Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnggota.map((item) => (
          <Card key={item.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                  <span>{item.nama.split(" ").map(n => n[0]).join("").slice(0, 2)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-slate-900 mb-1 truncate">{item.nama}</h3>
                  <p className="text-sm text-slate-600 mb-2">{item.nim} • Angkatan {item.angkatan}</p>
                  <div className="flex gap-2 mb-3">
                    <Badge variant="secondary">{item.divisi}</Badge>
                    <Badge variant="outline">{item.jabatan}</Badge>
                  </div>
                  <div className="space-y-1 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3" />
                      <span className="truncate">{item.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      <span>{item.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAnggota.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <User className="w-12 h-12 mx-auto mb-3 text-slate-400" />
            <p className="text-slate-600">Tidak ada anggota yang ditemukan</p>
          </CardContent>
        </Card>
      )}

      <AddAnggotaDialog open={dialogOpen} onOpenChange={setDialogOpen} onSuccess={handleAddAnggota} />
    </div>
  );
}
