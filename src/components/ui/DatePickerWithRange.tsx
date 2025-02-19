import * as React from "react";
import {  format, startOfMonth, endOfMonth } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

// Fungsi untuk mendapatkan tanggal awal dan akhir bulan
const getCurrentMonthRange = (): DateRange => {
  const today = new Date();
  return {
    from: startOfMonth(today),
    to: endOfMonth(today),
  };
};

export function DatePickerWithRange({
  className,
  onSelect,
}: React.HTMLAttributes<HTMLDivElement> & { onSelect: (dateRange: DateRange | undefined) => void }) {
  const [date, setDate] = React.useState<DateRange | undefined>(getCurrentMonthRange());

  const handleDateSelect = (dateRange: DateRange | undefined) => {
  
    setDate(dateRange); // Update state lokal
    if (onSelect) {
      onSelect(dateRange); // Mengirim data ke parent
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            modifiersStyles={{
                selected: { backgroundColor: "#047857", color: "white" }, 
                range_middle: { backgroundColor: "#0d9488", color: "white" }, 
              }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}