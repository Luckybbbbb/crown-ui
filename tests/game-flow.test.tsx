import { describe, expect, it } from "vitest";
import { createBattle, deployCard, tickBattle } from "../demo/screens/engine";
import {
  grantResult,
  initialSave,
  type BattleResult,
} from "../demo/screens/state";
describe("complete demo flow", () => {
  it("rejects invalid deployment and insufficient resources", () => {
    const battle = createBattle(1);
    expect(deployCard(battle, 0, 50, 20)).toBe(battle);
    expect(deployCard({ ...battle, elixir: 1 }, 2, 50, 60).deployments).toBe(0);
  });
  it("can win by deploying units and awards stars according to remaining health", () => {
    let battle = createBattle(1);
    battle = deployCard(battle, 0, 40, 50);
    battle = deployCard(battle, 0, 60, 50);
    for (let n = 0; n < 750 && battle.status === "playing"; n++) {
      battle = tickBattle(battle, 0.1);
      if (battle.elixir >= 4) battle = deployCard(battle, 2, 50, 60);
    }
    expect(battle.status).toBe("victory");
    expect(battle.enemyHP).toBe(0);
    expect(battle.ownHP).toBeGreaterThan(0);
    expect(battle.damage).toBe(battle.enemyMax);
  });
  it("can lose and finished battles cannot keep advancing", () => {
    let battle = createBattle(1);
    for (let n = 0; n < 750; n++) battle = tickBattle(battle, 0.1);
    expect(battle.status).toBe("defeat");
    expect(tickBattle(battle, 10)).toBe(battle);
    expect(deployCard(battle, 0, 50, 60)).toBe(battle);
  });
  it("heals without exceeding max life and regenerates elixir without exceeding ten", () => {
    let battle = { ...createBattle(1), ownHP: 1350 };
    battle = deployCard(battle, 3, 50, 60);
    expect(battle.ownHP).toBe(1400);
    for (let n = 0; n < 100; n++) battle = tickBattle(battle, 0.1);
    expect(battle.elixir).toBeLessThanOrEqual(10);
  });
  it("claims each run once and preserves a previously better star rating", () => {
    const result: BattleResult = {
      id: "run-a",
      level: 1,
      victory: true,
      stars: 3,
      coins: 125,
      gems: 6,
      seconds: 20,
      damage: 1120,
      deployments: 4,
    };
    const first = grantResult(initialSave, result);
    expect(first.coins).toBe(initialSave.coins + 125);
    expect(first.stars[0]).toBe(3);
    expect(grantResult(first, result)).toBe(first);
    const second = grantResult(first, { ...result, id: "run-b", stars: 1 });
    expect(second.stars[0]).toBe(3);
    expect(second.coins).toBe(first.coins + 125);
  });
});
