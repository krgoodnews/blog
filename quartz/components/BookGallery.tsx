import { QuartzComponent, QuartzComponentProps } from "./types"
import { resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { getDate, Date as DateComponent } from "./Date"

// 책 정렬 함수: 날짜(최신순) -> 연도(최신순) -> 제목(가나다순)
function sortBooks(cfg: any): (f1: QuartzPluginData, f2: QuartzPluginData) => number {
  return (f1, f2) => {
    // 0. 날짜가 있으면 날짜로 정렬 (최신순) - CSV 순서가 날짜에 반영됨
    if (f1.dates && f2.dates) {
      const date1 = getDate(cfg, f1)!
      const date2 = getDate(cfg, f2)!
      if (date1.getTime() !== date2.getTime()) {
        return date2.getTime() - date1.getTime() // 최신순
      }
    } else if (f1.dates && !f2.dates) {
      return -1
    } else if (!f1.dates && f2.dates) {
      return 1
    }
    
    // 1. 연도가 있으면 연도로 정렬 (최신순)
    const year1 = f1.frontmatter?.year
    const year2 = f2.frontmatter?.year
    
    // 연도 값을 숫자로 변환하는 함수
    const getLatestYear = (yearValue: any): number => {
      if (!yearValue) return 0
      
      // 숫자인 경우
      if (typeof yearValue === 'number') {
        return yearValue
      }
      
      // 문자열인 경우
      if (typeof yearValue === 'string') {
        // 여러 연도가 쉼표로 구분된 경우 (예: "2020, 2023")
        const years = yearValue.split(',').map((y: string) => parseInt(y.trim())).filter((y: number) => !isNaN(y))
        return years.length > 0 ? Math.max(...years) : 0
      }
      
      // 배열인 경우
      if (Array.isArray(yearValue)) {
        const years = yearValue.map((y: any) => {
          if (typeof y === 'number') return y
          if (typeof y === 'string') return parseInt(y.trim())
          return 0
        }).filter((y: number) => !isNaN(y) && y > 0)
        return years.length > 0 ? Math.max(...years) : 0
      }
      
      return 0
    }
    
    const latestYear1 = getLatestYear(year1)
    const latestYear2 = getLatestYear(year2)
    
    if (latestYear1 > 0 || latestYear2 > 0) {
      if (latestYear1 !== latestYear2) {
        return latestYear2 - latestYear1 // 최신순 (내림차순)
      }
    } else if (year1 && !year2) {
      return -1 // 연도가 있는 것이 우선
    } else if (!year1 && year2) {
      return 1
    }
    
    // 2. 제목으로 정렬 (가나다순)
    const title1 = f1.frontmatter?.title?.toLowerCase() ?? ""
    const title2 = f2.frontmatter?.title?.toLowerCase() ?? ""
    return title1.localeCompare(title2, 'ko')
  }
}

export const BookGallery: QuartzComponent = ({ fileData, allFiles, cfg }: QuartzComponentProps) => {
  // 현재 폴더의 모든 파일 가져오기 (index.md 제외, 폴더 제외)
  let books = allFiles.filter(
    (page) => {
      // index.md 제외
      if (page.slug?.endsWith("/index") || page.slug === fileData.slug) {
        return false
      }
      // 폴더 제외 (슬래시로 끝나지 않는 것만)
      if (page.slug?.endsWith("/")) {
        return false
      }
      return true
    }
  )
  
  // 정렬 적용
  books = books.sort(sortBooks(cfg))

  return (
    <div class="books-gallery">
      {books.map((book) => {
        const title = book.frontmatter?.title ?? "제목 없음"
        const cover = book.frontmatter?.cover ?? ""
        const emoji = book.frontmatter?.emoji ?? "📖"
        const year = book.frontmatter?.year ?? ""
        const slug = book.slug!

        return (
          <a
            href={resolveRelative(fileData.slug!, slug)}
            class="book-card"
            aria-label={title}
          >
            <div class="book-cover">
              {cover ? (
                <img src={cover} alt={title} loading="lazy" />
              ) : (
                <div class="book-cover-placeholder">
                  <span class="book-cover-emoji">{emoji}</span>
                </div>
              )}
            </div>
            <div class="book-emoji">{emoji}</div>
            <div class="book-title">{title}</div>
            {year && <div class="book-year">{year}</div>}
          </a>
        )
      })}
    </div>
  )
}

BookGallery.css = `
.books-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
  padding: 0;

  @media all and (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media all and (min-width: 800px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media all and (max-width: 799px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

.book-card {
  position: relative;
  background: var(--light);
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  padding: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: hidden;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border-color: var(--secondary);
  }

  &:focus {
    outline: 2px solid var(--secondary);
    outline-offset: 2px;
  }

  .book-cover {
    width: 100%;
    aspect-ratio: 2 / 3;
    margin-bottom: 0.75rem;
    border-radius:12px;
    overflow: hidden;
    background: var(--lightgray);
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
      margin: 0 auto;
    }

    .book-cover-placeholder {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--secondary) 0%, var(--tertiary) 100%);
      
      .book-cover-emoji {
        font-size: 3rem;
      }
    }
  }

  &:hover .book-cover img {
    transform: scale(1.05);
  }

  .book-emoji {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    line-height: 1;
  }

  .book-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--dark);
    margin-bottom: 0.5rem;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 2.8em;
    word-break: keep-all;
  }

  .book-year {
    font-size: 0.75rem;
    color: var(--darkgray);
    opacity: 0.7;
    margin-top: auto;
  }
}
`

