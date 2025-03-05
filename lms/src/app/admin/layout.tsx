"use client";
import Dashboard from "@/components/dashboard/Dashboard";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect } from "next/navigation";

function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // NOTE: server side ma token chai ye ko xa bane getServerSession use garne and in client side ma chaiye ko xa bane useSession() use gare ne
  const { data: session, status } = useSession(); // useSession() returns an object containing two values: data and status:
  useEffect(() => {
    console.log("Status :", status);
    // console.log("data: ", session);
    
    if (status === "loading") return; // return ma <p>please login</p> garda ni bayo
    // @ts-ignore    // NOTE: @ts-ignore is a TypeScript compiler directive used to ignore TypeScript errors on the next line. It tells TypeScript not to check for type errors on that specific line.
    if (!session || session.user.role != "admin") {
      redirect("/"); // in react js ma useNavigate same as in nextjs ma redirect kunai page na pathau xa here home page ma patahu xa FOR MORE DETAIL ==> useNavigate() is a React Router hook used for programmatic navigation within a React application. It allows you to change the current URL dynamically without reloading the page.
    }
  }, [session, status]);

  if (status === "loading" || status === "unauthenticated")
    return <p>Loading...</p>;

  return <Dashboard>{children}</Dashboard>;
}

export default AdminLayout;
