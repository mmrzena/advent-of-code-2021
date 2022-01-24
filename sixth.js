import { readFile } from './utils.js'

(async () => {
	const file = 'inputs/sixth-input.txt'
	const data = readFile(file)
	const parsedData = data.split(',').filter(Boolean).map((fish) => Number(fish))
	const fishes = parsedData.reduce((acc, currentFish) => {
		acc[currentFish] = ++acc[currentFish]
		return acc
	}, { '0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0 })
	
	const getNumberOfFishes = (fishes) => Object.values(fishes).reduce((acc, item) => acc + item, 0)
	const life = (fishes) => {
		const currentFishes = {...fishes}
		const numberOfNewFishes = currentFishes['0']
		for (let i = 8; i >= 0; i--) {
			if (i === 0) {
				fishes['8'] = currentFishes['0']
				fishes['6'] = fishes['6'] + currentFishes['0']
				break;
			}
			fishes[i - 1] = currentFishes[i]
		}
	}
	const part1 = {...fishes}
	for (let i = 0; i < 80; i++) {
		life(part1)
	}
	console.log(getNumberOfFishes(part1))

	const part2 = {...fishes}
	for (let i = 0; i < 256; i++) {
		life(part2)
	}
	console.log(getNumberOfFishes(part2))
})()
