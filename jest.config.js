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
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^remark$': '<rootDir>/__mocks__/remark.js',
    '^remark-html$': '<rootDir>/__mocks__/remark-html.js',
    '^remark-gfm$': '<rootDir>/__mocks__/remark-gfm.js',
  },
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(remark.*|remark-html|remark-gfm|unified|mdast-util-.*|micromark.*|bail|is-plain-obj|trough|vfile|unist-.*|hast-.*|web-namespaces|html-void-elements|property-information|space-separated-tokens|comma-separated-tokens|parse-entities|character-entities|character-entities-legacy|character-reference-invalid|is-alphabetical|is-alphanumerical|is-decimal|is-hexadecimal|is-whitespace-character|longest-streak|markdown-entities|decode-named-character-reference|trim-lines|collapse-white-space)/)'
  ],
  globals: {
    'ts-jest': {
      useESM: true
    }
  },
  transform: {
    '^.+\\.js$': ['babel-jest', { presets: ['next/babel'], plugins: [] }]
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
