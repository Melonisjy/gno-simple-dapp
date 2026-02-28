type InputProps = {
  label: string;
  placeholder?: string;
};

export default function Input({ label, placeholder }: InputProps) {
  return (
    <label className="block">
      <span className="mb-1 block">{label}</span>
      <input
        placeholder={placeholder}
        className="h-10 w-full rounded-md border border-gray-400 px-3 text-[12px]"
      />
    </label>
  );
}
