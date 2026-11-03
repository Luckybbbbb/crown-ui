import type { IconName } from "../../src";
export const deck: {
  name: string;
  cost: number;
  icon: IconName;
  damage: number;
  rarity: "common" | "rare" | "epic";
  kind: "unit" | "spell" | "heal";
}[] = [
  {
    name: "皇家骑士",
    cost: 3,
    icon: "sword",
    damage: 105,
    rarity: "rare",
    kind: "unit",
  },
  {
    name: "森林游侠",
    cost: 2,
    icon: "leaf",
    damage: 65,
    rarity: "common",
    kind: "unit",
  },
  {
    name: "烈焰法术",
    cost: 4,
    icon: "flame",
    damage: 280,
    rarity: "epic",
    kind: "spell",
  },
  {
    name: "守护祝福",
    cost: 3,
    icon: "shield",
    damage: 230,
    rarity: "rare",
    kind: "heal",
  },
];
export interface Unit {
  id: number;
  card: number;
  x: number;
  y: number;
  cooldown: number;
}
export interface Effect {
  id: number;
  x: number;
  y: number;
  text: string;
  kind: "damage" | "heal" | "deploy";
  ttl: number;
}
export interface BattleState {
  level: number;
  elapsed: number;
  remaining: number;
  elixir: number;
  ownHP: number;
  ownMax: number;
  enemyHP: number;
  enemyMax: number;
  units: Unit[];
  effects: Effect[];
  nextId: number;
  enemyAttack: number;
  damage: number;
  deployments: number;
  status: "playing" | "victory" | "defeat";
}
export function createBattle(level: number): BattleState {
  return {
    level,
    elapsed: 0,
    remaining: 75,
    elixir: 6,
    ownHP: 1400,
    ownMax: 1400,
    enemyHP: 1000 + level * 120,
    enemyMax: 1000 + level * 120,
    units: [],
    effects: [],
    nextId: 1,
    enemyAttack: 5,
    damage: 0,
    deployments: 0,
    status: "playing",
  };
}
export function deployCard(
  state: BattleState,
  cardIndex: number,
  x: number,
  y: number,
): BattleState {
  const card = deck[cardIndex];
  if (
    !card ||
    state.status !== "playing" ||
    state.elixir < card.cost ||
    y < 47 ||
    y > 94
  )
    return state;
  const next = {
    ...state,
    elixir: state.elixir - card.cost,
    nextId: state.nextId + 1,
    deployments: state.deployments + 1,
  };
  if (card.kind === "spell") {
    next.enemyHP = Math.max(0, next.enemyHP - card.damage);
    next.damage += Math.min(card.damage, state.enemyHP);
    next.effects = [
      ...state.effects,
      {
        id: state.nextId,
        x: 50,
        y: 20,
        text: `−${card.damage}`,
        kind: "damage",
        ttl: 0.9,
      },
    ];
  } else if (card.kind === "heal") {
    const heal = Math.min(card.damage, state.ownMax - state.ownHP);
    next.ownHP = Math.min(state.ownMax, state.ownHP + card.damage);
    next.effects = [
      ...state.effects,
      {
        id: state.nextId,
        x: 50,
        y: 81,
        text: `+${heal}`,
        kind: "heal",
        ttl: 0.9,
      },
    ];
  } else {
    next.units = [
      ...state.units,
      {
        id: state.nextId,
        card: cardIndex,
        x: Math.max(12, Math.min(88, x)),
        y,
        cooldown: 0,
      },
    ];
    next.effects = [
      ...state.effects,
      { id: state.nextId, x, y, text: "出战！", kind: "deploy", ttl: 0.7 },
    ];
  }
  if (next.enemyHP === 0) next.status = "victory";
  return next;
}
export function tickBattle(state: BattleState, dt: number): BattleState {
  if (state.status !== "playing") return state;
  const next: BattleState = {
    ...state,
    elapsed: state.elapsed + dt,
    remaining: Math.max(0, state.remaining - dt),
    elixir: Math.min(10, state.elixir + dt * 0.72),
    effects: state.effects
      .map((e) => ({ ...e, ttl: e.ttl - dt }))
      .filter((e) => e.ttl > 0),
    enemyAttack: state.enemyAttack - dt,
  };
  next.units = state.units.map((unit) => {
    const u = {
      ...unit,
      y: Math.max(25, unit.y - dt * 7),
      cooldown: unit.cooldown - dt,
    };
    if (u.y <= 25 && u.cooldown <= 0) {
      const damage = deck[u.card].damage;
      next.damage += Math.min(damage, next.enemyHP);
      next.enemyHP = Math.max(0, next.enemyHP - damage);
      u.cooldown = 1.7;
      next.effects.push({
        id: next.nextId++,
        x: 45 + (u.x % 16),
        y: 19,
        text: `−${damage}`,
        kind: "damage",
        ttl: 0.8,
      });
    }
    return u;
  });
  if (next.enemyAttack <= 0) {
    const damage = 105 + state.level * 12;
    next.ownHP = Math.max(0, next.ownHP - damage);
    next.enemyAttack = 5;
    next.effects.push({
      id: next.nextId++,
      x: 50,
      y: 76,
      text: `−${damage}`,
      kind: "damage",
      ttl: 1,
    });
  }
  if (next.enemyHP === 0) next.status = "victory";
  else if (next.ownHP === 0 || next.remaining === 0) next.status = "defeat";
  return next;
}
