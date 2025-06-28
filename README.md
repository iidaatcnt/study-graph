# StudyGraph 📚

GitHubのcontributionsグラフのように学習時間を可視化するWebアプリケーション

![StudyGraph Screenshot](./public/og-image.png)

## 🌟 特徴

- **視覚的な学習記録**: GitHubスタイルの年間カレンダーで学習時間を一目で確認
- **詳細な統計**: 総学習時間、学習日数、平均時間、連続学習日数を表示
- **簡単な記録管理**: 直感的なUIで学習記録の追加・編集
- **データ永続化**: ブラウザのローカルストレージにデータを保存
- **レスポンシブデザイン**: PC・タブレット・スマートフォンに対応
- **PWA対応**: アプリのようにインストール可能

## 🚀 デモ

[https://study-graph.vercel.app](https://study-graph.vercel.app)

## 🛠️ 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **スタイリング**: Tailwind CSS
- **アイコン**: Lucide React
- **日付処理**: date-fns
- **デプロイ**: Vercel
- **言語**: JavaScript/TypeScript

## 📦 インストール

### 前提条件

- Node.js 18.0以上
- npm または yarn

### ローカル開発

1. リポジトリをクローン

```bash
git clone https://github.com/yourusername/study-graph.git
cd study-graph
```

2. 依存関係をインストール

```bash
npm install
# または
yarn install
```

3. 開発サーバーを起動

```bash
npm run dev
# または
yarn dev
```

4. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

## 🚀 デプロイ

### Vercelでのデプロイ

1. [Vercel](https://vercel.com)にアカウントを作成
2. GitHubリポジトリを連携
3. プロジェクトをインポート
4. 自動でビルド・デプロイが実行されます

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/study-graph)

### その他のプラットフォーム

#### Netlify
```bash
npm run build
npm run export
```
`out`フォルダをNetlifyにアップロード

#### GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build
npm run export
npx gh-pages -d out
```

## 📱 使い方

### 学習記録の追加

1. 「記録追加」ボタンをクリック
2. 日付、学習時間、科目、メモを入力
3. 「追加」ボタンで保存

### カレンダーの見方

- **グレー**: 学習なし
- **薄緑**: 1時間未満
- **緑**: 1-2時間
- **濃緑**: 2-4時間
- **最濃緑**: 4時間以上

### データの管理

- **データはブラウザに保存**: ローカルストレージを使用
- **リセット機能**: すべてのデータを削除可能
- **サンプルデータ**: デモ用のサンプルデータを生成可能

## 🎨 カスタマイズ

### 色の変更

`components/StudyGraph.js`の`intensityColors`配列を編集:

```javascript
const intensityColors = [
  'bg-gray-100 border border-gray-200',
  'bg-blue-100 border border-blue-200',
  'bg-blue-300 border border-blue-400',
  'bg-blue-500 border border-blue-600',
  'bg-blue-700 border border-blue-800'
];
```

### 科目の追加

学習記録モーダルの科目選択肢を編集:

```javascript
<select>
  <option value="数学">数学</option>
  <option value="プログラミング">プログラミング</option>
  <option value="英語">英語</option>
  {/* 新しい科目を追加 */}
  <option value="新しい科目">新しい科目</option>
</select>
```

## 🤝 コントリビューション

コントリビューションを歓迎します！

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 🐛 バグ報告・機能要望

[GitHub Issues](https://github.com/yourusername/study-graph/issues)で報告してください。

## 📄 ライセンス

このプロジェクトは[MIT License](LICENSE)の下で公開されています。

## 🙏 謝辞

- [GitHub](https://github.com) - contributionsグラフのインスピレーション
- [Lucide](https://lucide.dev) - 美しいアイコンライブラリ
- [Tailwind CSS](https://tailwindcss.com) - 素晴らしいCSSフレームワーク
- [Next.js](https://nextjs.org) - 高性能なReactフレームワーク

## 📊 統計

![GitHub stars](https://img.shields.io/github/stars/yourusername/study-graph?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/study-graph?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/study-graph)
![GitHub license](https://img.shields.io/github/license/yourusername/study-graph)

---

**StudyGraph**で継続的な学習習慣を身につけましょう！ 🚀📚