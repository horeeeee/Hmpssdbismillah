import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { uploadAPI, validateFileSize, validateFileType, formatFileSize } from "../utils/api";
import { toast } from "sonner";

interface AddFotoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (foto: any) => void;
}

export function AddFotoDialog({ open, onOpenChange, onSuccess }: AddFotoDialogProps) {
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    kategori: "",
    tanggal: new Date().toISOString().split('T')[0],
    fotografer: "Tim MEDPRO",
    imageUrl: "",
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!validateFileType(file, ['.jpg', '.jpeg', '.png', 'image'])) {
      toast.error("Format gambar tidak didukung. Gunakan JPG atau PNG.");
      return;
    }

    if (!validateFileSize(file, 10)) {
      toast.error("Ukuran gambar maksimal 10MB");
      return;
    }

    setSelectedImage(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    if (!formData.judul) {
      const fileName = file.name.replace(/\.[^/.]+$/, "");
      setFormData({ ...formData, judul: fileName });
    }
  };

  const handleUploadImage = async () => {
    if (!selectedImage) return false;

    setUploadingImage(true);
    try {
      const result = await uploadAPI.photo(selectedImage, formData);
      if (result.success) {
        setFormData({ ...formData, imageUrl: result.url });
        toast.success("Foto berhasil diupload");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Gagal mengupload foto");
      return false;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.judul || !formData.kategori) {
      toast.error("Mohon lengkapi data yang wajib diisi");
      return;
    }

    if (!selectedImage) {
      toast.error("Mohon upload foto");
      return;
    }

    setLoading(true);
    
    try {
      const uploadSuccess = await handleUploadImage();

      if (uploadSuccess) {
        const newFoto = {
          ...formData,
          id: Date.now(),
        };
        
        onSuccess(newFoto);
        toast.success("Foto berhasil ditambahkan ke galeri");
        onOpenChange(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error creating foto:", error);
      toast.error("Gagal menambahkan foto");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      judul: "",
      deskripsi: "",
      kategori: "",
      tanggal: new Date().toISOString().split('T')[0],
      fotografer: "Tim MEDPRO",
      imageUrl: "",
    });
    setSelectedImage(null);
    setPreviewUrl("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Foto</DialogTitle>
          <DialogDescription>
            Tambahkan foto dokumentasi kegiatan HMPS
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Upload Foto (JPG/PNG, maksimal 10MB) *</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                {previewUrl ? (
                  <div className="space-y-3">
                    <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedImage(null);
                        setPreviewUrl("");
                      }}
                    >
                      Ganti Foto
                    </Button>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                    <Input
                      type="file"
                      accept="image/jpeg,image/png,.jpg,.jpeg,.png"
                      onChange={handleImageSelect}
                      disabled={uploadingImage || loading}
                      className="cursor-pointer"
                    />
                  </>
                )}
                {selectedImage && !previewUrl && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-slate-900">{selectedImage.name}</p>
                    <p className="text-xs text-slate-600">{formatFileSize(selectedImage.size)}</p>
                  </div>
                )}
                {uploadingImage && (
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <p className="text-sm text-slate-600">Mengupload foto...</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="judul">Judul Foto *</Label>
              <Input
                id="judul"
                value={formData.judul}
                onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                placeholder="Contoh: Seminar Sains Data 2025"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea
                id="deskripsi"
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                placeholder="Jelaskan konteks foto..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="kategori">Kategori *</Label>
                <Select value={formData.kategori} onValueChange={(value) => setFormData({ ...formData, kategori: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Seminar">Seminar</SelectItem>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                    <SelectItem value="Pelatihan">Pelatihan</SelectItem>
                    <SelectItem value="Kompetisi">Kompetisi</SelectItem>
                    <SelectItem value="Keakraban">Keakraban</SelectItem>
                    <SelectItem value="Rapat">Rapat</SelectItem>
                    <SelectItem value="Lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tanggal">Tanggal</Label>
                <Input
                  id="tanggal"
                  type="date"
                  value={formData.tanggal}
                  onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fotografer">Fotografer</Label>
              <Input
                id="fotografer"
                value={formData.fotografer}
                onChange={(e) => setFormData({ ...formData, fotografer: e.target.value })}
                placeholder="Nama fotografer"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => { onOpenChange(false); resetForm(); }}>
              Batal
            </Button>
            <Button type="submit" disabled={loading || uploadingImage || !selectedImage}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan Foto"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
