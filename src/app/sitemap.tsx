import { MetadataRoute } from 'next'
 
export default async function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://reporch.com'
  
  const products = await getProducts()
  const productUrls = products.map(product => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: product.updatedAt,
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...productUrls,
  ]
}