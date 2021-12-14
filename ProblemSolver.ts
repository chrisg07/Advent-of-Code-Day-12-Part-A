let validPaths = new Array<Array<Node>>()
let nodes = new Array<Node>()

const	generatePaths = function generatePaths(nodeValue: string, path: Array<Node>): void {
	const nodeIndex = nodes.findIndex((node) => node.value === nodeValue)
	const node = nodes[nodeIndex]
	console.log(`Generate path for node ${node.value} with path ${path.map(node => node.value)}`)
	// console.log(node)
	// path.add(node)

	// node.children.forEach()
	path.push(node)
	if (node.value === 'end') {
		validPaths.push([...path])
	} else {
		for (const cave of node.adjacencyList) {
			if (!isSmallCave(cave)) {
				console.log('traversing to large cave', node.value, cave)
				generatePaths(cave, [...path])
			} else if (!pathContainsNode([...path], cave)) {
				console.log('traversing to cave', node.value, cave.value)
				generatePaths(cave, [...path])
			}
		}
	}
}

const	pathContainsNode = function pathContainsNode(path: Array<Node>, nodeToFind: Node): boolean {
	const index = path.findIndex((node) => node.value === nodeToFind.value)
	return index >= 0
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
		console.log(nodes)
		const startIndex = nodes.findIndex((node) => node.value === 'start')
		const start = nodes[startIndex]
		generatePaths(start, [])
		console.log(validPaths)
		
		// find paths
  }



	// navigatePath(a: Node, b: Node, path: Array<Node>): Array<Node> {
	// 	if (b.node.value === 'end') {
	// 		path.push(b)
	// 		this.validPaths.push(path)
	// 		return path
	// 	} else if (a.isSmallCave() && b.isSmallCave()) {
	// 		// invalid, can't navigate
	// 	} else if (this.pathContainsNode(b) && b.isSmallCave()) {
	// 		// invalid, can't navigate
	// 	} else if ()
	// }


}

class Node {
	value: string
	adjacencyList = new Array<string>()

	constructor(value: string) {
		this.value = value
	}

	addNode(node: string) {
		this.adjacencyList.push(node.value)
	}
}