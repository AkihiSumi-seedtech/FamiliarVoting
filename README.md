# FamiliarVoting

## 環境

macOS Sonoma 14.4.1 (MacBook Pro 2022)

```zsh
% git -v
git version 2.44.0

% docker -v
Docker version 25.0.3, build 4debf41

% docker compose version
Docker Compose version v2.24.6-desktop.1
```

## 環境構築

### Laravel の初期プロジェクトを構築

1. プロジェクトをフォーク
2. ターミナルで、リポジトリをクローン & ディレクトリに移動
3. プロジェクト作成コマンドを実行

```zsh
% git clone https://github.com/AkihiSumi-seedtech/FamiliarVoting.git

% cd FamiliarVoting

% make create-project
```

`app`コンテナ、`web`コンテナ、`db`コンテナ が作成される。

`src/vite.config.js`を修正

```
export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
      host: true,
      hmr: {
          host: 'localhost',
      },
  },
});
```