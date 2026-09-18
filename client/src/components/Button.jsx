export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'rounded-full px-5 py-2.5 text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary: 'bg-leaf-600 text-white shadow-md shadow-leaf-600/30 hover:bg-leaf-700 hover:shadow-lg',
    secondary: 'bg-sky-500 text-white shadow-md shadow-sky-500/30 hover:bg-sky-600',
    outline: 'border-2 border-leaf-600 text-leaf-700 hover:bg-leaf-50',
    danger: 'bg-rose-100 text-rose-700 hover:bg-rose-200',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
