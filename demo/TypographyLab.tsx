import { useState, type CSSProperties } from "react";
import {
  Badge,
  Button,
  DisplayTitle,
  Icon,
  Input,
  ResourceCounter,
} from "../src";
import { CodeBlock } from "./Docs";
const fonts = [
  {
    id: "cute",
    name: "软萌粗圆 · 当前方案",
    family: "Crown Display Latin, Crown Rounded SC, sans-serif",
    face: "资源圆体 Heavy 衍生 + Lilita One 衍生",
    note: "真正的粗字重与圆角轮廓；最小 20px，白字、黑描边和正下方阴影。",
    license: "SIL OFL 1.1",
  },
  {
    id: "royal",
    name: "皇家手绘",
    family: "Crown Display Latin, Crown Display CJK, sans-serif",
    face: "站酷快乐体 + Lilita One 衍生",
    note: "圆厚的字面、错落的轮廓，适合主标题、主要按钮。",
    license: "SIL OFL 1.1",
  },
  {
    id: "action",
    name: "战斗斜黑",
    family: "Smiley Sans, sans-serif",
    face: "得意黑 Smiley Sans",
    note: "窄斜、速度感强，适合作为战斗提示与副标题的对照。",
    license: "SIL OFL 1.1",
  },
  {
    id: "system",
    name: "原系统黑体",
    family: "Microsoft YaHei, sans-serif",
    face: "旧版回退（不随包分发）",
    note: "只作为前后对照，标题造型与正文差异较小。",
    license: "仅调用设备已有字体",
  },
];
export function TypographyLab() {
  const [sample, setSample] = useState("王国远征");
  const [selected, setSelected] = useState("cute");
  const current = fonts.find((f) => f.id === selected)!;
  return (
    <div className="doc-page typography-lab">
      <div className="doc-title">
        <Badge tone="gold">TYPE & LETTERING</Badge>
        <h1>从字体，到游戏标题。</h1>
        <p>字形是骨架，轮廓是性格。让标题像一件雕刻过的游戏道具。</p>
      </div>
      <label className="type-sample-input">
        试一段你的标题
        <Input
          value={sample}
          maxLength={8}
          onChange={(e) => setSample(e.target.value)}
          placeholder="最多 8 个字"
        />
      </label>
      <div className="font-comparison">
        {fonts.map((font) => (
          <button
            key={font.id}
            aria-pressed={selected === font.id}
            onClick={() => setSelected(font.id)}
            className={selected === font.id ? "selected" : ""}
          >
            <header>
              <b>{font.name}</b>
              {selected === font.id && <Icon name="check" size={16} />}
            </header>
            <div
              style={{
                fontFamily: font.family,
                fontWeight: font.id === "system" ? 900 : 400,
              }}
            >
              {sample || "王国远征"}
            </div>
            <strong>{font.face}</strong>
            <p>{font.note}</p>
            <small>{font.license}</small>
          </button>
        ))}
      </div>
      <h2>放进真正的界面里</h2>
      <div
        className="type-artboard"
        style={{ "--cr-font-display": current.family } as CSSProperties}
      >
        <Badge tone="gold">CROWN KINGDOM</Badge>
        <DisplayTitle size="lg" arched>
          {sample || "王国远征"}
        </DisplayTitle>
        <span className="type-artboard-ribbon">为下一次荣耀，准备就绪</span>
        <div className="type-artboard-actions">
          <Button tone="gold" size="lg" icon="sword">
            开启冒险
          </Button>
          <Button tone="blue" icon="map">
            冒险地图
          </Button>
        </div>
        <ResourceCounter value={1280} label="金币" />
      </div>
      <h2>三层字形材质</h2>
      <div className="title-treatment-grid">
        <div>
          <DisplayTitle size="sm">荣耀时刻</DisplayTitle>
          <span>金色 · 奖励与主入口</span>
        </div>
        <div>
          <DisplayTitle tone="ivory" size="sm">
            晨光森林
          </DisplayTitle>
          <span>象牙白 · 场景与章节</span>
        </div>
        <div>
          <DisplayTitle tone="blue" size="sm">
            战斗开始
          </DisplayTitle>
          <span>冰晶蓝 · 战斗与信息</span>
        </div>
      </div>
      <h2>字号与用途分工</h2>
      <div className="api-table-wrap">
        <table className="api-table">
          <thead>
            <tr>
              <th>层级</th>
              <th>字体</th>
              <th>设计处理</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>游戏 Logo / 胜利标题</td>
              <td>资源圆体 Heavy 衍生 · 52–68px</td>
              <td>粗圆白字、黑描边、正下方硬阴影、轻微弧形</td>
            </tr>
            <tr>
              <td>按钮 / 面板标题</td>
              <td>粗圆中文 + 英文展示体 · 20–30px</td>
              <td>字重 900，白字黑边，清晰的垂直阴影</td>
            </tr>
            <tr>
              <td>资源 / 倒计时</td>
              <td>Lilita One 衍生 · 23–31px</td>
              <td>高字面、稳定对齐、避免细线数字</td>
            </tr>
            <tr>
              <td>说明 / 表单 / 长段正文</td>
              <td>粗圆中文 + Nunito 900 · 最小 20px</td>
              <td>游戏内白字黑边；文档长段落保留深色粗字，行距 1.7–1.9</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>可复用的标题组件</h2>
      <CodeBlock
        code={
          'import { DisplayTitle } from "@crown-ui/react";\nimport "@crown-ui/react/style";\nimport "@crown-ui/react/fonts";\n\n<DisplayTitle tone="gold" size="lg" arched>\n  王国远征\n</DisplayTitle>'
        }
      />
      <div className="doc-note">
        <Icon name="shield" size={20} />
        <p>
          分发字体均保留 SIL OFL 1.1 许可证。站酷快乐体来自 Google
          Fonts，得意黑来自作者发行包；Lilita 的转换版本已按保留名称要求更名为
          Crown Latin Display。正文原始许可证一同保留。详见项目
          THIRD_PARTY_NOTICES.md。
        </p>
      </div>
    </div>
  );
}
