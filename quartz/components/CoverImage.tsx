import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot, isAbsoluteURL } from "../util/path"

const CoverImage: QuartzComponent = ({ fileData, cfg }: QuartzComponentProps) => {
  const cover = fileData.frontmatter?.cover
  if (!cover) {
    return null
  }

  let coverPath: string
  if (isAbsoluteURL(cover)) {
    // 외부 URL인 경우 그대로 사용
    coverPath = cover
  } else if (cover.startsWith("/")) {
    // 절대 경로인 경우 그대로 사용
    coverPath = cover
  } else if (cover.startsWith("static/")) {
    // static/로 시작하는 경우 절대 경로로 변환
    coverPath = `/${cover}`
  } else {
    // 상대 경로인 경우 pathToRoot를 사용
    const baseDir = pathToRoot(fileData.slug!)
    coverPath = `${baseDir}/${cover}`.replace(/\/+/g, "/")
  }

  return (
    <div class="cover-image-container">
      <img src={coverPath} alt="Cover" class="cover-image" />
    </div>
  )
}

CoverImage.css = `
.cover-image-container {
  width: 100%;
  margin: 0 0 2rem 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cover-image {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
}
`

export default (() => CoverImage) satisfies QuartzComponentConstructor

