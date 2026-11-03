import { useState } from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import axe from "axe-core";
import {
  Button,
  Dialog,
  GameCard,
  IconButton,
  Input,
  LevelNode,
  Progress,
  Switch,
  Tabs,
  ToastProvider,
  useToast,
} from "../src";
describe("component interaction contracts", () => {
  it("honors disabled and loading button states", async () => {
    const click = vi.fn();
    render(
      <>
        <Button disabled onClick={click}>
          禁用
        </Button>
        <Button loading onClick={click}>
          加载
        </Button>
        <IconButton icon="settings" label="设置" onClick={click} />
      </>,
    );
    await userEvent.click(screen.getByText("禁用"));
    await userEvent.click(screen.getByText("加载"));
    expect(click).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole("button", { name: "设置" }));
    expect(click).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "加载" })).toHaveAttribute(
      "aria-busy",
      "true",
    );
  });
  it("offers keyboard roving tabs and skips disabled tabs", async () => {
    function Demo() {
      const [value, setValue] = useState("one");
      return (
        <Tabs
          value={value}
          onValueChange={setValue}
          items={[
            { value: "one", label: "一", content: "第一面板" },
            {
              value: "blocked",
              label: "锁定",
              content: "锁定内容",
              disabled: true,
            },
            { value: "two", label: "二", content: "第二面板" },
          ]}
        />
      );
    }
    render(<Demo />);
    const first = screen.getByRole("tab", { name: "一" });
    first.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "二" })).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("第二面板");
    await userEvent.keyboard("{Home}");
    expect(first).toHaveFocus();
    expect(first).toHaveAttribute("aria-selected", "true");
  });
  it("changes a controlled switch with the keyboard", async () => {
    function Demo() {
      const [v, set] = useState(false);
      return <Switch label="音效" checked={v} onCheckedChange={set} />;
    }
    render(<Demo />);
    screen.getByRole("switch").focus();
    await userEvent.keyboard(" ");
    expect(screen.getByRole("switch", { name: "音效" })).toBeChecked();
  });
  it("opens and closes a native modal through its close callback", async () => {
    function Demo() {
      const [open, set] = useState(false);
      return (
        <>
          <Button onClick={() => set(true)}>打开</Button>
          <Dialog open={open} onOpenChange={set} title="奖励">
            <p>金币</p>
          </Dialog>
        </>
      );
    }
    render(<Demo />);
    await userEvent.click(screen.getByRole("button", { name: "打开" }));
    const modal = screen.getByRole("dialog", { name: "奖励" });
    expect(modal).toHaveAttribute("open");
    await userEvent.click(
      within(modal).getByRole("button", { name: "关闭弹窗" }),
    );
    expect(modal).not.toHaveAttribute("open");
  });
  it("clamps progress to its public range", () => {
    const { rerender } = render(
      <Progress value={130} max={100} label="生命" />,
    );
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
    rerender(<Progress value={-3} max={0} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0",
    );
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuemax",
      "100",
    );
  });
  it("does not allow activation of locked levels or disabled cards", async () => {
    const onClick = vi.fn();
    render(
      <>
        <LevelNode level={3} state="locked" onClick={onClick} />
        <GameCard name="骑士" cost={3} disabled onClick={onClick} />
      </>,
    );
    for (const button of screen.getAllByRole("button"))
      await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
  it("dismisses toast feedback", async () => {
    function Demo() {
      const toast = useToast();
      return (
        <Button onClick={() => toast({ message: "已获得奖励" })}>领取</Button>
      );
    }
    render(
      <ToastProvider>
        <Demo />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "领取" }));
    expect(screen.getByRole("status")).toHaveTextContent("已获得奖励");
    await userEvent.click(screen.getByRole("button", { name: "关闭通知" }));
    expect(screen.queryByText("已获得奖励")).not.toBeInTheDocument();
  });
  it("has no detectable serious accessibility violations in the core controls", async () => {
    const { container } = render(
      <main>
        <h1>组件示例</h1>
        <label>
          昵称
          <Input />
        </label>
        <Switch label="音效" defaultChecked />
        <Progress value={50} label="生命" />
        <IconButton icon="settings" label="设置" />
        <GameCard name="骑士" cost={3} />
      </main>,
    );
    const report = await axe.run(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(
      report.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      ),
    ).toEqual([]);
  });
});
