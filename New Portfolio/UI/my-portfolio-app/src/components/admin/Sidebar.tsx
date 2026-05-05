import { Button } from "@/components/ui/button";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const tabs = ["Profile", "About", "Skills", "Experience", "Achievements", "Contact"];
  
  return (
    <aside className="w-64 border-r bg-card min-h-[calc(100vh-64px)] hidden md:block p-4">
      <nav className="space-y-2">
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "ghost"}
            className="w-full justify-start font-medium"
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </nav>
    </aside>
  );
}
