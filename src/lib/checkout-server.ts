import { products } from './products';

export const SHIPPING_THRESHOLD = 40;
export const SHIPPING_FLAT = 4.99;

export type ClientLineItem = { productId: string; quantity: number; color: string };

export type ValidatedLine = {
  productId: string;
  name: string;
  color: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export function validateCartItems(
  items: ClientLineItem[]
): { ok: true; lines: ValidatedLine[]; subtotal: number; shipping: number; total: number } | { ok: false; error: string } {
  if (!Array.isArray(items) || items.length === 0) {
    return { ok: false, error: 'EMPTY_CART' };
  }

  const byId = new Map(products.map((p) => [p.id, p]));
  const lines: ValidatedLine[] = [];

  for (const item of items) {
    const p = byId.get(String(item.productId));
    if (!p) return { ok: false, error: 'INVALID_PRODUCT' };

    const q = Math.floor(Number(item.quantity));
    if (!Number.isFinite(q) || q < 1 || q > 99) return { ok: false, error: 'INVALID_QUANTITY' };

    const color = String(item.color);
    if (!p.colors.includes(color)) return { ok: false, error: 'INVALID_COLOR' };

    const lineTotal = Math.round(p.price * q * 100) / 100;
    lines.push({
      productId: p.id,
      name: p.name,
      color,
      quantity: q,
      unitPrice: p.price,
      lineTotal,
    });
  }

  const subtotal = Math.round(lines.reduce((s, l) => s + l.lineTotal, 0) * 100) / 100;
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
  const total = Math.round((subtotal + shipping) * 100) / 100;

  return { ok: true, lines, subtotal, shipping, total };
}

export function formatEurPayPal(amount: number): string {
  return amount.toFixed(2);
}
