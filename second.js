import { readFile } from './utils.js'

(async () => {
	const file = 'inputs/second-input.txt'
	const data = readFile(file)
	const parsedData = data.split('\n')
	const move = {
		FORWARD: 'forward',
		UP: 'up',
		DOWN: 'down',
	}

	const dicks = parsedData.reduce((acc, current) => {
		const parts = current.split(' ').map((a) => a.trim())
		const movement = parts[0]
		const meters = Number(parts[1])
		if (meters) {
			if (movement === move.FORWARD) {
				acc.horizontal += meters
				return acc
			}
			if (movement === move.UP) {
				acc.depth -= meters
				return acc
			}
			acc.depth += meters
			return acc
		}
		return acc
	}, {
		horizontal: 0,
		depth: 0,
	})
	// console.log('dicks', dicks.depth * dicks.horizontal)
	
	const dicksPartTwo = parsedData.reduce((acc, current) => {
		const parts = current.split(' ').map((a) => a.trim())
		const movement = parts[0]
		const meters = Number(parts[1])
		if (meters) {
			if (movement === move.UP) {
				acc.aim -= meters
				return acc
			}
			if (movement === move.DOWN) {
				acc.aim += meters
				return acc
			}

			acc.horizontal += meters
			acc.depth += acc.aim * meters
			return acc
			
		}
		return acc
	}, {
		horizontal: 0,
		depth: 0,
		aim: 0,
	})
	console.log('dicks', dicksPartTwo.depth * dicksPartTwo.horizontal)
})()
