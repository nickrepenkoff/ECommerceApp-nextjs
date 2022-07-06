import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
    projectId: '8exqagc1',
    dataset: 'production',
    apiVersion: '2022-07-06',
    useCdn: true,
    token: process.env.NEXT_SANITY_ACCESS_TOKEN
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)
