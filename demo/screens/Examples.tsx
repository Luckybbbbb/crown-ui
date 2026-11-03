import { useEffect, useRef, useState } from "react";
import {
  Badge,
  Button,
  Dialog,
  Icon,
  IconButton,
  ResourceCounter,
  Slider,
  Switch,
} from "../../src";
import { screenLinks } from "../catalog";
import { navigate } from "../navigation";
import { CodeBlock } from "../Docs";
import { StartScreen } from "./StartScreen";
import { LevelSelectScreen } from "./LevelSelectScreen";
import { BattleScreen } from "./BattleScreen";
import { ResultScreen } from "./ResultScreen";
import {
  grantResult,
  playTone,
  readSave,
  storageKey,
  type BattleResult,
  type Screen,
} from "./state";

export function Examples({
  screen: rawScreen,
  reduced,
  onReducedChange,
}: {
  screen: string;
  reduced: boolean;
  onReducedChange: (v: boolean) => void;
}) {
  const screen = (
    ["start", "levels", "battle", "result"].includes(rawScreen)
      ? rawScreen
      : "start"
  ) as Screen;
  const [save, setSave] = useState(readSave);
  const [selected, setSelected] = useState(1);
  const [settings, setSettings] = useState(false);
  const [sound, setSound] = useState(
    () => localStorage.getItem("crown-sound") === "true",
  );
  const [volume, setVolume] = useState(() =>
    Number(localStorage.getItem("crown-volume") || "35"),
  );
  const [wide, setWide] = useState(false);
  const [runKey, setRunKey] = useState(0);
  const [source, setSource] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(save));
  }, [save]);
  useEffect(() => {
    localStorage.setItem("crown-sound", String(sound));
    localStorage.setItem("crown-volume", String(volume));
  }, [sound, volume]);
  function go(next: Screen) {
    playTone(sound, volume);
    navigate(`/examples/${next}`);
  }
  function start(level = selected) {
    setSelected(level);
    setRunKey((n) => n + 1);
    go("battle");
  }
  function finish(result: BattleResult) {
    setSave((current) => ({ ...current, lastResult: result }));
    playTone(sound, volume, result.victory ? "victory" : "click");
    go("result");
  }
  function claim(next: Screen) {
    if (save.lastResult)
      setSave((current) => grantResult(current, save.lastResult!));
    if (next === "battle")
      start(save.lastResult ? Math.min(8, save.lastResult.level + 1) : 1);
    else go(next);
  }
  const title = screenLinks.find((c) => c.id === screen)!;
  return (
    <div className="examples-page">
      <div className="doc-title examples-heading">
        <div>
          <Badge tone="gold">PLAYABLE EXAMPLES</Badge>
          <h1>一段完整的小冒险。</h1>
          <p>四个完整界面，共用一套组件。现在就从第一步开始。</p>
        </div>
        <Button
          tone="gold"
          size="sm"
          icon="refresh"
          onClick={() => go("start")}
        >
          从头体验
        </Button>
      </div>
      <div className="screen-stepper">
        {screenLinks.map((c, i) => (
          <a
            href={`#/examples/${c.id}`}
            key={c.id}
            className={screen === c.id ? "active" : ""}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            <Icon name={c.icon} size={17} />
            <b>{c.name}</b>
            {i < 3 && <Icon name="chevron" size={13} />}
          </a>
        ))}
      </div>
      <section
        className={`game-showcase ${wide ? "game-showcase-wide" : ""}`}
        ref={frameRef}
      >
        <header className="game-showcase-toolbar">
          <span>
            <i />
            {title.name}
            <small>交互界面演示</small>
          </span>
          <div>
            <button
              aria-label={wide ? "切换为手机宽度" : "切换为宽屏"}
              onClick={() => setWide(!wide)}
            >
              <Icon name="grid" size={15} />
              <span>{wide ? "宽屏" : "手机"}</span>
            </button>
            <button
              aria-label="查看界面示例源码位置"
              onClick={() => setSource(!source)}
            >
              <Icon name="code" size={15} />
            </button>
          </div>
        </header>
        <div className="game-stage-surround">
          <div className={`game-frame ${wide ? "game-frame-wide" : ""}`}>
            <div className="game-screen" key={screen}>
              {screen === "start" && (
                <StartScreen
                  save={save}
                  onStart={() => go("levels")}
                  onSettings={() => setSettings(true)}
                />
              )}
              {screen === "levels" && (
                <LevelSelectScreen
                  save={save}
                  selected={selected}
                  onSelect={setSelected}
                  onStart={start}
                  onBack={() => go("start")}
                  onSettings={() => setSettings(true)}
                />
              )}
              {screen === "battle" && (
                <BattleScreen
                  key={runKey}
                  level={selected}
                  onFinish={finish}
                  onExit={() => go("levels")}
                  onDeploy={() => playTone(sound, volume, "deploy")}
                />
              )}
              {screen === "result" && (
                <ResultScreen
                  result={save.lastResult}
                  claimed={
                    !!save.lastResult &&
                    save.claimed.includes(save.lastResult.id)
                  }
                  onClaim={() => claim("levels")}
                  onNext={() => claim("battle")}
                  onRetry={() => {
                    if (save.lastResult)
                      setSave((current) =>
                        grantResult(current, save.lastResult!),
                      );
                    start(save.lastResult?.level ?? selected);
                  }}
                />
              )}
            </div>
          </div>
        </div>
        <footer className="game-showcase-footer">
          <span>
            <Icon name="info" size={14} />
            {screen === "battle"
              ? "选择卡牌，再点击己方半场部署。保护蓝方城堡，击破红方城堡。"
              : screen === "result"
                ? "胜利解锁下一关。领取奖励会存入当前浏览器，同一场奖励只可领取一次。"
                : "可以沿流程连续体验；顶部标签也能单独预览每个界面。"}
          </span>
        </footer>
      </section>
      {source && (
        <CodeBlock
          code={`// 界面文件\ndemo/screens/${{ start: "StartScreen", levels: "LevelSelectScreen", battle: "BattleScreen", result: "ResultScreen" }[screen]}.tsx\n\n// 流程与本地存档\ndemo/screens/Examples.tsx\ndemo/screens/state.ts\n\n// 界面动效\ndemo/screens/screens.css`}
        />
      )}
      <div className="screen-details">
        <div>
          <h3>
            <Icon name="spark" size={18} /> 此界面的动效
          </h3>
          <p>
            {
              {
                start: "城堡轻缓浮动、云层漂移、菜单错峰入场、按钮呼吸与按压。",
                levels:
                  "地图路径渐显、当前关卡呼吸光晕、节点按压、详情面板滑入。",
                battle:
                  "卡牌选择抬升、部署弹入、单位行进、命中闪光、伤害飘字与生命条过渡。",
                result:
                  "胜利标题弹入、星星依次出现、奖励数字增长、彩纸飘落与宝箱发光。",
              }[screen]
            }
          </p>
        </div>
        <div>
          <h3>
            <Icon name="grid" size={18} /> 使用的组件
          </h3>
          <p>
            {
              {
                start: "Button · IconButton · Badge · ResourceCounter · Dialog",
                levels:
                  "LevelNode · StarRating · Panel · Button · ResourceCounter",
                battle:
                  "GameCard · Progress · ResourceCounter · IconButton · Dialog",
                result: "StarRating · Chest · Button · ResourceCounter · Badge",
              }[screen]
            }
          </p>
        </div>
      </div>
      <Dialog open={settings} onOpenChange={setSettings} title="冒险设置">
        <div className="settings-form">
          <Switch
            label="交互音效"
            checked={sound}
            onCheckedChange={(v) => {
              setSound(v);
              playTone(v, volume);
            }}
          />
          <label>
            音量 <b>{volume}%</b>
            <Slider
              label="音效音量"
              value={volume}
              min={0}
              max={100}
              onChange={(e) => setVolume(Number(e.target.value))}
            />
          </label>
          <Switch
            label="减少界面动效"
            checked={reduced}
            onCheckedChange={onReducedChange}
          />
          <p>进度与设置仅保存在当前浏览器。声音为浏览器合成的原创提示音。</p>
          <Button tone="green" onClick={() => setSettings(false)}>
            准备就绪
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
export function ScreenWallet({ coins, gems }: { coins: number; gems: number }) {
  return (
    <div className="screen-wallet">
      <ResourceCounter value={coins} label="金币" />
      <ResourceCounter value={gems} label="宝石" icon="gem" tone="purple" />
    </div>
  );
}
export function ScreenTopbar({
  title,
  onBack,
  onSettings,
}: {
  title: string;
  onBack: () => void;
  onSettings?: () => void;
}) {
  return (
    <div className="screen-topbar">
      <IconButton
        icon="back"
        label="返回"
        variant="game"
        size="sm"
        onClick={onBack}
      />
      <b>{title}</b>
      {onSettings ? (
        <IconButton
          icon="settings"
          label="冒险设置"
          variant="game"
          size="sm"
          onClick={onSettings}
        />
      ) : (
        <span className="topbar-spacer" />
      )}
    </div>
  );
}
