# FamiliarVoting

## 環境

macOS Sonoma 14.5 (MacBook Pro 2022)

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
% git clone https://github.com/ProgrammingTraining2024/FamiliarVoting.git

% cd FamiliarVoting

% make create-project
```

`app`コンテナ、`web`コンテナ、`db`コンテナ が作成される。

`src/vite.config.js`を修正

```js
export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
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

### コンテナ操作
コンテナ起動
```zsh
% make up
```
コンテナに入る
```zsh
% make app
```
コンテナ終了
```zsh
% make down
```

### コンテナ内での操作
Vite起動
```bash
# npm run dev
```
コンテナを抜ける
```bash
# exit
```
## 使用技術

CSVインポート機能 : [Laravel Excel](https://laravel-excel.com)