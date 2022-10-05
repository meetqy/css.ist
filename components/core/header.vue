<template>
  <div
    class="bg-base-100/60 backdrop-blur fixed lg:w-[calc(100vw-20rem)] top-0 lg:left-80 w-full z-20"
  >
    <header class="navbar container m-auto">
      <div class="navbar-start">
        <label
          for="my-drawer-2"
          class="drawer-button lg:hidden btn btn-ghost hover:bg-transparent focus:bg-transparent active:text-base-content p-0 normal-case"
        >
          <img
            :src="useCF('css.ist-logo', 'sm')"
            alt="css.ist logo"
            class="w-10 h-10 mr-2"
          />
          <span class="text-2xl">{{ getWebConfig().title }}</span>
        </label>

        <NuxtLink
          to="/"
          class="lg:flex hidden btn btn-ghost hover:bg-transparent focus:bg-transparent active:text-base-content p-0 normal-case"
        >
          <img
            :src="useCF('css.ist-logo', 'sm')"
            alt="css.ist logo"
            class="w-10 h-10 mr-2"
          />
          <span class="text-2xl">{{ getWebConfig().title }}</span>
        </NuxtLink>
      </div>
      <div class="navbar-center"></div>
      <div class="navbar-end">
        <ul class="menu menu-horizontal rounded-box capitalize lg:flex hidden">
          <li>
            <NuxtLink to="/">
              <span class="material-symbols-outlined"> home </span>
              home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about">
              <span class="material-symbols-outlined"> person </span>
              about
            </NuxtLink>
          </li>
        </ul>

        <CoreDark />
      </div>
    </header>
  </div>
</template>
