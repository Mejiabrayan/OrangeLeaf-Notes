/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')()

const nextConfig = {
    images: {
      domains: ['source.unsplash.com', 'tkoqzuesobfzcjpieayr.supabase.co'],
    },
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  }
  
  module.exports = withMDX(nextConfig)
