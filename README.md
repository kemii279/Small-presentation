
![Test Image 1](スクリーンショット 2025-04-03 210555.png)
# 字幕生成スクリプトの解説
このJavaScriptコードは、HTMLドキュメント内の.zimakuクラスを持つ要素内のコンテンツをアニメーション付きで順番に表示する字幕生成スクリプトです。以下にその主な機能と特徴を解説します。

## 主な機能
字幕要素の自動処理:

.zimaku要素内の<p>タグ（テキスト）と<img>タグ（画像）を順番に表示
各要素の表示時間を自動計算（文字数に基づく）またはdata-duration属性で手動設定可能

### テキスト表示効果:

文字単位でフェードインアニメーション
各文字の表示間隔を調整可能（chartime変数で制御）

### 画像背景処理:

<img>要素をページ背景として表示
空の画像パスを指定すると背景をクリア
ナビゲーション機能:

「前に戻る」ボタンで前の字幕に戻れる

## 使用方法
HTMLに.zimakuクラスを持つコンテナを作成:

```html

<div class="zimaku">
  <p data-duration="2">最初のメッセージ</p>
  <img src="image1.jpg" data-duration="3">
  <p>自動計算で表示時間が決まる長いテキスト...</p>
</div>
```
スクリプトを読み込み、DOMContentLoadedイベントで実行

## カスタマイズ可能なパラメータ

- chartime: 文字ごとの表示間隔（秒単位）jsコード内
- data-duration: 各要素に追加表示時間を指定（秒単位）html内

## 注意点

スクリプト実行後、元の.zimakuコンテンツは削除されます
画像はページの背景として表示されます
コンソールに進行状況がログ出力されます
このスクリプトはビジュアルノベル風のコンテンツや、段階的な説明表示などに適しています。
