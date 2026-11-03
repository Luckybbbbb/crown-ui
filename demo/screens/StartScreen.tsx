import { useState } from "react";
import {
  Badge,
  Button,
  Chest,
  Dialog,
  DisplayTitle,
  Icon,
  IconButton,
} from "../../src";
import { ScreenWallet } from "./Examples";
import type { SaveData } from "./state";
export function StartScreen({
  save,
  onStart,
  onSettings,
}: {
  save: SaveData;
  onStart: () => void;
  onSettings: () => void;
}) {
  const [help, setHelp] = useState(false);
  return (
    <div className="start-screen">
      <div className="start-landscape" />
      <div className="start-cloud start-cloud-one" />
      <div className="start-cloud start-cloud-two" />
      <div className="start-top">
        <ScreenWallet coins={save.coins} gems={save.gems} />
        <IconButton
          icon="settings"
          label="冒险设置"
          variant="game"
          size="sm"
          onClick={onSettings}
        />
      </div>
      <div className="start-logo">
        <div className="logo-crown">
          <Icon name="crown" size={60} />
        </div>
        <span className="logo-kicker">CROWN KINGDOM</span>
        <DisplayTitle size="lg" arched>
          王国远征
        </DisplayTitle>
        <div className="logo-ribbon">每一次出发，都有新的传奇</div>
      </div>
      <div className="start-castle-tag">
        <Badge tone="gold">
          <Icon name="flag" size={12} /> 晨光王国 · 第一章
        </Badge>
      </div>
      <div className="start-menu">
        <Button tone="gold" size="lg" icon="sword" onClick={onStart}>
          开启冒险
          <Icon name="arrow" size={21} />
        </Button>
        <Button tone="blue" icon="map" onClick={onStart}>
          我的冒险地图
        </Button>
        <button className="start-help" onClick={() => setHelp(true)}>
          <Icon name="book" size={15} /> 冒险指南
        </button>
      </div>
      <div className="start-bottom">
        <span>
          <Icon name="shield" size={13} /> 勇气，是最好的装备。
        </span>
        <small>CROWN UI · INTERACTIVE DEMO</small>
      </div>
      <div className="start-supply">
        <Chest size={52} />
        <span>整装待发</span>
      </div>
      <Dialog open={help} onOpenChange={setHelp} title="冒险指南">
        <div className="guide-content">
          <p>
            前往地图选择关卡。在战场选择卡牌，再点击己方绿色半场部署，单位会自动向敌方城堡前进。
          </p>
          <p>
            骑士适合持续进攻，游侠消耗更低，火球会立即造成伤害。圣水随时间恢复；敌方每隔一段时间发起攻击。
          </p>
          <p>
            在 75 秒内击破红方城堡即可胜利，剩余生命决定星级。失败也能重新挑战。
          </p>
          <Button
            tone="gold"
            icon="sword"
            onClick={() => {
              setHelp(false);
              onStart();
            }}
          >
            明白了，出发！
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
