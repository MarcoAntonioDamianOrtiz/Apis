// Interfaz común para productos (Target Interface)
export interface Product {
  id: string
  name: string
  price: number
  description: string
  image: string
  stock: number
  category: string
  source: string
}

// Interfaces de APIs externas (Adaptees)
export interface LegacyProduct {
  product_id: string
  product_name: string
  cost: string
  desc: string
  img_url: string
  units_available: number
  cat: string
}

export interface ModernEcommerceProduct {
  sku: string
  title: string
  pricing: {
    amount: number
    currency: string
  }
  details: {
    summary: string
  }
  media: {
    thumbnail: string
  }
  inventory: {
    inStock: number
  }
  taxonomy: {
    primaryCategory: string
  }
}

export interface RestfulProduct {
  id: string
  name: string
  price: number
  description: string
  imageUrl: string
  quantityInStock: number
  categoryName: string
}
