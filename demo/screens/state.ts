export type Screen = "start" | "levels" | "battle" | "result";
export interface BattleResult {
  id: string;
  level: number;
  victory: boolean;
  stars: number;
  coins: number;
  gems: number;
  seconds: number;
  damage: number;
  deployments: number;
}
export interface SaveData {
  coins: number;
  gems: number;
  stars: number[];
  claimed: string[];
  lastResult: BattleResult | null;
}
export const initialSave: SaveData = {
  coins: 1280,
  gems: 80,
  stars: Array(8).fill(0),
  claimed: [],
  lastResult: null,
};
export const levelNames = [
  "晨光草地",
  "林间小径",
  "古老营地",
  "石桥要塞",
  "翡翠森林",
  "迷雾山谷",
  "寒霜边境",
  "王冠堡垒",
];
export const storageKey = "crown-ui-adventure-v1";
export function readSave(): SaveData {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) || "null");
    if (
      value &&
      Number.isFinite(value.coins) &&
      Number.isFinite(value.gems) &&
      Array.isArray(value.stars) &&
      value.stars.length === 8 &&
      value.stars.every(
        (n: unknown) => Number.isInteger(n) && Number(n) >= 0 && Number(n) <= 3,
      ) &&
      Array.isArray(value.claimed)
    )
      return { ...initialSave, ...value };
  } catch {
    /* A malformed browser-local demo save starts a fresh adventure. */
  }
  return { ...initialSave, stars: [...initialSave.stars] };
}
export function grantResult(save: SaveData, result: BattleResult): SaveData {
  if (save.claimed.includes(result.id)) return save;
  return {
    ...save,
    coins: save.coins + result.coins,
    gems: save.gems + result.gems,
    stars: save.stars.map((n, i) =>
      i === result.level - 1 ? Math.max(n, result.stars) : n,
    ),
    claimed: [...save.claimed.slice(-49), result.id],
  };
}
let audio: AudioContext | undefined;
export function playTone(
  enabled: boolean,
  volume: number,
  kind: "click" | "deploy" | "victory" = "click",
) {
  if (!enabled || volume === 0) return;
  try {
    audio ??= new AudioContext();
    void audio.resume();
    const notes =
      kind === "victory"
        ? [523, 659, 784, 1046]
        : kind === "deploy"
          ? [392, 587]
          : [587, 784];
    notes.forEach((hz, i) => {
      const osc = audio!.createOscillator();
      const gain = audio!.createGain();
      const start = audio!.currentTime + i * 0.09;
      osc.type = "sine";
      osc.frequency.value = hz;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime((volume / 100) * 0.08, start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.16);
      osc.connect(gain);
      gain.connect(audio!.destination);
      osc.start(start);
      osc.stop(start + 0.18);
    });
  } catch {
    /* Browser audio support is optional. */
  }
}
