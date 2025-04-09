const backBtn = document.getElementById('back')
const addStepBtn = document.getElementById('add-step')
const saveBtn = document.getElementById('save-build')
const buildStepsContainer = document.getElementById('build-steps')

const builds = JSON.parse(localStorage.getItem('builds')) || []
const currentBuildId = sessionStorage.getItem('openBuildId') || 0

const build = builds.find(build => build.id == currentBuildId)

if (!build) {
    backBtn.click()
}

document.getElementById('build-title').value = build.title

for (step of build.steps) {
    buildStep = newBuildStep(step)
    buildStepsContainer.appendChild(buildStep)
}

addStepBtn.addEventListener('click', () => {
    newStep = newBuildStep({})
    buildStepsContainer.append(newStep)
})

saveBtn.addEventListener('click', () => {
    build.title = document.getElementById('build-title').value
    build.steps = []

    for (step of document.querySelectorAll('.build-step')) {
        data = stepData(step)

        if (data) build.steps.push(data)
    }

    if (build.steps.length == 0) return

    localStorage.setItem('builds', JSON.stringify(builds))

    backBtn.click()
})

function newBuildStep(step) {
    const stepEl = document.createElement('div')
    stepEl.classList.add('build-step')
    stepEl.innerHTML = `
        <input type="time" name="time" placeholder="Time" value="${step.time || ''}">
        <input type="text" name="supply" placeholder="supply" value="${step.supply || ''}">
        <input type="text" name="description" placeholder="description" value="${step.description || ''}">
    `

    return stepEl
}

function stepData(step) {
    elements = step.children

    time = elements[0].value
    supply = elements[1].value
    description = elements[2].value

    if (!time && !supply && !description) return

    return { time, supply, description }
}