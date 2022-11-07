import { format } from "date-fns";

export function dataAtualTexto() {
  return format(new Date(), "yyyy-MM-dd hh:mm:ss")
}