<template>
  <header class="navbar bg-base-100/90 px-10 sticky top-0 z-20">
    <div class="navbar-start">
      <NuxtLink
        to="/"
        class="btn btn-ghost hover:bg-transparent focus:bg-transparent active:text-base-content p-0 normal-case"
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
      <ul class="menu menu-horizontal rounded-box capitalize">
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
        <li>
          <CoreDark />
        </li>
      </ul>
    </div>
  </header>
</template>
