import { readFile } from './utils.js'

(async () => {
	const file = 'inputs/fifth-input.txt'
	const data = readFile(file)
	const parsedData = data.split('\n').map((entry) => {
		if (!entry) {
			return
		}
		const parsed = entry.split('->').map((s) => s.trim())
		const firstCoordinates = parsed[0].split(',')
		const secondCoordinates = parsed[1].split(',')
		return {
			x1: Number(firstCoordinates[0]),
			y1: Number(firstCoordinates[1]),
			x2: Number(secondCoordinates[0]),
			y2: Number(secondCoordinates[1]),
		}
	}).filter(Boolean)
	
	// part one
	const dataPartOne = parsedData.filter(({ x1, x2, y1, y2 }) => x1 === x2 || y1 === y2)
	const calculatePointsBetween = ({ x1, x2, y1, y2 }) => {
		const list = []
		if (x1 === x2) {
			for(let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++){
				list.push({ x: x1, y: i })
			}
		}

		if (y1 === y2) {
			for(let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++){
				list.push({ x: i, y: y1 })
			}
		}

		return list
	}
	const coordinatesOfEveryPoint = dataPartOne.map(calculatePointsBetween).flat()
	const mapOfPointsCrossed = coordinatesOfEveryPoint.reduce((acc, current) => {
		const key = JSON.stringify(current)
		if (acc[key]) {
			acc[key] += 1
		} else {
			acc[key] = 1
		}
		return acc
	}, {})

	const finalNumberOfPointsOverlapped = Object.values(mapOfPointsCrossed).filter((number) => number > 1).length
	
	// part two

})()
