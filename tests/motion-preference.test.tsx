import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Chest, ToastProvider } from "../src";
import { App } from "../demo/App";

function mockSystemReduction() {
  const media = Object.assign(new EventTarget(), {
    matches: true,
    media: "(prefers-reduced-motion: reduce)",
    onchange: null,
    addListener() {},
    removeListener() {},
  }) as MediaQueryList;
  vi.spyOn(window, "matchMedia").mockReturnValue(media);
  return media;
}

beforeEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.reducedMotion;
  delete document.documentElement.dataset.motionPreference;
});
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  localStorage.clear();
  delete document.documentElement.dataset.reducedMotion;
  delete document.documentElement.dataset.motionPreference;
});

describe("motion preference priority", () => {
  it("plays the full opening when explicitly enabled despite system reduction", () => {
    mockSystemReduction();
    document.documentElement.dataset.reducedMotion = "false";
    vi.useFakeTimers();
    const finished = vi.fn();
    render(<Chest state="opening" onOpenComplete={finished} />);
    act(() => vi.advanceTimersByTime(2199));
    expect(finished).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(1));
    expect(finished).toHaveBeenCalledOnce();
  });

  it("finishes immediately when following a system reduction preference", () => {
    mockSystemReduction();
    vi.useFakeTimers();
    const finished = vi.fn();
    render(<Chest state="opening" onOpenComplete={finished} />);
    act(() => vi.advanceTimersByTime(20));
    expect(finished).toHaveBeenCalledOnce();
  });

  it("shows the effective state and persists a full-motion override across reloads", () => {
    mockSystemReduction();
    // The old app stored false on every first visit, even without a user choice.
    localStorage.setItem("crown-reduced-motion", "false");
    window.location.hash = "#/motion";
    const view = render(<ToastProvider><App /></ToastProvider>);
    expect(document.documentElement).toHaveAttribute("data-reduced-motion", "true");
    expect(screen.getByText("系统设置要求减少动态效果，当前只展示完成状态。")).toBeVisible();
    fireEvent.change(screen.getByRole("combobox", { name: "动效模式" }), {
      target: { value: "full" },
    });
    expect(document.documentElement).toHaveAttribute("data-reduced-motion", "false");
    expect(screen.getByRole("button", { name: "减少界面动效" })).toHaveAttribute("aria-pressed", "true");
    expect(localStorage.getItem("crown-motion-preference")).toBe("full");
    view.unmount();
    render(<ToastProvider><App /></ToastProvider>);
    expect(screen.getByRole("combobox", { name: "动效模式" })).toHaveValue("full");
    expect(document.documentElement).toHaveAttribute("data-reduced-motion", "false");
    fireEvent.click(screen.getByRole("button", { name: "减少界面动效" }));
    expect(document.documentElement).toHaveAttribute("data-reduced-motion", "true");
    expect(screen.getByRole("combobox", { name: "动效模式" })).toHaveValue("reduced");
    fireEvent.click(within(screen.getByRole("region", { name: "动效设置" }))
      .getByRole("button", { name: "启用完整动效" }));
    expect(document.documentElement).toHaveAttribute("data-reduced-motion", "false");
  });

  it("updates following-system mode when the OS changes, while retaining an explicit choice", () => {
    const media = mockSystemReduction();
    window.location.hash = "#/motion";
    render(<ToastProvider><App /></ToastProvider>);
    act(() => {
      Object.defineProperty(media, "matches", { value: false, configurable: true });
      media.dispatchEvent(new Event("change"));
    });
    expect(document.documentElement).toHaveAttribute("data-reduced-motion", "false");
    fireEvent.change(screen.getByRole("combobox", { name: "动效模式" }), { target: { value: "full" } });
    act(() => {
      Object.defineProperty(media, "matches", { value: true, configurable: true });
      media.dispatchEvent(new Event("change"));
    });
    expect(document.documentElement).toHaveAttribute("data-reduced-motion", "false");
  });
});
