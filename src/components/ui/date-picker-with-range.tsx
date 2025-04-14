"use client";

import * as React from "react";
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
}

export function DatePickerWithRange(props: PropTypes) {
  const { className, date, setDate } = props;
  const [activeRange, setActiveRange] = React.useState<string | null>(null);

  const handlePresetRange = (range: "7days" | "1month" | "1year") => {
    const today = new Date();
    switch (range) {
      case "7days":
        setDate({
          from: addDays(today, -7),
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
    }
    setActiveRange(range); // Set the active range
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
          onClick={() => handlePresetRange("1month")}
          className={cn("w-full", activeRange === "1month" && "bg-primary text-primary-foreground hover:bg-primary")}
        >
          1 Bulan
        </Button>
        <Button
          variant="outline"
          onClick={() => handlePresetRange("1year")}
          className={cn("w-full", activeRange === "1year" && "bg-primary text-primary-foreground hover:bg-primary")}
        >
          1 Tahun
        </Button>
      </div>
    </div>
  );
}
