export default function Input({ label, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="mb-1 block text-sm font-medium text-earth-700">{label}</span>}
      <input
        className={`w-full rounded-xl border border-leaf-200 bg-white px-4 py-2.5 text-earth-900 outline-none transition focus:border-leaf-500 focus:ring-2 focus:ring-leaf-200 ${className}`}
        {...props}
      />
    </label>
  );
}
