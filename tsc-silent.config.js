// https://dev.to/15five/how-to-temporarily-ignore-errors-during-a-typescript-migration-doe
module.exports = {
  suppress: [
    {
      pathRegExp: '/cypress/integration',
      codes: [2339]
    },
    {
      pathRegExp: '/cypress/integration',
      codes: [2339]
    }
    // yarn tsc-silent --project tsconfig.json --suppressConfig tsc-silent.config.js --stats
  ]
}
