const fs = require('fs')
var ProblemSolver = require('./ProblemSolver.ts')

fs.readFile('input.txt', 'utf8', (err, data) => {
	if (err) {
		console.error(err)
		return
	}
	const entries = data.split(/\r?\n/).map(line => line.trim());
	const problemSolver = new ProblemSolver(entries, 100);
	console.log('answer: ', problemSolver.answer)
})