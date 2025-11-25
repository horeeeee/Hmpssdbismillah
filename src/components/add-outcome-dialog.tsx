import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AddOutcomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (outcome: any) => void;
}

export function AddOutcomeDialog({ open, onOpenChange, onSuccess }: AddOutcomeDialogProps) {
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nama: "",
    matkul: "",
    mahasiswa: "",
    nim: "",
    status: "belum",
    deadline: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nama || !formData.matkul || !formData.mahasiswa || !formData.nim || !formData.deadline) {
      toast.error("Mohon lengkapi semua data");
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newOutcome = {
        ...formData,
        id: Date.now(),
      };
      
      onSuccess(newOutcome);
      toast.success("Outcome berhasil ditambahkan");
      onOpenChange(false);
      resetForm();
    } catch (error) {
      console.error("Error creating outcome:", error);
      toast.error("Gagal menambahkan outcome");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      matkul: "",
      mahasiswa: "",
      nim: "",
      status: "belum",
      deadline: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tambah Outcome</DialogTitle>
          <DialogDescription>
            Catat tugas dan outcome mahasiswa per mata kuliah
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nama">Nama Outcome/Tugas *</Label>
              <Input
                id="nama"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                placeholder="Contoh: Tugas 1 - Story Telling"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="matkul">Mata Kuliah *</Label>
              <Input
                id="matkul"
                value={formData.matkul}
                onChange={(e) => setFormData({ ...formData, matkul: e.target.value })}
                placeholder="Nama mata kuliah"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mahasiswa">Nama Mahasiswa *</Label>
                <Input
                  id="mahasiswa"
                  value={formData.mahasiswa}
                  onChange={(e) => setFormData({ ...formData, mahasiswa: e.target.value })}
                  placeholder="Nama lengkap"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nim">NIM *</Label>
                <Input
                  id="nim"
                  value={formData.nim}
                  onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
                  placeholder="Nomor Induk Mahasiswa"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline *</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="belum">Belum Selesai</SelectItem>
                    <SelectItem value="revisi">Revisi</SelectItem>
                    <SelectItem value="selesai">Selesai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                "Simpan Outcome"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
