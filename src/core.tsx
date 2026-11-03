import {
  forwardRef,
  useEffect,
  useRef,
  type CSSProperties,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { Icon, type IconName } from "./icons";
import {
  GameIllustration,
  illustrations,
  type IllustrationName,
} from "./illustrations";
export type Tone = "blue" | "gold" | "green" | "red" | "purple" | "stone";
const artworkByIcon: Partial<Record<IconName, IllustrationName>> = {
  sword: "knight",
  leaf: "ranger",
  flame: "fireball",
  shield: "guardian",
  coin: "coin",
  gem: "gem",
  bolt: "elixir",
};
export function DisplayTitle({
  children,
  as: Tag = "h2",
  tone = "gold",
  size = "md",
  arched = false,
  className,
}: {
  children: string;
  as?: "h1" | "h2" | "h3";
  tone?: "gold" | "ivory" | "blue";
  size?: "sm" | "md" | "lg";
  arched?: boolean;
  className?: string;
}) {
  const letters = Array.from(children);
  return (
    <Tag
      aria-label={children}
      className={cx(
        "cr-display-title",
        `cr-title-${tone}`,
        `cr-title-${size}`,
        className,
      )}
    >
      {letters.map((letter, i) => {
        const offset = i - (letters.length - 1) / 2;
        return (
          <span
            aria-hidden="true"
            className="cr-display-glyph"
            data-letter={letter}
            style={
              arched
                ? {
                    transform: `translateY(${Math.abs(offset) * 3}px) rotate(${offset * 2}deg)`,
                  }
                : undefined
            }
            key={i}
          >
            {letter === " " ? "\u00a0" : letter}
          </span>
        );
      })}
    </Tag>
  );
}
export const cx = (...values: (string | false | undefined)[]) =>
  values.filter(Boolean).join(" ");
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: Tone;
  size?: "sm" | "md" | "lg";
  icon?: IconName;
  loading?: boolean;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      tone = "blue",
      size = "md",
      icon,
      loading,
      className,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        className={cx(
          "cr-button",
          `cr-tone-${tone}`,
          `cr-button-${size}`,
          className,
        )}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? (
          <span className="cr-spinner" />
        ) : (
          icon && <Icon name={icon} />
        )}
        <span>{children}</span>
      </button>
    );
  },
);
export interface IconButtonProps extends Omit<
  ButtonProps,
  "children" | "icon"
