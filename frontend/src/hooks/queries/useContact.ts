import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "@/api/contact";

export function useContact() {
  return useMutation({
    mutationFn: sendMessage,
  });
}
