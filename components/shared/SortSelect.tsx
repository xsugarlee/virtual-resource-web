"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortSelectProps {
  readonly value: string;
  readonly onChange: (value: string) => void;
}

const sortOptions = [
  { label: "畅销优先", value: "畅销优先" },
  { label: "最新上架", value: "最新上架" },
  { label: "价格从低到高", value: "价格从低到高" },
  { label: "价格从高到低", value: "价格从高到低" },
];

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-auto min-w-0 border-0 shadow-none bg-transparent focus:ring-0 focus:ring-offset-0 px-0 py-0 h-auto text-sm">
        <SelectValue placeholder="排序方式" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}