import { readFile } from './utils.js'

(async () => {
	const file = 'inputs/fourth-input.txt'
	const data = readFile(file)
	const parsedData = data.split('\n')
	const numbers = parsedData.shift().split(',')
	const boards = parsedData.reduce((acc, current, index) => {
		if (!current) {
			if (acc[acc.length - 1]) {
				const columns = acc[acc.length - 1][0].reduce((cumulus, number, index) => {
					const column = [number]
					for (let i = 1; i < 5; i++) {
						column.push(acc[acc.length - 1][i][index])
					}
					cumulus.push(column)
					return cumulus
				}, [])
				acc[acc.length - 1] = [...acc[acc.length - 1], ...columns]
			}
			acc = [...acc, []]
			return acc
		}

		if (current) {
			const row = current.split(' ').filter(Boolean)
			acc[acc.length - 1].push(row)
		}

		return acc
	}, [])
	
	const flattenedArrays = boards.flat(1)

	let boardNumber = 0
	const generateBoardNumber = (index) => {
		if ((index) % 10 === 0) {
			boardNumber++
		}
		return boardNumber
	}

	const foundBingoResults = flattenedArrays.map((array, index) => {
		let allChecked = 0
		let howManyNumberWasUsed = 0
		for (let i = 0; i < numbers.length; i++) {
			howManyNumberWasUsed++
			if (array.includes(numbers[i])) {
				allChecked++
				if (allChecked === 5) {
					break;
				}
			}
		}
		const newArray = [...array, { board: generateBoardNumber(index), howManyNumberWasUsed }]
		return newArray
	})

	const sortedByNumberOfIndexes = foundBingoResults.slice().sort(function(a, b) {
    return a[5].howManyNumberWasUsed - b[5].howManyNumberWasUsed;
	})

	const winningBoard = sortedByNumberOfIndexes[0][5]
	const drawnNumbers = numbers.slice(0, winningBoard.howManyNumberWasUsed)

	const sumOfUnmarkedNumbers = (board, numbers) => foundBingoResults
		.filter((array) => array[5].board === board)
		.reduce((acc, array) => {
			array.forEach((number) => {
				if (typeof number === 'string' && !numbers.includes(number) && acc.indexOf(number) === -1) {
					acc.push(number)
				}
			})
			return acc
		}, [])

		const result = sumOfUnmarkedNumbers(winningBoard.board, drawnNumbers).reduce((acc, number) => acc += parseInt(number, 10), 0) * drawnNumbers[drawnNumbers.length - 1]

		// part two
		let boardNumberPartTwo = 1
		const boardsNumbers = [...new Set(foundBingoResults.map((arr) => arr[5].board))]
		const bingoBoardsResultsByOrder = boardsNumbers.reduce((acc, currentBoard) => {
			const boards = foundBingoResults.filter((arr) => arr[5].board === currentBoard).sort(function(a, b) {
				return a[5].howManyNumberWasUsed - b[5].howManyNumberWasUsed;
			})
			acc.push(boards[0])
			return acc
		}, [])

		const sortedByNumberOfIndexesPartTwo = bingoBoardsResultsByOrder.slice().sort(function(a, b) {
			return a[5].howManyNumberWasUsed - b[5].howManyNumberWasUsed;
		})

		const lastBoard = sortedByNumberOfIndexesPartTwo[sortedByNumberOfIndexesPartTwo.length - 1][5]
		const drawnNumbersPartTwo = numbers.slice(0, lastBoard.howManyNumberWasUsed)

		const resultPartTwo = sumOfUnmarkedNumbers(lastBoard.board, drawnNumbersPartTwo).reduce((acc, number) => acc += parseInt(number, 10), 0) * drawnNumbersPartTwo[drawnNumbersPartTwo.length - 1]
})()
