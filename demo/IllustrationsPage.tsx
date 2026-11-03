import { useState } from "react";
import {
  Badge,
  Button,
  Chest,
  GameIllustration,
  Icon,
  type IllustrationName,
  type ChestState,
} from "../src";
const rarities = ["common", "rare", "epic", "legendary"] as const;
const names = {
  common: "普通 · 木箱",
  rare: "稀有 · 皇家宝箱",
  epic: "史诗 · 紫晶宝箱",
  legendary: "传说 · 王冠宝箱",
};
export function IllustrationsPage() {
  const [states, setStates] = useState<
    Record<(typeof rarities)[number], ChestState>
  >({ common: "idle", rare: "idle", epic: "idle", legendary: "idle" });
  const opening = rarities.some((r) => states[r] === "opening");
  return (
    <div className="doc-page illustration-page">
      <div className="doc-title">
        <Badge tone="gold">3D GAME ILLUSTRATIONS</Badge>
        <h1>摸得到的冒险质感。</h1>
        <p>从木纹到金属高光，统一的 3D 卡通插图语言。</p>
      </div>
      <div className="illustration-toolbar">
        <div>
          <h2>四种品质，成套开箱</h2>
          <p>同品质的关闭与开启状态保持材质、配色和造型一致。</p>
        </div>
        <Button
          tone="gold"
          icon="chest"
          disabled={opening}
          onClick={() =>
            setStates({
              common: "opening",
              rare: "opening",
              epic: "opening",
              legendary: "opening",
            })
          }
        >
          {opening
            ? "金光闪耀中…"
            : rarities.every((r) => states[r] === "opened")
              ? "重播全部开箱"
              : "一起开启宝箱"}
        </Button>
      </div>
      <div className="chest-gallery">
        {rarities.map((rarity) => (
          <article
            className={`chest-gallery-tile chest-gallery-${rarity}`}
            key={rarity}
          >
            <Badge
              tone={
                rarity === "common"
                  ? "stone"
                  : rarity === "rare"
                    ? "blue"
                    : rarity === "epic"
                      ? "purple"
                      : "gold"
              }
            >
              {names[rarity]}
            </Badge>
            <Chest
              rarity={rarity}
              state={states[rarity]}
              size={280}
              onOpenComplete={() =>
                setStates((current) => ({ ...current, [rarity]: "opened" }))
              }
            />
            <Button
              tone="stone"
              size="sm"
              disabled={states[rarity] === "opening"}
              onClick={() =>
                setStates((current) => ({
                  ...current,
                  [rarity]: current[rarity] === "opened" ? "idle" : "opening",
                }))
              }
            >
              {states[rarity] === "opening"
                ? "开启中…"
                : states[rarity] === "opened"
                  ? "合上"
                  : "开启"}
            </Button>
          </article>
        ))}
      </div>
      <p>
        <a href="#/motion" className="text-link">
          查看宝箱三状态与三星打击动效 →
        </a>
      </p>
      <h2>资源与奖励</h2>
      <div className="resource-art-gallery">
        {(["coin", "gem", "elixir"] as IllustrationName[]).map((name, i) => (
          <div key={name}>
            <GameIllustration
              name={name}
              size={140}
              alt={["金币", "宝石", "圣水"][i]}
            />
            <b>{["金币", "宝石", "圣水"][i]}</b>
          </div>
        ))}
      </div>
      <h2>角色与战斗卡牌</h2>
      <div className="card-art-gallery">
        {(
          ["knight", "ranger", "fireball", "guardian"] as IllustrationName[]
        ).map((name, i) => (
          <article key={name}>
            <GameIllustration
              name={name}
              size={210}
              alt={["皇家骑士", "森林游侠", "烈焰法术", "守护祝福"][i]}
            />
            <b>{["皇家骑士", "森林游侠", "烈焰法术", "守护祝福"][i]}</b>
          </article>
        ))}
      </div>
      <div className="doc-note">
        <Icon name="shield" size={27} />
        <p>
          素材由内置 image_gen 为本项目生成；原始透明 PNG 保留在
          public/art/originals，组件使用保留透明度的 WebP
          交付副本。没有使用官方游戏贴图。生成提示词、来源与处理记录随项目交付。
        </p>
      </div>
    </div>
  );
}
