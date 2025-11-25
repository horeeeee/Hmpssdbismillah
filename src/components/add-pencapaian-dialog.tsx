import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AddPencapaianDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (pencapaian: any) => void;
}

export function AddPencapaianDialog({ open, onOpenChange, onSuccess }: AddPencapaianDialogProps) {
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    judul: "",
    tahun: new Date().getFullYear().toString(),
    deskripsi: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.judul || !formData.tahun || !formData.deskripsi) {
      toast.error("Mohon lengkapi semua data");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newPencapaian = {
        ...formData,
        id: Date.now(),
      };
      
      onSuccess(newPencapaian);
      toast.success("Pencapaian berhasil ditambahkan");
      onOpenChange(false);
      resetForm();
    } catch (error) {
      console.error("Error creating pencapaian:", error);
      toast.error("Gagal menambahkan pencapaian");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      judul: "",
      tahun: new Date().getFullYear().toString(),
      deskripsi: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tambah Pencapaian</DialogTitle>
          <DialogDescription>
            Catat prestasi dan pencapaian HMPS Sains Data
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="judul">Judul Pencapaian *</Label>
              <Input
                id="judul"
                value={formData.judul}
                onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
                placeholder="Contoh: Juara 1 Kompetisi Data Science"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tahun">Tahun *</Label>
              <Input
                id="tahun"
                type="number"
                value={formData.tahun}
                onChange={(e) => setFormData({ ...formData, tahun: e.target.value })}
                placeholder="2024"
                min="2020"
                max="2030"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deskripsi">Deskripsi *</Label>
              <Textarea
                id="deskripsi"
                value={formData.deskripsi}
                onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                placeholder="Jelaskan detail pencapaian, peserta, dan dampaknya..."
                rows={5}
                required
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
                "Simpan Pencapaian"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
