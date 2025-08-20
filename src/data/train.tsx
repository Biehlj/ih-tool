export type TrainSeries =
  | "Alien Dessert"
  | "Forgotten Artifact"
  | "Hero Token"
  | "Arcane Jewelry"
  | "Festival Treasure 2023"
  | "Magic Academy"
  | "Adventurous Guild"
  | "Retro Gaming"
  | "Hero Merch"
  | "Festival Treasure 2024"
  | "Enthralling Toyland"
  | "Quaint Antique"
  | "Dreamlike Fantasy"
  | "Paradise Treasure"
  | "Festival Treasure 2025"
  | "Mini Plushie"
  | "Monster Soul Pact"
  | "Strange Monster";

export type TrainExclusive = "Feature" | "Class" | "Faction" | "Monster";

export type TrainFeature =
  | "Void Campaign/Campaign"
  | "Starland Arena"
  | "Force War"
  | "IDA / TotC / FTA / Star Arena"
  | "Aspen Dungeon"
  | "Tower of Dream"
  | "Seal Land"
  | "Realms Gate"
  | "Void Vortex"
  | "Void Ark";

export type TrainFaction =
  | "Shadow"
  | "Fortress"
  | "Abyss"
  | "Forest"
  | "Dark"
  | "Light"
  | "Transcendence";

export type TrainClass = "Warrior" | "Mage" | "Ranger" | "Assassin" | "Priest";

export type TrainMonster = "Phoenix" | "Dyne" | "Niederhog" | "Sphinx"| "Fenlier" | "Fox" | "Jormangund" | "Apparition" | "Stone Golem" | "Nemean";

export type TrainRarity = "Pink" | "Orange" | "Red" | "Green" | "Purple";

export type TrainAttribute = "Fixed HP" | "Fixed Attack";

export type TrainItem =
    | "All Damage Dealt"
    | "All-damage Reduction"
    | "Armor"
    | "Armor Break"
    | "Attack %"
    | "Block"
    | "Control Immunity"
    | "Control Immunity Offset"
    | "Control Precision"
    | "Crit"
    | "Crit Damage"
    | "Crit Damage Reduction"
    | "Damage against Bled enemies"
    | "Damage against Burned enemies"
    | "Damage against Frozen enemies"
    | "Damage against Petrified enemies"
    | "Damage against Poisoned enemies"
    | "Damage against Stunned enemies"
    | "Damage Reduction"
    | "Damage Reduction by Attack"
    | "Dodge Offset"
    | "Dodge Rate"
    | "Heal Effect"
    | "HP %"
    | "Holy Damage"
    | "Maim"
    | "Precision"
    | "Reduce Damage dealt by Assassins"
    | "Reduce Damage dealt by Mages"
    | "Reduce Damage dealt by Priests"
    | "Reduce Damage dealt by Rangers"
    | "Reduce Damage dealt by Warriors"
    | "Reduces DoT received"
    | "Skill Damage"
    | "Speed";

// Discriminated union with optional exclusive
export type TrainTreasure = {
  series: TrainSeries;
  rarity: TrainRarity;
  basicAttributes: [TrainAttribute] | [TrainAttribute, TrainAttribute];
  exclusive?: "Feature" | "Faction" | "Class" | "Monster";
  features?: TrainFeature[];
  factions?: TrainFaction[];
  classes?: TrainClass[];
  monster?: TrainMonster[];
  items?: TrainItem[];
};

export interface TrainTreasures {
  [details: string]: TrainTreasure;
}

// Alien Dessert
let _trainTreasures: TrainTreasures = {
  "Butterfly Sky Mousse": {
    series: "Alien Dessert",
    rarity: "Pink",
    basicAttributes: ["Fixed HP"],
    exclusive: "Feature",
    features: ["Void Campaign/Campaign"],
    items: ["Speed"],
  },
  "Sweet Home Pie": {
    series: "Alien Dessert",
    rarity: "Pink",
    basicAttributes: ["Fixed Attack"],
    exclusive: "Feature",
    features: ["Void Campaign/Campaign"],
    items: ["Damage Reduction by Attack"],
  },
  "Cloud Milk Bread Rolls": {
    series: "Alien Dessert",
    rarity: "Orange",
    basicAttributes: ["Fixed HP"],
    exclusive: "Feature",
    features: ["Void Campaign/Campaign"],
    items: ["Control Immunity"],
  },

};


const lookup = {
  features: new Set<TrainFeature>(),
  factions: new Set<TrainFaction>(),
  classes: new Set<TrainClass>(),
  rarities: new Set<TrainRarity>(),
  series: new Set<TrainSeries>(),
  items: new Set<TrainItem>(),
  monster: new Set<TrainMonster>(),
};

Object.values(_trainTreasures).forEach(treasure => {
  lookup.series.add(treasure.series);
  lookup.rarities.add(treasure.rarity);

  treasure.features?.forEach((f: TrainFeature) => lookup.features.add(f));
  treasure.factions?.forEach((f: TrainFaction) => lookup.factions.add(f));
  treasure.classes?.forEach((c: TrainClass) => lookup.classes.add(c));
  treasure.monster?.forEach((m: TrainMonster) => lookup.monster.add(m));
  treasure.items?.forEach((i: TrainItem) => lookup.items.add(i));
});

export const lookupOptions = {
  features: Array.from(lookup.features).sort(),
  factions: Array.from(lookup.factions).sort(),
  classes: Array.from(lookup.classes).sort(),
  rarities: Array.from(lookup.rarities).sort(),
  series: Array.from(lookup.series).sort(),
  items: Array.from(lookup.items).sort(),
  monster: Array.from(lookup.monster).sort(),
};

// 2️⃣ Sorting treasures (still needed)
const rarityOrder: TrainRarity[] = ["Pink", "Orange", "Red", "Green", "Purple"];

const sortedTrainTreasures: TrainTreasures = Object.entries(_trainTreasures)
    .sort(([_, a], [__, b]) => {
        if (a.series !== b.series) return a.series.localeCompare(b.series);
        return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
    })
    .reduce((acc, [name, treasure]) => {
        acc[name] = treasure;
        return acc;
    }, {} as TrainTreasures);

export const trainTreasures = sortedTrainTreasures;