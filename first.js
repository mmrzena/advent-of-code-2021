import { readFile } from './utils.js'

(async () => {
	const file = 'first-input.txt'
	const data = readFile(file)
	const parsedData = data.split('\n')
	const partOne = parsedData.reduce((numberOfIncreased, currentValue, index, array) => {
		const previousValue = array[index - 1]
		if (previousValue) {
			if (Number(currentValue) > Number(previousValue)) {
				numberOfIncreased += 1
			}
		}
		return numberOfIncreased
	}, 0)
	// console.log(partOne)

	let numberOfIncreased = 0
	for (let i = 0; i < parsedData.length; i++) {
		if (!parsedData[i + 3]) {
			break;
		}

		const A = parsedData[i]
		const B = parsedData[i + 3]
		
		if (Number(B) > Number(A)) {
			numberOfIncreased += 1
		}
	}

	// const partTwo = parsedData.reduce((numberOfIncreased, currentValue, index, array) => {
	// 	const A = currentValue + array[index + 1] + array[index + 2]
	// 	const B = array[index + 1] + array[index + 2] + array[index + 3]
	// 	const lastIndex = array.length - 1
	// 	if (array[index + 3] === lastIndex) {
	// 		return numberOfIncreased
	// 	}

	// 	if (B > A) {
	// 		numberOfIncreased += 1
	// 	}

	// 	return numberOfIncreased
	// }, 0)

	console.log(numberOfIncreased)
})()
