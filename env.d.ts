/// <reference types="vite/client" />
// triple-slash directive: 作用是告訴 TypeScript 去讀取 vite/client 的型別宣告，讓 TS 知道 Vite 預設提供的一些全域型別

// 全域型別宣告檔(.d.ts)：
// 作用是幫 TypeScript 認識專案中 TS 預設不認識的東西
// 不需在每個檔案 import 型別
// 只要檔案在 tsconfig.json 的 include 範圍內，便會生效

/**
 * - import.meta.env 物件型別
 * - 可擴充定義 .env 裡的變數
 */
interface ImportMetaEnv {
  readonly VITE_APP_RUN: string;
  VITE_APP_VERSION: string;
}
