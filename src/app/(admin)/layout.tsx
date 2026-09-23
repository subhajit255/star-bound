import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { Sidebar } from "@/components/layout/Sidebar"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <main className="flex-1 p-6 sm:p-8">
          {children}
        </main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  )
}
