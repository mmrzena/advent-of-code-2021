import fs from 'fs'

export const readFile = (fileName) => {
	const data = fs.readFileSync(fileName, 'utf8');
	return data
}
