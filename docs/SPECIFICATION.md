# StudyGraph プロジェクト仕様書

## 📋 目次
- [プロジェクト概要](#プロジェクト概要)
- [技術スタック](#技術スタック)
- [ファイル構成](#ファイル構成)
- [機能仕様](#機能仕様)
- [UI/UX仕様](#uiux仕様)
- [データ構造](#データ構造)
- [コンポーネント設計](#コンポーネント設計)
- [状態管理](#状態管理)
- [開発ガイドライン](#開発ガイドライン)
- [デプロイ仕様](#デプロイ仕様)
- [今後の拡張計画](#今後の拡張計画)

## 📖 プロジェクト概要

### 🎯 目的
GitHubのcontributionsグラフのように学習時間を可視化するWebアプリケーション。継続的な学習習慣の構築とモチベーション向上をサポートする。

### 🌟 主要機能
- 年間学習カレンダーの可視化（365日表示）
- 学習記録の追加・編集
- 学習統計の表示（総時間、学習日数、平均時間、連続日数）
- データの永続化（LocalStorage）
- レスポンシブデザイン

### 🎨 デザインコンセプト
- GitHub contributionsグラフのUIを踏襲
- 清潔でモダンなインターフェース
- 直感的な操作性
- モバイルファーストデザイン

## 🛠️ 技術スタック

### フロントエンド
- **フレームワーク**: Next.js 14 (App Router)
- **言語**: JavaScript (ES6+)
- **スタイリング**: Tailwind CSS 3.3.5
- **アイコン**: Lucide React 0.294.0
- **日付処理**: date-fns 2.30.0

### 開発ツール
- **リンター**: ESLint
- **パッケージマネージャー**: npm
- **ビルドツール**: Next.js内蔵

### デプロイ・ホスティング
- **プラットフォーム**: Vercel
- **ドメイン**: study-graph.vercel.app
- **CI/CD**: Vercelの自動デプロイ

### データストレージ
- **現在**: LocalStorage（ブラウザ）
- **将来**: Firebase/Supabase（計画中）

## 📁 ファイル構成

```
study-graph/
├── README.md                 # プロジェクト説明
├── SPECIFICATION.md          # 本仕様書
├── package.json              # 依存関係・スクリプト
├── next.config.js            # Next.js設定
├── tailwind.config.js        # TailwindCSS設定
├── postcss.config.js         # PostCSS設定
├── .eslintrc.json           # ESLint設定
├── .gitignore               # Git除外設定
├── app/
│   ├── layout.js            # アプリレイアウト・メタデータ
│   ├── page.js              # ホームページ
│   └── globals.css          # グローバルスタイル
├── components/
│   └── StudyGraph.js        # メインコンポーネント
└── public/
    ├── favicon.ico          # ファビコン
    └── og-image.png         # OGP画像（計画中）
```

## 🔧 機能仕様

### 1. 学習カレンダー表示
- **表示形式**: 年間365日のグリッド表示
- **色分け**: 学習時間に応じた5段階の色分け
  - グレー: 学習なし (0時間)
  - 薄緑: 少ない (0-1時間)
  - 緑: 普通 (1-2時間)  
  - 濃緑: 多い (2-4時間)
  - 最濃緑: 非常に多い (4時間以上)
- **インタラクション**: 
  - ホバーでツールチップ表示
  - クリックで詳細表示
  - 今日の日付をハイライト

### 2. 学習記録管理
- **追加機能**:
  - 日付選択（デフォルト: 今日）
  - 学習時間入力（0.5時間単位）
  - 科目選択（プリセット + その他）
  - 学習メモ（任意）
- **編集機能**: 既存記録の上書き更新
- **削除機能**: 個別記録削除（計画中）

### 3. 統計表示
- **総学習時間**: 全期間の合計時間
- **学習日数**: 学習記録がある日数
- **平均学習時間**: 学習日における1日あたりの平均時間
- **連続学習日数**: 今日から遡った連続学習日数

### 4. データ管理
- **データ永続化**: LocalStorageに自動保存
- **データリセット**: 全データ削除機能
- **サンプルデータ**: デモ用データ生成機能
- **データ形式**: JSON形式

## 🎨 UI/UX仕様

### カラーパレット
```css
/* プライマリカラー */
--primary-50: #eff6ff;
--primary-500: #3b82f6;
--primary-600: #2563eb;

/* 学習強度カラー */
--intensity-0: #f3f4f6;  /* グレー */
--intensity-1: #dcfce7;  /* 薄緑 */
--intensity-2: #86efac;  /* 緑 */
--intensity-3: #22c55e;  /* 濃緑 */
--intensity-4: #15803d;  /* 最濃緑 */
```

### レイアウト
- **ヘッダー**: ロゴ、記録追加ボタン、GitHubリンク
- **統計カード**: 4つの主要統計をカード形式で表示
- **カレンダー**: 中央にメインの年間カレンダー
- **詳細パネル**: 選択日の詳細情報表示
- **フッター**: データ管理ボタン

### レスポンシブ対応
- **モバイル**: 320px〜
- **タブレット**: 768px〜
- **デスクトップ**: 1024px〜

### アニメーション
- **フェードイン**: ページ読み込み時
- **ホバーエフェクト**: ボタン・カード
- **モーダル**: スケールアニメーション

## 💾 データ構造

### 学習記録データ形式
```javascript
{
  "2025-06-28": {
    "totalHours": 2.5,
    "subject": "プログラミング",
    "note": "Next.jsの学習",
    "sessions": 2
  },
  "2025-06-27": {
    "totalHours": 1.0,
    "subject": "英語",
    "note": "TOEIC対策",
    "sessions": 1
  }
}
```

### データフィールド説明
- **キー**: 日付（YYYY-MM-DD形式）
- **totalHours**: 学習時間（数値、小数点1桁）
- **subject**: 学習科目（文字列）
- **note**: 学習メモ（文字列、任意）
- **sessions**: 学習セッション数（計算値）

### LocalStorage仕様
- **キー**: `studyGraphData`
- **形式**: JSON文字列
- **サイズ制限**: 約5MB（LocalStorage制限内）

## 🧩 コンポーネント設計

### StudyGraph.js（メインコンポーネント）
```javascript
// 主要なstate
const [selectedDate, setSelectedDate] = useState(null);
const [showAddModal, setShowAddModal] = useState(false);
const [studyData, setStudyData] = useState({});
const [newRecord, setNewRecord] = useState({});

// 主要な関数
- generateYearCalendar(): カレンダーグリッド生成
- calculateStats(): 統計計算
- handleAddRecord(): 新規記録追加
- getIntensity(): 学習時間から色強度計算
```

### 子コンポーネント（今後の分割案）
- `Calendar.js`: カレンダー表示専用
- `StatsCard.js`: 統計カード
- `RecordModal.js`: 記録追加モーダル
- `DetailPanel.js`: 詳細表示パネル

## 🔄 状態管理

### 現在の状態管理
- React Hooks（useState, useEffect）
- LocalStorageとの同期

### 将来の状態管理（計画）
- Context API または Zustand
- サーバーサイド状態管理（React Query/SWR）

## 🔧 開発ガイドライン

### コーディング規約
- **命名**: camelCase（変数・関数）、PascalCase（コンポーネント）
- **ファイル**: .js拡張子、コンポーネントはPascalCase
- **インデント**: 2スペース
- **セミコロン**: 必須

### ESLint設定
```json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "warn",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### 開発フロー
1. 機能ブランチ作成
2. 実装・テスト
3. ESLintチェック
4. コミット・プッシュ
5. プルリクエスト

### パフォーマンス要件
- **Lighthouse スコア**: 90点以上
- **First Paint**: 1秒以内
- **bundle サイズ**: 100KB以下（目標）

## 🚀 デプロイ仕様

### 本番環境
- **URL**: https://study-graph.vercel.app
- **プラットフォーム**: Vercel
- **自動デプロイ**: main ブランチにプッシュ時

### 環境変数（将来）
```bash
# Firebase設定（計画中）
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
```

### SEO対応
- **メタデータ**: layout.jsで設定済み
- **OGP**: 対応済み（画像は今後追加）
- **構造化データ**: 今後対応予定

## 🔮 今後の拡張計画

### Phase 1: 基本機能強化（v1.1）
- [ ] 学習記録の編集機能
- [ ] 科目別統計表示
- [ ] 月間/週間ビュー切り替え
- [ ] データエクスポート（CSV）
- [ ] PWA対応

### Phase 2: ソーシャル機能（v2.0）
- [ ] ユーザー認証（Firebase Auth）
- [ ] クラウドデータ同期（Firestore）
- [ ] 友達との比較機能
- [ ] 学習グループ作成
- [ ] ランキング機能

### Phase 3: 高度な分析（v3.0）
- [ ] 学習効率分析
- [ ] 時間帯別分析
- [ ] 科目別詳細レポート
- [ ] 目標設定・達成度表示
- [ ] 学習リマインダー機能

### Phase 4: AI機能（v4.0）
- [ ] 学習パターン分析
- [ ] 最適な学習時間推奨
- [ ] 学習内容レコメンド
- [ ] チャットボット学習相談

## 🐛 既知の課題・制限事項

### 現在の制限
- データはブラウザ依存（端末間同期不可）
- オフライン非対応
- 大量データ時のパフォーマンス未検証
- 学習記録の編集機能なし

### 技術的課題
- LocalStorageサイズ制限（5MB）
- ブラウザキャッシュクリア時のデータ消失
- SEO最適化不十分

## 🔧 開発・運用コマンド

### 開発環境
```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# ビルドテスト
npm run build

# 本番サーバー起動
npm start

# リンターチェック
npm run lint
```

### デプロイ
```bash
# Vercelデプロイ
npx vercel

# 本番デプロイ
npx vercel --prod
```

### データバックアップ（手動）
```javascript
// ブラウザコンソールで実行
const data = localStorage.getItem('studyGraphData');
console.log(data); // コピーして保存
```

## 📞 サポート・連絡先

### プロジェクト管理
- **GitHub**: https://github.com/yourusername/study-graph
- **Issues**: GitHubのIssuesで管理
- **Wiki**: 今後GitHub Wikiで詳細ドキュメント予定

### 開発者向けリソース
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Vercel Docs**: https://vercel.com/docs

---

*最終更新: 2025年6月28日*  
*バージョン: v1.0.0*