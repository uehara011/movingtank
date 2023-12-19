# ar.js+three.js demo

ar.js+three.jsのデモ。ios含む、safariで実行可能。

## build
nodejsをインストールする

必要なライブラリをインストールする。
```sh
cd webar_demo
npm install
npm build
```

## devサーバーの準備
### httpsでアクセスできるようにする
webカメラを利用するアプリは、セキュリティ確保のため、httpsによる配信以外は起動しない。そこで、自己証明書によるhttpsサーバの設定を行う

### 自己署名のSSL証明書を用意する
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365

パスフレーズが求められるので
0000
と入力する（クオーテーションは入力しない）

### viteの設定
//vite.config.tsのserverプロパティを編集(以下の修正は、パスフレーズ0000としてソースコードに反映済みです）
```
  server: {
    host: '0.0.0.0',
    https: {
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem'),
      passphrase: '証明書作成時にあなたが入力したパスフレーズ',
    },
  },
```
## devサーバーを実行してテストする
```sh
npm run dev
```
アドレスが表示されるのでブラウザでアクセスする。
セキュリティ警告がでるが無視して実行する。

## deploy
### 準備
distディレクトリ以下のファイル群をサーバーにコピーするスクリプトを記述し(scp等を利用する)、
deploy.sh　として保存する
(例)
```sh
scp -P サーバーのsshポート番号 -r dist/* アカウント名@サーバーアドレス:~/public_html/webxr
```

vite.config.tsの２５行目、baseプロパティをサーバで公開されるパスに合わせる

```
例)
https://ie.u-ryukyu.ac.jp/~e99999/webar_demo/
で公開される場合、

base: /~e99999/webar_demo/
とする。

チルダを忘れないように。
```
### デプロイ
上記のdeploy.shが正しく作成されていれば、以下のコマンドでビルト&デプロイされる　
```sh
npm run deploy
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
