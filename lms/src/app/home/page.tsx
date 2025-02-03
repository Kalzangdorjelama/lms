"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
function home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Image
          src={session.user?.image || "myphoto.png"}
          alt="user Image"
          width={150}
          height={150}
        />
        <h1>Welcome, {session.user?.name}</h1>
        <h3>{session.user?.email}</h3>
        <button onClick={() => signOut()}>sign Out</button>
      </>
    );
  }
  return (
    <div>
      <h1>Not Logged In</h1>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </div>
  );
}

export default home;
