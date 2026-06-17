interface BadgeProps {
  type: 'Best Seller' | 'New Product';
}

export default function Badge({ type }: BadgeProps) {
  const styles = {
    'Best Seller': 'bg-accent text-white',
    'New Product': 'bg-emerald-500 text-white',
  };

  return (
    <span
      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase shadow-lg z-10 ${styles[type]}`}
    >
      {type}
    </span>
  );
}
