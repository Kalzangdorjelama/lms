import Dashboard from "@/components/dashboard/Dashboard";
import Admin from "./page";

function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>){
    return(
        <Dashboard>
            {children}
        </Dashboard>
    )
}

export default AdminLayout