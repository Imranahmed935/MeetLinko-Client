import PublicFooter from "@/components/shared/PublicFooter";
import PublicNavbar from "@/components/shared/PublicNavbar";

const CommonLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />
      <main className="flex-1 px-4 py-8">
        {children}
      </main>
      <PublicFooter />
      
    </div>
  );
};

export default CommonLayoutPage;
