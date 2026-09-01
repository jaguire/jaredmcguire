const id = 'BONES 🦴'
const log = {
  debug: (msg, obj) => { console.debug(`BONES 🦴 ${msg}`, obj) },
  info: (msg, obj) => { console.info(`BONES 🦴 ${msg}`, obj) },
  warn: (msg, obj) => { console.warn(`BONES 🦴 ${msg}`, obj) },
  error: (msg, obj) => { console.error(`BONES 🦴 ${msg}`, obj) },
}

const loadJson = async path => {
  try {
    const response = await fetch(path)
    if (!response.ok)
      throw new Error(`loadJson() error! Status: ${response.status}`)
    return await response.json()
  } catch (error) {
    log.error('loadJson() fetch error:', error)
    return {}
  }
}

const loadHtml = async path => {
  try {
    const response = await fetch(path)
    if (!response.ok)
      throw new Error(`loadHtml() error! Status: ${response.status}`)
    return await response.text()
  } catch (error) {
    log.error('loadHtml fetch error:', error)
    return {}
  }
}

const createPageLink = page => {
  const a = document.createElement('a')
  a.innerText = page.name
  a.href = page.url
  return a
}

// ---- RUN ----

const bonesIncludesPath = '/includes/'
// const bones = await loadJson('/bones.json')
// log.debug('config', bones)

// get main content
const layout = document.querySelector('[data-layout]')
const mainHtml = layout ? layout.innerHTML : console.error('BONES 🦴 layout is missing')

// load layout
layout.innerHTML = await loadHtml(`${bonesIncludesPath}${layout.dataset.layout}.html`)

// load includes
// await Promise.all([...layout.querySelectorAll('[data-include]')].map(async include =>
//   include.innerHTML = await loadHtml(`${bonesIncludesPath}${include.dataset.include}.html`)))

// restore main content
const main = layout.querySelector('main')
main.innerHTML = main ? mainHtml : console.error('BONES 🦴 <main></main> is missing from the layout')

// navigation
// const headerNav = layout.querySelector('header nav')
// const footerNav = layout.querySelector('footer nav')
// bones.pages.forEach(page => {
//   if (page.isNavHeader)
//     headerNav.appendChild(createPageLink(page))
//   if (page.isNavFooter)
//     footerNav.appendChild(createPageLink(page))
// })