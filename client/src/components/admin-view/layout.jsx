import { Outlet } from "react-router-dom";
import AdminSidebar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

function AdminLayout(){
    const [openSideBar,SetOpenSideBar]=useState(false);
    return(
        <div className="flex min-h-screen w-full">
            <AdminSidebar open={openSideBar} setOpen={SetOpenSideBar}></AdminSidebar>
            <div className="flex flex-1 flex-col">
                {/* admin */}
                <AdminHeader setOpen={SetOpenSideBar}></AdminHeader>
                <main className="flex-1 bg-muted/40 p-4 md:p-6">
                <Outlet></Outlet>
                </main>
            </div>
        </div>
    )
}
export default AdminLayout;