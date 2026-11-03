import { useEffect, useState } from "react";
import { Badge, Button, Dialog, Icon, Input, type IconName } from "../src";
import { catalog, groups, screenLinks } from "./catalog";
import { navigate, useRoute } from "./navigation";
import { Overview, InstallPage, TokensPage, ComponentPage } from "./Docs";
import { Examples } from "./screens/Examples";
import { TypographyLab } from "./TypographyLab";
import { IllustrationsPage } from "./IllustrationsPage";
import { MotionPage } from "./MotionPage";
import { useMotionPreference } from "./useMotionPreference";

export function App() {
  const route = useRoute();
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const { preference, setPreference, reduced, systemReduced } = useMotionPreference();
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearch((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  useEffect(() => {
    setMobileNav(false);
  }, [route]);
  const allLinks = [
    { id: "/typography", name: "字体与标题", en: "Typography" },
    { id: "/illustrations", name: "3D 插图库", en: "Illustrations" },
    { id: "/motion", name: "动效预览", en: "Motion playground" },
    { id: "/", name: "组件概览", en: "Overview" },
    { id: "/install", name: "快速开始", en: "Installation" },
    ...catalog.map((c) => ({ ...c, id: `/components/${c.id}` })),
    ...screenLinks.map((c) => ({ ...c, id: `/examples/${c.id}` })),
  ];
  const filtered = allLinks.filter((c) =>
    `${c.name} ${c.en}`.toLowerCase().includes(query.toLowerCase()),
  );
  const activeLink = allLinks.find((c) => c.id === route);
  useEffect(() => {
    document.title = `${activeLink?.name || "设计规范"} · Crown UI`;
  }, [activeLink]);
  function navItem(
    path: string,
    title: string,
    subtitle?: string,
    icon?: IconName,
    isNew?: boolean,
  ) {
    return (
      <a
        href={`#${path}`}
        className={`side-link ${route === path ? "active" : ""}`}
        key={path}
      >
        {icon && <Icon name={icon} size={15} />}
        <span>
          {title}
          {subtitle && <small>{subtitle}</small>}
        </span>
        {isNew && <i>NEW</i>}
      </a>
    );
  }
  return (
    <div className="docs-shell">
      <a
        className="skip-link"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main-content")?.focus();
        }}
      >
        跳到内容
      </a>
      <header className="site-header">
        <button
          className="mobile-toggle plain-icon"
          aria-label="打开导航"
          onClick={() => setMobileNav(!mobileNav)}
        >
          <Icon name="menu" />
        </button>
        <a className="brand" href="#/">
          <span className="brand-emblem">
            <Icon name="crown" size={27} />
          </span>
          <span>
            CROWN<span className="brand-ui">UI</span>
            <small>为冒险而生</small>
          </span>
        </a>
        <nav className="top-nav" aria-label="主导航">
          <a
            href="#/"
            className={
              !route.includes("examples") && route !== "/tokens" ? "active" : ""
            }
          >
            组件
          </a>
          <a
            href="#/examples/start"
            className={route.includes("examples") ? "active" : ""}
          >
            界面示例 <span>4</span>
          </a>
          <a href="#/tokens" className={route === "/tokens" ? "active" : ""}>
            设计规范
          </a>
        </nav>
        <div className="header-actions">
          <button
            className="search-trigger"
            aria-label="搜索组件"
            onClick={() => setSearch(true)}
          >
            <Icon name="search" size={16} />
            <span>搜索组件...</span>
            <kbd>Ctrl K</kbd>
          </button>
          <span className="version-label">v0.1.0</span>
          <button
            className={`motion-toggle plain-icon ${reduced ? "muted" : ""}`}
            aria-label={reduced ? "启用完整动效" : "减少界面动效"}
            aria-pressed={!reduced}
            title={reduced ? "启用完整动效" : "减少界面动效"}
            onClick={() => setPreference(reduced ? "full" : "reduced")}
          >
            <Icon name="spark" />
            <span>动效{reduced ? "关" : "开"}</span>
          </button>
        </div>
      </header>
      {mobileNav && (
        <button
          className="nav-scrim"
          aria-label="关闭导航"
          onClick={() => setMobileNav(false)}
        />
      )}
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="side-intro">
          <span className="side-section-label">探索 CROWN UI</span>
          {navItem("/", "组件概览", undefined, "grid")}
          {navItem("/install", "快速开始", undefined, "bolt")}
          {navItem("/tokens", "设计规范", undefined, "spark")}
          {navItem("/typography", "字体与标题", undefined, "book", true)}
          {navItem("/illustrations", "3D 插图库", undefined, "chest", true)}
          {navItem("/motion", "动效预览", undefined, "spark", true)}
        </div>
        <div className="side-group">
          <div className="side-section-label">
            完整界面示例 <Badge tone="gold">4 SCREENS</Badge>
          </div>
          {screenLinks.map((c) =>
            navItem(`/examples/${c.id}`, c.name, undefined, c.icon),
          )}
        </div>
        {groups.map((group) => (
          <div className="side-group" key={group.title}>
            <div className="side-section-label">{group.title}</div>
            {group.items.map((c) =>
              navItem(
                `/components/${c.id}`,
                c.name,
                c.en,
                undefined,
                c.id === "game-card",
              ),
            )}
          </div>
        ))}
        <div className="side-footer">
          <span className="tiny-shield">
            <Icon name="shield" size={18} />
          </span>
          <div>
            原创风格 · 自由构建<small>React + TypeScript · MIT</small>
          </div>
        </div>
      </aside>
      <main className="main-content" id="main-content" tabIndex={-1}>
        <div className="breadcrumb">
          <span>Crown UI</span>
          <Icon name="chevron" size={12} />
          <span>
            {route.startsWith("/examples")
              ? "完整界面示例"
              : activeLink?.name || "设计规范"}
          </span>
        </div>
        {route === "/" ? (
          <Overview />
        ) : route === "/install" ? (
          <InstallPage />
        ) : route === "/tokens" ? (
          <TokensPage />
        ) : route === "/typography" ? (
          <TypographyLab />
        ) : route === "/illustrations" ? (
          <IllustrationsPage />
        ) : route === "/motion" ? (
          <MotionPage preference={preference} reduced={reduced} systemReduced={systemReduced} onPreferenceChange={setPreference} />
        ) : route.startsWith("/examples") ? (
          <Examples
            screen={route.split("/")[2] || "start"}
            reduced={reduced}
            onReducedChange={(value) => setPreference(value ? "reduced" : "full")}
          />
        ) : route.startsWith("/components/") &&
          catalog.some((c) => c.id === route.split("/")[2]) ? (
          <ComponentPage id={route.split("/")[2]} />
        ) : (
          <div className="not-found">
            <Icon name="map" size={60} />
            <h1>这条小路还没有开放</h1>
            <Button onClick={() => navigate("/")}>返回组件概览</Button>
          </div>
        )}
        <footer className="page-footer">
          <span>
            <Icon name="crown" size={15} /> CROWN UI <b>·</b>{" "}
            把每一次点击，变成一场小冒险。
          </span>
          <a href="#/install">
            开始构建 <Icon name="arrow" size={13} />
          </a>
        </footer>
      </main>
      <Dialog open={search} onOpenChange={setSearch} title="探索组件与界面">
        <Input
          autoFocus
          placeholder="搜索名称，如：按钮、战斗、Button…"
          aria-label="搜索组件"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="search-results">
          {filtered.length ? (
            filtered.map((c) => (
              <a href={`#${c.id}`} key={c.id} onClick={() => setSearch(false)}>
                <span>{c.name}</span>
                <small>{c.en}</small>
                <Icon name="arrow" size={14} />
              </a>
            ))
          ) : (
            <p>没有找到对应内容，试试其他关键词。</p>
          )}
        </div>
      </Dialog>
    </div>
  );
}
