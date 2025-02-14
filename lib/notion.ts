import { NavItem, Category } from '../types/notion'

const NOTION_PAGE_ID = process.env.NOTION_PAGE_ID
const DEFAULT_COVER = 'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=2940' // 使用 Unsplash 的图片

// 从环境变量读取分类顺序，格式如：云算力,API,AI,学习资源,开发工具,工具合集
const categoryOrder = (process.env.CATEGORY_ORDER || '').split(',')
const CATEGORY_ORDER = Object.fromEntries(
  categoryOrder.map((cat, index) => [cat.trim(), index + 1])
)

// 使用Notion公开API获取数据
export async function getNotionData() {
  if (!NOTION_PAGE_ID) {
    throw new Error('Missing NOTION_PAGE_ID environment variable')
  }

  try {
    // 添加时间戳来防止缓存
    const timestamp = Date.now()

    // 获取页面标题
    const pageRes = await fetch(`https://notion-api.splitbee.io/v1/page/${NOTION_PAGE_ID}?t=${timestamp}`)
    if (!pageRes.ok) {
      throw new Error(`Failed to fetch page: ${pageRes.status}`)
    }
    const pageData = await pageRes.json()
    console.log('Page Data:', JSON.stringify(pageData, null, 2))
    
    // 获取标题
    const pageValue = Object.values(pageData)[0] as { value: { properties: { title: string[][] } } }
    const pageTitle = pageValue?.value?.properties?.title?.[0]?.[0] || '导航2'
    console.log('Title Info:', { pageValue, pageTitle })

    // 获取表格数据
    const res = await fetch(`https://notion-api.splitbee.io/v1/table/${NOTION_PAGE_ID}?t=${timestamp}`)
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`)
    }
    
    const data = await res.json()
    console.log('Table Data:', JSON.stringify(data, null, 2))
    
    // 使用Map来保持分类的顺序并去重
    const categoriesMap = new Map()
    data.forEach((item: any) => {
      const cats = Array.isArray(item.Category) 
        ? item.Category 
        : (item.Category || '').split(',')
      
      cats.forEach((cat: string) => {
        const trimmedCat = cat.trim()
        if (trimmedCat && !categoriesMap.has(trimmedCat)) {
          categoriesMap.set(trimmedCat, true)
        }
      })
    })
    
    // 转换为所需的格式并排序
    const categories = Array.from(categoriesMap.keys())
      .map(name => ({
        id: name,
        name: name,
        order: CATEGORY_ORDER[name] || 999 // 未定义顺序的分类放到最后
      }))
      .sort((a, b) => a.order - b.order)
      .map(({ id, name }) => ({ id, name })) // 移除order字段

    // 格式化导航项，支持多分类
    const navItems = data.map((item: any) => ({
      id: item.id || String(Math.random()),
      title: item.Title || '',
      url: item.URL || '',
      description: item.Description || '',
      icon: item.Icon || '',
      categories: Array.isArray(item.Category) 
        ? item.Category.map((cat: string) => cat.trim()) 
        : (item.Category || '').split(',').map((cat: string) => cat.trim()),
      recommend: item.Recommend || '',
      order: item.Order === undefined || item.Order === '' ? 9999 : parseInt(item.Order) // 修改默认值逻辑
    })).sort((a: NavItem, b: NavItem) => {
      // 首先按照是否有角标排序
      if (a.recommend && !b.recommend) return -1
      if (!a.recommend && b.recommend) return 1
      
      // 如果角标状态相同，则按照序号排序（包括0）
      if (a.order === b.order) return 0
      if (a.order === 9999) return 1
      if (b.order === 9999) return -1
      return a.order - b.order
    })

    return {
      pageTitle,
      pageDescription: '', // 返回空字符串作为描述
      coverUrl: DEFAULT_COVER,
      categories,
      navItems
    }
  } catch (error) {
    console.error('Failed to fetch notion data:', error)
    throw error
  }
} 