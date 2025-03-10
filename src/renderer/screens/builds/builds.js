// builds = [
//     {
//         name: 'Build 1'
//     },
//     {
//         name: 'Build 2'
//     },
//     {
//         name: 'Build 3'
//     }
// ]

// localStorage.setItem('builds', JSON.stringify(builds));

parsedBuilds = JSON.parse(localStorage.getItem('builds'));

console.log(parsedBuilds);