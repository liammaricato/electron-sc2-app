const backBtn = document.getElementById('back')
const buildStepsContainer = document.getElementById('build-steps')

const builds = JSON.parse(localStorage.getItem('builds')) || []
const currentBuildId = sessionStorage.getItem('openBuildId') || 0

const build = builds.find(build => build.id == currentBuildId)

if (!build) {
    backBtn.click()
}

document.getElementById('build-title').textContent = build.title || 'Untitled build'

for (step of build.steps) {
    createBuildStep(step)
}

function createBuildStep(step) {
    const stepEl = document.createElement('div')
    stepEl.classList.add('build-step')
    stepEl.innerHTML = `
        <input type="time" name="time" placeholder="Time" value="${step.time}" disabled>
        <input type="text" name="supply" placeholder="supply" value="${step.supply}" disabled>
        <input type="text" name="description" placeholder="description" value="${step.description}" disabled>
    `

    buildStepsContainer.appendChild(stepEl)
}