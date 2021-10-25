const _ = require('lodash')
const schemaorg = require('./schemaorg-13.0.json')

const graph = {}
schemaorg['@graph'].forEach(x => graph[x['@id']] = x)

const classes = {}

class Property {
	constructor(source) {
		this.source = source
	}
	get id() {
		return this.source['@id']
	}
	get label() {
		return this.source['rdfs:label']
	}
	get name() {
		return _.snakeCase(this.source['rdfs:label'])
	}
	addType(c) {
		if (!this.types) this.types = []
		this.types.push(c)
	}
}

class Class {
	constructor(source) {
		this.source = source
		this.properties = []
		this.enumerations = []
	}
	get id() {
		return this.source['@id']
	}
	get label() {
		return this.source['rdfs:label']
	}
	get type() {
		const label = this.label
		switch (label) {
			case 'Time': return 'string'
			case 'Number': return 'float32'
			case 'DateTime': return 'string'
			case 'Boolean': return 'bool'
			case 'Date': return 'string'
			case 'Text': return 'string'
		}
		return label
	}
	get comment() {
		if (this.source['rdfs:comment']) return ' // ' + this.source['rdfs:comment'].replace(/\n/g, ' ')
		return ''
	}
	get name() {
		return _.snakeCase(this.source['rdfs:label'])
	}
	isDataType() {
		const types = Array.isArray(this.source['@type']) && this.source['@type'] || [this.source['@type']]
		if (types.includes('schema:DataType')) return true
		if (!this.source['rdfs:subClassOf']) return false
		if (this.source['rdfs:subClassOf'].length) return false
		const superClassId = this.source['rdfs:subClassOf']['@id']
		const superClass = classes[superClassId]
		if (!superClass) return false
		return superClass.isDataType()
	}
	getAncestorType() {
		if (!this.isDataType()) return this.type
		if (this.source['rdfs:subClassOf']) {
			const superClassId = this.source['rdfs:subClassOf']['@id']
			const superClass = classes[superClassId]
			return superClass.getAncestorType()
		}
		return this.type
	}
	addProperty(property) {
		this.properties.push(property)
	}
	getProperties() {
		const properties = []
		const c = this
		properties.push([c.label, c.properties.sort((a, b) => a.label < b.label ? -1 : 1)])
		if (c.source['rdfs:subClassOf']) {
			const superClasses = Array.isArray(c.source['rdfs:subClassOf']) && c.source['rdfs:subClassOf'] || [c.source['rdfs:subClassOf']]
			const superProperties = superClasses.map(c => {
				const superClass = classes[c['@id']]
				if (!superClass) return []
				return superClass.getProperties()
			}).filter(Boolean)
			// console.log(_.flatten(superProperties))
			properties.push(..._.flatten(superProperties))
		}
		return _.uniqBy(properties.reverse(), p => p[0]).reverse()
		// let c = this
		// while (c) {
		// 	properties.push([c.label, c.properties.sort((a, b) => a.label < b.label ? -1 : 1)])
		// 	if (!c.source['rdfs:subClassOf']) break


		// 	const superClassId = c.source['rdfs:subClassOf']['@id']
		// 	c = classes[superClassId]
		// }
		// return properties
	}
}

function isClass(type) {
	if (!type) return false
	if (Array.isArray(type)) return type.some(isClass)
	return type === 'rdfs:Class'
}

function isProperty(type) {
	if (!type) return false
	if (Array.isArray(type)) return type.some(isClass)
	return type === 'rdf:Property'
}

function isSpecificType(type) {
	return !isClass(type) && !isProperty(type)
}

_.filter(graph, (properties) => isClass(properties['@type'])).forEach(x => {
	const c = new Class(x)
	classes[c.id] = c
})

_.filter(graph, (properties) => isProperty(properties['@type'])).forEach(x => {
	const p = new Property(x)

	let domainIncludes = x['schema:domainIncludes']
	if (!domainIncludes) return
	if (!Array.isArray(domainIncludes)) {
		domainIncludes = [domainIncludes].filter(Boolean)
	}
	
	let rangeIncludes = x['schema:rangeIncludes']
	if (!Array.isArray(rangeIncludes)) {
		rangeIncludes = [rangeIncludes].filter(Boolean)
	}

	const ids = rangeIncludes.map(y => y['@id'])
	ids.forEach(id => {
		const c = classes[id]
		if (!c) return
		p.addType(c)
	})

	domainIncludes.forEach(inc => {
		const id = inc['@id']
		const c = classes[id] = classes[id] || {}
		c.addProperty(p)
	})
})

_.filter(graph, (properties) => isSpecificType(properties['@type'])).forEach(x => {
	let types = x['@type']
	if (!types) return
	if (!Array.isArray(types)) {
		types = [types].filter(Boolean)
	}
	types.forEach(type => {
		if (!type.startsWith('schema:')) return
		classes[type]?.enumerations.push(x)
	})
})

// console.log(domains['schema:Product'])
// console.log(domains['schema:Review'])

const memoize = {}

function walkThrough(parent) {
	parent.properties.forEach(p => {
		p.types.forEach(t => {
			const id = t.id
			if (memoize[id]) return
			memoize[id] = true
			walkThrough(t)
		})
	})
}

walkThrough(classes['schema:Product'])

// console.log(_.keys(memoize))


function renderClass(c) {
	console.log(`message ${c.label} {`)
	let fieldNumber = 1
	c.getProperties().forEach((pair, i) => {
		const className = pair[0]
		const properties = pair[1]
		if (className === c.label) {
			console.log(`  // from ${className}`)
		} else {
			console.log(`  // inherited from ${className}`)
		}
		properties.forEach((p, j) => {
			if (p.types.length > 1) {
				if (_.uniq(p.types.map(t => t.getAncestorType())).length === 1) {
					const t = p.types[0]
					console.log(`  ${t.getAncestorType()} ${p.name} = ${fieldNumber++};${t.comment}`)
					return
				}
				console.log(`  oneof ${p.name} {`)
				p.types.forEach((t, k) => {
					console.log(`    ${t.getAncestorType()} ${t.name} = ${fieldNumber++};${t.comment}`)
				})
				console.log(`  }`)

			} else {
				const t = p.types[0]
				console.log(`  ${t.getAncestorType()} ${p.name} = ${fieldNumber++};${t.comment}`)
			}
		})
	})
	console.log(`}`)
}

_.keys(memoize)/*.slice(0, 4)*/.forEach(id => {
	const c = classes[id]
	if (c.isDataType()) return
	renderClass(c)
	// console.log(id, classes[id])
})
// console.log(classes['schema:URL'].isDataType())
// renderClass(classes['schema:MedicalCode'])
// renderClass(classes['schema:DefinedTerm'])
// console.dir(classes['schema:DefinedTerm'].getProperties())
// renderClass(classes['schema:URL'])