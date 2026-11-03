import {
  Badge,
  Button,
  GameIllustration,
  Icon,
  LevelNode,
  StarRating,
} from "../../src";
import { ScreenTopbar, ScreenWallet } from "./Examples";
import { levelNames, type SaveData } from "./state";
const positions = [
  { x: 26, y: 85 },
  { x: 60, y: 74 },
  { x: 34, y: 63 },
  { x: 69, y: 51 },
  { x: 40, y: 40 },
  { x: 68, y: 28 },
  { x: 34, y: 17 },
  { x: 64, y: 7 },
];
export function LevelSelectScreen({
  save,
  selected,
  onSelect,
  onStart,
  onBack,
  onSettings,
}: {
  save: SaveData;
  selected: number;
  onSelect: (n: number) => void;
  onStart: (n: number) => void;
  onBack: () => void;
  onSettings: () => void;
}) {
  const highest = Math.min(8, save.stars.findIndex((n) => n === 0) + 1 || 8);
  const unlocked = save.stars.every((n) => n > 0) ? 8 : highest;
  const starTotal = save.stars.reduce((a, b) => a + b, 0);
  return (
    <div className="levels-screen">
      <ScreenTopbar title="冒险地图" onBack={onBack} onSettings={onSettings} />
      <div className="level-wallet-row">
        <Badge tone="gold">
          <Icon name="star" size={13} />
          {starTotal} / 24
        </Badge>
        <ScreenWallet coins={save.coins} gems={save.gems} />
      </div>
      <div className="chapter-heading">
        <span>CHAPTER ONE</span>
        <h2>晨光森林</h2>
        <p>传说，从脚下的小路开始。</p>
      </div>
      <div className="adventure-map" role="group" aria-label="晨光森林关卡地图">
        <svg
          className="map-path"
          viewBox="0 0 400 440"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M104 360Q290 330 240 300T136 245 276 202 160 146 272 93 136 42 256-4" />
        </svg>
        <div className="map-river" />
        <span className="map-decoration tree tree-one" />
        <span className="map-decoration tree tree-two" />
        <span className="map-decoration tree tree-three" />
        <span className="map-decoration tree tree-four" />
        <span className="map-rock rock-one" />
        <span className="map-rock rock-two" />
        <span className="map-decoration tiny-house">
          <Icon name="home" size={34} />
        </span>
        {positions.map((pos, i) => (
          <div
            className={`map-node ${selected === i + 1 ? "map-node-selected" : ""}`}
            data-label-side={pos.x > 50 ? "left" : "right"}
            key={i}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            <LevelNode
              level={i + 1}
              state={
                save.stars[i] > 0
                  ? "completed"
                  : i + 1 <= unlocked
                    ? "available"
                    : "locked"
              }
              stars={save.stars[i]}
              onClick={() => onSelect(i + 1)}
            />
            {selected === i + 1 && (
              <span className="selected-label">当前选择</span>
            )}
          </div>
        ))}
      </div>
      <div className="level-detail" key={selected}>
        <div className="level-detail-info">
          <span className="level-mini-shield">
            <Icon name={selected === 8 ? "crown" : "flag"} size={26} />
          </span>
          <div>
            <span>第 {selected} 关</span>
            <h3>{levelNames[selected - 1]}</h3>
          </div>
          <StarRating value={save.stars[selected - 1]} />
        </div>
        <div className="level-detail-bottom">
          <div>
            <small>胜利奖励</small>
            <b className="level-rewards">
              <span aria-label={`${100 + selected * 25} 金币`}>
                <GameIllustration name="coin" size={35} />
                {100 + selected * 25}
              </span>
              <span aria-label={`${5 + selected} 宝石`}>
                <GameIllustration name="gem" size={35} />
                {5 + selected}
              </span>
            </b>
          </div>
          <Button tone="gold" icon="sword" onClick={() => onStart(selected)}>
            挑战关卡
          </Button>
        </div>
      </div>
    </div>
  );
}
