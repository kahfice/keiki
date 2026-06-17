'use client';

import { CATEGORIES } from '@/lib/constants';

interface ProductFilterProps {
  selected: string;
  onChange: (category: string) => void;
}

export default function ProductFilter({ selected, onChange }: ProductFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange('')}
        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
          selected === ''
            ? 'bg-accent text-white shadow-md shadow-accent/20'
            : 'bg-white text-text-light border border-border hover:border-accent/50 hover:text-accent'
        }`}
      >
        Semua
      </button>
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
            selected === category
              ? 'bg-accent text-white shadow-md shadow-accent/20'
              : 'bg-white text-text-light border border-border hover:border-accent/50 hover:text-accent'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
