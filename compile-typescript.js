// Source: https://github.com/puppeteer/puppeteer/blob/main/typescript-if-required.js

const child_process = require('child_process')
const fs = require('fs')
const path = require('path')

const { promisify } = require('util')
const exec = promisify(child_process.exec)
const fsAccess = promisify(fs.access)

const fileExists = async (filePath) =>
  fsAccess(filePath)
    .then(() => true)
    .catch(() => false)

async function writePackageJson () {
  const libPath = path.join(__dirname, 'lib')
  const libExists = await fileExists(libPath)
  if (!libExists) {
    console.error('@BochilTeam/scraper:', 'Lib folder not found after compiling TypeScript')
    process.exit(1)
  }
  const libCjs = path.join(libPath, 'cjs')
  const libCjsExists = await fileExists(libCjs)
  if (libCjsExists) {
    const packageJson = JSON.stringify({ type: 'commonjs' }, null, 2)
    await fs.promises.writeFile(path.join(libCjs, 'package.json'), packageJson)
  } else console.warn('@BochilTeam/scraper:', 'CJS folder not found after compiling TypeScript')
  const libEsm = path.join(libPath, 'esm')
  const libEsmExists = await fileExists(libEsm)
  if (libEsmExists) {
    const packageJson = JSON.stringify({ type: 'module' }, null, 2)
    await fs.promises.writeFile(path.join(libEsm, 'package.json'), packageJson)
  } else console.warn('@BochilTeam/scraper:', 'ESM folder not found after compiling TypeScript')

  const typesPath = path.join(libPath, '@types')
  const typesExists = await fileExists(typesPath)

  if (!typesExists && !libEsmExists && !libCjsExists) {
    console.error('@BochilTeam/scraper:', 'No TypeScript files found after compiling TypeScript')
    process.exit(1)
  }
}

async function compileTypeScript () {
  const out = await exec('npm run build').catch((error) => {
    console.error('@BochilTeam/scraper:', 'Error running TypeScript\n', error)
    process.exit(1)
  })
  if (out.stdout.trim()) console.log(out.stdout)
  if (out.stderr.trim()) console.error(out.stderr)
  await writePackageJson()
}

async function compileTypeScriptIfRequired () {
  const libPath = path.join(__dirname, 'lib')
  const typesPath = path.join(libPath, '@types')
  const libExists = await fileExists(libPath)
  const typesExists = await fileExists(typesPath)
  if (libExists && typesExists) return

  console.log('@BochilTeam/scraper:', 'Compiling TypeScript...')
  await compileTypeScript()
}

if (require.main === module) compileTypeScriptIfRequired()
