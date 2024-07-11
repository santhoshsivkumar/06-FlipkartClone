/// <reference types="vite/client" />
interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_ADMIN_PASSWORD: string;
  // Add more variables as needed
}

declare module "import.meta" {
  interface ImportMeta {
    env: ImportMetaEnv;
  }
}
