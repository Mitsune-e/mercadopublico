import { addDays, format } from "date-fns";

export function dateFormat(date: string | Date, formatString = 'dd/MM/yyyy'): string {
  if (date === null || date === undefined)
    return "";
  return ((typeof date === 'string') ?
    format(normalizeDate(date), formatString) :
    format(date, formatString));
}

export function addDay(date: string | Date, amount: number, formatString = 'dd/MM/yyyy'): string {
  if (date === null || date === undefined)
    return "";
  const data = ((typeof date === 'string') ?
    normalizeDate(date) : date);
  return (dateFormat(addDays(data, amount), formatString));
}

export function normalizeDate(date: string | Date): Date {
  return ((typeof date === 'string') ? new Date(`${date}`) : date);
}