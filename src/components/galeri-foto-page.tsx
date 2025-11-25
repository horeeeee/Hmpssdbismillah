import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, Image as ImageIcon, Calendar, Tag } from "lucide-react";
import { Badge } from "./ui/badge";
import { AddFotoDialog } from "./add-foto-dialog";
import { toast } from "sonner";

interface GaleriFotoPageProps {
  isAdmin: boolean;
}

const fotoData = [
  {
    id: 1,
    judul: "Seminar Sains Data 2025",
    deskripsi: "Dokumentasi seminar nasional sains data",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    tanggal: "2025-05-01",
    kategori: "Seminar",
    fotografer: "Tim MEDPRO"
  },
];

export function GaleriFotoPage({ isAdmin }: GaleriFotoPageProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fotos, setFotos] = useState(fotoData);
  const [filter, setFilter] = useState("all");

  const categories = ["all", ...new Set(fotos.map(f => f.kategori))];
  
  const filteredFotos = filter === "all" 
    ? fotos 
    : fotos.filter(f => f.kategori === filter);

  const handleAddFoto = (newFoto: any) => {
    setFotos([...fotos, newFoto]);
    toast.success("Foto berhasil ditambahkan");
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Galeri Foto</h1>
          <p className="text-slate-600 mt-1">
            Dokumentasi kegiatan HMPS Sains Data
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Upload Foto
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <ImageIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Foto</p>
                <p className="text-slate-900">{fotos.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-100">
                <Tag className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Kategori</p>
                <p className="text-slate-900">{categories.length - 1}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-green-100">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Terbaru</p>
                <p className="text-slate-900">{fotos[0]?.tanggal || "-"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                onClick={() => setFilter(category)}
              >
                {category === "all" ? "Semua" : category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Photo Grid */}
      {filteredFotos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFotos.map((foto) => (
            <Card key={foto.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
              <div className="relative aspect-[4/3] bg-slate-200 overflow-hidden">
                <img 
                  src={foto.imageUrl} 
                  alt={foto.judul}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="text-sm">{foto.deskripsi}</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-slate-900 mb-2">{foto.judul}</h3>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{foto.kategori}</Badge>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Calendar className="w-3 h-3" />
                    <span>{foto.tanggal}</span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  📷 {foto.fotografer}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <ImageIcon className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <h3 className="text-slate-900 mb-2">Belum Ada Foto</h3>
            <p className="text-slate-600 mb-4">
              Mulai upload dokumentasi kegiatan HMPS
            </p>
            {isAdmin && (
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Upload Foto Pertama
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      <AddFotoDialog open={dialogOpen} onOpenChange={setDialogOpen} onSuccess={handleAddFoto} />
    </div>
  );
}
