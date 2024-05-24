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

## プロジェクトを立ち上げ

### Gitクローン
```zsh
% git clone https://github.com/ProgrammingTraining2024/FamiliarVoting.git

% cd FamiliarVoting
```

### コンテナを起動し、入る
```zsh
% make up

% make app
```
`make` コマンドは、`Makefile` で定義している。

### Laravelのセットアップ
```zsh
# Laravel関連のパッケージをインストール
/workspace# composer install

# .envファイルを作成
/workspace# cp .env.example .env

# APP_KEYを発行
/workspace# php artisan key:generate

# キャッシュをクリア
/workspace# php artisan config:clear

# データベースを作成
/workspace# php artisan migrate
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

フロントエンド
- Vite (React)
- Tailwind CSS
- MUI

バックエンド
- Laravel 10
- Inertia

その他
- [Laravel Excel](https://laravel-excel.com) (CSVインポート機能)