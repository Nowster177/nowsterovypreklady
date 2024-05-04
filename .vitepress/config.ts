import { defineConfig } from "vitepress"
import FastGlob from "fast-glob";
import grayMatter from "gray-matter";
import { readFile } from "node:fs/promises";
import { basename } from "node:path";

const posts: any[] = [];
for (const source of await FastGlob("novinky/*-*.md")) {
  const content = await readFile(source, "utf-8");
  const matter = grayMatter(content);
  posts.push({
    text: matter.data.title,
    link: `/novinky/${basename(source, ".md")}.html`
  });
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Nowster - překlady",
  description: "Stránka fanouškovského překladu hry.",
  base: "/",
  head: [
    ["link", { rel: "icon", href: "/test/favicon.ico" }],
  ],
  themeConfig: {
    docFooter: {
      prev: 'Předchozí stránka',
      next: 'Následující stránka'
    },
    
  //  footer: {
  //  message: '<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg"></a>',
  //  copyright: 'Copyright © 2024-present'
  //  },
    
    darkModeSwitchLabel: "Vzhled",
    lightModeSwitchTitle: "Přepnout do světlého režimu",
    darkModeSwitchTitle: "Přepnout do tmavého režimu",

    nav: [
      { text: "🏠 Úvod", link: "/" },
      { text: "📰 Novinky", link: "/novinky/", activeMatch: "/novinky/"},
      // dropdown
      { text: '🇨🇿 Češtiny', items: [
        { text: 'Bendy hry', items: [
          { text: "Bendy and the Ink Machine", link: "/readme/batim", activeMatch: "/batim/"},
          { text: "Bendy and the Dark Revival", link: "/readme/batdr", activeMatch: "/batdr/"}]},
        { text: 'Ostatní', items: [
          { text: "Zatím nic", link: "/glitch", activeMatch: "/glitch/"}]},
        ]},
    ],

    outline: {
      label: "Obsah"
    },

    sidebar: {
      "/novinky/": posts
    },

    socialLinks: [
      { icon: "github", link: "#" },
      { icon: "discord", link: "https://discord.gg/ZF53tFgNff" },
    ]
  }
});