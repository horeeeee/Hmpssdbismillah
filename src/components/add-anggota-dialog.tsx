import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AddAnggotaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (anggota: any) => void;
}

export function AddAnggotaDialog({ open, onOpenChange, onSuccess }: AddAnggotaDialogProps) {
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    nama: "",
    nim: "",
    angkatan: "",
    email: "",
    phone: "",
    divisi: "",
    jabatan: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nama || !formData.nim || !formData.angkatan || !formData.email || !formData.divisi) {
      toast.error("Mohon lengkapi data yang wajib diisi");
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newAnggota = {
        ...formData,
        id: Date.now(),
      };
      
      onSuccess(newAnggota);
      toast.success("Anggota berhasil ditambahkan");
      onOpenChange(false);
      resetForm();
    } catch (error) {
      console.error("Error creating anggota:", error);
      toast.error("Gagal menambahkan anggota");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      nim: "",
      angkatan: "",
      email: "",
      phone: "",
      divisi: "",
      jabatan: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tambah Anggota</DialogTitle>
          <DialogDescription>
            Tambahkan data anggota HMPS Sains Data
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nama">Nama Lengkap *</Label>
              <Input
                id="nama"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
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

            <div className="space-y-2">
              <Label htmlFor="angkatan">Angkatan *</Label>
              <Input
                id="angkatan"
                value={formData.angkatan}
                onChange={(e) => setFormData({ ...formData, angkatan: e.target.value })}
                placeholder="2021"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">No. HP</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="08123456789"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="divisi">Divisi *</Label>
              <Select value={formData.divisi} onValueChange={(value) => setFormData({ ...formData, divisi: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih divisi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BPH">Badan Pengurus Harian</SelectItem>
                  <SelectItem value="PSDI">PSDI</SelectItem>
                  <SelectItem value="KBA">KBA</SelectItem>
                  <SelectItem value="Riset">Departemen Riset</SelectItem>
                  <SelectItem value="MEDPRO">Departemen MEDPRO</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="jabatan">Jabatan</Label>
              <Input
                id="jabatan"
                value={formData.jabatan}
                onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                placeholder="Contoh: Ketua Divisi, Anggota"
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
                "Simpan Anggota"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
