const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you based on your tsconfig.json paths)
    '^@/(.*)$': '<rootDir>/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(remark|remark-gfm|remark-html|unified|bail|is-plain-obj|trough|vfile|unist-builder|unist-util-stringify-position|unist-util-generated|unist-util-position|unist-util-is|unist-util-visit-parents|unist-util-visit|mdast-util-mdx-jsx|mdast-util-mdxjs-esm|mdast-util-to-markdown|mdast-util-to-hast|hast-util-whitespace|hast-util-to-html|hast-to-hyperscript)/)',
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
