import type { RestfulProduct } from '../types'

export class RestfulAPIService {
  static async getAllProducts(): Promise<RestfulProduct[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'REST001',
            name: 'SSD NVMe 1TB',
            price: 129.99,
            description: 'Disco SSD ultra rápido con velocidades de lectura de 7000MB/s',
            imageUrl: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400',
            quantityInStock: 45,
            categoryName: 'Storage'
          },
          {
            id: 'REST002',
            name: 'RAM DDR5 32GB',
            price: 189.99,
            description: 'Memoria RAM DDR5 de alto rendimiento para gaming',
            imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400',
            quantityInStock: 35,
            categoryName: 'Components'
          },
          {
            id: 'REST003',
            name: 'Tarjeta Gráfica RTX',
            price: 899.99,
            description: 'GPU de última generación para gaming y diseño',
            imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400',
            quantityInStock: 8,
            categoryName: 'Components'
          }
        ])
      }, 600)
    })
  }
}
