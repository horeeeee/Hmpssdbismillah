import { useState } from "react";
import { Home, BarChart3, Users, Calendar, Video, Image, FileText, BookOpen, Menu, X } from "lucide-react";
import { HomePage } from "./components/home-page";
import { DashboardPage } from "./components/dashboard-page";
import { ProfilHMPSPage } from "./components/profil-hmps-page";
import { AnggotaPage } from "./components/anggota-page";
import { AgendaPage } from "./components/agenda-page";
import { VideoPodcastPage } from "./components/video-podcast-page";
import { GaleriFotoPage } from "./components/galeri-foto-page";
import { OutcomePage } from "./components/outcome-page";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";

type Page = "home" | "dashboard" | "profil" | "anggota" | "agenda" | "video" | "galeri" | "outcome";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isAdmin, setIsAdmin] = useState(true); // Set to true for admin mode
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: "home" as Page, label: "Beranda", icon: Home },
    { id: "dashboard" as Page, label: "Dashboard Admin", icon: BarChart3 },
    { id: "profil" as Page, label: "Profil HMPS", icon: FileText },
    { id: "anggota" as Page, label: "Anggota HMPS", icon: Users },
    { id: "agenda" as Page, label: "Agenda HMPS", icon: Calendar },
    { id: "video" as Page, label: "Video Podcast", icon: Video },
    { id: "galeri" as Page, label: "Galeri Foto", icon: Image },
    { id: "outcome" as Page, label: "Outcome Mahasiswa", icon: BookOpen },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />;
      case "dashboard":
        return <DashboardPage />;
      case "profil":
        return <ProfilHMPSPage isAdmin={isAdmin} />;
      case "anggota":
        return <AnggotaPage isAdmin={isAdmin} />;
      case "agenda":
        return <AgendaPage isAdmin={isAdmin} />;
      case "video":
        return <VideoPodcastPage isAdmin={isAdmin} />;
      case "galeri":
        return <GaleriFotoPage isAdmin={isAdmin} />;
      case "outcome":
        return <OutcomePage isAdmin={isAdmin} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-0"
        } bg-gradient-to-b from-blue-700 to-blue-900 text-white transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="p-6 border-b border-blue-600">
          <h1 className="text-white text-xl mb-1">HMPS Sains Data</h1>
          <p className="text-blue-200 text-sm">Sistem Manajemen & Statistik</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? "bg-white text-blue-900"
                    : "text-white hover:bg-blue-600"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-blue-600">
          <div className="flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-white text-blue-900 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-white">Admin Mode</p>
              <p className="text-xs text-blue-200">Full Access</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <div className="flex-1">
            <h2 className="text-slate-900">
              {menuItems.find((item) => item.id === currentPage)?.label}
            </h2>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          {renderPage()}
        </main>
      </div>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
