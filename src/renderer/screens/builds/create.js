const backBtn = document.getElementById('back')
const addStepBtn = document.getElementById('add-step')
const saveBtn = document.getElementById('save-build')
const stepsContainer = document.getElementById('build-steps')

const baseBuildStep = document.querySelector('.build-step').cloneNode(true)

const savedBuilds = JSON.parse(localStorage.getItem('builds')) || []

let lastBuildId = 0
for (savedBuild of savedBuilds) {
    if (savedBuild.id > lastBuildId) lastBuildId = savedBuild.id
}

addStepBtn.addEventListener('click', () => {
    newStep = baseBuildStep.cloneNode(true)
    stepsContainer.append(newStep)
})

saveBtn.addEventListener('click', () => {
    build = {
        id: lastBuildId + 1,
        title: document.getElementById('build-title').value,
        steps: []
    }

    for (step of document.querySelectorAll('.build-step')) {
        data = stepData(step)

        if (data) build.steps.push(data)
    }

    if (build.steps.length == 0) return

    savedBuilds.push(build)
    localStorage.setItem('builds', JSON.stringify(savedBuilds))

    backBtn.click()
})

function stepData(step) {
    elements = step.children

    time = elements[0].value
    supply = elements[1].value
    description = elements[2].value

    if (!time && !supply && !description) return

    return { time, supply, description }
}