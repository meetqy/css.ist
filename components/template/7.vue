<template>
  <div class="w-screen h-screen flex items-center bg-base-100 overflow-y-auto">
    <section
      class="container lg:p-10 p-5 m-auto grid grid-cols-1 lg:grid-cols-2 min-h-[50vh]"
    >
      <div
        class="text-primary-content bg-primary/60 rounded-box lg:p-10 p-5 flex flex-col justify-center"
      >
        <h1 class="lg:text-6xl text-4xl font-bold font-serif mb-5">
          {{ baseInfo[lang].title }}
        </h1>
        <p class="text-lg mb-5">
          {{ baseInfo[lang].subtitle }}
        </p>
        <div class="grid lg:inline-block">
          <em>
            <a class="underline"> {{ $Mock.Random.guid() }} </a>
          </em>
          •
          <em>
            <a class="underline"> {{ $Mock.Random.email() }} </a>
          </em>
        </div>
      </div>

      <!-- form -->
      <div class="lg:px-10 lg:mt-0 mt-10">
        <div class="w-full grid gap-5">
          <div class="w-full flex flex-col">
            <label for="Name">{{ page.name }}</label>
            <input
              type="text"
              name="Name"
              placeholder="John Doe"
              class="input input-bordered mt-1"
            />
          </div>

          <div class="w-full flex flex-col">
            <label for="Email">{{ page.email }}</label>
            <input
              type="email"
              name="Email"
              placeholder="hello@example.com"
              class="input input-bordered mt-1"
            />
          </div>

          <div class="w-full flex flex-col">
            <label>{{ page.how }}</label>
            <select class="select select-bordered mt-1">
              <option value="" disabled>==SELECT AN OPTION==</option>
              <option value="Google Search">Google Search</option>
              <option value="Social Media">Social Media</option>
              <option value="Email">Email</option>
            </select>
          </div>

          <div class="w-full flex flex-col">
            <label for="Message">{{ page.message }}</label>
            <textarea
              name="Message"
              placeholder="Your message here..."
              rows="4"
              class="textarea textarea-bordered mt-1"
            />
          </div>

          <div>
            <button class="btn btn-primary capitalize">
              {{ page.submit }}
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { $Mock } = useNuxtApp();

const lang = ref("en");
const route = useRoute();
lang.value = route.query.lang || "en";

watch(route, (v) => {
  lang.value = v.query.lang || "en";
  init();
});

const page = ref({});

const init = () => {
  page.value = {
    en: {
      name: "Name",
      namePl: "John Doe",
      email: "Email",
      how: "How Did You Hear About Us?",
      message: "Message",
      submit: "submit",
    },
    zh: {
      name: "昵称",
      namePl: "John Doe",
      email: "邮箱",
      how: "你是怎么知道我们的?",
      message: "备注",
      submit: "提交",
    },
  }[lang.value];
};

onMounted(() => init());
</script>
