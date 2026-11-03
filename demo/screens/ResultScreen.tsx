import { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Chest,
  DisplayTitle,
  GameIllustration,
  Icon,
  StarRating,
  type ChestState,
} from "../../src";
import { levelNames, type BattleResult } from "./state";
const preview: BattleResult = {
  id: "preview",
  level: 1,
  victory: true,
  stars: 3,
  coins: 125,
  gems: 6,
  seconds: 32,
  damage: 1120,
  deployments: 8,
};
function Count({ value, active = true }: { value: number; active?: boolean }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (!active) {
      setCurrent(0);
      return;
    }
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.reducedMotion === "true"
    ) {
      setCurrent(value);
      return;
    }
    let frame: number;
    let started: number;
    function tick(t: number) {
      started ??= t;
      const p = Math.min(1, (t - started) / 1000);
      setCurrent(Math.round(value * (1 - (1 - p) ** 3)));
      if (p < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, active]);
  return <>{current}</>;
}
export function ResultScreen({
  result,
  claimed,
  onClaim,
  onNext,
  onRetry,
}: {
  result: BattleResult | null;
  claimed: boolean;
  onClaim: () => void;
  onNext: () => void;
  onRetry: () => void;
}) {
  const run = result || preview;
  const [version, setVersion] = useState(0);
  const [chestPhase, setChestPhase] = useState<ChestState>("idle");
  const [rewardReady, setRewardReady] = useState(false);
  useEffect(() => {
    const reduce =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.reducedMotion === "true";
    setChestPhase(reduce && run.victory ? "opened" : "idle");
    setRewardReady(reduce || !run.victory);
    if (reduce || !run.victory) return;
    const openTimer = setTimeout(() => setChestPhase("opening"), 2200);
    const rewardTimer = setTimeout(() => setRewardReady(true), 3200);
    return () => {
      clearTimeout(openTimer);
      clearTimeout(rewardTimer);
    };
  }, [version, run.id, run.victory]);
  return (
    <div
      className={`result-screen ${!run.victory ? "result-defeat" : ""}`}
      key={version}
    >
      <div className="result-radial" />
      {run.victory && (
        <div className="confetti" aria-hidden="true">
          {Array.from({ length: 28 }, (_, i) => (
            <i
              key={i}
              style={{
                left: `${(i * 37) % 100}%`,
                animationDelay: `${(i % 9) * 0.14}s`,
                background: ["#ffe28c", "#78c9ff", "#e49eff", "#9bdd8b"][i % 4],
                transform: `rotate(${i * 43}deg)`,
              }}
            />
          ))}
        </div>
      )}
      <div className="result-kicker">
        {result ? "ADVENTURE COMPLETE" : "RESULT SCREEN PREVIEW"}
      </div>
      <div className="result-emblem">
        <Icon name={run.victory ? "trophy" : "shield"} size={65} />
      </div>
      <DisplayTitle
        className="result-title"
        tone={run.victory ? "gold" : "ivory"}
        size="lg"
        arched
      >
        {run.victory ? "荣耀时刻" : "虽败犹荣"}
      </DisplayTitle>
      <div className="result-ribbon">
        第 {run.level} 关 · {levelNames[run.level - 1]}
      </div>
      <StarRating value={run.stars} size={72} animated />
      <p className="result-subtitle">
        {run.victory
          ? "勇气与智慧，让王国闪耀。"
          : "每一次挑战，都让你更接近胜利。"}
      </p>
      <div className="result-reward-panel">
        <div className="result-reward-heading">
          <span />
          <b>{run.victory ? "你的冒险奖励" : "冒险参与奖励"}</b>
          <span />
        </div>
        <Chest
          rarity={
            run.victory
              ? run.stars === 3
                ? "legendary"
                : run.stars === 2
                  ? "epic"
                  : "rare"
              : "common"
          }
          state={chestPhase}
          onOpenComplete={() => setChestPhase("opened")}
          size={190}
        />
        <div className="reward-values">
          <div>
            <span className="reward-coin">
              <GameIllustration name="coin" size={42} />
            </span>
            <b>
              +<Count value={run.coins} active={rewardReady} />
            </b>
            <small>金币</small>
          </div>
          <div>
            <span className="reward-gem">
              <GameIllustration name="gem" size={42} />
            </span>
            <b>
              +<Count value={run.gems} active={rewardReady} />
            </b>
            <small>宝石</small>
          </div>
        </div>
        {!result && <Badge tone="stone">预览数据 · 不计入存档</Badge>}
        {claimed && (
          <Badge tone="green">
            <Icon name="check" size={12} />
            奖励已领取
          </Badge>
        )}
      </div>
      <div className="result-stats">
        <div>
          <Icon name="clock" size={16} />
          <b>{run.seconds}s</b>
          <small>战斗用时</small>
        </div>
        <div>
          <Icon name="sword" size={16} />
          <b>{run.damage}</b>
          <small>造成伤害</small>
        </div>
        <div>
          <Icon name="flag" size={16} />
          <b>{run.deployments}</b>
          <small>卡牌部署</small>
        </div>
      </div>
      <div className="result-actions">
        <Button
          tone="gold"
          size="lg"
          icon={result ? "check" : "map"}
          onClick={onClaim}
        >
          {result ? (claimed ? "返回冒险地图" : "收下奖励") : "前往冒险地图"}
        </Button>
        {run.victory && run.level < 8 ? (
          <Button tone="blue" icon="arrow" onClick={onNext}>
            {result ? "下一关，继续冒险" : "体验真实战斗"}
          </Button>
        ) : (
          <Button tone="blue" icon="refresh" onClick={onRetry}>
            再挑战一次
          </Button>
        )}
        <button onClick={() => setVersion((n) => n + 1)}>
          <Icon name="refresh" size={12} /> 重播结算动效
        </button>
      </div>
    </div>
  );
}
