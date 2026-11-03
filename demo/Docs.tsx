import { useState, type ReactNode } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Chest,
  Checkbox,
  Dialog,
  DisplayTitle,
  Divider,
  GameCard,
  GameIllustration,
  Icon,
  IconButton,
  Input,
  LevelNode,
  Panel,
  Progress,
  ResourceCounter,
  Select,
  Slider,
  StarRating,
  Switch,
  Tabs,
  type ChestState,
  Textarea,
  Tooltip,
  useToast,
  type Tone,
  type IconName,
} from "../src";
import { catalog, screenLinks } from "./catalog";
import { navigate } from "./navigation";

export function CodeBlock({ code }: { code: string }) {
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast({ message: "复制不可用，请选中代码手动复制。", tone: "gold" });
    }
  }
  return (
    <div className="code-block">
      <div>
        <span>TSX / REACT</span>
        <button type="button" onClick={copy} aria-label="复制代码">
          <Icon name={copied ? "check" : "copy"} size={14} />
          {copied ? "已复制" : "复制"}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}
export function DemoBlock({
  title,
  subtitle,
  children,
  code,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  code: string;
  className?: string;
}) {
  const [view, setView] = useState("preview");
  return (
    <section className={`demo-block ${className}`}>
      <header>
        <div>
          <h3>{title}</h3>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className="view-switch">
          <button
            onClick={() => setView("preview")}
            className={view === "preview" ? "active" : ""}
            aria-pressed={view === "preview"}
          >
            <Icon name="grid" size={13} />
            预览
          </button>
          <button
            onClick={() => setView("code")}
            className={view === "code" ? "active" : ""}
            aria-pressed={view === "code"}
          >
            <Icon name="code" size={13} />
            代码
          </button>
        </div>
      </header>
      {view === "preview" ? (
        <div className="demo-stage">{children}</div>
      ) : (
        <CodeBlock code={code} />
      )}
    </section>
  );
}
const examplesCode: Record<string, string> = {
  illustration:
    '<GameIllustration name="knight" size={160} alt="皇家骑士" />\n<GameIllustration name="coin" size={64} alt="金币" />',
  "display-title":
    '// 同时引入 @crown-ui/react/fonts\n<DisplayTitle tone="gold" size="lg" arched>\n  王国远征\n</DisplayTitle>',
  button:
    '<Button tone="blue" icon="sword">开始战斗</Button>\n<Button tone="gold" icon="chest">领取奖励</Button>\n<Button tone="green">确认</Button>\n<Button tone="red">撤退</Button>\n<Button loading>加载中</Button>',
  badge: '<Badge tone="gold">传说</Badge>\n<Badge tone="purple">史诗</Badge>',
  avatar: '<Avatar name="冒险家" level={12} />',
  icon: '<Icon name="crown" size={32} />\n<Icon name="shield" size={32} />',
  panel:
    '<Panel title="冒险任务" tone="blue">\n  <p>属于你的王国，等待出发。</p>\n  <Button>启程</Button>\n</Panel>',
  card: "<Card>\n  <Chest />\n  <h3>皇家补给</h3>\n  <p>为下一次冒险做好准备。</p>\n</Card>",
  tabs: '<Tabs value={tab} onValueChange={setTab} items={[\n  { value: "deck", label: "卡组", content: "配置你的卡牌" },\n  { value: "clan", label: "部落", content: "与伙伴一起冒险" },\n]} />',
  divider: "<Divider>准备好出发了吗</Divider>",
  input:
    '<Input aria-label="玩家名称" placeholder="输入冒险家的名字" />\n<Textarea aria-label="部落宣言" placeholder="写下你的冒险宣言…" />',
  select:
    '<Select aria-label="选择王国">\n  <option>晨光王国</option>\n  <option>翡翠森林</option>\n</Select>',
  checkbox:
    '<Checkbox label="我已准备好冒险" checked={ready}\n  onChange={e => setReady(e.target.checked)} />',
  switch:
    '<Switch label="背景音乐" checked={music}\n  onCheckedChange={setMusic} />',
  slider:
    '<Slider label="音量" min={0} max={100}\n  value={volume} onChange={e => setVolume(Number(e.target.value))} />',
  progress:
    '<Progress label="生命值" value={75} max={100}\n  tone="green" showValue />',
  dialog:
    '<Button onClick={() => setOpen(true)}>开启宝箱</Button>\n<Dialog open={open} onOpenChange={setOpen} title="皇家补给">\n  <Chest open />\n  <p>获得 500 金币！</p>\n</Dialog>',
  toast:
    '// 在应用根部包裹 <ToastProvider>\nconst toast = useToast();\ntoast({ message: "奖励已领取！", tone: "green" });',
  tooltip:
    '<Tooltip content="皇家通行证奖励">\n  <Icon name="crown" size={32} />\n</Tooltip>',
  resource:
    '<ResourceCounter icon="coin" label="金币" value={1280}\n  onAdd={() => setCoins(n => n + 100)} />',
  "game-card":
    '<GameCard name="皇家骑士" cost={3} icon="sword"\n  rarity="rare" selected={selected}\n  onClick={() => setSelected(!selected)} />',
  level:
    '<LevelNode level={1} state="completed" stars={3} />\n<LevelNode level={2} onClick={startLevel} />\n<LevelNode level={3} state="locked" />',
  stars:
    "// 空星底座始终保留，黄色星星砸入并压缩回弹\n<StarRating key={replayKey} value={3} size={72} animated />",
  chest:
    'const [state, setState] = useState<ChestState>("idle");\n<Chest rarity="epic" state={state}\n  onOpenComplete={() => setState("opened")} />\n<Button onClick={() => setState("opening")}>开启宝箱</Button>',
};
export function PrimitiveDemo({ id }: { id: string }) {
  const toast = useToast();
  const [value, setValue] = useState(65);
  const [enabled, setEnabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [chestState, setChestState] = useState<ChestState>("idle");
  const [tab, setTab] = useState("deck");
  const [selected, setSelected] = useState(false);
  const [coins, setCoins] = useState(1280);
  switch (id) {
    case "illustration":
      return (
        <div className="demo-row">
          <GameIllustration name="knight" size={180} alt="皇家骑士" />
          <GameIllustration name="ranger" size={180} alt="森林游侠" />
          <Button tone="gold" onClick={() => navigate("/illustrations")}>
            查看完整插图库
          </Button>
        </div>
      );
    case "display-title":
      return (
        <div className="display-title-demo">
          <DisplayTitle arched>王国远征</DisplayTitle>
          <DisplayTitle size="sm" tone="blue">
            战斗开始
          </DisplayTitle>
        </div>
      );
    case "button":
      return (
        <div className="button-samples">
          <div>
            <Button icon="sword" onClick={() => navigate("/examples/battle")}>
              开始战斗
            </Button>
            <Button
              tone="gold"
              icon="chest"
              onClick={() =>
                toast({
                  message: "获得 100 金币，继续你的冒险！",
                  tone: "gold",
                })
              }
            >
              领取奖励
            </Button>
            <Button
              tone="green"
              icon="check"
              onClick={() => toast({ message: "准备就绪！" })}
            >
              准备就绪
            </Button>
          </div>
          <div>
            <Button
              tone="purple"
              icon="spark"
              onClick={() =>
                toast({ message: "史诗力量已激活", tone: "purple" })
              }
            >
              施放魔法
            </Button>
            <Button tone="red" onClick={() => setOpen(true)}>
              撤退
            </Button>
            <Button tone="stone" disabled>
              尚未解锁
            </Button>
            <IconButton
              icon="settings"
              label="设置"
              variant="game"
              onClick={() => setOpen(true)}
            />
            <IconButton
              icon="back"
              label="返回"
              variant="game"
              onClick={() => toast({ message: "返回按钮已点击", tone: "blue" })}
            />
          </div>
          <Dialog open={open} onOpenChange={setOpen} title="冒险设置">
            <p>按钮支持原生事件、键盘操作和加载状态。</p>
            <Button tone="green" onClick={() => setOpen(false)}>
              知道了
            </Button>
          </Dialog>
        </div>
      );
    case "badge":
      return (
        <div className="demo-row">
          {(["blue", "gold", "green", "red", "purple", "stone"] as Tone[]).map(
            (tone, i) => (
              <Badge tone={tone} key={tone}>
                {["稀有", "传说", "已完成", "挑战中", "史诗", "普通"][i]}
              </Badge>
            ),
          )}
        </div>
      );
    case "avatar":
      return (
        <div className="demo-row">
          <Avatar name="晨光骑士" level={12} />
          <Avatar name="星光法师" level={8} />
          <Avatar name="新冒险家" />
        </div>
      );
    case "icon":
      return (
        <div className="icon-grid">
          {(
            [
              "crown",
              "shield",
              "sword",
              "gem",
              "coin",
              "trophy",
              "chest",
              "star",
              "heart",
              "flame",
              "bolt",
              "flag",
              "leaf",
              "skull",
              "map",
              "spark",
            ] as IconName[]
          ).map((name) => (
            <Tooltip content={name} key={name}>
              <span>
                <Icon name={name} size={28} />
              </span>
            </Tooltip>
          ))}
        </div>
      );
    case "panel":
      return (
        <Panel
          title="冒险任务"
          tone="blue"
          action={<Badge tone="gold">每日</Badge>}
        >
          <div className="demo-row">
            <Icon name="flag" size={35} />
            <div>
              <b>向晨光森林进发</b>
              <p>完成一次挑战，领取属于你的荣耀。</p>
            </div>
          </div>
          <Button size="sm" onClick={() => navigate("/examples/levels")}>
            查看关卡
          </Button>
        </Panel>
      );
    case "card":
      return (
        <Card>
          <div className="demo-row">
            <Chest size={75} />
            <div>
              <h3>皇家补给</h3>
              <p>为下一次冒险做好准备。</p>
              <Badge tone="gold">500 金币</Badge>
            </div>
          </div>
        </Card>
      );
    case "tabs":
      return (
        <Tabs
          value={tab}
          onValueChange={setTab}
          items={[
            {
              value: "deck",
              label: "我的卡组",
              content: <p>精心搭配骑士、弓箭手与火球，让每一张牌都有舞台。</p>,
            },
            {
              value: "clan",
              label: "我的部落",
              content: <p>欢迎来到晨光骑士团。下一场冒险，我们并肩作战。</p>,
            },
            {
              value: "rank",
              label: "荣耀排行",
              content: <p>当前赛季：黄金 III · 1,280 奖杯。</p>,
            },
          ]}
        />
      );
    case "divider":
      return (
        <div style={{ width: "100%" }}>
          <p>冒险从一个小小的决定开始。</p>
          <Divider>准备好出发了吗</Divider>
          <p>下一站，晨光森林。</p>
        </div>
      );
    case "input":
      return (
        <div className="form-stack">
          <label>
            冒险家昵称
            <Input placeholder="输入你的名字" maxLength={20} />
          </label>
          <label>
            部落宣言
            <Textarea placeholder="写下你的冒险宣言…" />
          </label>
        </div>
      );
    case "select":
      return (
        <label className="form-stack">
          选择你的王国
          <Select defaultValue="morning">
            <option value="morning">晨光王国</option>
            <option value="forest">翡翠森林</option>
            <option value="ice">极光雪原</option>
          </Select>
        </label>
      );
    case "checkbox":
      return (
        <div className="form-stack">
          <Checkbox
            label="我已准备好冒险"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          <Checkbox label="尚未解锁的任务" disabled />
        </div>
      );
    case "switch":
      return (
        <div className="form-stack">
          <Switch
            label="背景音乐"
            checked={enabled}
            onCheckedChange={setEnabled}
          />
          <span className="demo-caption">
            状态：{enabled ? "开启" : "关闭"}
          </span>
          <Switch label="敬请期待" disabled />
        </div>
      );
    case "slider":
      return (
        <div className="form-stack">
          <span>
            音量 <b>{value}%</b>
          </span>
          <Slider
            label="音量"
            value={value}
            min={0}
            max={100}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </div>
      );
    case "progress":
      return (
        <div className="progress-samples">
          <label>
            生命值{" "}
            <Progress value={value} label="生命值" tone="green" showValue />
          </label>
          <label>
            圣水{" "}
            <Progress value={6} max={10} label="圣水" tone="purple" showValue />
          </label>
          <Slider
            label="调整生命值"
            value={value}
            min={0}
            max={100}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </div>
      );
    case "dialog":
      return (
        <>
          <Button tone="gold" icon="chest" onClick={() => setOpen(true)}>
            开启宝箱
          </Button>
          <Dialog open={open} onOpenChange={setOpen} title="皇家补给">
            <div className="reward-dialog">
              <Chest size={140} open />
              <h3>一份小小的惊喜</h3>
              <p>获得 500 金币与 20 宝石</p>
              <Button
                tone="green"
                onClick={() => {
                  setOpen(false);
                  toast({ message: "补给已领取，整装出发！" });
                }}
              >
                开心收下
              </Button>
            </div>
          </Dialog>
        </>
      );
    case "toast":
      return (
        <div className="demo-row">
          <Button
            tone="green"
            icon="check"
            onClick={() => toast({ message: "奖励已领取，新的冒险等着你！" })}
          >
            成功通知
          </Button>
          <Button
            tone="gold"
            onClick={() =>
              toast({ message: "圣水不足，再等一下吧。", tone: "gold" })
            }
          >
            提示通知
          </Button>
        </div>
      );
    case "tooltip":
      return (
        <div className="demo-row">
          <Tooltip content="皇家通行证奖励">
            <span className="icon-medallion">
              <Icon name="crown" size={32} />
            </span>
          </Tooltip>
          <span className="demo-caption">悬停或使用 Tab 聚焦查看提示</span>
        </div>
      );
    case "resource":
      return (
        <div className="resource-samples">
          <ResourceCounter
            value={coins}
            label="金币"
            onAdd={() => setCoins((n) => n + 100)}
          />
          <ResourceCounter icon="gem" value={256} label="宝石" tone="purple" />
          <ResourceCounter
            icon="trophy"
            value={1280}
            label="奖杯"
            tone="blue"
          />
        </div>
      );
    case "game-card":
      return (
        <div className="demo-row card-samples">
          <GameCard
            name="皇家骑士"
            cost={3}
            icon="sword"
            rarity="rare"
            level={5}
            selected={selected}
            onClick={() => setSelected(!selected)}
          />
          <GameCard
            name="森林游侠"
            cost={2}
            icon="leaf"
            level={4}
            onClick={() =>
              toast({ message: "森林游侠已准备出战", tone: "blue" })
            }
          />
          <GameCard
            name="烈焰法术"
            cost={4}
            icon="flame"
            rarity="epic"
            level={3}
            onClick={() =>
              toast({ message: "烈焰法术已准备就绪", tone: "purple" })
            }
          />
        </div>
      );
    case "level":
      return (
        <div className="demo-row level-samples">
          <LevelNode level={1} state="completed" stars={3} />
          <LevelNode level={2} onClick={() => navigate("/examples/battle")} />
          <LevelNode level={3} state="locked" />
        </div>
      );
    case "stars":
      return (
        <div className="form-stack star-demo">
          <StarRating value={Math.round(value / 34)} animated key={value} />
          <Button
            tone="gold"
            size="sm"
            onClick={() => setValue((v) => (v === 100 ? 34 : 100))}
          >
            重播星级动画
          </Button>
        </div>
      );
    case "chest":
      return (
        <div className="form-stack star-demo">
          <Chest
            state={chestState}
            rarity="epic"
            size={200}
            onOpenComplete={() => setChestState("opened")}
          />
          <Button
            tone="gold"
            size="sm"
            disabled={chestState === "opening"}
            onClick={() =>
              setChestState(chestState === "opened" ? "idle" : "opening")
            }
          >
            {chestState === "opening"
              ? "金光闪耀中…"
              : chestState === "opened"
                ? "合上宝箱"
                : "开启宝箱"}
          </Button>
        </div>
      );
    default:
      return null;
  }
}
export function Overview() {
  return (
    <>
      <section className="overview-hero">
        <div className="hero-art" />
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span />
            为下一场冒险，准备就绪 <Badge tone="gold">v0.1.0</Badge>
          </div>
          <h1>
            让界面，
            <br />
            充满<span>冒险感。</span>
          </h1>
          <p>
            一套有温度、有质感的欧式卡通 React 组件。
            <br />
            从第一下点击，到属于你的胜利时刻。
          </p>
          <div className="hero-buttons">
            <Button
              tone="gold"
              icon="bolt"
              onClick={() => navigate("/install")}
            >
              开始构建 <Icon name="arrow" size={16} />
            </Button>
            <button
              className="hero-secondary"
              onClick={() => navigate("/examples/start")}
            >
              <Icon name="play" size={16} />
              体验完整界面
            </button>
          </div>
          <div className="hero-meta">
            <Icon name="check" size={13} /> React + TypeScript <span /> MIT 开源{" "}
            <span /> 原创视觉
          </div>
        </div>
        <div className="hero-note">
          <Icon name="crown" size={16} /> A LITTLE MORE ADVENTURE.
        </div>
      </section>
      <div className="feature-strip">
        {[
          {
            icon: "grid",
            title: `${catalog.length} 类组件`,
            text: "统一语言，自由组合",
          },
          {
            icon: "map",
            title: "4 个完整界面",
            text: "从开始到胜利的完整旅程",
          },
          {
            icon: "spark",
            title: "生动的交互动效",
            text: "每一次点击，都有回应",
          },
          { icon: "code", title: "源码属于你", text: "组件包 / 源码两种用法" },
        ].map((item) => (
          <div key={item.title}>
            <span>
              <Icon name={item.icon as IconName} size={22} />
            </span>
            <div>
              <b>{item.title}</b>
              <small>{item.text}</small>
            </div>
          </div>
        ))}
      </div>
      <div className="section-heading">
        <div>
          <span className="eyebrow">THE COMPONENT ARMORY</span>
          <h2>
            你的界面装备库 <span>挑选组件，开启创造。</span>
          </h2>
        </div>
        <a href="#/components/button">
          浏览全部组件 <Icon name="arrow" size={15} />
        </a>
      </div>
      <div className="overview-grid">
        <DemoBlock
          title="按钮"
          subtitle="厚实的手感，让操作更有分量。"
          code={examplesCode.button}
          className="buttons-block"
        >
          <PrimitiveDemo id="button" />
        </DemoBlock>
        <DemoBlock
          title="资源栏"
          subtitle="让每一份收获，都清晰可见。"
          code={examplesCode.resource}
        >
          <PrimitiveDemo id="resource" />
        </DemoBlock>
        <DemoBlock
          title="战斗卡牌"
          subtitle="普通、稀有、史诗，各有自己的光芒。"
          code={examplesCode["game-card"]}
        >
          <PrimitiveDemo id="game-card" />
        </DemoBlock>
        <DemoBlock
          title="进度与成长"
          subtitle="每一步前进，都是值得期待的改变。"
          code={examplesCode.progress}
        >
          <PrimitiveDemo id="progress" />
        </DemoBlock>
        <DemoBlock
          title="皇家宝箱"
          subtitle="给每一次胜利，一点额外惊喜。"
          code={examplesCode.chest}
        >
          <PrimitiveDemo id="chest" />
        </DemoBlock>
      </div>
      <div className="section-heading">
        <div>
          <span className="eyebrow">A COMPLETE LITTLE ADVENTURE</span>
          <h2>
            组件之外，还有完整的冒险 <span>四个界面，一段旅程。</span>
          </h2>
        </div>
        <a href="#/examples/start">
          进入界面示例 <Icon name="arrow" size={15} />
        </a>
      </div>
      <div className="screen-preview-grid">
        {screenLinks.map((screen, i) => (
          <a
            href={`#/examples/${screen.id}`}
            className={`screen-preview screen-preview-${screen.id}`}
            key={screen.id}
          >
            <div className="mini-screen">
              {i === 0 ? (
                <>
                  <Icon name="crown" size={34} />
                  <strong>王国远征</strong>
                  <span className="mini-button">开启冒险</span>
                </>
              ) : i === 1 ? (
                <>
                  <span className="mini-map-path" />
                  <i>1</i>
                  <i>2</i>
                  <i>3</i>
                </>
              ) : i === 2 ? (
                <>
                  <div className="mini-battle-tower">
                    <Icon name="crown" size={26} />
                  </div>
                  <span className="mini-river" />
                  <div className="mini-deck">
                    {[1, 2, 3, 4].map((n) => (
                      <span key={n} />
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="mini-stars">★★★</div>
                  <strong>胜利！</strong>
                  <Chest size={60} />
                </>
              )}
            </div>
            <div>
              <span>0{i + 1}</span>
              <b>{screen.name}</b>
              <Icon name="arrow" size={15} />
            </div>
          </a>
        ))}
      </div>
      <div className="bottom-banner">
        <span className="icon-medallion">
          <Icon name="shield" size={28} />
        </span>
        <div>
          <h3>让你的下一个项目，有一点不一样。</h3>
          <p>没有运行时样式依赖，保留原生语义，支持键盘操作与减少动效。</p>
        </div>
        <Button tone="stone" size="sm" onClick={() => navigate("/install")}>
          查看接入方式 <Icon name="arrow" size={14} />
        </Button>
      </div>
    </>
  );
}

const api: Record<string, string[][]> = {
  illustration: [
    ["name", "IllustrationName，插图 ID", "必填"],
    ["size", "number，默认方形像素尺寸", "80"],
    ["alt", "string，可访问说明；装饰图可为空", "空字符串"],
    ["…props", "原生 img 属性，className 与 style", "—"],
  ],
  "display-title": [
    ["children", "string，标题文字", "必填"],
    ["as", "h1 | h2 | h3", "h2"],
    ["tone", "gold | ivory | blue", "gold"],
    ["size", "sm | md | lg", "md"],
    ["arched", "boolean，弧形字列", "false"],
  ],
  button: [
    ["tone", "blue | gold | green | red | purple | stone", "blue"],
    ["size", "sm | md | lg", "md"],
    ["icon", "IconName", "—"],
    ["loading", "boolean", "false"],
    ["…props", "原生 button 属性、ref、onClick", "—"],
  ],
  panel: [
    ["title / action", "ReactNode", "—"],
    ["tone", "Tone", "stone"],
    ["children", "ReactNode", "—"],
  ],
  progress: [
    ["value / max", "number", "必填 / 100"],
    ["tone", "Tone", "green"],
    ["label", "string，进度条可访问名称", "进度"],
    ["showValue", "boolean", "false"],
  ],
  dialog: [
    ["open", "boolean", "必填"],
    ["onOpenChange", "(open: boolean) => void", "必填"],
    ["title / children", "ReactNode", "必填"],
  ],
  tabs: [
    ["items", "{ value, label, content, disabled? }[]", "必填"],
    ["value", "string", "必填"],
    ["onValueChange", "(value: string) => void", "必填"],
  ],
  "game-card": [
    ["name / cost", "string / number", "必填"],
    ["rarity", "common | rare | epic", "common"],
    ["selected", "boolean", "false"],
    ["level / icon", "number / IconName", "1 / sword"],
  ],
  level: [
    ["level", "number", "必填"],
    ["state", "locked | available | completed", "available"],
    ["stars", "number", "0"],
    ["onClick", "() => void", "—"],
  ],
  resource: [
    ["value / label", "number / string", "必填"],
    ["icon / tone", "IconName / Tone", "coin / gold"],
    ["onAdd", "() => void，提供时显示增加按钮", "—"],
  ],
  switch: [
    ["label", "ReactNode", "必填"],
    ["checked / defaultChecked", "boolean", "—"],
    ["onCheckedChange", "(checked: boolean) => void", "—"],
  ],
  chest: [
    ["state", "idle | opening | opened；优先于 open", "由 open 推导"],
    ["onOpenComplete", "() => void，开箱过程结束时触发", "—"],
    ["loop", "boolean，循环开箱预览", "false"],
    ["duration", "number，开箱毫秒数，最小 900", "2200"],
    ["rarity", "common | rare | epic | legendary", "rare"],
    ["open", "boolean", "false"],
    ["size", "number，像素宽度", "100"],
  ],
  stars: [
    ["value / max", "number", "必填 / 3"],
    ["animated", "boolean", "false"],
  ],
  tooltip: [
    ["content", "string", "必填"],
    ["children", "ReactNode", "必填"],
  ],
  toast: [
    ["message", "string", "必填"],
    ["tone", "Tone", "green"],
    ["duration", "number，自动消失毫秒数", "3500"],
  ],
  badge: [
    ["tone", "Tone", "blue"],
    ["children", "ReactNode", "—"],
  ],
  avatar: [
    ["name", "string，可访问名称", "必填"],
    ["level", "number", "—"],
  ],
  icon: [
    ["name", "IconName，内置语义图标名称", "必填"],
    ["size", "number", "20"],
    ["…props", "原生 SVG 属性", "—"],
  ],
  checkbox: [
    ["label", "ReactNode", "必填"],
    ["…props", "原生 input 属性与 ref", "—"],
  ],
  slider: [
    ["label", "string，可访问名称", "必填"],
    ["…props", "原生 range 属性与 ref", "—"],
  ],
  input: [["…props", "原生 input / textarea 属性与 ref", "—"]],
  select: [["…props", "原生 select 属性与 ref", "—"]],
  divider: [["children", "ReactNode，可选分割标题", "—"]],
  card: [["…props", "原生 div 属性", "—"]],
};
export function ComponentPage({ id }: { id: string }) {
  const component = catalog.find((c) => c.id === id)!;
  const index = catalog.indexOf(component);
  return (
    <div className="doc-page">
      <div className="doc-title">
        <Badge tone="gold">COMPONENT</Badge>
        <h1>
          {component.name}
          <span>{component.en}</span>
        </h1>
        <p>用熟悉的 React API，为界面加一点童话般的质感。</p>
      </div>
      <DemoBlock
        title="交互预览"
        subtitle="试着点击、切换或使用键盘操作。"
        code={examplesCode[id]}
      >
        <PrimitiveDemo id={id} />
      </DemoBlock>
      <h2>使用方式</h2>
      <CodeBlock
        code={`import { ${id === "toast" ? "ToastProvider, useToast" : component.en} } from '@crown-ui/react';\nimport '@crown-ui/react/style';\nimport '@crown-ui/react/fonts';\n\n${examplesCode[id]}`}
      />
      <h2>组件参数</h2>
      <div className="api-table-wrap">
        <table className="api-table">
          <thead>
            <tr>
              <th>属性</th>
              <th>类型 / 说明</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            {(api[id] || []).map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) => (
                  <td key={i}>{i === 0 ? <code>{cell}</code> : cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="doc-note">
        <Icon name="info" size={19} />
        <p>
          {id === "dialog"
            ? "使用原生 dialog 提供模态焦点约束、Esc 关闭和关闭后焦点恢复。背景点击也会触发关闭。"
            : id === "tabs"
              ? "支持方向键切换、Home / End 跳转以及 roving tabindex。每个标签都与对应面板关联。"
              : "动效会遵循系统 prefers-reduced-motion 设置。颜色可以通过全局 CSS 变量调整，组件类名统一使用 cr- 前缀。"}
        </p>
      </div>
      <div className="doc-pagination">
        {catalog[index - 1] && (
          <a href={`#/components/${catalog[index - 1].id}`}>
            ← {catalog[index - 1].name}
          </a>
        )}
        {catalog[index + 1] && (
          <a href={`#/components/${catalog[index + 1].id}`}>
            {catalog[index + 1].name} →
          </a>
        )}
      </div>
    </div>
  );
}
export function InstallPage() {
  const base =
    window.location.origin + window.location.pathname.replace(/\/[^/]*$/, "/");
  return (
    <div className="doc-page">
      <div className="doc-title">
        <Badge tone="green">GET STARTED</Badge>
        <h1>准备好，开启冒险。</h1>
        <p>React 18+ · TypeScript · 独立 CSS · 两种接入方式。</p>
      </div>
      <h2>1. 使用本地组件包</h2>
      <p>此版本尚未发布 npm。先下载构建好的包，再安装到你的 React 项目中。</p>
      <a
        className="download-link"
        href="./downloads/crown-ui-react-0.1.0.tgz"
        download
      >
        <Icon name="chest" /> 下载组件包 v0.1.0 <Icon name="arrow" size={16} />
      </a>
      <CodeBlock code="npm install ./crown-ui-react-0.1.0.tgz" />
      <h2>2. 引入组件和样式</h2>
      <CodeBlock
        code={
          'import { Button, Panel } from "@crown-ui/react";\nimport "@crown-ui/react/style";\nimport "@crown-ui/react/fonts";\n\nexport default function App() {\n  return (\n    <Panel title="欢迎来到晨光王国">\n      <Button tone="gold" icon="sword">开启冒险</Button>\n    </Panel>\n  );\n}'
        }
      />
      <h2>或者，把源码放进你的项目</h2>
      <p>
        参考 Warcraft 的源码分发方式，registry 包含完整组件、相对依赖和
        CSS。下载后可自由修改。
      </p>
      <CodeBlock code={`npx shadcn@latest add ${base}r/crown-ui.json`} />
      <p>
        安装到 <code>components/crown-ui</code>{" "}
        后，从该目录导入组件，并在应用入口引入{" "}
        <code>components/crown-ui/style.css</code>。直接使用源码也可以，无需
        Tailwind。
      </p>
      <a href="./r/crown-ui.json" className="text-link" download>
        下载完整源码 registry →
      </a>
      <h2>四个界面示例</h2>
      <p>
        在仓库 <code>demo/screens</code>{" "}
        中提供独立界面文件、统一状态与流程，以及页面专用动效。选择示例可直接体验。
      </p>
      <div className="install-screen-links">
        {screenLinks.map((c) => (
          <a href={`#/examples/${c.id}`} key={c.id}>
            <Icon name={c.icon} />
            {c.name}
            <Icon name="arrow" size={14} />
          </a>
        ))}
      </div>
      <div className="doc-note">
        <Icon name="book" size={20} />
        <p>
          结构借鉴{" "}
          <a
            href="https://github.com/TheOrcDev/warcraftcn-ui"
            target="_blank"
            rel="noreferrer"
          >
            warcraftcn-ui
          </a>{" "}
          的源码分发和{" "}
          <a
            href="https://github.com/guokaigdg/animal-island-ui"
            target="_blank"
            rel="noreferrer"
          >
            animal-island-ui
          </a>{" "}
          的组件包与设计文档组织。视觉素材和组件在本项目中重新制作。
        </p>
      </div>
    </div>
  );
}
export function TokensPage() {
  return (
    <div className="doc-page">
      <div className="doc-title">
        <Badge tone="purple">DESIGN SYSTEM</Badge>
        <h1>有分量，也有童心。</h1>
        <p>厚倒角、清晰层次、温暖材质，让数字界面拥有玩具般的触感。</p>
      </div>
      <h2>王国调色盘</h2>
      <div className="swatch-grid">
        {[
          ["皇家蓝", "#3aa6f5"],
          ["荣耀金", "#ffd45d"],
          ["草地绿", "#87cf4e"],
          ["珊瑚红", "#f27668"],
          ["圣水紫", "#c087f4"],
          ["羊皮纸", "#fffaf0"],
        ].map(([name, color]) => (
          <div key={name}>
            <span style={{ background: color }} />
            <b>{name}</b>
            <code>{color}</code>
          </div>
        ))}
      </div>
      <h2>三层按钮材质</h2>
      <p>
        明亮上沿、饱和主体、深色底座。按下时按钮移动到底座上，产生真实的按压感。
      </p>
      <DemoBlock title="触感与层次" code={examplesCode.button}>
        <PrimitiveDemo id="button" />
      </DemoBlock>
      <h2>字体与间距</h2>
      <p>
        中文采用粗圆字体，英文采用 Nunito 900 与厚实的展示体。可见文字最小
        20px，标题 34–68px；游戏文字统一采用白字、黑色描边与正下方阴影。
        容器、间距与卡牌布局随字号一同调整。
      </p>
      <h2>动效规范</h2>
      <div className="api-table-wrap">
        <table className="api-table">
          <thead>
            <tr>
              <th>交互</th>
              <th>表现</th>
              <th>时长</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["按钮按压", "底座下沉与微亮", "140ms"],
              ["菜单入场", "由下向上错峰进入", "450ms / 70ms 间隔"],
              ["关卡解锁", "节点呼吸光晕与路径引导", "2s 循环"],
              ["战斗交互", "部署弹入、行进、受击与伤害飘字", "180–700ms"],
              ["胜利结算", "星级依次弹入、数字增长、彩纸", "250–1200ms"],
            ].map((row) => (
              <tr key={row[0]}>
                {row.map((cell) => (
                  <td key={cell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2>无障碍与减少动效</h2>
      <p>
        所有示例遵循系统减少动效偏好，也可以通过右上角星光按钮手动切换。状态不会只依靠颜色区分；表单有标签，标签页支持方向键，弹窗使用原生模态焦点机制。
      </p>
      <CodeBlock
        code={
          ':root {\n  --cr-paper: #fffaf0;\n  --cr-ink: #263c52;\n  --cr-radius: 12px;\n  --cr-font: "Nunito", "Microsoft YaHei", sans-serif;\n}\n\n/* 可单独调整按钮材质 */\n.cr-tone-blue {\n  --cr-top: #65c8ff;\n  --cr-middle: #359cf0;\n  --cr-bottom: #2471bf;\n}'
        }
      />
    </div>
  );
}
