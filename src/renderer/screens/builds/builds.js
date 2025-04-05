const buildsList = document.getElementById('builds-list')

builds = JSON.parse(localStorage.getItem('builds')) || []

if (builds.length == 0) {
    const emptyBuildsAlert = document.createElement('p')
    emptyBuildsAlert.textContent = 'There are no builds yet! You should try creating one'
    
    buildsList.append(emptyBuildsAlert)
}

// CREATE BUILD ELEMENTS FROM BUILDS