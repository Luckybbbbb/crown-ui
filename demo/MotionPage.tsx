import { useState } from "react";
import {
  Badge,
  Button,
  Chest,
  Icon,
  Select,
  StarRating,
  Switch,
  type ChestState,
} from "../src";
import { CodeBlock } from "./Docs";
import type { MotionPreference } from "./useMotionPreference";
type Rarity = "common" | "rare" | "epic" | "legendary";
export function MotionPage({ preference, reduced, systemReduced, onPreferenceChange }: {
  preference: MotionPreference;
  reduced: boolean;
  systemReduced: boolean;
  onPreferenceChange: (value: MotionPreference) => void;
}) {
  const [rarity, setRarity] = useState<Rarity>("legendary");
  const [state, setState] = useState<ChestState>("idle");
  const [starCount, setStarCount] = useState(0);
  const [starCycle, setStarCycle] = useState(0);
  const [slow, setSlow] = useState(false);
  return (
    <div className="doc-page motion-page">
      <div className="doc-title">
        <Badge tone="gold">MOTION PLAYGROUND</Badge>
        <h1>让每一次开启，都值得期待。</h1>
        <p>三个宝箱状态的动态预览，以及有力量感的星级结算。</p>
      </div>
      <section className={`motion-preference-panel ${reduced ? "motion-is-reduced" : ""}`} aria-label="动效设置">
        <div role="status">
          <strong>{reduced ? "当前已减少动效" : "完整动效播放中"}</strong>
          <p>{preference === "system"
            ? systemReduced ? "系统设置要求减少动态效果，当前只展示完成状态。" : "当前跟随系统，开箱与星级打击正常播放。"
            : reduced ? "你已选择减少动效，开箱与星级会直接展示完成状态。" : "已启用完整动效，开箱金光与星级回弹正常播放。"}</p>
        </div>
        <label>动效模式
          <Select value={preference} onChange={(e) => onPreferenceChange(e.target.value as MotionPreference)}>
            <option value="system">跟随系统</option>
            <option value="full">完整动效</option>
            <option value="reduced">减少动效</option>
          </Select>
        </label>
        {reduced && <Button tone="gold" onClick={() => onPreferenceChange("full")}>启用完整动效</Button>}
      </section>
      <div className="motion-controls">
        <label>
          宝箱品质
          <Select
            value={rarity}
            onChange={(e) => {
              setRarity(e.target.value as Rarity);
              setState("idle");
            }}
          >
            <option value="common">普通 · 木铁</option>
            <option value="rare">稀有 · 蓝金</option>
            <option value="epic">史诗 · 紫晶</option>
            <option value="legendary">传说 · 王冠</option>
          </Select>
        </label>
        <a href="#/illustrations">
          查看完整插图 <Icon name="arrow" size={22} />
        </a>
      </div>
      <div className="chest-state-grid">
        {(
          [
            {
              id: "idle",
              name: "待机",
              caption: "轻缓呼吸 · 金属扫光 · 星点闪烁",
            },
            {
              id: "opening",
              name: "开箱过程",
              caption: "蓄力抖动 · 金光爆闪 · 粒子迸发",
            },
            {
              id: "opened",
              name: "已开箱",
              caption: "宝箱浮动 · 金光流转 · 余辉闪耀",
            },
          ] as const
        ).map((item, i) => (
          <article
            className={`motion-state-card motion-state-${item.id}`}
            key={item.id}
          >
            <header>
              <span>0{i + 1}</span>
              <h2>{item.name}</h2>
              {item.id === "opening" && <Badge tone="gold">循环预览</Badge>}
            </header>
            <div className="motion-chest-canvas">
              <Chest
                rarity={rarity}
                state={item.id}
                loop={item.id === "opening"}
                size={245}
                key={`${rarity}-${item.id}`}
              />
            </div>
            <p>{item.caption}</p>
          </article>
        ))}
      </div>
      <div className="motion-live-sequence">
        <div>
          <h2>完整开箱交互</h2>
          <p>从待机到金光爆发，再进入已开箱状态。</p>
          <div className="motion-sequence-steps">
            <Badge tone={state === "idle" ? "gold" : "stone"}>待机</Badge>
            <Icon name="arrow" />
            <Badge tone={state === "opening" ? "gold" : "stone"}>开箱中</Badge>
            <Icon name="arrow" />
            <Badge tone={state === "opened" ? "gold" : "stone"}>已开箱</Badge>
          </div>
          <Button
            tone="gold"
            icon="chest"
            disabled={state === "opening"}
            onClick={() => setState("opening")}
          >
            {state === "opening"
              ? "金光闪耀中…"
              : state === "opened"
                ? "重新演示开箱"
                : "开启宝箱"}
          </Button>
        </div>
        <div className="motion-live-chest">
          <Chest
            rarity={rarity}
            state={state}
            onOpenComplete={() => setState("opened")}
            size={280}
          />
        </div>
      </div>
      <h2>三星结算：打击与回弹</h2>
      <p className="motion-explanation">
        三个空星底座始终保留。黄色星星逐颗落下，接触时压扁、回弹，带起冲击光圈与金色碎屑。
      </p>
      <div className={`star-impact-stage ${slow ? "star-impact-slow" : ""}`}>
        <div className="star-impact-title">
          {starCount ? "荣耀，实至名归！" : "等待你的荣耀"}
        </div>
        <StarRating key={starCycle} value={starCount} size={92} animated />
        <div className="star-impact-ground" />
        <span>
          {starCount ? "压缩 → 拉伸 → 回弹 → 稳定" : "先看空底，再把星星打上去"}
        </span>
      </div>
      <div className="star-impact-controls">
        <Button
          tone="gold"
          icon="star"
          onClick={() => {
            setStarCount(3);
            setStarCycle((n) => n + 1);
          }}
        >
          打入 3 颗星
        </Button>
        <Button
          tone="stone"
          icon="refresh"
          onClick={() => {
            setStarCount(0);
            setStarCycle((n) => n + 1);
          }}
        >
          只看空星底座
        </Button>
        <Switch
          label="慢速观察"
          checked={slow}
          onCheckedChange={(v) => {
            setSlow(v);
            setStarCycle((n) => n + 1);
          }}
        />
      </div>
      <h2>在项目中复用</h2>
      <CodeBlock
        code={
          'const [state, setState] = useState<ChestState>("idle");\n\n<Chest\n  rarity="legendary"\n  state={state}\n  onOpenComplete={() => setState("opened")}\n/>\n<Button onClick={() => setState("opening")}>开启宝箱</Button>\n\n// 三个空星底座始终存在；更换 key 可重播打击动画\n<StarRating key={replayKey} value={3} size={72} animated />'
        }
      />
      <div className="doc-note">
        <Icon name="info" size={26} />
        <p>
          减少动效模式下直接呈现完成状态，保留所有状态切换和奖励逻辑。循环预览只用于本页展示；真实结算会按顺序播放一次。
        </p>
      </div>
    </div>
  );
}
