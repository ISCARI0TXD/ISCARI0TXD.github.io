/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/","#new":""}
const engine = "startpage"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"fGZrnaWMHncyC6hB","label":"~/LNX","bookmarks":[{"id":"OHGhyM6jlOQpfnaE","label":"Arch Wiki","url":"https://wiki.archlinux.org/"},{"id":"Jye75uEz5DwH9v6u","label":"Gentoo Wiki","url":"https://wiki.gentoo.org/wiki/Main_Page"},{"id":"6F2xAKUWS7LQNnL7","label":"Void Wiki","url":"https://docs.voidlinux.org/"}]},{"id":"AhENnqQ3W7iUW0vr","label":"%SCL%","bookmarks":[{"id":"OlTzIFKd10GosJB5","label":"Youtube","url":"www.youtube.com"},{"id":"DbXDwEmMU6jYWqCB","label":"Reddit","url":"www.reddit.com"},{"id":"G1SMFAbSaCb7z3Ek","label":"Mail","url":"https://mail.google.com/mail/u/0/#inbox"}]},{"id":"qgL3Jeeol5G3EJfI","label":"Coding","bookmarks":[{"id":"8dQFgNcCNrYBnTmk","label":"Github","url":"www.github.com"},{"id":"wvoDzSqIcqOHSP1i","label":"Gitlab","url":"https://about.gitlab.com/"},{"id":"GYHfgHZSWP6wCDKx","label":"Stack Overflow","url":"https://stackoverflow.com/"}]},{"id":"HBwufSQBOtlHADEe","label":"Pwn3d","bookmarks":[{"id":"cTpGggIJNR8CktpG","label":"Hack The Box","url":"https://www.hackthebox.com/"},{"id":"qu22rxsmGopMQWLM","label":"Try Hack Me","url":"https://tryhackme.com/"},{"id":"9wgfgOEB95xWqRmC","label":"Tools","url":"https://en.kali.tools/all/?"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
