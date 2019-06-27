export interface Browser {
  goto: (url: string, options: any) => Promise<void>;
  get: (url: string, options: any) => Promise<void>;

  getCurrentUrl: () => Promise<string>;
}