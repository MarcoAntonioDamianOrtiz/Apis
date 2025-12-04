import type { Product, LegacyProduct, ModernEcommerceProduct, RestfulProduct } from './types'
import { LegacyAPIService } from './services/LegacyAPIService'
import { ModernEcommerceAPI } from './services/ModernEcommerceAPI'
import { RestfulAPIService } from './services/RestfulAPIService'

// Adapter para Legacy API
export class LegacyAPIAdapter {
  async getProducts(): Promise<Product[]> {
    const legacyData = await LegacyAPIService.fetchProducts()

    return legacyData.map((item: LegacyProduct) => ({
      id: item.product_id,
      name: item.product_name,
      price: parseFloat(item.cost),
      description: item.desc,
      image: item.img_url,
      stock: item.units_available,
      category: item.cat,
      source: 'Legacy API'
    }))
  }
}

// Adapter para Modern E-commerce
export class ModernEcommerceAdapter {
  async getProducts(): Promise<Product[]> {
    const response = await ModernEcommerceAPI.getInventory()
    const items = response.data.items

    return items.map((item: ModernEcommerceProduct) => ({
      id: item.sku,
      name: item.title,
      price: item.pricing.amount,
      description: item.details.summary,
      image: item.media.thumbnail,
      stock: item.inventory.inStock,
      category: item.taxonomy.primaryCategory,
      source: 'Modern E-commerce'
    }))
  }
}

// Adapter para REST API
export class RestfulAPIAdapter {
  async getProducts(): Promise<Product[]> {
    const restData = await RestfulAPIService.getAllProducts()

    return restData.map((item: RestfulProduct) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      image: item.imageUrl,
      stock: item.quantityInStock,
      category: item.categoryName,
      source: 'REST API'
    }))
  }
}

// Facade para gestionar todos los adapters
export class ProductServiceFacade {
  private adapters = [
    new LegacyAPIAdapter(),
    new ModernEcommerceAdapter(),
    new RestfulAPIAdapter()
  ]

  async getAllProductsFromAllSources(): Promise<Product[]> {
    const promises = this.adapters.map(adapter =>
      adapter.getProducts().catch(err => {
        console.error('Error fetching from adapter:', err)
        return []
      })
    )

    const results = await Promise.all(promises)
    return results.flat()
  }
}
