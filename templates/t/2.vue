<template>
  <div class="w-full h-screen flex justify-center items-center bg-base-200">
    <div
      class="p-4 rounded-box w-full max-w-md border border-base-200 shadow-md sm:p-6 lg:p-8 m-auto bg-base-100"
    >
      <form class="space-y-6">
        <h5 class="text-xl font-medium text-base-content">
          {{ page.title }}
        </h5>

        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-base-content"
          >
            {{ page.email }}
          </label>
          <input
            type="email"
            name="email"
            class="input input-bordered w-full"
            placeholder="name@company.com"
          />
        </div>

        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-base-content"
          >
            {{ page.pwd }}
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            class="input input-bordered w-full"
          />
        </div>
        <div class="flex items-start justify-between">
          <div class="flex items-start">
            <input
              id="remember"
              type="checkbox"
              checked
              class="checkbox checkbox-sm rounded-full checkbox-primary"
            />
            <label for="remember" class="ml-2 text-sm font-medium">
              {{ page.remember }}
            </label>
          </div>
          <a href="#" class="btn btn-link btn-xs capitalize">
            {{ page.forget }}
          </a>
        </div>
        <button class="btn btn-primary w-full capitalize">
          {{ page.btn }}
        </button>
        <div class="text-sm font-medium text-base-content text-opacity-70">
          {{ page.reg }}
          <a href="#" class="btn btn-link btn-xs capitalize">
            {{ page.create }}
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
watch(route, (v) => {
  lang.value = v.query.lang;
  init(lang.value);
});

const lang = ref(route.query.lang || "en");
const page = ref({});

const init = () => {
  page.value = {
    en: {
      title: "Sign in to our platform",
      email: "Your email",
      pwd: "Your password",
      remember: "Remember me",
      forget: "lost password?",
      btn: "login to your account",
      reg: "not registered?",
      create: "create account",
    },
    zh: {
      title: "登录",
      email: "邮箱",
      pwd: "密码",
      remember: "记住我",
      forget: "忘记密码？",
      btn: "登录你的账号",
      reg: "没有账号？",
      create: "创建",
    },
  }[lang.value];
};

onMounted(() => init());
</script>
