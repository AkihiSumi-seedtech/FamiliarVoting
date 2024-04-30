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

```container
% make app
docker compose exec app bash

root@___:/workspace# node -v
v20.12.2

root@___:/workspace# npm -v
v10.5.0

root@___:/workspace#
v10.5.0
```

### ViteでReact を導入

[Vite](https://ja.vitejs.dev) は、高速なビルドツール  
Vue.js の作者である Evan You氏が開発。

```container
root@___:/workspace# npm create vite
Ok to proceed? (y) y

? Project name: react

? Select a framework: React

? Select a variant: JavaScript

root@___:/workspace# cd react && npm install

root@___:/workspace/react# npm run dev
  ➜  Local:   http://localhost:5173/
```

`localhost:5173` にアクセスし、`Vite + React` の初期画面が表示されていればOK。