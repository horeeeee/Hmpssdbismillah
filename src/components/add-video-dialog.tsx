import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Upload, Loader2, Video } from "lucide-react";
import { uploadAPI, validateFileSize, validateFileType, formatFileSize } from "../utils/api";
import { toast } from "sonner";

interface AddVideoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (video: any) => void;
}

export function AddVideoDialog({ open, onOpenChange, onSuccess }: AddVideoDialogProps) {
  const [loading, setLoading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    pembicara: "",
    tanggal: new Date().toISOString().split('T')[0],
    durasi: "",
    videoUrl: "",
    thumbnail: "",
    views: 0,
  });

  const handleVideoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateFileType(file, ['.mp4', '.mov', '.avi', 'video'])) {
      toast.error("Format video tidak didukung. Gunakan MP4, MOV, atau AVI.");
      return;
    }

    if (!validateFileSize(file, 100)) {
      toast.error("Ukuran video maksimal 100MB");
      return;
    }

    setSelectedVideo(file);
    if (!formData.judul) {
      const fileName = file.name.replace(/\.[^/.]+$/, "");
      setFormData({ ...formData, judul: fileName });
    }
  };

  const handleThumbnailSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateFileType(file, ['.jpg', '.jpeg', '.png', 'image'])) {
      toast.error("Format gambar tidak didukung. Gunakan JPG atau PNG.");
      return;
    }

    if (!validateFileSize(file, 5)) {
      toast.error("Ukuran gambar maksimal 5MB");
      return;
    }

    setSelectedThumbnail(file);
  };

  const handleUploadVideo = async () => {
    if (!selectedVideo) return false;

    setUploadingVideo(true);
    try {
      const result = await uploadAPI.video(selectedVideo, formData);
      if (result.success) {
        setFormData({ ...formData, videoUrl: result.url });
        toast.success("Video berhasil diupload");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error uploading video:", error);
      toast.error("Gagal mengupload video");
      return false;
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleUploadThumbnail = async () => {
    if (!selectedThumbnail) return false;

    setUploadingThumbnail(true);
    try {
      const result = await uploadAPI.photo(selectedThumbnail, {});
      if (result.success) {
        setFormData({ ...formData, thumbnail: result.url });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
      toast.error("Gagal mengupload thumbnail");
      return false;
    } finally {
      setUploadingThumbnail(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.judul || !formData.pembicara) {
      toast.error("Mohon lengkapi data yang wajib diisi");
      return;
    }

    if (!selectedVideo) {
      toast.error("Mohon upload file video");
      return;
    }

    setLoading(true);
    
    try {
      const videoUploadSuccess = await handleUploadVideo();
      
      if (selectedThumbnail) {
        await handleUploadThumbnail();
      }

      if (videoUploadSuccess) {
        const newVideo = {
          ...formData,
          id: Date.now(),
          thumbnail: formData.thumbnail || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
        };
        
        onSuccess(newVideo);
        toast.success("Video podcast berhasil ditambahkan");
        onOpenChange(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error creating video:", error);
      toast.error("Gagal menambahkan video");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      judul: "",
      deskripsi: "",
      pembicara: "",
      tanggal: new Date().toISOString().split('T')[0],
      durasi: "",
      videoUrl: "",
      thumbnail: "",
      views: 0,
    });
    setSelectedVideo(null);
    setSelectedThumbnail(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Video Podcast</DialogTitle>
          <DialogDescription>
            Upload video pengabdian dan edukasi dari dosen
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="judul">Judul Video *</Label>
              <Input
                id="judul"
                value={formData.judul}
                onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                placeholder="Contoh: Introduction to Machine Learning"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pembicara">Nama Pembicara/Dosen *</Label>
              <Input
                id="pembicara"
                value={formData.pembicara}
                onChange={(e) => setFormData({ ...formData, pembicara: e.target.value })}
                placeholder="Dr. Nama Dosen"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea
                id="deskripsi"
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                placeholder="Jelaskan konten video..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tanggal">Tanggal Upload</Label>
                <Input
                  id="tanggal"
                  type="date"
                  value={formData.tanggal}
                  onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="durasi">Durasi (mm:ss)</Label>
                <Input
                  id="durasi"
                  value={formData.durasi}
                  onChange={(e) => setFormData({ ...formData, durasi: e.target.value })}
                  placeholder="45:30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Upload Video (MP4, maksimal 100MB) *</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Video className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                <Input
                  type="file"
                  accept="video/mp4,video/quicktime,video/x-msvideo,.mp4,.mov,.avi"
                  onChange={handleVideoSelect}
                  disabled={uploadingVideo || loading}
                  className="cursor-pointer"
                />
                {selectedVideo && (
                  <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-slate-900">{selectedVideo.name}</p>
                    <p className="text-xs text-slate-600">{formatFileSize(selectedVideo.size)}</p>
                  </div>
                )}
                {uploadingVideo && (
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <p className="text-sm text-slate-600">Mengupload video...</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Upload Thumbnail (Opsional, JPG/PNG, maksimal 5MB)</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                <Input
                  type="file"
                  accept="image/jpeg,image/png,.jpg,.jpeg,.png"
                  onChange={handleThumbnailSelect}
                  disabled={uploadingThumbnail || loading}
                  className="cursor-pointer"
                />
                {selectedThumbnail && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-slate-900">{selectedThumbnail.name}</p>
                    <p className="text-xs text-slate-600">{formatFileSize(selectedThumbnail.size)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => { onOpenChange(false); resetForm(); }}>
              Batal
            </Button>
            <Button type="submit" disabled={loading || uploadingVideo || uploadingThumbnail || !selectedVideo}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan Video"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
