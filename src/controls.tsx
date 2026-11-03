import {
  forwardRef,
  useId,
  useRef,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { cx } from "./core";
import { Icon } from "./icons";
export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return <input ref={ref} className={cx("cr-input", className)} {...props} />;
});
export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cx("cr-input", "cr-textarea", className)}
      {...props}
    />
  );
});
export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cx("cr-input", "cr-select", className)}
      {...props}
    />
  );
});
export interface CheckProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
}
export const Checkbox = forwardRef<HTMLInputElement, CheckProps>(
  function Checkbox({ label, className, ...props }, ref) {
    return (
      <label className={cx("cr-check-label", className)}>
        <input ref={ref} type="checkbox" className="cr-checkbox" {...props} />
        <span className="cr-check-box">
          <Icon name="check" size={17} />
        </span>
        <span>{label}</span>
      </label>
    );
  },
);
export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label: ReactNode;
  onCheckedChange?: (checked: boolean) => void;
}
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, onCheckedChange, className, ...props },
  ref,
) {
  return (
    <label className={cx("cr-switch-label", className)}>
      <input
        type="checkbox"
        role="switch"
        ref={ref}
        className="cr-switch-input"
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        {...props}
      />
      <span className="cr-switch-track">
        <span />
      </span>
      <span>{label}</span>
    </label>
  );
});
export const Slider = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { label: string }
>(function Slider({ label, className, ...props }, ref) {
  return (
    <input
      ref={ref}
      type="range"
      aria-label={label}
      className={cx("cr-slider", className)}
      {...props}
    />
  );
});
export interface TabItem {
  value: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}
export function Tabs({
  items,
  value,
  onValueChange,
  label = "选项卡",
}: {
  items: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
}) {
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  function navigate(e: KeyboardEvent, index: number) {
    const active = items
      .map((item, i) => (!item.disabled ? i : -1))
      .filter((i) => i >= 0);
    const position = active.indexOf(index);
    const next =
      e.key === "Home"
        ? active[0]
        : e.key === "End"
          ? active.at(-1)
          : e.key === "ArrowRight"
            ? active[(position + 1) % active.length]
            : e.key === "ArrowLeft"
              ? active[(position - 1 + active.length) % active.length]
              : undefined;
    if (next !== undefined) {
      e.preventDefault();
      onValueChange(items[next].value);
      refs.current[next]?.focus();
    }
  }
  return (
    <div className="cr-tabs">
      <div className="cr-tab-list" role="tablist" aria-label={label}>
        {items.map((item, i) => (
          <button
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${item.value}`}
            aria-controls={`${id}-panel-${item.value}`}
            aria-selected={value === item.value}
            tabIndex={value === item.value ? 0 : -1}
            disabled={item.disabled}
            onKeyDown={(e) => navigate(e, i)}
            onClick={() => onValueChange(item.value)}
            key={item.value}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item) => (
        <div
          role="tabpanel"
          tabIndex={0}
          hidden={value !== item.value}
          id={`${id}-panel-${item.value}`}
          aria-labelledby={`${id}-tab-${item.value}`}
          key={item.value}
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
