type InputProps = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

export default function Input({
  label,
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <label className="block">
      <span className="mb-1 block">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-md border border-gray-400 px-3 text-[12px]"
      />
    </label>
  );
}
