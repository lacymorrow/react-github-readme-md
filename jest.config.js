module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '.(css|less|scss)$': 'identity-obj-proxy'
  },
  // marked and its extensions ship ESM only, so they have to go through babel
  // rather than being skipped as node_modules.
  transformIgnorePatterns: [
    '/node_modules/(?!(marked|marked-alert|marked-gfm-heading-id|marked-linkify-it|linkify-it|uc\\.micro)/)'
  ]
}
