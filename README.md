# 映画管理アプリ

## 概要

このアプリは、映画のタイトル・評価・視聴状況を管理できるWebアプリケーションです。映画の新規登録、一覧表示、詳細表示、編集、削除が可能です。

## 使用技術

- **フロントエンド**  
  - EJS（テンプレートエンジン）
  - HTML/CSS

- **バックエンド**  
  - Node.js
  - Express

- **データベース**  
  - MySQL

- **その他**  
  - dotenv（環境変数管理）
  - method-override（PUT/DELETEメソッド対応）

## セットアップ方法

1. **リポジトリをクローン**
    ```sh
    git clone <リポジトリURL>
    cd movieApp
    ```

2. **依存パッケージのインストール**
    ```sh
    npm install
    ```

3. **環境変数ファイルの作成**  
   プロジェクトルートに`.env`ファイルを作成し、MySQL接続情報を記載してください。
    ```
    DB_HOST=localhost
    DB_USER=ユーザー名
    DB_PASSWORD=パスワード
    DB_DATABASE=データベース名
    ```

4. **MySQLでデータベースを作成**  
   事前にMySQLで指定したデータベースを作成してください。

5. **アプリの起動**
    ```sh
    npm start
    ```
    または
    ```sh
    node app.js
    ```

6. **ブラウザでアクセス**  
   [http://localhost:3000/movies](http://localhost:3000/movies) にアクセスしてください。

## 主な機能

- 映画の一覧表示
- 映画の新規登録
- 映画の詳細表示
- 映画情報の編集
- 映画の削除

---
