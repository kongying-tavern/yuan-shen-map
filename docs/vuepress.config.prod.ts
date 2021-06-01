// @ts-nocheck
import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
const { compilerOptions } = require('./tsconfig.json')
import path from 'path'

const isProduction = process.env.NODE_ENV === 'production';
const defaultThemeColor = process.env.THEME_COLOR || '#ffffff';
const defaultRenderer = process.env.RENDERER || 'WebKit';
const cover = process.env.COVER || 'https://yuanshen.site/tiles_test/4/ppp10_9.jpg';

module.exports = defineUserConfig<DefaultThemeOptions>({
  bundler: "@vuepress/vite",
  bundlerConfig: {
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'docs')}/`,
        'public/': `${path.resolve(__dirname, 'public')}/`
      },
    },
  },
  dest: 'dist',
  public: 'public',
  base: '/docs/',
  head: [
    ['meta', { name: 'renderer',                                content: defaultRenderer}],
    ['meta', { name: 'force-rendering',                         content: defaultRenderer}],
    ['meta', { name: 'applicable-device',                       content: 'pc,mobile'}],
    ['meta', { name: 'msapplication-TileColor',                 content: '#00aba9'}],
    ['meta', { name: 'theme-color',                             content: defaultThemeColor}],
    ['meta', { name: 'msappdivcation-navbutton-color',          content: defaultThemeColor}],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style',   content: 'lack-translucent'}],
    ['meta', { name: 'apple-mobile-web-app-capable',            content: 'yes'}],
    ['meta', { name: 'apple-mobile-web-app-title',              content: 'Genshin Map'}],
    ['meta', { name: 'format-detection',                        content: 'telephone=no'}],
    ['meta', { name: 'google',                                  content: 'notranslate'}],
    ['meta', { name: 'twitter:widgets:csp',                     content: 'on'}],
    ['meta', { name: 'twitter:card',                            content: 'summary'}],
    ['meta', { name: 'twitter:url',                             content: 'https://yuanshen.site/docs/'}],
    ['meta', { name: 'twitter:type',                            content: 'website'}],
    ['meta', { name: 'twitter:image',                           content: cover}],
    ['meta', { property: 'og:url',                              content: 'https://yuanshen.site/docs/'}],
    ['meta', { property: 'og:type',                             content: 'website'}],
    ['meta', { property: 'og:image',                            content: cover}],
    ['meta', { property: 'og:site_name',                        content: 'Genshin Map'}],
    ['meta', { property: 'type',                                content: 'website'}],
    ['meta', { property: 'article:author',                      content: 'ZengJia'}],
    ['meta', { property: 'article:published_time',              content: '2021-5-30T15:18:13+0200'}],
    ['meta', { property: 'image',                               content: cover}],
    ['meta', { property: 'site_name',                           content: 'Genshin Map'}],
    ['meta', { property: 'url',                                 content: 'https://yuanshen.site/docs/'}],
    ['meta', { itemprop: 'name',                                content: 'Genshin Map'}],
    ['meta', { itemprop: 'image',                               content: cover}],
    ['meta', { itemprop: 'description',                         content: '米游社空荧酒馆制作的原神全资源攻略地图。'}],
    ['link', { rel: 'manifest',                   href: 'manifest.webmanifest' }],
    ['link', { rel: 'apple-touch-icon',           href: 'https://yuanshen.site/v3/paimon_off@192.png' }],
    ['link', { rel: 'canonical',                  href: 'https://yuanshen.site/docs/' }],
    ['link', { rel: 'shortcut icon',              href: 'https://yuanshen.site/favicon.ico'}],
    ['link', { rel: 'mask-icon',                  href: '/safari-pinned-tab.svg',           color: '#00aba9' }],
    ['link', { rel: 'alternate',                  href: 'https://yuanshen.site/docs/',      hreflang: 'en-US'}],
    ['link', { rel: 'alternate',                  href: 'https://yuanshen.site/docs/zh/',   hreflang: 'zh-CN'}],
    ['link', { rel: 'alternate',                  href: 'https://yuanshen.site/docs/ja/',   hreflang: 'ja-JP'}],
    ['link', { rel: 'alternate',                  href: 'https://yuanshen.site/docs/',      hreflang: 'x-default'}],
  ],
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '原神地图',
      description: '米游社空荧酒馆制作的原神全资源攻略地图。',
    },
    '/en/': {
      lang: 'en-US',
      title: 'Genshin Map',
      description: 'The interactive map of Genshin full resources strategy made by Kongying Tavern.',
    },
    '/ja/': {
      lang: 'ja-JP',
      title: '原神地図',
      description: '「米游社空荧酒馆」が作成した原神全資源攻略マップ',
    },
  },
  themeConfig: {
    logo: '/logo.jpg',
    repo: 'https://gitee.com/blacklotusccw/yuan-shen-map',
    docsRepo: 'https://gitee.com/blacklotusccw/yuan-shen-map',
    docsBranch: 'master',
    docsDir: 'docs/docs',
    editLinkPattern: ':repo/edit/:branch/:path',
    locales: {
      '/': {
        home: '/',
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
        tip: '提示',
        warning: '警告',
        danger: '危险',
        notFound: ['找不到您要查找的页面。', '404 未找到该页面'],
        backToHome: '回到首页',
        openInNewWindow: '在新窗口中打开',
        lastUpdatedText: '最后更新时间',
        contributorsText: '贡献者',
        navbar: [
          {
            text: '反馈',
            link: 'https://support.qq.com/products/321980',
          },
          {
            text: '了解更多',
            children: [
              {
                text: '更新内容',
                children:
                [
                  {
                    text: 'Web网页端',
                    link: 'https://support.qq.com/products/321980/blog/505810',
                  },
                  {
                    text: 'Unity客户端',
                    link: 'https://support.qq.com/products/321980/blog/505884'
                  },
                ],
              },
              {
                text: '法律相关',
                children:
                [
                  {
                    text: '免责声明',
                    link: '/disclaimer.html'
                  },
                ],
              },
              {
                text: '其他',
                children:
                [
                  {
                    text: '加入交流组',
                    link: '/communication-group.html'
                  },
                  {
                    text: '下载客户端',
                    link: '/download-client.html'
                  },
                  {
                    text: '加入我们',
                    link: '/join.html'
                  },
                  {
                    text: '贡献指南',
                    link: '/contributing.html'
                  }
                ]
              }
            ],
          },
        ],
      },
      '/en/': {
        home: '/en/',
        selectLanguageName: 'English',
        selectLanguageText: 'Language',
        selectLanguageAriaLabel: 'Language',
        lastUpdatedText: 'Last Updated',
        contributorsText: 'Contributors',
        tip: 'Tips',
        notFound: ['The page you’re looking for can’t be found.', '404 Not Found'],
        backToHome: 'Back to home',
        openInNewWindow: 'open in new window',
        warning: 'Warning',
        danger: 'Danger',
        navbar: [
          {
            text: 'Feedback',
            link: 'https://support.qq.com/products/321980',
          },
          {
            text: 'Understand More',
            children: [
              {
                text: 'Update Content',
                children:
                [
                  {
                    text: 'WebPage',
                    link: 'https://support.qq.com/products/321980/blog/505810',
                  },
                  {
                    text: 'UnityClient',
                    link: 'https://support.qq.com/products/321980/blog/505884'
                  },
                ],
              },
              {
                text: 'Law Related',
                children:
                [
                  {
                    text: 'Disclaimer',
                    link: '/en/disclaimer.html'
                  },
                ],
              },
              {
                text: 'Other',
                children:
                [
                  {
                    text: 'Download client',
                    link: '/en/download-client.html'
                  },
                  {
                    text: 'Join us',
                    link: '/join.html'
                  },
                  {
                    text: 'Contributing Guide',
                    link: '/en/contributing.html'
                  }
                ]
              }
            ],
          },
        ],
      },
      '/ja/': {
        home: '/ja/',
        selectLanguageName: '日本語',
        selectLanguageText: '言語を選択',
        selectLanguageAriaLabel: '言語を選択',
        tip: 'ヒント',
        warning: '警告',
        danger: '危険',
        notFound: ['お探しのページが見つかりません。', '404 ページが見つかりません'],
        backToHome: 'ホームページに戻る',
        openInNewWindow: '新しいウィンドウで開きます',
        lastUpdatedText: '最終更新',
        contributorsText: '貢献者',
        navbar: [
          {
            text: 'フィードバック',
            link: 'https://support.qq.com/products/321980',
          },
          {
            text: 'もっと理解する',
            children: [
              {
                text: 'コンテンツを更新する',
                children:
                [
                  {
                    text: 'Webウェブページ',
                    link: 'https://support.qq.com/products/321980/blog/505810',
                  },
                  {
                    text: 'Unityクライアント',
                    link: 'https://support.qq.com/products/321980/blog/505884'
                  },
                ],
              },
              {
                text: '法律関係',
                children:
                [
                  {
                    text: '免責事項',
                    link: '/ja/disclaimer.html'
                  },
                ],
              },
              {
                text: 'その他',
                children:
                [
                  {
                    text: 'マップ クライアントをダウンロードする',
                    link: '/ja/download-client.html'
                  },
                  {
                    text: 'リクルート',
                    link: '/join.html'
                  },
                  {
                    text: '投稿ガイド',
                    link: '/en/contributing.html'
                  }
                ]
              }
            ],
          },
        ],
      },
    },
  },
  plugins: [
    [
      "vuepress-plugin-typescript",
      {
        tsLoaderOptions: {
          ...compilerOptions
        },
      },
    ],
    [
      "@vuepress/google-analytics",
      {
        id: "G-Q2K9DXZCEY",
      },
    ],
    [
      "vuepress-plugin-zooming",
      {
        selector: ".zooming",
        delay: 1000,
        options: {
          bgColor: "black",
          zIndex: 10000,
        },
      },
    ],
    [
      "@vuepress/pwa",
      {
        skipWaiting: false,
      },
    ],
    [
      "@vuepress/plugin-pwa-popup",
      {
        locales: {
          "/zh/": {
            message: "New content is available.",
            buttonText: "Refresh",
          },
          "/": {
            message: "发现新内容可用",
            buttonText: "刷新",
          },
          "/ja/": {
            message: "利用可能な新しいコンテンツが見つかりました",
            buttonText: "リフレッシュ",
          },
        },
      },
    ],
    [
      'redirect',
      {
        locales: true,
        redirectors: [
          {
            // base: '/plugins/', // 将 `/my-plugins/` 自动重定向到某个子页面
            storage: true, // 保存最后一次访问的结果到 `localStorage`，供下次重定向使用
            alternative: [ // 备选列表
            ],
          },
        ],
      },
    ],
    // 搜索的临时替代方案, 域名确认后更换为vuepress/docsearch
    [
      "@vuepress/plugin-search",
      {
        maxSuggestions: 5,
        // hotKeys: ['s', '/'],
        locales: {
          "/en/": {
            placeholder: "Search",
          },
          "/": {
            placeholder: "搜索",
          },
          "/ja/":{
            placeholder: "検索する",
          }
        },
      },
    ],
    // [
    //   '@vuepress/docsearch',
    //   {
    //     apiKey: '<API_KEY>',
    //     indexName: '<INDEX_NAME>',
    //     locales: {
    //       "/": {
    //         placeholder: "Search",
    //       },
    //       "/zh/": {
    //         placeholder: "搜索",
    //       },
    //       "/ja/":{
    //         placeholder: "検索する",
    //       }
    //     },
    //   },
    // ],
    [
      "@vuepress/container",
      {
        type: "tip",
        locales: {
          "/en/": {
            defaultInfo: "Tips",
          },
          "/": {
            defaultInfo: "提示",
          },
          "/jp/":{
            defaultInfo: "ヒント",
          }
        },
      },
    ],
    [
      "@vuepress/register-components",
      {
        componentsDir: path.resolve(__dirname, "./components"),
      },
    ],
    [
      "@vuepress/active-header-links",
      {
        sidebarLinkSelector: ".sidebar-link",
        headerAnchorSelector: ".header-anchor",
      },
    ],
    [
      '@vuepress/plugin-shiki',
      {
        theme: 'dark-plus',
      }
    ],
    ["vuepress-plugin-nprogress"],
  ],
});
