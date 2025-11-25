import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Upload, Loader2, FileText } from "lucide-react";
import { uploadAPI, validateFileSize, validateFileType, formatFileSize } from "../utils/api";
import { toast } from "sonner";

interface AddDokumenDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (dokumen: any) => void;
}

export function AddDokumenDialog({ open, onOpenChange, onSuccess }: AddDokumenDialogProps) {
  const [loading, setLoading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    nama: "",
    kategori: "",
    tanggalUpload: new Date().toISOString().split('T')[0],
    url: "",
  });

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!validateFileType(file, ['.pdf', '.doc', '.docx', 'pdf', 'document'])) {
      toast.error("Format file tidak didukung. Gunakan PDF atau Word.");
      return;
    }

    // Validate file size (max 10MB)
    if (!validateFileSize(file, 10)) {
      toast.error("Ukuran file maksimal 10MB");
      return;
    }

    setSelectedFile(file);
    
    // Auto-fill nama if empty
    if (!formData.nama) {
      const fileName = file.name.replace(/\.[^/.]+$/, "");
      setFormData({ ...formData, nama: fileName });
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Pilih file terlebih dahulu");
      return;
    }

    setUploadingFile(true);
    try {
      const result = await uploadAPI.file(selectedFile);
      if (result.success) {
        setFormData({ ...formData, url: result.url });
        toast.success("File berhasil diupload");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Gagal mengupload file");
      return false;
    } finally {
      setUploadingFile(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nama || !formData.kategori) {
      toast.error("Mohon lengkapi semua data");
      return;
    }

    if (!selectedFile) {
      toast.error("Mohon upload file dokumen");
      return;
    }

    setLoading(true);
    
    try {
      // Upload file first
      const uploadSuccess = await handleUpload();
      
      if (uploadSuccess) {
        const newDokumen = {
          ...formData,
          id: Date.now(),
        };
        
        onSuccess(newDokumen);
        toast.success("Dokumen berhasil ditambahkan");
        onOpenChange(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error creating dokumen:", error);
      toast.error("Gagal menambahkan dokumen");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      kategori: "",
      tanggalUpload: new Date().toISOString().split('T')[0],
      url: "",
    });
    setSelectedFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Upload Dokumen</DialogTitle>
          <DialogDescription>
            Upload dokumen organisasi HMPS (PDF atau Word, maksimal 10MB)
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nama">Nama Dokumen *</Label>
              <Input
                id="nama"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                placeholder="Contoh: AD/ART HMPS Sains Data 2024"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kategori">Kategori *</Label>
              <Select value={formData.kategori} onValueChange={(value) => setFormData({ ...formData, kategori: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AD/ART">AD/ART</SelectItem>
                  <SelectItem value="SOP">SOP</SelectItem>
                  <SelectItem value="Proposal">Proposal</SelectItem>
                  <SelectItem value="LPJ">LPJ</SelectItem>
                  <SelectItem value="Tata Tertib">Tata Tertib</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Upload File (PDF/Word) *</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <FileText className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileSelect}
                  disabled={uploadingFile || loading}
                  className="cursor-pointer"
                />
                {selectedFile && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-slate-900">{selectedFile.name}</p>
                    <p className="text-xs text-slate-600">{formatFileSize(selectedFile.size)}</p>
                  </div>
                )}
                {uploadingFile && (
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <p className="text-sm text-slate-600">Mengupload file...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => { onOpenChange(false); resetForm(); }}>
              Batal
            </Button>
            <Button type="submit" disabled={loading || uploadingFile || !selectedFile}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan Dokumen"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
