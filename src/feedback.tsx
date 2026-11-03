import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Icon } from "./icons";
import { cx, IconButton, type Tone } from "./core";
export function Dialog({
  open,
  onOpenChange,
  title,
  children,
  className,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (open && !element.open) element.showModal();
    else if (!open && element.open) element.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      className={cx("cr-dialog", className)}
      aria-labelledby={id}
      onCancel={(e) => {
        e.preventDefault();
        onOpenChange(false);
      }}
      onClose={() => onOpenChange(false)}
      onClick={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false);
      }}
    >
      <div className="cr-dialog-inner">
        <header>
          <h2 id={id}>{title}</h2>
          <IconButton
            icon="close"
            label="关闭弹窗"
            tone="red"
            size="sm"
            onClick={() => onOpenChange(false)}
          />
        </header>
        <div className="cr-dialog-body">{children}</div>
      </div>
    </dialog>
  );
}
type ToastOptions = { message: string; tone?: Tone; duration?: number };
type ToastData = ToastOptions & { id: number };
const ToastContext = createContext<((options: ToastOptions) => void) | null>(
  null,
);
function ToastItem({
  toast,
  dismiss,
}: {
  toast: ToastData;
  dismiss: (id: number) => void;
}) {
  useEffect(() => {
    const timer = setTimeout(() => dismiss(toast.id), toast.duration ?? 3500);
    return () => clearTimeout(timer);
  }, [toast, dismiss]);
  return (
    <div className={`cr-toast cr-tone-${toast.tone ?? "green"}`}>
      <Icon name="check" />
      <span>{toast.message}</span>
      <button
        aria-label="关闭通知"
        type="button"
        onClick={() => dismiss(toast.id)}
      >
        <Icon name="close" size={16} />
      </button>
    </div>
  );
}
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const counter = useRef(0);
  const dismiss = useCallback(
    (id: number) =>
      setToasts((items) => items.filter((item) => item.id !== id)),
    [],
  );
  const show = useCallback(
    (options: ToastOptions) =>
      setToasts((items) => [
        ...items.slice(-3),
        { ...options, id: ++counter.current },
      ]),
    [],
  );
  const context = useMemo(() => show, [show]);
  return (
    <ToastContext.Provider value={context}>
      {children}
      <div className="cr-toast-viewport" role="status" aria-live="polite">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} dismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
export function useToast() {
  const value = useContext(ToastContext);
  if (!value) throw new Error("useToast must be used inside ToastProvider");
  return value;
}
export function Tooltip({
  children,
  content,
}: {
  children: ReactNode;
  content: string;
}) {
  const id = useId();
  return (
    <span className="cr-tooltip" tabIndex={0} aria-describedby={id}>
      {children}
      <span role="tooltip" id={id}>
        {content}
      </span>
    </span>
  );
}
