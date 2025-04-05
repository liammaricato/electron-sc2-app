const builds = JSON.parse(localStorage.getItem('builds')) || []
const currentBuildId = sessionStorage.getItem('openBuildId') || 0

const build = builds.find(build => build.id == currentBuildId)

document.getElementById('build-title').textContent = build.title

// Criar os steps da build