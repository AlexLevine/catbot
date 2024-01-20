const X_DOMAIN = 'x.com'
const TWITTER_DOMAIN = 'twitter.com'
const TIKTOK_DOMAIN = 'tiktok.com'

export const VX_TWITTER_DOMAIN = 'vxtwitter.com'
const VX_TIKTOK_DOMAIN = 'vxtiktok.com'

const HTTPS_ONLY_PREFIX = 'https://'
const HTTPS_WITH_WWW_PREFIX = 'https://www.'

const SEARCH_PATTERNS = [
  HTTPS_ONLY_PREFIX + X_DOMAIN,
  HTTPS_WITH_WWW_PREFIX + X_DOMAIN,

  HTTPS_ONLY_PREFIX + TWITTER_DOMAIN,
  HTTPS_WITH_WWW_PREFIX + TWITTER_DOMAIN,

  HTTPS_ONLY_PREFIX + TIKTOK_DOMAIN,
  HTTPS_WITH_WWW_PREFIX + TIKTOK_DOMAIN
]

/**
 * Returns true if the word supplied matches any of the known search
 * patterns
 * @param word
 * @returns true if any word matches, false otherwise
 */
const detectEmbedUrl = (word: string): boolean => {
  return SEARCH_PATTERNS.some((pattern) => word.startsWith(pattern))
}

export const isolateUrlsToFix = (messageBody: string): string[] => {
  const words = messageBody.split(/(\s+)/)
  return words.filter((word) => detectEmbedUrl(word))
}

const fixUrl = (url: string): string | null => {
  if (url.includes(X_DOMAIN)) {
    return url.replace(X_DOMAIN, VX_TWITTER_DOMAIN)
  }
  if (url.includes(TWITTER_DOMAIN)) {
    return url.replace(TWITTER_DOMAIN, VX_TWITTER_DOMAIN)
  }
  // vxtiktok is hosted on www subdomain
  // so map https://tiktok.com/t/ZT8kNTXey/ to https://www.vxtiktok.com/t/ZT8kNTXey/
  if (url.includes(TIKTOK_DOMAIN)) {
    if (url.startsWith(HTTPS_WITH_WWW_PREFIX)) {
      return url.replace(TIKTOK_DOMAIN, VX_TIKTOK_DOMAIN)
    } else {
      return url.replace(TIKTOK_DOMAIN, 'www.' + VX_TIKTOK_DOMAIN)
    }
  }

  return null
}

export const fixEmbedUrls = (originalUrls: string[]): string[] => {
  const fixedUrls: string[] = []

  originalUrls.forEach((url) => {
    const fixedUrl = fixUrl(url)
    console.log(`Mapping ${url} to ${fixedUrl}`)
    if (fixedUrl != null && fixUrl.length > 0) {
      fixedUrls.push(fixedUrl)
    }
  })

  return fixedUrls
}
