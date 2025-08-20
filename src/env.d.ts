/// <reference types="vite/client" />
// triple-slash directive: 作用是告訴 TypeScript 去讀取 vite/client 的型別宣告，讓 TypeScript 知道 Vite 預設提供的一些全域型別

// 型別宣告檔 (*.d.ts)：
// 作用是幫 TypeScript 認識專案中預設不認識的檔案及提供型別資訊
// 專案內自定義的 (*.d.ts) 只要在 tsconfig.json include 範圍內，便會生效

/**
 * - import.meta.env 物件型別
 * - 可擴展定義 .env 檔案裡 VITE_ 開頭環境參數
 */
interface ImportMetaEnv {
  readonly VITE_APP_RUN: string;
  VITE_APP_VERSION: string;
}