> {
  icon: IconName;
  label: string;
  variant?: "standard" | "game";
}
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { icon, label, variant = "standard", className, ...props },
    ref,
  ) {
    return (
      <Button
        ref={ref}
        aria-label={label}
        title={label}
        className={cx(
          "cr-icon-button",
          variant === "game" && "cr-icon-button-game",
          className,
        )}
        {...props}
      >
        {variant === "game" && (icon === "back" || icon === "settings") ? (
          <svg
            className="cr-navigation-icon"
            viewBox="0 0 32 32"
            aria-hidden="true"
            focusable="false"
          >
            {icon === "back" ? (
              <path d="M14 5 3 15a1.4 1.4 0 0 0 0 2l11 10V21h13a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H14Z" />
            ) : (
              <path
                fillRule="evenodd"
                d="m13 2-.8 4.1-2.5 1.4-4-.9-3 5.1 3 3.1v2.9l-3 3.1 3 5.1 4-.9 2.5 1.4.8 4.1h6l.8-4.1 2.5-1.4 4 .9 3-5.1-3-3.1v-2.9l3-3.1-3-5.1-4 .9-2.5-1.4L19 2Zm3 8a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z"
              />
            )}
          </svg>
        ) : (
          <Icon name={icon} />
        )}
      </Button>
    );
  },
);
export function Badge({
  tone = "blue",
  className,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span className={cx("cr-badge", `cr-tone-${tone}`, className)} {...props}>
      {children}
    </span>
  );
}
export function Panel({
  title,
  action,
  tone = "stone",
  children,
  className,
  ...props
}: Omit<HTMLAttributes<HTMLElement>, "title"> & {
  title?: ReactNode;
  action?: ReactNode;
  tone?: Tone;
}) {
  return (
    <section
      className={cx("cr-panel", `cr-panel-${tone}`, className)}
      {...props}
    >
      {title && (
        <header className="cr-panel-header">
          <h3>{title}</h3>
          {action}
        </header>
      )}
      <div className="cr-panel-body">{children}</div>
    </section>
  );
}
export function Card({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx("cr-card", className)} {...props}>
      {children}
    </div>
  );
}
export interface ProgressProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  value: number;
  max?: number;
  tone?: Tone;
  label?: string;
  showValue?: boolean;
}
export function Progress({
  value,
  max = 100,
  tone = "green",
  label = "进度",
  showValue,
  className,
  ...props
}: ProgressProps) {
  const limit = Number.isFinite(max) && max > 0 ? max : 100;
  const current = Number.isFinite(value)
    ? Math.max(0, Math.min(limit, value))
    : 0;
  return (
    <div
      className={cx("cr-progress", `cr-tone-${tone}`, className)}
      role="progressbar"
      aria-label={label}
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={limit}
      {...props}
    >
      <span
        className="cr-progress-fill"
        style={{ width: `${(current / limit) * 100}%` }}
      />
      {showValue && (
        <span className="cr-progress-text">
          {Math.round(current)} / {limit}
        </span>
      )}
    </div>
  );
}
export function ResourceCounter({
  icon = "coin",
  value,
  label,
  onAdd,
  tone = "gold",
}: {
  icon?: IconName;
  value: number;
  label: string;
  onAdd?: () => void;
  tone?: Tone;
}) {
  return (
    <div
      className={cx("cr-resource", `cr-resource-${tone}`)}
      aria-label={`${label} ${value}`}
    >
      <span className="cr-resource-icon">
        {artworkByIcon[icon] && illustrations[artworkByIcon[icon]!] ? (
          <GameIllustration name={artworkByIcon[icon]!} size={42} />
        ) : (
          <Icon name={icon} size={25} />
        )}
      </span>
      <span className="cr-resource-number" key={value}>
        {value.toLocaleString("en-US")}
      </span>
      {onAdd && (
        <button
          type="button"
          className="cr-resource-add"
          aria-label={`增加${label}`}
          onClick={onAdd}
        >
          <Icon name="plus" size={14} />
        </button>
      )}
    </div>
  );
}
export function Avatar({
  name,
  level,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { name: string; level?: number }) {
  return (
    <div
      className={cx("cr-avatar", className)}
      role="img"
      aria-label={`${name}${level ? `，等级 ${level}` : ""}`}
      {...props}
    >
      <Icon name="crown" size={30} />
      {level && <span>{level}</span>}
    </div>
  );
}
export function Divider({ children }: { children?: ReactNode }) {
  return (
    <div className="cr-divider">{children && <span>{children}</span>}</div>
  );
}
export function StarRating({
  value,
  max = 3,
  animated = false,
  size,
}: {
  value: number;
  max?: number;
  animated?: boolean;
  size?: number;
}) {
  return (
    <div
      className={cx("cr-stars", animated && "cr-stars-animated")}
      role="img"
      aria-label={`${max} 星中获得 ${value} 星`}
      style={
        size ? ({ "--cr-star-size": `${size}px` } as CSSProperties) : undefined
      }
    >
      {Array.from({ length: max }, (_, i) => (
        <span
          className={cx("cr-star-slot", i < value && "cr-star-filled")}
          style={{ "--cr-star-delay": `${i * 450 + 350}ms` } as CSSProperties}
          key={i}
        >
          <span className="cr-star-socket">
            {illustrations["star-empty"] ? (
              <GameIllustration name="star-empty" size={60} />
            ) : (
              <Icon name="star" size={48} />
            )}
          </span>
          {i < value && (
            <>
              <span className="cr-star-fill">
                {illustrations["star-filled"] ? (
                  <GameIllustration name="star-filled" size={60} />
                ) : (
                  <Icon name="star" size={48} />
                )}
              </span>
              <span className="cr-star-impact-ring" />
              <span className="cr-star-impact-flash" />
              {Array.from({ length: 6 }, (_, j) => (
                <i
                  className="cr-star-spark"
                  style={
                    {
                      "--cr-spark-x": `${Math.cos((j * Math.PI) / 3) * 70}px`,
                      "--cr-spark-y": `${Math.sin((j * Math.PI) / 3) * 55}px`,
                    } as CSSProperties
                  }
                  key={j}
                />
              ))}
            </>
          )}
        </span>
      ))}
    </div>
  );
}
export type ChestState = "idle" | "opening" | "opened";
export function Chest({
  open = false,
  size = 160,
  rarity = "rare",
  state,
  onOpenComplete,
  loop = false,
  duration = 2200,
  className = "",
}: {
  open?: boolean;
  size?: number;
  rarity?: "common" | "rare" | "epic" | "legendary";
  state?: ChestState;
  onOpenComplete?: () => void;
  loop?: boolean;
  duration?: number;
  className?: string;
}) {
  const active = state ?? (open ? "opened" : "idle");
  const closedName = `chest-${rarity}` as IllustrationName;
  const openName = `chest-${rarity}-open` as IllustrationName;
  const speed = Number.isFinite(duration) ? Math.max(900, duration) : 2200;
  const completeRef = useRef(onOpenComplete);
  completeRef.current = onOpenComplete;
  useEffect(() => {
    if (active !== "opening" || !completeRef.current) return;
    const reduce =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.reducedMotion === "true";
    const delay = reduce ? 20 : speed;
    const timer =
      loop && !reduce
        ? setInterval(() => completeRef.current?.(), delay)
        : setTimeout(() => completeRef.current?.(), delay);
    return () => {
      clearTimeout(timer);
      clearInterval(timer);
    };
  }, [active, speed, loop]);
  const label = {
    common: "普通木箱",
    rare: "稀有皇家宝箱",
    epic: "史诗宝箱",
    legendary: "传说王冠宝箱",
  }[rarity];
  return (
    <span
      role="img"
      aria-label={`${label}，${{ idle: "待机", opening: "开箱中", opened: "已开启" }[active]}`}
      aria-busy={(active === "opening" && !loop) || undefined}
      data-state={active}
      className={cx(
        "cr-chest",
        "cr-chest-illustrated",
        `cr-chest-state-${active}`,
        `cr-chest-${rarity}`,
        className,
      )}
      style={
        {
          "--cr-chest-size": `${size}px`,
          "--cr-chest-duration": `${speed}ms`,
          "--cr-chest-repeat": loop ? "infinite" : "1",
          "--cr-chest-mask": `url("${illustrations[active === "opened" ? openName : closedName] ?? ""}")`,
        } as CSSProperties
      }
    >
      <span className="cr-chest-ambient" aria-hidden="true" />
      <span className="cr-chest-rays" aria-hidden="true" />
      <span className="cr-chest-keylight" aria-hidden="true" />
      <GameIllustration
        name={closedName}
        size={size}
        aria-hidden="true"
        className="cr-chest-image cr-chest-closed-image"
      />
      <GameIllustration
        name={illustrations[openName] ? openName : closedName}
        size={size}
        aria-hidden="true"
        className="cr-chest-image cr-chest-open-image"
      />
      <span className="cr-chest-sheen" aria-hidden="true" />
      <span className="cr-chest-burst" aria-hidden="true" />
      {Array.from({ length: 20 }, (_, i) => {
        const angle = (i * Math.PI * 2) / 20;
        const distance = 55 + (i % 5) * 15;
        return (
          <i
            key={i}
            aria-hidden="true"
            className="cr-chest-particle"
            style={
              {
                "--cr-particle-x": `${Math.cos(angle) * distance}px`,
                "--cr-particle-y": `${Math.sin(angle) * distance - 40}px`,
                "--cr-particle-delay": `${(i % 4) * 15}ms`,
                "--cr-particle-rotation": `${i * 31}deg`,
              } as CSSProperties
            }
          />
        );
      })}
      {Array.from({ length: 5 }, (_, i) => (
        <i
          className="cr-chest-idle-spark"
          aria-hidden="true"
          style={{
            left: `${15 + i * 17}%`,
            top: `${25 + (i % 3) * 19}%`,
            animationDelay: `${i * 0.47}s`,
          }}
          key={`s${i}`}
        />
      ))}
    </span>
  );
}
export function LevelNode({
  level,
  state = "available",
  stars = 0,
  onClick,
  label,
}: {
  level: number;
  state?: "locked" | "available" | "completed";
  stars?: number;
  onClick?: () => void;
  label?: string;
}) {
  return (
    <div className={cx("cr-level", `cr-level-${state}`)}>
      <button
        type="button"
        className="cr-level-node"
        disabled={state === "locked"}
        aria-label={
          label || `关卡 ${level}${state === "locked" ? "，未解锁" : ""}`
        }
        onClick={onClick}
      >
        {state === "locked" ? <Icon name="lock" size={24} /> : level}
      </button>
      {state === "completed" && <StarRating value={stars} />}
    </div>
  );
}
export interface GameCardProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  name: string;
  cost: number;
  icon?: IconName;
  rarity?: "common" | "rare" | "epic";
  selected?: boolean;
  level?: number;
  artwork?: IllustrationName;
}
export function GameCard({
  name,
  cost,
  icon = "sword",
  rarity = "common",
  selected,
  level = 1,
  artwork,
  className,
  ...props
}: GameCardProps) {
  const picture = artwork ?? artworkByIcon[icon];
  return (
    <button
      type="button"
      className={cx(
        "cr-game-card",
        `cr-rarity-${rarity}`,
        selected && "cr-game-card-selected",
        className,
      )}
      aria-pressed={selected}
      aria-label={`${name}，消耗 ${cost}，等级 ${level}`}
      {...props}
    >
      <span className="cr-card-cost">{cost}</span>
      <span className="cr-card-portrait">
        {picture && illustrations[picture] ? (
          <GameIllustration name={picture} size={100} />
        ) : (
          <Icon name={icon} size={43} />
        )}
        <span className="cr-card-portrait-spark" />
      </span>
      <span className="cr-card-name">{name}</span>
      <span className="cr-card-level">等级 {level}</span>
    </button>
  );
}
