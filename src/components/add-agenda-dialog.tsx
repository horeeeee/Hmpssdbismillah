import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AddAgendaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (agenda: any) => void;
}

export function AddAgendaDialog({ open, onOpenChange, onSuccess }: AddAgendaDialogProps) {
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    judul: "",
    tanggal: "",
    waktu: "",
    lokasi: "",
    deskripsi: "",
    peserta: 0,
    status: "upcoming"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.judul || !formData.tanggal || !formData.waktu || !formData.lokasi) {
      toast.error("Mohon lengkapi data yang wajib diisi");
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newAgenda = {
        ...formData,
        id: Date.now(),
      };
      
      onSuccess(newAgenda);
      toast.success("Agenda berhasil ditambahkan");
      onOpenChange(false);
      resetForm();
    } catch (error) {
      console.error("Error creating agenda:", error);
      toast.error("Gagal menambahkan agenda");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      judul: "",
      tanggal: "",
      waktu: "",
      lokasi: "",
      deskripsi: "",
      peserta: 0,
      status: "upcoming"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tambah Agenda</DialogTitle>
          <DialogDescription>
            Buat jadwal kegiatan baru HMPS Sains Data
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="judul">Judul Kegiatan *</Label>
              <Input
                id="judul"
                value={formData.judul}
                onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                placeholder="Contoh: Workshop Machine Learning"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tanggal">Tanggal *</Label>
                <Input
                  id="tanggal"
                  type="date"
                  value={formData.tanggal}
                  onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="waktu">Waktu *</Label>
                <Input
                  id="waktu"
                  value={formData.waktu}
                  onChange={(e) => setFormData({ ...formData, waktu: e.target.value })}
                  placeholder="14:00 WIB"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lokasi">Lokasi *</Label>
              <Input
                id="lokasi"
                value={formData.lokasi}
                onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                placeholder="Contoh: Lab Komputer Gedung A"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea
                id="deskripsi"
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                placeholder="Jelaskan detail kegiatan..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="peserta">Estimasi Peserta</Label>
              <Input
                id="peserta"
                type="number"
                value={formData.peserta || ""}
                onChange={(e) => setFormData({ ...formData, peserta: parseInt(e.target.value) || 0 })}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => { onOpenChange(false); resetForm(); }}>
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan Agenda"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
