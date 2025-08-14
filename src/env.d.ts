/// <reference types="vite/client" />
// triple-slash directive: 作用是告訴 TypeScript 去讀取 vite/client 的型別宣告，讓 TS 知道 Vite 預設提供的一些全域型別

// 全域型別宣告檔(.d.ts)：
// 作用是幫 TypeScript 認識專案中預設不認識的檔案
// 可在專案任意檔案中直接使用全域型別，而不用 import
// .d.ts 只要在 tsconfig.json include 範圍內，便會生效

/**
 * - import.meta.env 物件型別
 * - 可擴展定義 .env 檔案裡 VITE_ 開頭環境參數
 */
interface ImportMetaEnv {
  readonly VITE_APP_RUN: string;
  VITE_APP_VERSION: string;
}
