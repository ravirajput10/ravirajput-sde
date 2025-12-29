import { supabase } from "@/integrations/supabase/client";

export async function sendMessage(payload: {
  name: string;
  email: string;
  message: string;
}) {
  const { error } = await supabase.from("contact_messages").insert(payload);
  if (error) throw error;
}
