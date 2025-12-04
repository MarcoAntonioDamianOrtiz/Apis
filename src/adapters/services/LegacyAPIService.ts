import type { LegacyProduct } from '../types'

export class LegacyAPIService {
  static async fetchProducts(): Promise<LegacyProduct[]> {
    // Simula llamada a API legacy
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            product_id: 'LEG001',
            product_name: 'Laptop Pro 2024',
            cost: '1299.99',
            desc: 'Laptop de alto rendimiento con procesador Intel i9',
            img_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
            units_available: 15,
            cat: 'Electronics'
          },
          {
            product_id: 'LEG002',
            product_name: 'Mouse Inalámbrico Pro',
            cost: '29.99',
            desc: 'Mouse ergonómico inalámbrico con 5 botones programables',
            img_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
            units_available: 50,
            cat: 'Accessories'
          },
          {
            product_id: 'LEG003',
            product_name: 'Teclado Mecánico Vintage',
            cost: '79.99',
            desc: 'Teclado mecánico con switches azules',
            img_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400',
            units_available: 25,
            cat: 'Accessories'
          }
        ])
      }, 800)
    })
  }
}
