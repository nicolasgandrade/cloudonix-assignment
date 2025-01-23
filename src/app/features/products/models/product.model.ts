export interface Product {
  id: number;
  name: string;
  description: string;
  sku: string;
  cost: number;
  profile: Record<string, string>;
}
