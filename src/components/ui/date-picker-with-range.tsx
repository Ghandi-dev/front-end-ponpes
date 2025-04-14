"use client";

import { format, addDays, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface PropTypes {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  className?: string;
  activeRange?: string | null;
  setActiveRange?: (range: string | null) => void;
}

export function DatePickerWithRange(props: PropTypes) {
  const { className, date, setDate, activeRange, setActiveRange } = props;

  const handlePresetRange = (range: "7days" | "30days" | "1month" | "1year" | "1yearAgo") => {
    const today = new Date();
    switch (range) {
      case "7days":
        setDate({
          from: addDays(today, -7),
          to: today,
        });
        break;
      case "30days":
        setDate({
          from: addDays(today, -30),
          to: today,
        });
        break;
      case "1month":
        setDate({
          from: startOfMonth(today),
          to: endOfMonth(today),
        });
        break;
      case "1year":
        setDate({
          from: startOfYear(today),
          to: endOfYear(today),
        });
        break;
      case "1yearAgo":
        setDate({
          from: addDays(today, -365),
          to: today,
        });
        break;
    }

    if (setActiveRange) {
      setActiveRange(range); // Menyimpan range aktif (jika dipakai untuk style)
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button id="date" variant={"outline"} className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pilih Tanggal</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar initialFocus mode="range" defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
        </PopoverContent>
      </Popover>

      {/* Tombol preset untuk rentang tanggal */}
      <div className="grid grid-cols-3 gap-2 mt-2">
        <Button
          variant="outline"
          onClick={() => handlePresetRange("7days")}
          className={cn("w-full", activeRange === "7days" && "bg-primary text-primary-foreground hover:bg-primary")}
        >
          7 Hari
        </Button>
        <Button
          variant="outline"
          onClick={() => handlePresetRange("30days")}
          className={cn("w-full", activeRange === "30days" && "bg-primary text-primary-foreground hover:bg-primary")}
        >
          30 Hari
        </Button>
        <Button
          variant="outline"
          onClick={() => handlePresetRange("1yearAgo")}
          className={cn("w-full", activeRange === "1yearAgo" && "bg-primary text-primary-foreground hover:bg-primary")}
        >
          1 Tahun
        </Button>
      </div>
    </div>
  );
}
