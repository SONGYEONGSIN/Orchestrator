"use client";

import { createClient } from "@/lib/supabase/client";

export async function startMicrosoftOAuth(): Promise<string | null> {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "azure",
    options: {
      scopes: "email openid profile",
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    return error.message;
  }
  return null;
}
