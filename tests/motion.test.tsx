import { useState } from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Button, Chest, StarRating, type ChestState } from "../src";
afterEach(() => vi.useRealTimers());
describe("game motion state contracts", () => {
  it("completes opening once and switches to the opened state", () => {
    vi.useFakeTimers();
    const finished = vi.fn();
    function Demo() {
      const [state, set] = useState<ChestState>("idle");
      return (
        <>
          <Button onClick={() => set("opening")}>开启</Button>
          <Chest
            rarity="epic"
            state={state}
            onOpenComplete={() => {
              finished();
              set("opened");
            }}
          />
        </>
      );
    }
    render(<Demo />);
    expect(
      screen.getByRole("img", { name: "史诗宝箱，待机" }),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "开启" }));
    expect(
      screen.getByRole("img", { name: "史诗宝箱，开箱中" }),
    ).toHaveAttribute("aria-busy", "true");
    act(() => vi.advanceTimersByTime(2199));
    expect(finished).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(1));
    expect(finished).toHaveBeenCalledOnce();
    expect(
      screen.getByRole("img", { name: "史诗宝箱，已开启" }),
    ).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(5000));
    expect(finished).toHaveBeenCalledOnce();
  });
  it("cancels the completion callback when opening is interrupted", () => {
    vi.useFakeTimers();
    const complete = vi.fn();
    const { rerender } = render(
      <Chest state="opening" onOpenComplete={complete} />,
    );
    rerender(<Chest state="idle" onOpenComplete={complete} />);
    act(() => vi.advanceTimersByTime(3000));
    expect(complete).not.toHaveBeenCalled();
  });
  it("keeps all three empty sockets beneath the awarded stars", () => {
    const { container, rerender } = render(<StarRating value={2} animated />);
    expect(container.querySelectorAll(".cr-star-socket")).toHaveLength(3);
    expect(container.querySelectorAll(".cr-star-fill")).toHaveLength(2);
    expect(
      screen.getByRole("img", { name: "3 星中获得 2 星" }),
    ).toBeInTheDocument();
    rerender(<StarRating value={0} animated />);
    expect(container.querySelectorAll(".cr-star-socket")).toHaveLength(3);
    expect(container.querySelectorAll(".cr-star-fill")).toHaveLength(0);
  });
});
