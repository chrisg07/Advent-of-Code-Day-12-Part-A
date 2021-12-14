let validPaths = new Array<Array<string>>()
let nodes = new Array<Node>()

const	generatePaths = function generatePaths(nodeValue: string, path: Array<string>): void {
	const nodeIndex = nodes.findIndex((node) => node.value === nodeValue)
	const node = nodes[nodeIndex]
	// console.log(`Generate path for node ${nodeValue} with path ${path}`)
	path.push(nodeValue)
	if (nodeValue === 'end') {
		validPaths.push(path)
		return
	} else {
		for (const cave of node.adjacencyList) {
			const conditionalPath = pathCanFitNode(path, cave)
			if (conditionalPath && cave !== 'start') {
				// console.log('traversing to cave', nodeValue, cave)
				generatePaths(cave, [...conditionalPath])
			}
		}
	}
}

const	pathContainsNode = function pathContainsNode(path: Array<string>, nodeToFind: string): boolean {
	const index = path.indexOf(nodeToFind) >= 0
	return index
}

const pathCanFitNode = function pathCanFitNode(path: Array<string>, nodeToFind: string): Array<string> | undefined {
	const nodeIndex = nodes.findIndex((node) => node.value === nodeToFind)
	const node = nodes[nodeIndex]
	if (!isSmallCave(nodeToFind)) {
		return path
	} else {
		const occurences = path.filter((node) => node === nodeToFind)
		const numOccurences = occurences.length
		if (numOccurences === 1 && path[0] !== 'doubleSmallCaveFlag') {
			// console.log('added double cave to path: ', path, nodeToFind)
			return ['doubleSmallCaveFlag', ...path]
		} else if (numOccurences < 1) {
			return path
		}
	}
	return undefined
}

const isSmallCave = function isSmallCave(str: string): boolean {
	return !isAllUpperCase(str);
}

const isAllUpperCase = function isAllUpperCase(str) {
	return !/[a-z]/.test(str) && /[A-Z]/.test(str);
}

module.exports = class ProblemSolver {
	answer = 0

  constructor(lines) {
		for (let [index, entry] of lines.entries()) {
			if (entry) {
				// row of input
				const nodeValues = entry.split('-')
				const parentValue = nodeValues[0]
				const childValue = nodeValues[1]
				let parent: Node
				let child: Node
				console.log(nodes)
				const parentIndex = nodes.findIndex((node) => node.value === parentValue)
				const childIndex = nodes.findIndex((node) => node.value === childValue)

				if (childIndex >= 0) {
					nodes[childIndex].addNode(parentValue)
				} else {
					let childNode = new Node(childValue)
						childNode.addNode(parentValue)
					nodes.push(childNode)
				}

				if (parentIndex >= 0) {
					nodes[parentIndex].addNode(childValue)
				} else {
					let parentNode = new Node(parentValue)
						parentNode.addNode(childValue)
					nodes.push(parentNode)
				}
			}
		}
		const endIndex = nodes.findIndex((node) => node.value === 'end')
		nodes[endIndex].adjacencyList = []
		console.log(nodes)
		const startIndex = nodes.findIndex((node) => node.value === 'start')
		const start = nodes[startIndex]
		generatePaths(start.value, [])
		// console.log(validPaths)
		this.answer = validPaths.length
  }

}

class Node {
	value: string
	adjacencyList = new Array<string>()

	constructor(value: string) {
		this.value = value
	}

	addNode(value: string) {
		this.adjacencyList.push(value)
	}
}