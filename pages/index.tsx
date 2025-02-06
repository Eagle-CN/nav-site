import { GetStaticProps } from 'next'
import { getNotionData } from '../lib/notion'
import { NavItem, Category } from '../types/notion'
import { useState, useEffect } from 'react'

interface HomeProps {
  categories: Category[]
  navItems: NavItem[]
  coverUrl?: string
  pageTitle: string
  pageDescription: string
  error?: string
}

const gradientColors = [
  'from-pink-400 to-purple-400',
  'from-blue-400 to-cyan-400',
  'from-green-400 to-emerald-400',
  'from-yellow-400 to-orange-400',
  'from-purple-400 to-indigo-400',
  'from-red-400 to-pink-400',
]

export default function Home({ categories, navItems, coverUrl, pageTitle, pageDescription, error }: HomeProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('')

  useEffect(() => {
    setIsLoading(false)
    if (categories.length > 0) {
      setActiveCategory(categories[0].id)
    }
  }, [categories])

  const filteredNavItems = navItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.description?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    const matchesCategory = !activeCategory || item.categories.includes(activeCategory)
    return matchesSearch && matchesCategory
  })

  const getRandomGradient = (text: string) => {
    const index = text.charCodeAt(0) % gradientColors.length
    return gradientColors[index]
  }

  if (error || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600">{error || 'Loading...'}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 顶部背景区域 - 减小高度从 h-[360px] 到 h-[280px] */}
      <div className="relative h-[280px] bg-blue-600 overflow-hidden">
        {/* 背景图片 */}
        <div className="absolute inset-0">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            // 默认渐变背景
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500" />
          )}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* 搜索区域 - 调整上下内边距 */}
        <div className="relative pt-16 pb-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-white mb-6">
              {pageTitle}
            </h1>
            <div className="max-w-2xl mx-auto">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="搜索导航..."
                  className="w-full px-6 py-4 pl-14 rounded-full border-0
                    bg-white/90 backdrop-blur-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500/20
                    text-lg text-slate-800 placeholder-slate-400
                    transition-all duration-200
                    shadow-lg shadow-black/5
                    group-hover:bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="absolute left-5 top-4 h-6 w-6 text-slate-400 group-hover:text-blue-500 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 分类导航 */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                    ${activeCategory === category.id
                      ? 'bg-white text-blue-600 shadow-lg shadow-black/5'
                      : 'text-white hover:bg-white/10'
                    } whitespace-nowrap`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 分类标题 */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-slate-800">
              {categories.find(c => c.id === activeCategory)?.name || '全部'}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-sm text-blue-600 font-medium">
              {filteredNavItems.length} 个项目
            </span>
          </div>
          {searchTerm && (
            <div className="text-sm text-slate-500">
              搜索 "{searchTerm}" 的结果
            </div>
          )}
        </div>

        {/* 导航卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredNavItems.map(item => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-4 bg-white rounded-xl border border-slate-200 
                hover:border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/5
                transform hover:-translate-y-1
                transition-all duration-300"
            >
              {/* 推荐角标 */}
              {item.recommend && (
                <div className="absolute top-2 right-2 z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-30 animate-pulse" />
                    <div className="relative px-2 py-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full
                      text-[10px] font-medium text-white shadow-sm
                      flex items-center gap-0.5"
                    >
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {item.recommend}
                    </div>
                  </div>
                </div>
              )}

              <div className="relative flex items-start gap-3">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center
                  bg-slate-50 group-hover:bg-blue-50
                  transition-colors duration-300"
                >
                  {item.icon ? (
                    <img
                      src={item.icon}
                      alt=""
                      className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg font-medium text-white
                      bg-gradient-to-br ${getRandomGradient(item.title)}
                      group-hover:scale-110 transition-all duration-300`}>
                      {item.title.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-slate-800 group-hover:text-blue-600
                    truncate transition-colors duration-200 mb-1"
                  >
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-slate-500 line-clamp-2 group-hover:text-slate-600">
                      {item.description}
                    </p>
                  )}
                </div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <svg 
                    className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 
                      transition-all duration-200 
                      -translate-x-2 group-hover:translate-x-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { categories, navItems, coverUrl, pageTitle } = await getNotionData()
    return {
      props: {
        categories,
        navItems,
        coverUrl,
        pageTitle
      },
      revalidate: 60
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return {
      props: {
        categories: [],
        navItems: [],
        coverUrl: null,
        pageTitle: '导航',
        error: 'Failed to fetch data from Notion'
      },
      revalidate: 60
    }
  }
} 