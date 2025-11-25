import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, Image as ImageIcon, Upload } from "lucide-react";
import { Badge } from "./ui/badge";
import { AddGalleryDialog } from "./add-gallery-dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface GalleryPageProps {
  isAdmin: boolean;
}

const mockGallery = [
  {
    id: 1,
    title: "Workshop Big Data Analytics",
    date: "2024-10-28",
    category: "Workshop",
    imageCount: 15,
    thumbnail: ""
  },
  {
    id: 2,
    title: "Pelatihan Dasar Kepemimpinan",
    date: "2025-10-19",
    category: "Pelatihan",
    imageCount: 20,
    thumbnail: ""
  },
  {
    id: 3,
    title: "Seminar Sains Data",
    date: "2025-05-01",
    category: "Seminar",
    imageCount: 12,
    thumbnail: ""
  },
];

export function GalleryPage({ isAdmin }: GalleryPageProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [gallery, setGallery] = useState(mockGallery);
  const [filter, setFilter] = useState("all");

  const handleAddGallery = (newGallery: any) => {
    setGallery([...gallery, newGallery]);
  };

  const categories = ["Workshop", "Seminar", "Pelatihan", "Perlombaan", "Lainnya"];
  const filteredGallery = gallery.filter(g => filter === "all" || g.category === filter);

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
            Upload Galeri
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <p className="text-3xl text-slate-900">{gallery.length}</p>
            <p className="text-sm text-slate-600 mt-1">Album Foto</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <p className="text-3xl text-blue-600">
              {gallery.reduce((sum, g) => sum + g.imageCount, 0)}
            </p>
            <p className="text-sm text-slate-600 mt-1">Total Foto</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <p className="text-3xl text-purple-600">{categories.length}</p>
            <p className="text-sm text-slate-600 mt-1">Kategori</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          Semua
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat}
            variant={filter === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item) => (
          <Card key={item.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden group cursor-pointer">
            <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageIcon className="w-16 h-16 text-blue-400" />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="secondary" size="sm">
                  Lihat Album
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="text-slate-900 mb-2">{item.title}</h3>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{item.category}</Badge>
                <span className="text-sm text-slate-600">
                  {item.imageCount} foto
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                {new Date(item.date).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGallery.length === 0 && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <ImageIcon className="w-12 h-12 mx-auto mb-3 text-slate-400" />
            <p className="text-slate-600">Belum ada galeri foto</p>
          </CardContent>
        </Card>
      )}

      <AddGalleryDialog open={dialogOpen} onOpenChange={setDialogOpen} onSuccess={handleAddGallery} />
    </div>
  );
}
