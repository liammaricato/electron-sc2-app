const buildsList = document.getElementById('builds-list')

builds = JSON.parse(localStorage.getItem('builds')) || []

if (builds.length == 0) {
    const emptyBuildsAlert = document.createElement('p')
    emptyBuildsAlert.textContent = 'There are no builds yet! You should try creating one'
    emptyBuildsAlert.style.textAlign = 'center'
    
    buildsList.append(emptyBuildsAlert)
}

function appendBuild(build) {
    const buildEl = document.createElement('li')
    buildEl.innerHTML = `<a href="build.html" id="build-${build.id}">${build.title}</a>`
    buildEl.addEventListener('click', () => {
        sessionStorage.setItem('openBuildId', build.id)
    })

    buildsList.append(buildEl)
}

for (build of builds) {
    appendBuild(build)
}