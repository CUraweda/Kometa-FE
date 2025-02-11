"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  onDateSelect: (date: Date) => void; // Menyatakan bahwa onDateSelect hanya menerima Date
}

export function DatePicker({ onDateSelect }: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate)
      onDateSelect(selectedDate) // Memanggil callback hanya jika tanggal dipilih
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            // Menangani pemilihan tanggal hanya jika valid
            if (selectedDate) {
              handleDateSelect(selectedDate)
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
