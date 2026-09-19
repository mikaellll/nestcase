import Link from "next/link";
import { ChevronRight } from "lucide-react";

type BreadcrumbItem = {
  name: string;
  href?: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center space-x-2 text-sm text-brand-graphite">
        <li>
          <Link href="/" className="hover:text-brand-black transition-colors">
            Accueil
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <ChevronRight size={14} className="text-brand-gray" />
            {item.href ? (
              <Link href={item.href} className="hover:text-brand-black transition-colors">
                {item.name}
              </Link>
            ) : (
              <span className="text-brand-black font-medium">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
