import React from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import { Analytics } from "@vercel/analytics/react";
import App from "./App.jsx";

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (clerkKey && clerkKey.startsWith("pk_")) {
  createRoot(document.getElementById("root")).render(
    <ClerkProvider publishableKey={clerkKey}>
      <App />
      <Analytics />
    </ClerkProvider>
  );
} else {
  // No Clerk key = dev mode, render without auth
  createRoot(document.getElementById("root")).render(
    <>
      <App />
      <Analytics />
    </>
  );
}
