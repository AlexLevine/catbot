import { get } from 'https'

export const getLineStickerpackUrls = async (id: string): Promise<string[]> => {
  const urls: string[] = [
    'https://stickershop.line-scdn.net/stickershop/v1/product/' + id + '/iphone/stickerpack@2x.zip',
    'https://stickershop.line-scdn.net/stickershop/v1/product/' + id + '/iphone/sticker_custom_plus_base@2x.zip',
    'https://stickershop.line-scdn.net/stickershop/v1/product/' + id + '/iphone/sticker_name_base@2x.zip',
    'https://stickershop.line-scdn.net/stickershop/v1/product/' + id + '/iphone/stickers@2x.zip',
    'https://stickershop.line-scdn.net/sticonshop/v1/' + id + '/sticon/iphone/package_animation.zip',
    'https://stickershop.line-scdn.net/sticonshop/v1/' + id + '/sticon/iphone/package.zip?v=1'
  ]

  const urlChecks = await Promise.all(urls.map(async (url) => await isUrlValid(url)))

  return urlChecks
    .filter((urlValidity) => urlValidity.isValid)
    .map((urlValidity) => urlValidity.url)
}

export const isUrlValid = async (url: string): Promise<{ isValid: boolean, url: string }> => {
  return await new Promise(function (resolve, reject) {
    const req = get(url, (res) => {
      console.log(url)
      if (res.statusCode === 200) {
        console.log(`validated ${url} returns 200`)
        resolve({ isValid: true, url })
      }
      console.log(`${url} returns ${res.statusCode}`)
      resolve({ isValid: false, url })
    })

    req.on('error', (err) => {
      reject(err)
    })

    req.end()
  })
}
