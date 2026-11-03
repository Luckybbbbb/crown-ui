import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type KeyboardEvent,
} from "react";
import {
  Badge,
  Button,
  Dialog,
  GameCard,
  GameIllustration,
  Icon,
  IconButton,
  Progress,
} from "../../src";
import { createBattle, deck, deployCard, tickBattle } from "./engine";
import { levelNames, type BattleResult } from "./state";
export function BattleScreen({
  level,
  onFinish,
  onExit,
  onDeploy,
}: {
  level: number;
  onFinish: (result: BattleResult) => void;
  onExit: () => void;
  onDeploy: () => void;
}) {
  const [state, setState] = useState(() => createBattle(level));
  const [selected, setSelected] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [hint, setHint] = useState("选择卡牌，再点击绿色区域部署");
  const [announcement, setAnnouncement] = useState(false);
  const finished = useRef(false);
  const finishRef = useRef(onFinish);
  finishRef.current = onFinish;
  useEffect(() => {
    const t = setTimeout(() => setAnnouncement(true), 1500);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (paused || state.status !== "playing") return;
    const timer = setInterval(() => setState((s) => tickBattle(s, 0.1)), 100);
    return () => clearInterval(timer);
  }, [paused, state.status]);
  useEffect(() => {
    if (state.status === "playing" || finished.current) return;
    const timer = setTimeout(() => {
      finished.current = true;
      const victory = state.status === "victory";
      const stars = victory
        ? state.ownHP / state.ownMax > 0.66
          ? 3
          : state.ownHP / state.ownMax > 0.33
            ? 2
            : 1
        : 0;
      finishRef.current({
        id: crypto.randomUUID(),
        level,
        victory,
        stars,
        coins: victory ? 100 + level * 25 : 25,
        gems: victory ? 5 + level : 0,
        seconds: Math.round(state.elapsed),
        damage: state.damage,
        deployments: state.deployments,
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [state.status, level]);
  function deploy(x: number, y: number) {
    if (paused || state.status !== "playing") return;
    if (selected === null) {
      setHint("先在下方选择一张卡牌");
      return;
    }
    if (y < 47 || y > 94) {
      setHint("请在河流下方的己方区域部署");
      return;
    }
    if (state.elixir < deck[selected].cost) {
      setHint("圣水不足，稍等一下便会恢复");
      return;
    }
    setState((s) => deployCard(s, selected, x, y));
    setSelected(null);
    setHint(
      deck[selected].kind === "heal"
        ? "守护祝福恢复了城堡生命"
        : "部署成功！继续搭配你的卡牌",
    );
    onDeploy();
  }
  function aim(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    deploy(
      ((e.clientX - rect.left) / rect.width) * 100,
      ((e.clientY - rect.top) / rect.height) * 100,
    );
  }
  function keyboardAim(e: KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      deploy(50, 66);
    }
  }
  return (
    <div className="battle-screen">
      <div className="battle-header">
        <div>
          <Badge tone="gold">第 {level} 关</Badge>
          <h2>{levelNames[level - 1]}</h2>
        </div>
        <div
          className={`battle-timer ${state.remaining < 15 ? "timer-urgent" : ""}`}
        >
          <Icon name="clock" size={16} />
          {Math.floor(Math.ceil(state.remaining) / 60)}:
          {String(Math.ceil(state.remaining) % 60).padStart(2, "0")}
        </div>
        <IconButton
          icon="settings"
          label="暂停战斗"
          variant="game"
          size="sm"
          onClick={() => setPaused(true)}
        />
      </div>
      <div className="battle-player enemy-player">
        <span className="battle-player-shield">
          <Icon name="skull" size={23} />
        </span>
        <div>
          <span>
            赤焰守卫 <small>敌方城堡</small>
          </span>
          <Progress
            value={state.enemyHP}
            max={state.enemyMax}
            tone="red"
            label="敌方城堡生命"
            showValue
          />
        </div>
        <Badge tone="red">Lv.{level}</Badge>
      </div>
      <div
        className={`battlefield ${selected !== null ? "battlefield-aiming" : ""}`}
        role="button"
        tabIndex={0}
        aria-label="战场：选择卡牌后点击己方半场部署，按回车在中央部署"
        onClick={aim}
        onKeyDown={keyboardAim}
      >
        <div className="arena-grid" />
        <div className="arena-river">
          <i />
          <i />
          <i />
        </div>
        <span className="arena-bridge bridge-left" />
        <span className="arena-bridge bridge-right" />
        <div className="arena-deploy-zone">
          <span>{selected !== null ? "点击此处部署" : "己方区域"}</span>
        </div>
        <div
          className={`arena-tower enemy-tower ${state.effects.some((e) => e.y < 30 && e.kind === "damage") ? "tower-hit" : ""}`}
        >
          <div className="tower-roof" />
          <Icon name="crown" size={34} />
          <span>赤焰堡</span>
        </div>
        <div
          className={`arena-tower own-tower ${state.effects.some((e) => e.y > 70 && e.kind === "damage") ? "tower-hit" : ""}`}
        >
          <div className="tower-roof" />
          <Icon name="crown" size={34} />
          <span>晨光堡</span>
        </div>
        <span className="arena-scenery scenery-a" />
        <span className="arena-scenery scenery-b" />
        {state.units.map((unit) => (
          <span
            className={`arena-unit unit-${unit.card}`}
            key={unit.id}
            style={{ left: `${unit.x}%`, top: `${unit.y}%` }}
          >
            <GameIllustration
              name={unit.card === 0 ? "knight" : "ranger"}
              size={48}
            />
            <i />
          </span>
        ))}
        {state.effects.map((effect) => (
          <span
            className={`battle-effect effect-${effect.kind}`}
            key={`${effect.id}-${effect.text}`}
            style={{ left: `${effect.x}%`, top: `${effect.y}%` }}
          >
            {effect.text}
          </span>
        ))}
        {!announcement && (
          <div className="battle-start-announcement">
            <Icon name="sword" size={30} />
            <b>战斗开始！</b>
          </div>
        )}
        {state.status !== "playing" && (
          <div className="battle-end-announcement">
            <Icon
              name={state.status === "victory" ? "trophy" : "shield"}
              size={42}
            />
            <b>
              {state.status === "victory"
                ? "城堡已攻破！"
                : "整顿之后，再次出发"}
            </b>
          </div>
        )}
      </div>
      <div className="battle-player own-player">
        <span className="battle-player-shield">
          <Icon name="shield" size={23} />
        </span>
        <div>
          <span>
            晨光骑士 <small>己方城堡</small>
          </span>
          <Progress
            value={state.ownHP}
            max={state.ownMax}
            label="己方城堡生命"
            showValue
          />
        </div>
        <span className="deploy-count">出战 {state.deployments}</span>
      </div>
      <div className="battle-controls">
        <p className="battle-hint" role="status">
          <Icon name="info" size={12} />
          {hint}
        </p>
        <div className="battle-deck">
          {deck.map((card, i) => (
            <GameCard
              name={card.name}
              cost={card.cost}
              icon={card.icon}
              rarity={card.rarity}
              level={level}
              selected={selected === i}
              disabled={
                state.elixir < card.cost || state.status !== "playing" || paused
              }
              key={card.name}
              onClick={() => {
                setSelected(i);
                setHint(
                  card.kind === "heal"
                    ? "点击己方区域，为城堡恢复生命"
                    : "点击绿色区域，部署你的卡牌",
                );
              }}
            />
          ))}
        </div>
        <div className="elixir-bar">
          <span className="elixir-drop">
            <GameIllustration name="elixir" size={48} />
          </span>
          <b>{Math.floor(state.elixir)}</b>
          <Progress value={state.elixir} max={10} label="圣水" tone="purple" />
          <small>
            {" "}
            / 10 <span>自动恢复中</span>
          </small>
        </div>
      </div>
      <Dialog open={paused} onOpenChange={setPaused} title="稍事休息">
        <div className="pause-content">
          <Icon name="shield" size={55} />
          <h3>你的王国，在等你。</h3>
          <p>战斗已暂停，倒计时和资源恢复同时暂停。</p>
          <Button tone="gold" icon="play" onClick={() => setPaused(false)}>
            继续战斗
          </Button>
          <Button tone="stone" onClick={onExit}>
            返回冒险地图
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
