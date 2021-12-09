import { readFile } from './utils.js'

(async () => {
	const file = 'inputs/third-input.txt'
	const data = readFile(file)
	const parsedData = data.split('\n')
	
	let index = 0
	const everyIndex = {}
	while (parsedData[0].length >= index + 1) {
		parsedData.forEach((binary) => {
			everyIndex[index] = [ ...(everyIndex[index] || []), binary[index]]
		})
		index++
	}
	
	const howManyFc = (array) => array.reduce((acc, current) => {
		if (Number(current)) {
			acc['1'] = acc['1'] + 1
		} else {
			acc['0'] = acc['0'] + 1
		}
		return acc
	}, { '0': 0, '1': 0 })

	const result = Object.values(everyIndex).reduce((acc, binary) => {
		const howMany = howManyFc(binary)
		acc.push(howMany['0'] > howMany['1'] ? '0' : '1')
		return acc
	}, [])

	const gama = result.reduce((acc, current) => {
		acc = acc + current
		return acc
	}, '')

	const epsilon = result.reduce((acc, current) => {
		acc = acc + (current === '1' ? '0' : '1')
		return acc
	}, '')
	const gamaDecimal = parseInt(gama, 2)
	const epsilonDecimal = parseInt(epsilon, 2)

	const final = gamaDecimal * epsilonDecimal

	// part two
	// find oxygen and CO2
	const ratingGenerator = (array, index, findOxygen) => {
		const remainingBinaries = []
		let zero = 0
		let one = 0
		array.forEach((binary) => {
			String(binary[index]) === '1' ? one += 1 : zero += 1
		})

		array.forEach((binary) => {
			if (findOxygen) {
				const mostCommon = one >= zero ? '1' : '0'
				if (binary[index] === mostCommon) {
					remainingBinaries.push(binary)
				}
			} else {
				const leastCommon = one >= zero ? '0' : '1'
				if (binary[index] === leastCommon) {
					remainingBinaries.push(binary)
				}
			}
		})

		if (remainingBinaries.length === 1) {
			return remainingBinaries[0]
		}
		return ratingGenerator(remainingBinaries, index + 1, findOxygen)
	}

	const oxygenRating = ratingGenerator(parsedData, 0, true)
	const co2Rating = ratingGenerator(parsedData, 0, false)
	const finalResultPartTwo = parseInt(oxygenRating, 2) * parseInt(co2Rating, 2)
	console.log(finalResultPartTwo)
})()
