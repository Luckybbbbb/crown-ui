// Generated from retained original PNGs by scripts/prepare-art.py.
import art0 from "./assets/chest-common-open.webp";
import art1 from "./assets/chest-common.webp";
import art2 from "./assets/chest-epic-open.webp";
import art3 from "./assets/chest-epic.webp";
import art4 from "./assets/chest-legendary-open.webp";
import art5 from "./assets/chest-legendary.webp";
import art6 from "./assets/chest-rare-open.webp";
import art7 from "./assets/chest-rare.webp";
import art8 from "./assets/coin.webp";
import art9 from "./assets/elixir.webp";
import art10 from "./assets/fireball.webp";
import art11 from "./assets/gem.webp";
import art12 from "./assets/guardian.webp";
import art13 from "./assets/knight.webp";
import art14 from "./assets/ranger.webp";
import art15 from "./assets/star-empty.webp";
import art16 from "./assets/star-filled.webp";
export type IllustrationName =
  | "chest-common"
  | "chest-rare"
  | "chest-epic"
  | "chest-legendary"
  | "chest-common-open"
  | "chest-rare-open"
  | "chest-epic-open"
  | "chest-legendary-open"
  | "knight"
  | "ranger"
  | "fireball"
  | "guardian"
  | "coin"
  | "gem"
  | "elixir"
  | "star-filled"
  | "star-empty";
export const illustrations: Partial<Record<IllustrationName, string>> = {
  "chest-common-open": art0,
  "chest-common": art1,
  "chest-epic-open": art2,
  "chest-epic": art3,
  "chest-legendary-open": art4,
  "chest-legendary": art5,
  "chest-rare-open": art6,
  "chest-rare": art7,
  coin: art8,
  elixir: art9,
  fireball: art10,
  gem: art11,
  guardian: art12,
  knight: art13,
  ranger: art14,
  "star-empty": art15,
  "star-filled": art16,
};
