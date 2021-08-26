addLayer('m', {
	name: 'milestone', // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: 'M', // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: false,
		points: new Decimal(0),
	}},
	color: '#1959e3',
	requires: new Decimal(25), // Can be a function that takes requirement increases into account
	resource: 'milestone cubes', // Name of prestige currency
	baseResource: 'prestige points', // Name of resource prestige is based on
	baseAmount() { return player.p.points }, // Get the current amount of baseResource
	type: 'static', // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent: 1.25, // Prestige currency exponent
	base: 4,
	roundUpCost: true,
	gainMult() { // Calculate the multiplier for main currency from bonuses
		mult = new Decimal(1);
		return mult;
	},
	gainExp() { // Calculate the exponent on main currency from bonuses
		return new Decimal(1);
	},
	row: 1, // Row the layer is in on the tree (0 is the first row)
	branches: ['p'],
	hotkeys: [
		{ key: 'm', description: 'M: Reset for milestone cubes', onPress() { if (canReset(this.layer)) doReset(this.layer) } },
	],
	layerShown() { return hasUpgrade('p', 14) || player.m.unlocked },
	milestones: {
		0: {
			requirementDescription: '1 milestone cube',
			effectDescription: 'Gain 10% of your prestige point gain per second',
			done() { return player.m.total.gte(1) },
		},
		1: {
			requirementDescription: '2 milestone cubes',
			effectDescription: 'Unlock a new row of prestige upgrades',
			done() { return player.m.total.gte(2) },
		},
		2: {
			requirementDescription: '3 milestone cubes',
			effectDescription: 'Keep prestige upgrades on row 2 reset',
			done() { return player.m.total.gte(3) },
		},
	},
});
