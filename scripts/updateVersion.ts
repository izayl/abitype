import { readJsonSync, writeFileSync } from 'fs-extra'
import path from 'path'

// Writes the current package.json version to `./src/version.ts`.
const versionFilePath = path.join(__dirname, '../src/version.ts')
const packageJsonPath = path.join(__dirname, '../package.json')
const packageVersion = readJsonSync(packageJsonPath).version

writeFileSync(versionFilePath, `export const version = '${packageVersion}'\n`)
