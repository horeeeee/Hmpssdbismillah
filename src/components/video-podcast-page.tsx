import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Plus, Video, Eye, Calendar, User } from "lucide-react";
import { Badge } from "./ui/badge";
import { AddVideoDialog } from "./add-video-dialog";
import { toast } from "sonner";

interface VideoPodcastPageProps {
  isAdmin: boolean;
}

const videoData = [
  {
    id: 1,
    judul: "Introduction to Data Science",
    deskripsi: "Pengenalan dasar tentang sains data untuk mahasiswa baru",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
    videoUrl: "#",
    pembicara: "Dr. Ahmad Hidayat",
    tanggal: "2024-11-15",
    views: 245,
    durasi: "45:30"
  },
];

export function VideoPodcastPage({ isAdmin }: VideoPodcastPageProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [videos, setVideos] = useState(videoData);

  const handleAddVideo = (newVideo: any) => {
    setVideos([...videos, newVideo]);
    toast.success("Video berhasil ditambahkan");
  };

  const totalViews = videos.reduce((sum, v) => sum + v.views, 0);

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Video Podcast</h1>
          <p className="text-slate-600 mt-1">
            Koleksi video pengabdian dan edukasi dari dosen Sains Data
          </p>
        </div>
        {isAdmin && (
          <Button onClick={() => setDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Upload Video
          </Button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-purple-100">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Video</p>
                <p className="text-slate-900">{videos.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Views</p>
                <p className="text-slate-900">{totalViews}</p>
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
                <p className="text-sm text-slate-600">Kontributor</p>
                <p className="text-slate-900">{new Set(videos.map(v => v.pembicara)).size} Dosen</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Video Grid */}
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
              <div className="relative aspect-video bg-slate-200 overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="secondary" size="lg">
                    <Video className="w-5 h-5 mr-2" />
                    Tonton
                  </Button>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {video.durasi}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-slate-900 mb-2 line-clamp-2">{video.judul}</h3>
                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{video.deskripsi}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <User className="w-3 h-3" />
                  <span>{video.pembicara}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    <span>{video.views} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{video.tanggal}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-12 text-center">
            <Video className="w-16 h-16 mx-auto mb-4 text-slate-300" />
            <h3 className="text-slate-900 mb-2">Belum Ada Video Podcast</h3>
            <p className="text-slate-600 mb-4">
              Mulai upload video podcast dari dosen Sains Data
            </p>
            {isAdmin && (
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Upload Video Pertama
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      <AddVideoDialog open={dialogOpen} onOpenChange={setDialogOpen} onSuccess={handleAddVideo} />
    </div>
  );
}
