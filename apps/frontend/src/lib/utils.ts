import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ISODate } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isISODate(date: string): date is ISODate {
  return /^\d{4}-\d{2}-\d{2}$/.test(date)
}

export function formatNumber(num: number): string {
  return num.toLocaleString()
}
