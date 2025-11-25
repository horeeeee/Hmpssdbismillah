import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Edit, Mail, Phone, Instagram, Globe, FileText, Trophy, Upload, Save } from "lucide-react";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { AddDokumenDialog } from "./add-dokumen-dialog";
import { AddPencapaianDialog } from "./add-pencapaian-dialog";
import { toast } from "sonner";

interface ProfilHMPSPageProps {
  isAdmin: boolean;
}

export function ProfilHMPSPage({ isAdmin }: ProfilHMPSPageProps) {
  const [editMode, setEditMode] = useState(false);
  const [dokumenDialogOpen, setDokumenDialogOpen] = useState(false);
  const [pencapaianDialogOpen, setPencapaianDialogOpen] = useState(false);
  
  // Data Profil HMPS
  const [profilData, setProfilData] = useState({
    namaOrganisasi: "HMPS Sains Data UIN K.H. Abdurrahman Wahid",
    tahunBerdiri: "2025",
    visi: "Mewujudkan HMPS Sains Data yang solid, komunikatif, dan akademis untuk menjalin keselarasan yang harmonis.",
    misi: [
      "Membentuk Mahasiswa Sains Data yang interaktif.",
      "Mewujudkan nilai demokrasi yang sehat dan aktif di lingkungan mahasiswa sains data.",
      "Mewujudkan peran mahasiswa yang berani menjadi Agen Pembangunan, Agen Perubahan, dan Agen Pengembangan di era modern.",
    ],
    deskripsi: "HMPS Sains Data adalah wadah bagi mahasiswa untuk berkembang secara akademis, berinteraksi secara komunikatif, dan membangun kebersamaan yang solid. Himpunan ini mendorong terciptanya lingkungan demokratis yang sehat serta membentuk mahasiswa yang berani menjadi agen pembangunan, perubahan, dan pengembangan di era modern"
  });

  // Struktur Organisasi
  const strukturOrganisasi = [
    { jabatan: "Ketua HMPS", nama: "Kaifa Robby" },
    { jabatan: "Wakil Ketua", nama: "M. Syahril Ramadhan" },
    { jabatan: "Sekretaris 1", nama: "Yusufi Noviati" },
    { jabatan: "Sekretaris 2", nama: "Devita Rizqi Maulida" },
    { jabatan: "Bendahara 1", nama: "Devi Mustika" },
    { jabatan: "Bendahara 2", nama: "Nabila Juanita Enas" },
    { jabatan: "Ketua PSDI", nama: "Fitri Amelia" },
    { jabatan: "Anggota PSDI", nama: "Mohamad Royan Ramadani" },
    { jabatan: "Anggota PSDI", nama: "Mita Nur Istiyani" },
    { jabatan: "Anggota PSDI", nama: "Ayun Farichah Khoniaro" },
    { jabatan: "Anggota PSDI", nama: "Ika Ismatul Hawa" },
    { jabatan: "Ketua KBA", nama: "Amalia Putri Setya Aryana" },
    { jabatan: "Anggota KBA", nama: "Nirma Ayu Suryaningtyas" },
    { jabatan: "Anggota KBA", nama: "Khopsa Chanda Syaputri" },
    { jabatan: "Anggota KBA", nama: "Lina Khotimah" },
    { jabatan: "Anggota KBA", nama: "Zidan Reffa Pratama" },
    { jabatan: "Ketua Departemen Riset", nama: "Selvalentina Rista Anggita" },
    { jabatan: "Anggota Departemen Riset", nama: "Muhammad Rif'an" },
    { jabatan: "Anggota Departemen Riset", nama: "Azzahra Lailatun Nahdi" },
    { jabatan: "Anggota Departemen Riset", nama: "Rina Tisna Nurasih" },
    { jabatan: "Anggota Departemen Riset", nama: "Diandra Nikenita Azalia Islami" },
    { jabatan: "Ketua Departemen MEDPRO", nama: "Maheswari Pasa Putri Syamsudar" },
    { jabatan: "Anggota Departemen MEDPRO", nama: "Nabil Surya Al Hakim" },
    { jabatan: "Anggota Departemen MEDPRO", nama: "Alfico Agra Rashya Valentino" },
    { jabatan: "Anggota Departemen MEDPRO", nama: "Aninda Rizqi Amelia" },
    { jabatan: "Anggota Departemen MEDPRO", nama: "Sifa Sabrina" },
  ];

  // Dokumen Organisasi
  const [dokumen, setDokumen] = useState([
    { id: 1, nama: "AD/ART HMPS Sains Data 2024", kategori: "AD/ART", tanggalUpload: "2024-01-15", url: "#" },
  ]);

  // Pencapaian HMPS
  const [pencapaian, setPencapaian] = useState([
    { 
      id: 1, 
      judul: "Best Presenter", 
      tahun: "2025", 
      deskripsi: "Tiga anggota HMPS Sains Data berhasil meraih penghargaan Best Presenter dalam kegiatan publikasi Universitas Terbuka. Prestasi ini menjadi bukti nyata bahwa mahasiswa Sains Data tidak hanya unggul dalam kompetensi akademik, tetapi juga mampu menyampaikan gagasan dan hasil penelitian secara komunikatif, sistematis, dan profesional." 
    },
  ]);

  // Kontak Resmi
  const kontakResmi = {
    email: "hmpssainta@gmail.com",
    instagram: "@hmpsssd.uingusdur",
    website: "sainsdata-febi.uingusdur.ac.id/",
    whatsapp: "085866768572"
  };

  const handleSaveProfile = () => {
    toast.success("Profil berhasil disimpan");
    setEditMode(false);
  };

  const handleAddDokumen = (newDokumen: any) => {
    setDokumen([...dokumen, newDokumen]);
    toast.success("Dokumen berhasil ditambahkan");
  };

  const handleAddPencapaian = (newPencapaian: any) => {
    setPencapaian([...pencapaian, newPencapaian]);
    toast.success("Pencapaian berhasil ditambahkan");
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-slate-900">Profil HMPS Sains Data</h1>
          <p className="text-slate-600 mt-1">
            Informasi lengkap organisasi HMPS Sains Data
          </p>
        </div>
        {isAdmin && (
          <div className="flex gap-2">
            {editMode ? (
              <>
                <Button variant="outline" onClick={() => setEditMode(false)}>
                  Batal
                </Button>
                <Button onClick={handleSaveProfile}>
                  <Save className="w-4 h-4 mr-2" />
                  Simpan
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditMode(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profil
              </Button>
            )}
          </div>
        )}
      </div>

      <Tabs defaultValue="profil" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profil">Profil</TabsTrigger>
          <TabsTrigger value="struktur">Struktur Organisasi</TabsTrigger>
          <TabsTrigger value="dokumen">Dokumen</TabsTrigger>
          <TabsTrigger value="pencapaian">Pencapaian</TabsTrigger>
          <TabsTrigger value="kontak">Kontak</TabsTrigger>
        </TabsList>

        {/* TAB: Profil */}
        <TabsContent value="profil" className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Identitas Organisasi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Nama Organisasi</p>
                  {editMode ? (
                    <Input 
                      value={profilData.namaOrganisasi} 
                      onChange={(e) => setProfilData({...profilData, namaOrganisasi: e.target.value})}
                    />
                  ) : (
                    <p className="text-slate-900">{profilData.namaOrganisasi}</p>
                  )}
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Tahun Berdiri</p>
                  {editMode ? (
                    <Input 
                      value={profilData.tahunBerdiri} 
                      onChange={(e) => setProfilData({...profilData, tahunBerdiri: e.target.value})}
                    />
                  ) : (
                    <p className="text-slate-900">{profilData.tahunBerdiri}</p>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm text-slate-600 mb-1">Deskripsi Singkat</p>
                {editMode ? (
                  <Textarea 
                    value={profilData.deskripsi} 
                    onChange={(e) => setProfilData({...profilData, deskripsi: e.target.value})}
                    rows={3}
                  />
                ) : (
                  <p className="text-slate-900">{profilData.deskripsi}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Visi</CardTitle>
            </CardHeader>
            <CardContent>
              {editMode ? (
                <Textarea 
                  value={profilData.visi} 
                  onChange={(e) => setProfilData({...profilData, visi: e.target.value})}
                  rows={3}
                />
              ) : (
                <p className="text-slate-900 leading-relaxed">{profilData.visi}</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Misi</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {profilData.misi.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-blue-600">{index + 1}.</span>
                    <span className="text-slate-900 flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: Struktur Organisasi */}
        <TabsContent value="struktur">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Struktur Organisasi 2024/2025</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {strukturOrganisasi.map((item, index) => (
                  <Card key={index} className="bg-gradient-to-br from-blue-50 to-purple-50">
                    <CardContent className="p-4 text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto mb-3 flex items-center justify-center text-white">
                        <span>{item.nama.split(" ").map(n => n[0]).join("").slice(0, 2)}</span>
                      </div>
                      <h3 className="text-slate-900 mb-1">{item.nama}</h3>
                      <Badge variant="secondary">{item.jabatan}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: Dokumen */}
        <TabsContent value="dokumen" className="space-y-4">
          {isAdmin && (
            <Button onClick={() => setDokumenDialogOpen(true)}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Dokumen
            </Button>
          )}

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Dokumen Organisasi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dokumen.map((doc) => (
                  <div key={doc.id} className="p-4 border rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-slate-900">{doc.nama}</h3>
                        <div className="flex items-center gap-3 text-sm text-slate-600 mt-1">
                          <Badge variant="secondary">{doc.kategori}</Badge>
                          <span>Diupload: {doc.tanggalUpload}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB: Pencapaian */}
        <TabsContent value="pencapaian" className="space-y-4">
          {isAdmin && (
            <Button onClick={() => setPencapaianDialogOpen(true)}>
              <Trophy className="w-4 h-4 mr-2" />
              Tambah Pencapaian
            </Button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pencapaian.map((item) => (
              <Card key={item.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <Trophy className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-slate-900">{item.judul}</h3>
                        <Badge>{item.tahun}</Badge>
                      </div>
                      <p className="text-sm text-slate-600">{item.deskripsi}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* TAB: Kontak */}
        <TabsContent value="kontak">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Kontak Resmi HMPS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-slate-600">Email Resmi</span>
                  </div>
                  <p className="text-slate-900">{kontakResmi.email}</p>
                </div>

                <div className="p-4 bg-pink-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Instagram className="w-5 h-5 text-pink-600" />
                    <span className="text-sm text-slate-600">Instagram</span>
                  </div>
                  <p className="text-slate-900">{kontakResmi.instagram}</p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Phone className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-slate-600">WhatsApp Sekretariat</span>
                  </div>
                  <p className="text-slate-900">{kontakResmi.whatsapp}</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Globe className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-slate-600">Website</span>
                  </div>
                  <p className="text-slate-900">{kontakResmi.website}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <AddDokumenDialog open={dokumenDialogOpen} onOpenChange={setDokumenDialogOpen} onSuccess={handleAddDokumen} />
      <AddPencapaianDialog open={pencapaianDialogOpen} onOpenChange={setPencapaianDialogOpen} onSuccess={handleAddPencapaian} />
    </div>
  );
}
