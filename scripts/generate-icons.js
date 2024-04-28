const fs = require('fs')
const caseFormat = require('case-anything');
const { parse } = require('svgson') 

const dirName = './src/lib/icon/svg/'


const readDir = (dir) => new Promise((resolve) => {
	fs.readdir(dir, function(err, filenames) {
		resolve(filenames)
	})
})

const formatSvg = (res) => {
	return res?.children?.filter(({ name }) => name !== 'title').map((child) => {
		const tagName = { tag: child.name }
		const attrs = {
			...child.attributes,
			fill: child.attributes.fill === 'none' ? undefined : child.attributes.fill
		}
		const reactAttrs = Object.entries(attrs).reduce((a, c) => {
			return {...a, [caseFormat.camelCase(c[0])]: c[1]}
		}, {})
		const sub = formatSvg(child)
		return {...tagName, attrs: reactAttrs, sub}
	})
}

const parseSvg = (content) => new Promise((resolve) => {
	parse(content).then((res) => {
		const children = JSON.stringify(formatSvg(res))
		resolve(`${children}`)
	})
})

const readFileContent = (dir, filename) => new Promise((resolve) => {
	fs.readFile(dir + filename, 'utf-8', function(err, content) {
		parseSvg(content).then((contentRes) => {
			resolve({name: caseFormat.snakeCase(filename.split('.')[0]), svg: contentRes })
		})
	})
})

const generate = async () => {
	const fileNames = await readDir(dirName)

	const promiseArray = []
	fileNames.forEach((fileName) => {
		promiseArray.push(readFileContent(dirName, fileName))
	})

	const fileContent = await Promise.all(promiseArray)

	const iconData = fileContent.map((icon) => {
		return `  ${icon.name} = '${icon.svg}'`
	})

	const content = `/*
 * This file is auto-generated
 * manual changes might be lost
 * check the http://localhost:6006/?path=/docs/documentation-generating-icons--docs file to update the list
 */

export enum icons {
${iconData.join(',\n')},
}
`
 fs.writeFile('./src/lib/icon/icon-list.ts', content, function (err) {
	 if (err) throw err
	 console.error('File is created successfully at /src/lib/icon/iconList.ts.')
 })
}

generate()


