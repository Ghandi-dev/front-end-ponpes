"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  Year: {
    label: "Year",
  },
  Santri: {
    label: "Santri",
    color: "var(--chart-1)",
  },
  Registrasi: {
    label: "Registrasi",
    color: "var(--chart-2)",
  },
  SPP: {
    label: "SPP",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

interface PropTypes {
  isLoading?: boolean;
  santriPerYear: { year: string; count: number }[];
  registrasiPerYear: { year: string; sum: string }[];
  sppPerYear: { year: string; sum: string }[];
}

export function SectionChart(props: PropTypes) {
  const { santriPerYear, registrasiPerYear, sppPerYear } = props;
  const combinedData = santriPerYear.map((item) => {
    const year = item.year;

    // Mencari data registrasi yang cocok dengan tahun ini
    const registrasiData = registrasiPerYear.find((regItem) => regItem.year === year);

    // Mencari data SPP yang cocok dengan tahun ini
    const sppData = sppPerYear.find((sppItem) => sppItem.year === year);

    return {
      year: year,
      Santri: item.count,
      Registrasi: registrasiData ? parseInt(registrasiData.sum) : 0,
      SPP: sppData ? parseInt(sppData.sum) : 0,
    };
  });

  return (
    <Card className="@container/card border-1 border-primary">
      <CardHeader>
        <CardTitle>Statistik Tahunan</CardTitle>
        <CardDescription>Menampilkan data santri, registrasi, dan SPP per tahun</CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
          <AreaChart data={combinedData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="fillRegistrasi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={1.0} />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillSantri" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillSPP" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-3)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--chart-3)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} minTickGap={32} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Area dataKey="Santri" type="natural" fill="url(#fillSantri)" stroke="var(--chart-1)" stackId="a" />
            <Area dataKey="Registrasi" type="natural" fill="url(#fillRegistrasi)" stroke="var(--chart-2)" stackId="a" />
            <Area dataKey="SPP" type="natural" fill="url(#fillSPP)" stroke="var(--chart-3)" stackId="a" />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
