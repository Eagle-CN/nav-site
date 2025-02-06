export interface NavItem {
  id: string
  title: string
  url: string
  description: string
  icon: string
  categories: string[]
  recommend: string
}

export interface Category {
  id: string
  name: string
  description?: string
} 