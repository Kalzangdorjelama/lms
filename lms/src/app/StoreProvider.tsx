"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { AppStore, makeStore } from "@/store/store";

// this code simply check weather the store is baneko xa ki nai
// Google: https://drive.google.com/file/d/1gAbFZBSVKTxAQ6wu-zPCRHfM2n2miWpI/view
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

// import chai global component i.e layout.tsx ma gare ko xa so as a wrapper banaye globally accessable banaye ko xa layout.tsx ma
