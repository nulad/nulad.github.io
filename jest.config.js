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
  testPathIgnorePatterns: ['<rootDir>/spec/'],
  transformIgnorePatterns: [
    'node_modules/(?!(remark($|/)|remark-.*|remark.*|unified|mdast-util-.*|micromark.*|bail|is-plain-obj|trough|vfile|unist-.*|hast-.*|web-namespaces|html-void-elements|property-information|space-separated-tokens|comma-separated-tokens|parse-entities|character-entities|character-entities-legacy|character-reference-invalid|is-alphabetical|is-alphanumerical|is-decimal|is-hexadecimal|is-whitespace-character|longest-streak|markdown-entities|decode-named-character-reference|trim-lines|collapse-white-space|remark-parse|remark-stringify|remark-rehype|rehype-stringify)/)'
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
