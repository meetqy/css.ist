<template>
  <div
    class="relative bg-base-100 w-full font-light overflow-y-scroll h-screen"
  >
    <div>
      <!-- navbar -->
      <div class="w-full z-50 top-0 py-3 sm:py-5 absolute">
        <div class="navbar relative xl:pl-12">
          <div class="flex-1">
            <a
              class="btn btn-ghost normal-case text-3xl text-primary-content/80"
            >
              {{ baseInfo[lang].title }}
            </a>
          </div>
          <div class="flex-none">
            <div
              class="dropdown dropdown-end xl:dropdown-open xl:dropdown-left"
            >
              <label
                tabindex="0"
                class="btn m-1 btn-ghost btn-sm text-primary-content/80 xl:btn-disabled xl:opacity-0"
              >
                <span class="material-symbols-outlined">
                  settings_suggest
                </span>
              </label>
              <ul
                tabindex="0"
                class="dropdown-content xl:menu-horizontal menu uppercase shadow bg-base-100 xl:bg-transparent xl:shadow-none rounded-box xl:w-auto md:w-96 w-72 text-primary-content/80"
              >
                <li v-for="item in templateMenu[lang]" :key="item.text">
                  <a :href="`#${item.text}`">{{ item.text }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div>
        <!-- banner -->
        <div
          class="relative bg-cover bg-center bg-no-repeat py-8"
          :style="`background-image: url(${useUnsplash(
            '/1920x1080',
            '?fashion'
          )})`"
        >
          <div
            class="absolute inset-0 z-20 bg-gradient-to-r from-primary/10 to-primary/90 bg-cover bg-center bg-no-repeat"
          ></div>
          <div
            class="container m-auto relative z-30 pt-20 pb-12 sm:pt-56 sm:pb-48 lg:pt-64 lg:pb-48 min-h-[60vh]"
          >
            <div class="flex flex-col items-center justify-center lg:flex-row">
              <div
                class="rounded-full flex-shrink-0 border-8 border-primary/30 shadow-xl"
              >
                <img
                  v-lazy="vLazy(usePicsum('/192/192'))"
                  class="h-48 rounded-full sm:h-56"
                  alt="author"
                />
              </div>
              <div
                class="pt-8 sm:pt-10 lg:pl-8 lg:pt-0 text-primary-content/90"
              >
                <h1
                  class="text-center text-4xl sm:text-left sm:text-5xl md:text-6xl line-clamp-2"
                >
                  {{ baseInfo[lang].subtitle }}
                </h1>
                <div
                  class="flex flex-col justify-center pt-3 sm:flex-row sm:pt-5 lg:justify-start"
                >
                  <div
                    class="flex items-center justify-center pl-0 sm:justify-start md:pl-1"
                  >
                    <p class="text-lg uppercase">{{ page.connect }}</p>
                    <div
                      class="hidden sm:flex btn btn-link btn-xs justify-center items-center"
                    >
                      <i
                        class="fa-solid fa-chevron-right text-info text-lg"
                      ></i>
                    </div>
                  </div>
                  <div
                    class="flex items-center justify-center pt-5 sm:justify-start sm:pt-0"
                  >
                    <a
                      v-for="(item, i) in templateContacts"
                      :key="i"
                      href="#"
                      class="btn btn-square btn-outline btn-ghost border-transparent text-primary-content"
                      v-html="item"
                    >
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- about me -->
        <div id="about" class="bg-base-200/50">
          <div
            class="container m-auto flex flex-col items-center py-16 md:py-20 lg:flex-row px-4"
          >
            <div class="w-full text-center sm:w-3/4 lg:w-3/5 lg:text-left">
              <h2
                class="text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl"
              >
                {{ page.who }}
              </h2>
              <h4
                class="pt-6 text-xl font-medium text-base-content sm:text-2xl lg:text-3xl"
              >
                {{ baseInfo[lang].subtitle }}
              </h4>
              <p class="pt-6 leading-relaxed text-grey-20">
                {{ page.whoDesc }}
              </p>
              <div
                class="flex flex-col justify-center pt-6 sm:flex-row lg:justify-start"
              >
                <div class="flex items-center justify-center sm:justify-start">
                  <p class="text-lg font-semibold uppercase">
                    {{ page.connect }}
                  </p>
                  <div class="hidden sm:block">
                    <i class="bx bx-chevron-right text-2xl text-primary"></i>
                  </div>
                </div>
                <div
                  class="flex items-center justify-center pt-5 pl-2 sm:justify-start sm:pt-0"
                >
                  <a
                    v-for="(item, i) in templateContacts"
                    :key="i"
                    class="btn btn-square text-xl btn-outline border-0 btn-ghost"
                    v-html="item"
                  >
                  </a>
                </div>
              </div>
            </div>
            <div class="w-full pl-0 pt-10 sm:w-3/4 lg:w-2/5 lg:pl-12 lg:pt-0">
              <!-- language -->
              <div
                v-for="item in [
                  {
                    lang: 'javascript',
                    progress: $Mock.Random.natural(1, 100),
                  },
                  {
                    lang: 'html & css',
                    progress: $Mock.Random.natural(1, 100),
                  },
                  {
                    lang: 'vue',
                    progress: $Mock.Random.natural(1, 100),
                  },
                  {
                    lang: 'react',
                    progress: $Mock.Random.natural(1, 100),
                  },
                ]"
                :key="item.lang"
                class="mb-6"
              >
                <div class="flex items-end justify-between">
                  <h4 class="font-semibold uppercase text-base-content">
                    {{ item.lang }}
                  </h4>
                  <h3 class="text-3xl font-bold text-primary">
                    {{ item.progress }}%
                  </h3>
                </div>
                <progress
                  class="progress w-full h-3 progress-primary"
                  max="100"
                  :value="item.progress"
                />
              </div>
            </div>
          </div>
        </div>

        <div id="services" class="container mx-auto px-4 py-16 md:py-20">
          <h2
            class="text-center text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl"
          >
            Here's what I'm good at
          </h2>
          <h3
            class="pt-6 text-center text-xl font-medium text-base-content sm:text-2xl lg:text-3xl"
          >
            These are the services Ioffer
          </h3>
          <div
            class="grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 md:gap-10 md:pt-12 lg:grid-cols-3"
          >
            <div
              class="group rounded px-8 py-12 shadow hover:bg-primary flex justify-center flex-col items-center transition-all"
            >
              <span
                class="text-8xl group-hover:text-base-100 text-base-content"
              >
                <!-- <i
                  name="accessibility"
                  role="img"
                  class="md hydrated"
                  aria-label="accessibility"
                >
                </i> -->
              </span>
              <div class="text-center">
                <h3
                  class="pt-8 text-lg font-semibold uppercase text-primary group-hover:text-info lg:text-xl"
                >
                  Towels
                </h3>
                <p
                  class="text-grey pt-4 text-sm group-hover:text-base-100 md:text-base"
                >
                  Boston's most advanced compression wear technology increases
                  muscle oxygenation, stabilizes active muscles
                </p>
              </div>
            </div>
            <div
              class="group rounded px-8 py-12 shadow hover:bg-primary flex justify-center flex-col items-center transition-all"
            >
              <span
                class="text-8xl group-hover:text-base-100 text-base-content"
              >
                <!-- <i
                  name="american-football"
                  role="img"
                  class="md hydrated"
                  aria-label="american football"
                ></i> -->
              </span>
              <div class="text-center">
                <h3
                  class="pt-8 text-lg font-semibold uppercase text-primary group-hover:text-info lg:text-xl"
                >
                  Fish
                </h3>
                <p
                  class="text-grey pt-4 text-sm group-hover:text-base-100 md:text-base"
                >
                  Andy shoes are designed to keeping in mind durability as well
                  as trends, the most stylish range of shoes &amp; sandals
                </p>
              </div>
            </div>
            <div
              class="group rounded px-8 py-12 shadow hover:bg-primary flex justify-center flex-col items-center transition-all"
            >
              <span
                class="text-8xl group-hover:text-base-100 text-base-content"
              >
                <!-- <i
                  name="boat"
                  role="img"
                  class="md hydrated"
                  aria-label="boat"
                ></i> -->
              </span>
              <div class="text-center">
                <h3
                  class="pt-8 text-lg font-semibold uppercase text-primary group-hover:text-info lg:text-xl"
                >
                  Soap
                </h3>
                <p
                  class="text-grey pt-4 text-sm group-hover:text-base-100 md:text-base"
                >
                  Boston's most advanced compression wear technology increases
                  muscle oxygenation, stabilizes active muscles
                </p>
              </div>
            </div>
            <div
              class="group rounded px-8 py-12 shadow hover:bg-primary flex justify-center flex-col items-center transition-all"
            >
              <span
                class="text-8xl group-hover:text-base-100 text-base-content"
              >
                <!-- <i
                  name="bicycle"
                  role="img"
                  class="md hydrated"
                  aria-label="bicycle"
                ></i> -->
              </span>
              <div class="text-center">
                <h3
                  class="pt-8 text-lg font-semibold uppercase text-primary group-hover:text-info lg:text-xl"
                >
                  Keyboard
                </h3>
                <p
                  class="text-grey pt-4 text-sm group-hover:text-base-100 md:text-base"
                >
                  Andy shoes are designed to keeping in mind durability as well
                  as trends, the most stylish range of shoes &amp; sandals
                </p>
              </div>
            </div>
            <div
              class="group rounded px-8 py-12 shadow hover:bg-primary flex justify-center flex-col items-center transition-all"
            >
              <span
                class="text-8xl group-hover:text-base-100 text-base-content"
              >
                <!-- <i
                  name="beer"
                  role="img"
                  class="md hydrated"
                  aria-label="beer"
                ></i> -->
              </span>
              <div class="text-center">
                <h3
                  class="pt-8 text-lg font-semibold uppercase text-primary group-hover:text-info lg:text-xl"
                >
                  Fish
                </h3>
                <p
                  class="text-grey pt-4 text-sm group-hover:text-base-100 md:text-base"
                >
                  Carbonite web goalkeeper gloves are ergonomically designed to
                  give easy fit
                </p>
              </div>
            </div>
            <div
              class="group rounded px-8 py-12 shadow hover:bg-primary flex justify-center flex-col items-center transition-all"
            >
              <span
                class="text-8xl group-hover:text-base-100 text-base-content"
              >
                <!-- <i
                  name="skull"
                  role="img"
                  class="md hydrated"
                  aria-label="skull"
                ></i> -->
              </span>
              <div class="text-center">
                <h3
                  class="pt-8 text-lg font-semibold uppercase text-primary group-hover:text-info lg:text-xl"
                >
                  Pizza
                </h3>
                <p
                  class="text-grey pt-4 text-sm group-hover:text-base-100 md:text-base"
                >
                  New range of formal shirts are designed keeping you in mind.
                  With fits and styling that will make you stand apart
                </p>
              </div>
            </div>
          </div>
        </div>

        <div id="portfolio" class="container m-auto py-16 md:py-20 px-4">
          <h2
            class="text-center text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl"
          >
            Check out my Portfolio
          </h2>
          <h3
            class="pt-6 text-center text-xl font-medium text-base-content sm:text-2xl lg:text-3xl"
          >
            Here's what I have done with the past
          </h3>
          <div
            class="mx-auto grid w-full grid-cols-1 gap-8 pt-12 sm:w-3/4 md:gap-10 lg:w-full lg:grid-cols-2"
          >
            <a
              href="/"
              class="mx-auto transform transition-all hover:scale-105 md:mx-0"
              ><img
                src="https://source.unsplash.com/1920x1080?work&amp;1"
                class="w-full shadow"
                alt="portfolio image" /></a
            ><a
              href="/"
              class="mx-auto transform transition-all hover:scale-105 md:mx-0"
              ><img
                src="https://source.unsplash.com/1920x1080?work&amp;2"
                class="w-full shadow"
                alt="portfolio image" /></a
            ><a
              href="/"
              class="mx-auto transform transition-all hover:scale-105 md:mx-0"
              ><img
                src="https://source.unsplash.com/1920x1080?work&amp;3"
                class="w-full shadow"
                alt="portfolio image" /></a
            ><a
              href="/"
              class="mx-auto transform transition-all hover:scale-105 md:mx-0"
              ><img
                src="https://source.unsplash.com/1920x1080?work&amp;4"
                class="w-full shadow"
                alt="portfolio image"
            /></a>
          </div>
        </div>

        <div id="clients" class="bg-base-200/50">
          <div class="container m-auto py-16 md:py-20">
            <div
              class="mx-auto flex flex-col justify-between items-center w-full sm:w-3/4 lg:w-full"
            >
              <h2
                class="text-center text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl"
              >
                My latest clients
              </h2>
              <div class="grid lg:grid-cols-6 grid-cols-2 mt-12">
                <span
                  class="mx-8 block text-8xl text-base-content/60 mt-4 lg:mt-0"
                >
                  <i
                    name="accessibility-outline"
                    role="img"
                    class="md hydrated"
                    aria-label="accessibility outline"
                  ></i> </span
                ><span
                  class="mx-8 block text-8xl text-base-content/60 mt-4 lg:mt-0"
                >
                  <i
                    name="american-football-outline"
                    role="img"
                    class="md hydrated"
                    aria-label="american football outline"
                  ></i> </span
                ><span
                  class="mx-8 block text-8xl text-base-content/60 mt-4 lg:mt-0"
                >
                  <i
                    name="boat-outline"
                    role="img"
                    class="md hydrated"
                    aria-label="boat outline"
                  >
                  </i> </span
                ><span
                  class="mx-8 block text-8xl text-base-content/60 mt-4 lg:mt-0"
                >
                  <i
                    name="bicycle-outline"
                    role="img"
                    class="md hydrated"
                    aria-label="bicycle outline"
                  ></i> </span
                ><span
                  class="mx-8 block text-8xl text-base-content/60 mt-4 lg:mt-0"
                >
                  <i
                    name="beer-outline"
                    role="img"
                    class="md hydrated"
                    aria-label="beer outline"
                  >
                  </i> </span
                ><span
                  class="mx-8 block text-8xl text-base-content/60 mt-4 lg:mt-0"
                >
                  <i
                    name="skull-outline"
                    role="img"
                    class="md hydrated"
                    aria-label="skull outline"
                  ></i>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div id="work" class="container px-4 py-16 m-auto md:py-20">
          <h2
            class="text-center text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl"
          >
            My work experience
          </h2>
          <h3
            class="pt-6 text-center text-xl font-medium text-base-content sm:text-2xl lg:text-3xl"
          >
            Here's what I did before freelancing
          </h3>
          <div class="relative mx-auto mt-12 flex w-full flex-col lg:w-2/3">
            <span
              class="left-1/3 absolute inset-y-0 ml-10 hidden w-0.5 bg-base-content/60 md:block"
            ></span>
            <div
              class="mt-8 flex flex-col text-center md:flex-row md:text-left"
            >
              <div class="md:w-1/3">
                <div class="flex justify-center md:justify-start">
                  <span
                    class="shrink-0 text-base-content/60 flex justify-center items-center"
                    ><span class="text-3xl mr-2">
                      <i
                        name="accessibility-outline"
                        role="img"
                        class="md hydrated"
                        aria-label="accessibility outline"
                      ></i>
                    </span>
                    Car</span
                  >
                  <div class="relative ml-3 hidden w-full md:block">
                    <span
                      class="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 transform bg-primary"
                    ></span>
                  </div>
                </div>
              </div>
              <div class="md:w-2/3">
                <div class="relative flex md:pl-24">
                  <span
                    class="absolute left-8 top-1 hidden h-4 w-4 rounded-full border-2 border-grey-40 bg-white md:block"
                  ></span>
                  <div class="mt-1 flex">
                    <span class="text-primary text-xl">
                      <i
                        name="caret-forward-outline"
                        role="img"
                        class="md hydrated"
                        aria-label="caret forward outline"
                      ></i>
                    </span>
                    <div class="md:-mt-1 md:pl-12">
                      <span class="block font-bold text-grey-40"
                        >Apr 2015 - Mar 2018</span
                      ><span
                        class="block pt-2 text-xl font-bold uppercase text-primary"
                        >Frontend Developer</span
                      >
                      <div class="pt-2">
                        <span class="block text-base-content"
                          >Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Vestibulum mattis felis vitae risus pulvinar
                          tincidunt. Nam ac venenatis enim.</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="mt-8 flex flex-col text-center md:flex-row md:text-left"
            >
              <div class="md:w-1/3">
                <div class="flex justify-center md:justify-start">
                  <span
                    class="shrink-0 text-base-content/60 flex justify-center items-center"
                    ><span class="text-3xl mr-2">
                      <i
                        name="american-football-outline"
                        role="img"
                        class="md hydrated"
                        aria-label="american football outline"
                      ></i>
                    </span>
                    Shoes</span
                  >
                  <div class="relative ml-3 hidden w-full md:block">
                    <span
                      class="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 transform bg-primary"
                    ></span>
                  </div>
                </div>
              </div>
              <div class="md:w-2/3">
                <div class="relative flex md:pl-24">
                  <span
                    class="absolute left-8 top-1 hidden h-4 w-4 rounded-full border-2 border-grey-40 bg-white md:block"
                  ></span>
                  <div class="mt-1 flex">
                    <span class="text-primary text-xl">
                      <i
                        name="caret-forward-outline"
                        role="img"
                        class="md hydrated"
                        aria-label="caret forward outline"
                      ></i>
                    </span>
                    <div class="md:-mt-1 md:pl-12">
                      <span class="block font-bold text-grey-40"
                        >Apr 2015 - Mar 2018</span
                      ><span
                        class="block pt-2 text-xl font-bold uppercase text-primary"
                        >Frontend Developer</span
                      >
                      <div class="pt-2">
                        <span class="block text-base-content"
                          >Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Vestibulum mattis felis vitae risus pulvinar
                          tincidunt. Nam ac venenatis enim.</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="mt-8 flex flex-col text-center md:flex-row md:text-left"
            >
              <div class="md:w-1/3">
                <div class="flex justify-center md:justify-start">
                  <span
                    class="shrink-0 text-base-content/60 flex justify-center items-center"
                    ><span class="text-3xl mr-2">
                      <i
                        name="boat-outline"
                        role="img"
                        class="md hydrated"
                        aria-label="boat outline"
                      ></i>
                    </span>
                    Bacon</span
                  >
                  <div class="relative ml-3 hidden w-full md:block">
                    <span
                      class="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 transform bg-primary"
                    ></span>
                  </div>
                </div>
              </div>
              <div class="md:w-2/3">
                <div class="relative flex md:pl-24">
                  <span
                    class="absolute left-8 top-1 hidden h-4 w-4 rounded-full border-2 border-grey-40 bg-white md:block"
                  ></span>
                  <div class="mt-1 flex">
                    <span class="text-primary text-xl">
                      <i
                        name="caret-forward-outline"
                        role="img"
                        class="md hydrated"
                        aria-label="caret forward outline"
                      ></i>
                    </span>
                    <div class="md:-mt-1 md:pl-12">
                      <span class="block font-bold text-grey-40"
                        >Apr 2015 - Mar 2018</span
                      ><span
                        class="block pt-2 text-xl font-bold uppercase text-primary"
                        >Frontend Developer</span
                      >
                      <div class="pt-2">
                        <span class="block text-base-content"
                          >Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Vestibulum mattis felis vitae risus pulvinar
                          tincidunt. Nam ac venenatis enim.</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          id="statistics"
          class="bg-cover bg-top bg-no-repeat py-16 lg:py-24"
          style="
            background-image: url('https://source.unsplash.com/random/1080x0');
          "
        >
          <div class="container m-auto">
            <div
              class="mx-auto w-5/6 bg-base-100 py-16 shadow md:w-11/12 lg:py-20 xl:py-24 2xl:w-full"
            >
              <div
                class="grid grid-cols-2 gap-5 md:gap-8 xl:grid-cols-4 xl:gap-5"
              >
                <div
                  class="flex flex-col items-center justify-center text-center md:flex-row md:text-left"
                >
                  <span class="text-6xl mr-2">
                    <i
                      name="accessibility-outline"
                      role="img"
                      class="md hydrated"
                      aria-label="accessibility outline"
                    ></i>
                  </span>
                  <div class="pt-5 md:pl-5 md:pt-0">
                    <h1 class="text-2xl font-bold text-primary md:text-4xl">
                      89
                    </h1>
                    <h4 class="text-base font-medium leading-loose md:text-xl">
                      Gloves
                    </h4>
                  </div>
                </div>
                <div
                  class="flex flex-col items-center justify-center text-center md:flex-row md:text-left"
                >
                  <span class="text-6xl mr-2">
                    <i
                      name="american-football-outline"
                      role="img"
                      class="md hydrated"
                      aria-label="american football outline"
                    ></i>
                  </span>
                  <div class="pt-5 md:pl-5 md:pt-0">
                    <h1 class="text-2xl font-bold text-primary md:text-4xl">
                      1
                    </h1>
                    <h4 class="text-base font-medium leading-loose md:text-xl">
                      Fish
                    </h4>
                  </div>
                </div>
                <div
                  class="flex flex-col items-center justify-center text-center md:flex-row md:text-left"
                >
                  <span class="text-6xl mr-2">
                    <i
                      name="boat-outline"
                      role="img"
                      class="md hydrated"
                      aria-label="boat outline"
                    ></i>
                  </span>
                  <div class="pt-5 md:pl-5 md:pt-0">
                    <h1 class="text-2xl font-bold text-primary md:text-4xl">
                      19
                    </h1>
                    <h4 class="text-base font-medium leading-loose md:text-xl">
                      Soap
                    </h4>
                  </div>
                </div>
                <div
                  class="flex flex-col items-center justify-center text-center md:flex-row md:text-left"
                >
                  <span class="text-6xl mr-2">
                    <i
                      name="bicycle-outline"
                      role="img"
                      class="md hydrated"
                      aria-label="bicycle outline"
                    ></i>
                  </span>
                  <div class="pt-5 md:pl-5 md:pt-0">
                    <h1 class="text-2xl font-bold text-primary md:text-4xl">
                      90
                    </h1>
                    <h4 class="text-base font-medium leading-loose md:text-xl">
                      Keyboard
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="blog" class="bg-grey-50">
          <div class="container px-4 py-16 m-auto md:py-20">
            <h2
              class="text-center text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl"
            >
              I also like to write
            </h2>
            <h4
              class="pt-6 text-center text-xl font-medium text-base-content sm:text-2xl lg:text-3xl"
            >
              Check out my latest posts!
            </h4>
            <div
              class="mx-auto grid w-full grid-cols-1 gap-6 pt-12 sm:w-3/4 lg:w-full lg:grid-cols-3 xl:gap-10"
            >
              <a href="/post" class="shadow bg-base-300">
                <div
                  class="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72"
                  style="
                    background-image: url('https://source.unsplash.com/0x576?1');
                  "
                >
                  <span
                    class="absolute right-2 bottom-2 btn btn-outline rounded-box"
                  >
                    Read More
                  </span>
                </div>
                <div class="bg-base-100 py-6 px-5 xl:py-8">
                  <span class="block text-lg font-semibold text-base-content">
                    How to become a frontend developer </span
                  ><span class="block pt-2 text-base-content"
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.</span
                  >
                </div> </a
              ><a href="/post" class="shadow bg-base-300">
                <div
                  class="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72"
                  style="
                    background-image: url('https://source.unsplash.com/0x576?2');
                  "
                >
                  <span
                    class="absolute right-2 bottom-2 btn btn-outline rounded-box"
                  >
                    Read More
                  </span>
                </div>
                <div class="bg-base-100 py-6 px-5 xl:py-8">
                  <span class="block text-lg font-semibold text-base-content">
                    How to become a frontend developer </span
                  ><span class="block pt-2 text-base-content"
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.</span
                  >
                </div> </a
              ><a href="/post" class="shadow bg-base-300">
                <div
                  class="group relative h-72 bg-cover bg-center bg-no-repeat sm:h-84 lg:h-64 xl:h-72"
                  style="
                    background-image: url('https://source.unsplash.com/0x576?3');
                  "
                >
                  <span
                    class="absolute right-2 bottom-2 btn btn-outline rounded-box"
                  >
                    Read More
                  </span>
                </div>
                <div class="bg-base-100 py-6 px-5 xl:py-8">
                  <span class="block text-lg font-semibold text-base-content">
                    How to become a frontend developer </span
                  ><span class="block pt-2 text-base-content"
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.</span
                  >
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- contact -->
        <div id="contact" class="container px-4 py-16 m-auto md:py-20">
          <h2
            class="text-center text-4xl font-semibold uppercase text-primary sm:text-5xl lg:text-6xl"
          >
            {{ page.contactTitle }}
          </h2>
          <h4
            class="pt-6 text-center text-xl font-medium text-base-content sm:text-2xl lg:text-3xl"
          >
            {{ page.contactSubtitle }}
          </h4>
          <div class="mx-auto w-full pt-5 text-center sm:w-2/3 lg:pt-6">
            <p class="text-grey-10">
              {{ page.contactDesc }}
            </p>
          </div>
          <form class="mx-auto w-full pt-6 sm:w-3/4">
            <div class="flex flex-col md:flex-row">
              <input
                id="name"
                class="input w-full mr-6 input-bordered mt-4"
                :placeholder="page.contactName"
                type="text"
              />
              <input
                id="email"
                class="input w-full input-bordered mt-4"
                :placeholder="page.contactEmail"
                type="text"
              />
            </div>
            <textarea
              id="message"
              class="mt-4 w-full textarea textarea-bordered"
              :placeholder="page.contactMessage"
              cols="30"
              rows="10"
            />
            <button class="btn btn-primary mt-6">
              <span>{{ page.send }}</span>
              <span class="ml-2 text-2xl flex items-center">
                <span class="material-symbols-outlined"> send </span>
              </span>
            </button>
          </form>
          <div class="flex flex-col pt-16 lg:flex-row">
            <div
              class="w-full border border-base-content/20 px-6 py-6 sm:py-8 lg:w-1/3"
            >
              <div class="flex items-center">
                <span class="text-lg flex items-center">
                  <i
                    name="call-outline"
                    role="img"
                    class="md hydrated"
                    aria-label="call outline"
                  >
                  </i>
                </span>
                <p class="pl-2 font-bold uppercase text-grey-40 lg:text-lg">
                  {{ page.myphone }}
                </p>
              </div>
              <p class="pt-2 text-left font-bold text-primary lg:text-lg">
                (+881) 111 222 333
              </p>
            </div>
            <div
              class="w-full border border-t-0 border-base-content/20 px-6 py-6 sm:py-8 lg:w-1/3 lg:border-l-0 lg:border-t-2"
            >
              <div class="flex items-center">
                <span class="text-lg flex items-center">
                  <i
                    name="mail-outline"
                    role="img"
                    class="md hydrated"
                    aria-label="mail outline"
                  >
                  </i>
                </span>
                <p class="pl-2 font-bold uppercase text-grey-40 lg:text-lg">
                  {{ page.myemail }}
                </p>
              </div>
              <p class="pt-2 text-left font-bold text-primary lg:text-lg">
                name@mydomain.com
              </p>
            </div>
            <div
              class="w-full border border-t-0 border-base-content/20 px-6 py-6 sm:py-8 lg:w-1/3 lg:border-l-0 lg:border-t-2"
            >
              <div class="flex items-center">
                <span class="text-lg flex items-center">
                  <i
                    name="location-outline"
                    role="img"
                    class="md hydrated"
                    aria-label="location outline"
                  ></i>
                </span>
                <p class="pl-2 font-bold uppercase text-grey-40 lg:text-lg">
                  {{ page.myaddress }}
                </p>
              </div>
              <p class="pt-2 text-left font-bold text-primary lg:text-lg">
                {{ page.address }}
              </p>
            </div>
          </div>
        </div>

        <!-- join us -->
        <div
          class="relative bg-primary bg-cover bg-center bg-no-repeat py-16 bg-blend-multiply lg:py-24"
          :style="`
            background-image: url(${usePicsum('/1920/1080')})`"
        >
          <div class="container m-auto relative z-30">
            <h3
              class="text-center text-3xl uppercase text-white/90 leading-tight tracking-wide text-base-100 sm:text-4xl lg:text-5xl"
            >
              {{ baseInfo[lang].subtitle }}
            </h3>
            <form
              class="mt-6 flex flex-col justify-center sm:flex-row px-4 lg:px-0"
            >
              <input
                id="email"
                class="w-full rounded input bg-white sm:w-2/5 sm:py-4 lg:w-1/3"
                type="text"
                :placeholder="page.joinInput"
              />
              <button class="btn btn-warning lg:ml-6 mt-4 lg:mt-0 normal-case">
                {{ page.joinBtn }}
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- © Copyright -->
      <div class="bg-primary">
        <div
          class="container m-auto flex flex-col justify-between py-6 px-4 sm:flex-row text-primary-content"
        >
          <p class="text-center md:text-left">
            © Copyright 2022. All right reserved, {{ baseInfo[lang].title }}.
          </p>
          <div
            class="flex items-center justify-center pt-5 sm:justify-start sm:pt-0"
          >
            <a
              v-for="(item, i) in templateContacts"
              :key="i"
              class="btn btn-circle btn-ghost btn-sm mr-2 text-xl"
              v-html="item"
            >
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $Mock } = useNuxtApp();

const route = useRoute();

const lang = ref("en");
const page = ref({});

watch(route, (v) => {
  lang.value = v.query.lang;
  init(lang.value);
});

onMounted(() => {
  lang.value = route.query.lang || "en";
  init(lang.value);
});

const init = () => {
  page.value = {
    en: {
      who: "who am i?",
      whoDesc: $Mock.Random.paragraph(3, 8),
      connect: "Let's connect",
      joinInput: "Give me your Email",
      joinBtn: "Join the club",
      contactTitle: "HERE'S A CONTACT FORM",
      contactSubtitle: $Mock.Random.title(),
      contactDesc: $Mock.Random.paragraph(),
      contactName: "name",
      contactEmail: "email",
      contactMessage: "message",
      send: "send",
      myphone: "my phone",
      myemail: "my email",
      myaddress: "my address",
      address: "New York D Block 1100, 2011 USA",
    },
    zh: {
      who: "我是谁？",
      whoDesc: $Mock.Random.cparagraph(5, 12),
      connect: "联系我",
      joinInput: "你的邮箱",
      joinBtn: "加入团队",
      contactTitle: "意见或建议",
      contactSubtitle: $Mock.Random.ctitle(),
      contactDesc: $Mock.Random.cparagraph(),
      contactName: "你的名字",
      contactEmail: "你的邮箱",
      contactMessage: "说点什么",
      send: "发送",
      myphone: "电话",
      myemail: "邮箱",
      myaddress: "地址",
      address: "中国 四川省 成都市 xx区 ",
    },
  }[lang.value];
};
</script>
