declare module "@nuxt/schema" {
  interface RuntimeConfig {
    public: {
      // 当前调试的模板路径 /introduce/:number
      dev_template_path: string;
    };
  }
}

export {};
