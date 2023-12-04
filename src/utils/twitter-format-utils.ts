const TWITTER_DOMAIN = 'https://twitter.com'
const X_DOMAIN = 'https://x.com'
const VX_TWITTER_DOMAIN = 'https://vxtwitter.com'

export const parseTwitterUrls = (messageBody: string): string[] => {
  const words = messageBody.split(/(\s+)/)

  const matches = words.filter((word) => word.startsWith(X_DOMAIN) || word.startsWith(TWITTER_DOMAIN))

  if (matches.length > 0) {
    console.log(`Matches Found: [${matches.join(', ')}]`)
  }

  return matches
}

export const fixTwitterUrls = (originalUrls: string[]): string[] => {
  const fixedUrls: string[] = []

  originalUrls.forEach((url) => {
    if (url.startsWith(X_DOMAIN)) {
      fixedUrls.push(url.replace(X_DOMAIN, VX_TWITTER_DOMAIN))
    }
    if (url.startsWith(TWITTER_DOMAIN)) {
      fixedUrls.push(url.replace(TWITTER_DOMAIN, VX_TWITTER_DOMAIN))
    }
  })

  return fixedUrls
}
