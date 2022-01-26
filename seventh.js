import { readFile } from './utils.js'

(async () => {
	const file = 'inputs/seventh-input.txt'
	const data = readFile(file)
	const parsedData = data.split(',').filter(Boolean).map((fish) => Number(fish))
	const getMedian = (array) => {
		const sortedArray = [...array].sort((a, b) => a - b);
		const isEven = sortedArray.length % 2 === 0
		const middle = Math.floor(sortedArray.length / 2)
		if (isEven) {
			return sortedArray[middle]
		}
		return (sortedArray[middle - 1] + sortedArray[middle]) / 2
	}
	const median = getMedian(parsedData)
	const findFuels = parsedData.reduce((fuels, crab) => {
		const fuel = Math.abs(median - crab)
		return fuels + fuel
	}, 0)
	// part 1
	console.log(findFuels)
	
	const getAverage = (array) => Math.floor(array.reduce((a, b) => a + b) / array.length);
	const average = getAverage(parsedData)
	const findFuels2 = parsedData.reduce((fuels, crab) => {
		const dif = Math.abs(crab - average)
		const fuel = dif * (dif + 1) / 2
		return fuels + fuel
	}, 0)
	// part 2
	console.log(findFuels2)
})()
