<template>
  <div class="w-screen h-screen overflow-y-auto">
    <header class="navbar lg:px-8">
      <div class="navbar-start tracking-widest font-bold text-xl">
        <span class="bg-primary text-primary-content rounded-lg px-2">css</span>
        <span>.ist</span>
      </div>
      <div class="navbar-end text-sm space-x-4">
        <a
          href="javascript:;"
          class="border-b cursor-pointer hover:text-primary"
          >{{ $MockTitle(1)[lang] }}</a
        >
        <a
          href="javascript:;"
          class="border-b cursor-pointer hover:text-primary"
          >{{ $MockTitle(1)[lang] }}</a
        >
        <span
          class="inline-flex items-center cursor-pointer"
          v-html="templateContacts.instagram"
        ></span>
      </div>
    </header>

    <main class="container max-w-screen-lg m-auto">
      <!-- section1 -->
      <section>
        <div
          class="mx-auto mt-20 w-14 h-14 bg-primary rounded-full flex justify-center items-center"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 fill-current text-base-100"
          >
            <path
              d="M6.85357 3.85355L7.65355 3.05353C8.2981 2.40901 9.42858 1.96172 10.552 1.80125C11.1056 1.72217 11.6291 1.71725 12.0564 1.78124C12.4987 1.84748 12.7698 1.97696 12.8965 2.10357C13.0231 2.23018 13.1526 2.50125 13.2188 2.94357C13.2828 3.37086 13.2779 3.89439 13.1988 4.44801C13.0383 5.57139 12.591 6.70188 11.9464 7.34645L7.49999 11.7929L6.35354 10.6465C6.15827 10.4512 5.84169 10.4512 5.64643 10.6465C5.45117 10.8417 5.45117 11.1583 5.64643 11.3536L7.14644 12.8536C7.34171 13.0488 7.65829 13.0488 7.85355 12.8536L8.40073 12.3064L9.57124 14.2572C9.65046 14.3893 9.78608 14.4774 9.9389 14.4963C10.0917 14.5151 10.2447 14.4624 10.3535 14.3536L12.3535 12.3536C12.4648 12.2423 12.5172 12.0851 12.495 11.9293L12.0303 8.67679L12.6536 8.05355C13.509 7.19808 14.0117 5.82855 14.1887 4.58943C14.2784 3.9618 14.2891 3.33847 14.2078 2.79546C14.1287 2.26748 13.9519 1.74482 13.6035 1.39645C13.2552 1.04809 12.7325 0.871332 12.2045 0.792264C11.6615 0.710945 11.0382 0.721644 10.4105 0.8113C9.17143 0.988306 7.80189 1.491 6.94644 2.34642L6.32322 2.96968L3.07071 2.50504C2.91492 2.48278 2.75773 2.53517 2.64645 2.64646L0.646451 4.64645C0.537579 4.75533 0.484938 4.90829 0.50375 5.0611C0.522563 5.21391 0.61073 5.34954 0.742757 5.42876L2.69364 6.59928L2.14646 7.14645C2.0527 7.24022 2.00002 7.3674 2.00002 7.50001C2.00002 7.63261 2.0527 7.75979 2.14646 7.85356L3.64647 9.35356C3.84173 9.54883 4.15831 9.54883 4.35357 9.35356C4.54884 9.1583 4.54884 8.84172 4.35357 8.64646L3.20712 7.50001L3.85357 6.85356L6.85357 3.85355ZM10.0993 13.1936L9.12959 11.5775L11.1464 9.56067L11.4697 11.8232L10.0993 13.1936ZM3.42251 5.87041L5.43935 3.85356L3.17678 3.53034L1.80638 4.90074L3.42251 5.87041ZM2.35356 10.3535C2.54882 10.1583 2.54882 9.8417 2.35356 9.64644C2.1583 9.45118 1.84171 9.45118 1.64645 9.64644L0.646451 10.6464C0.451188 10.8417 0.451188 11.1583 0.646451 11.3535C0.841713 11.5488 1.1583 11.5488 1.35356 11.3535L2.35356 10.3535ZM3.85358 11.8536C4.04884 11.6583 4.04885 11.3417 3.85359 11.1465C3.65833 10.9512 3.34175 10.9512 3.14648 11.1465L1.14645 13.1464C0.95119 13.3417 0.951187 13.6583 1.14645 13.8535C1.34171 14.0488 1.65829 14.0488 1.85355 13.8536L3.85358 11.8536ZM5.35356 13.3535C5.54882 13.1583 5.54882 12.8417 5.35356 12.6464C5.1583 12.4512 4.84171 12.4512 4.64645 12.6464L3.64645 13.6464C3.45119 13.8417 3.45119 14.1583 3.64645 14.3535C3.84171 14.5488 4.1583 14.5488 4.35356 14.3535L5.35356 13.3535ZM9.49997 6.74881C10.1897 6.74881 10.7488 6.1897 10.7488 5.5C10.7488 4.8103 10.1897 4.25118 9.49997 4.25118C8.81026 4.25118 8.25115 4.8103 8.25115 5.5C8.25115 6.1897 8.81026 6.74881 9.49997 6.74881Z"
              fill="currentColor"
              fill-rule="evenodd"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>

        <div class="md:w-2/3 m-auto w-full">
          <h1
            class="m-auto text-center lg:text-5xl md:text-3xl text-xl line-clamp-2 font-bold mt-8 px-4"
          >
            {{ $MockTitle()[lang] }}
          </h1>
          <p
            class="text-base-content/50 line-clamp-2 w-2/3 m-auto lg:mt-8 mt-4 font-medium text-base"
          >
            {{ $MockContent()[lang] }}
          </p>

          <div
            class="m-auto lg:mt-8 mt-4 flex justify-center md:flex-row flex-col px-4"
          >
            <button
              class="btn bg-primary/10 text-primary/90 hover:bg-primary/10 hover:text-primary/90 border-0 rounded-full normal-case font-normal text-lg"
            >
              npm install -g sandocs
              <span class="material-symbols-outlined ml-4 !text-base">
                file_copy
              </span>
            </button>
            <button
              class="btn btn-primary rounded-full md:ml-4 mt-4 md:mt-0 normal-case font-normal text-lg"
            >
              Documention
              <span class="material-symbols-outlined ml-4 !text-base">
                arrow_right_alt
              </span>
            </button>
          </div>
        </div>
      </section>

      <!-- section2 -->
      <section
        class="grid md:grid-cols-3 grid-cols-1 m-auto mt-20 gap-x-8 gap-y-8 px-4"
      >
        <div v-for="item in 3" :key="item">
          <div
            class="w-11 h-11 bg-primary/10 rounded-full flex justify-center items-center"
          >
            <span class="material-symbols-outlined !text-primary !text-lg">
              code
            </span>
          </div>

          <h3 class="text-xl font-bold mt-4 line-clamp-1">
            {{ $MockTitle(3)[lang] }}
          </h3>
          <p class="line-clamp-3 mt-2 text-base-content/70">
            {{ $MockContent()[lang] }}
          </p>
        </div>
      </section>

      <!-- section3 -->
      <section class="flex mt-20 px-4 md:flex-row flex-col items-center">
        <div class="md:w-2/5 w-full space-y-4">
          <div>
            <span
              class="py-1 px-2 bg-primary/10 text-primary rounded-full text-sm uppercase"
              >{{ $MockJob()[lang] }}</span
            >
          </div>
          <h2 class="text-xl font-bold line-clamp-2">
            {{ $MockTitle()[lang] }}
          </h2>
          <p class="text-base-content/70 line-clamp-3">
            {{ $MockContent()[lang] }}
          </p>

          <p>
            <a
              href="javascript:;"
              class="inline-flex items-center capitalize text-primary/50 border-b border-primary/10 hover:border-primary"
            >
              {{ $MockKeywords()[lang].readMore }}

              <span class="material-symbols-outlined ml-2">
                arrow_right_alt
              </span>
            </a>
          </p>
        </div>

        <!-- code -->
        <div class="flex-1 md:pl-20 mt-8 md:mt-0">
          <!-- box -->
          <div class="shadow-xl rounded-md overflow-hidden">
            <!-- window -->
            <div class="h-5 bg-primary/10 p-4">
              <div class="h-full flex items-center space-x-2">
                <div class="bg-red-500 rounded-full w-3 h-3"></div>
                <div class="bg-yellow-500 rounded-full w-3 h-3"></div>
                <div class="bg-green-500 rounded-full w-3 h-3"></div>
              </div>
            </div>

            <!-- code content -->
            <div class="bg-base-100 md:p-10 p-8 text-sm md:text-base">
              <pre
                class="refractor language-js"
              ><code class="language-js"><span class="token comment">// import the plugin<!-- --></span>
<!-- --><span class="token keyword">const<!-- --></span> express <!-- --><span class="token operator">=<!-- --></span> <!-- --><span class="token function">require<!-- --></span><span class="token punctuation">(<!-- --></span><span class="token string">'express'<!-- --></span><span class="token punctuation">)<!-- --></span>
<!-- --><span class="token keyword">const<!-- --></span> app <!-- --><span class="token operator">=<!-- --></span> <!-- --><span class="token function">express<!-- --></span><span class="token punctuation">(<!-- --></span><span class="token punctuation">)<!-- --></span>

<!-- --><span class="token comment">// send a request to the server<!-- --></span>
app<!-- --><span class="token punctuation">.<!-- --></span><span class="token function">get<!-- --></span><span class="token punctuation">(<!-- --></span><span class="token string">'/'<!-- --></span><span class="token punctuation">,<!-- --></span> <!-- --><span class="token keyword">function<!-- --></span> <!-- --><span class="token punctuation">(<!-- --></span><span class="token parameter">req<!-- --><span class="token punctuation">,<!-- --></span> res<!-- --></span><span class="token punctuation">)<!-- --></span> <!-- --><span class="token punctuation">{<!-- --></span>
  res<!-- --><span class="token punctuation">.<!-- --></span><span class="token function">send<!-- --></span><span class="token punctuation">(<!-- --></span><span class="token string">'Hello World'<!-- --></span><span class="token punctuation">)<!-- --></span>
<!-- --><span class="token punctuation">}<!-- --></span><span class="token punctuation">)<!-- --></span>

<!-- --><span class="token comment">// boom! its done.<!-- --></span>
app<!-- --><span class="token punctuation">.<!-- --></span><span class="token function">listen<!-- --></span><span class="token punctuation">(<!-- --></span><span class="token number">3000<!-- --></span><span class="token punctuation">)<!-- --></span></code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- section4 -->
      <section class="mt-20 px-4">
        <h2 class="line-clamp-1 text-center text-xl font-bold">
          {{ $MockTitle()[lang] }}
        </h2>
        <p
          class="line-clamp-2 text-center md:w-3/5 w-full m-auto text-base-content/70 mt-4"
        >
          {{ $MockContent()[lang] }}
        </p>

        <div class="grid md:grid-cols-2 grid-cols-1 mt-10 lg:px-10 gap-10">
          <div v-for="item in 6" :key="item" class="flex">
            <div
              class="flex text-primary justify-center items-center bg-primary/10 w-11 h-11 rounded-full flex-shrink-0"
            >
              <span class="material-symbols-outlined"> history </span>
            </div>
            <div class="pl-5">
              <h3 class="text-lg font-bold">{{ $MockJob()[lang] }}</h3>
              <p class="text-base-content/70 line-clamp-3">
                {{ $MockContent()[lang] }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- section5 -->
      <section class="mt-20">
        <h2 class="line-clamp-1 text-center text-xl font-bold">
          {{ $MockTitle()[lang] }}
        </h2>
        <p
          class="line-clamp-2 text-center md:w-3/5 w-full m-auto text-base-content/70 mt-4"
        >
          {{ $MockContent()[lang] }}
        </p>

        <div
          class="lg:px-10 flex flex-wrap justify-center items-center gap-x-10 gap-y-5 mt-10"
        >
          <div class="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="120"
              height="60"
              fill-rule="evenodd"
            >
              <g
                transform="matrix(.06928 0 0 .06928 7.367398 13.505331)"
                fill="none"
              >
                <circle
                  r="50.167"
                  cy="237.628"
                  cx="269.529"
                  fill="#00d8ff"
                ></circle>
                <g stroke="#00d8ff" stroke-width="24">
                  <path
                    d="M269.53 135.628c67.356 0 129.928 9.665 177.107 25.907 56.844 19.57 91.794 49.233 91.794 76.093 0 27.99-37.04 59.503-98.083 79.728-46.15 15.29-106.88 23.272-170.818 23.272-65.554 0-127.63-7.492-174.3-23.44-59.046-20.182-94.61-52.103-94.61-79.56 0-26.642 33.37-56.076 89.415-75.616 47.355-16.51 111.472-26.384 179.486-26.384z"
                  ></path>
                  <path
                    d="M180.736 186.922c33.65-58.348 73.28-107.724 110.92-140.48C337.006 6.976 380.163-8.48 403.43 4.937c24.248 13.983 33.042 61.814 20.067 124.796-9.8 47.618-33.234 104.212-65.176 159.6-32.75 56.788-70.25 106.82-107.377 139.272-46.98 41.068-92.4 55.93-116.185 42.213-23.08-13.3-31.906-56.92-20.834-115.233 9.355-49.27 32.832-109.745 66.8-168.664z"
                  ></path>
                  <path
                    d="M180.82 289.482C147.075 231.2 124.1 172.195 114.51 123.227c-11.544-59-3.382-104.11 19.864-117.566 24.224-14.024 70.055 2.244 118.14 44.94 36.356 32.28 73.688 80.837 105.723 136.173 32.844 56.733 57.46 114.21 67.036 162.582 12.117 61.213 2.31 107.984-21.453 121.74-23.057 13.348-65.25-.784-110.24-39.5-38.013-32.71-78.682-83.253-112.76-142.115z"
                  ></path>
                </g>
              </g>
              <path
                d="M64.62 38.848l-4.26-6.436c2.153-.19 4.093-1.75 4.093-4.6 0-2.9-2.058-4.756-4.945-4.756h-6.34v15.78h1.964v-6.27h3.147l4.022 6.27zm-5.347-7.997h-4.14v-6.033h4.14c1.87 0 3.147 1.23 3.147 3.005s-1.278 3.03-3.147 3.03zm12.658 8.28c1.87 0 3.407-.615 4.543-1.75l-.852-1.16c-.9.923-2.224 1.443-3.525 1.443-2.46 0-3.975-1.798-4.117-3.95h9.25v-.45c0-3.43-2.035-6.128-5.49-6.128-3.265 0-5.63 2.674-5.63 5.986 0 3.573 2.437 6 5.82 6zm3.55-6.72h-7.5c.095-1.75 1.3-3.81 3.738-3.81 2.603 0 3.738 2.106 3.762 3.81zm13.534 6.436v-7.855c0-2.768-2.01-3.857-4.424-3.857-1.87 0-3.336.615-4.566 1.893l.828 1.23c1.017-1.088 2.13-1.585 3.502-1.585 1.656 0 2.887.875 2.887 2.413v2.058c-.923-1.065-2.224-1.562-3.786-1.562-1.94 0-4 1.207-4 3.762 0 2.484 2.058 3.786 4 3.786 1.538 0 2.84-.544 3.786-1.585v1.3zm-4.92-.994c-1.656 0-2.816-1.04-2.816-2.484 0-1.467 1.16-2.508 2.816-2.508 1.254 0 2.46.473 3.147 1.42v2.153c-.686.946-1.893 1.42-3.147 1.42zm13.5 1.278c2.082 0 3.312-.852 4.188-1.987l-1.183-1.088c-.757 1.017-1.727 1.49-2.9 1.49-2.437 0-3.95-1.893-3.95-4.424s1.514-4.4 3.95-4.4c1.183 0 2.153.45 2.9 1.49l1.183-1.088c-.875-1.136-2.106-1.987-4.188-1.987-3.407 0-5.702 2.603-5.702 5.986 0 3.407 2.295 6 5.702 6zm9.56 0c1.04 0 1.68-.308 2.13-.733l-.52-1.325c-.237.26-.7.473-1.207.473-.78 0-1.16-.615-1.16-1.467v-7.098h2.32V27.42h-2.32v-3.123h-1.775v3.123h-1.893v1.562h1.893v7.477c0 1.704.852 2.674 2.532 2.674z"
                fill="#00d8ff"
              ></path>
            </svg>
          </div>
          <div class="">
            <svg width="82" height="40" viewBox="0 0 148 90" class="text-black">
              <path
                d="M34.992 23.495h27.855v2.219H37.546v16.699h23.792v2.219H37.546v18.334h25.591v2.219H34.992v-41.69zm30.35 0h2.96l13.115 18.334 13.405-18.334L113.055.207 83.1 43.756l15.436 21.429H95.46L81.417 45.683 67.316 65.185h-3.018L79.85 43.756 65.343 23.495zm34.297 2.219v-2.219h31.742v2.219h-14.623v39.47h-2.554v-39.47H99.64zM.145 23.495h3.192l44.011 66.003L29.16 65.185 2.814 26.648l-.116 38.537H.145v-41.69zm130.98 38.801c-.523 0-.914-.405-.914-.928 0-.524.391-.929.913-.929.528 0 .913.405.913.929 0 .523-.385.928-.913.928zm2.508-2.443H135c.019.742.56 1.24 1.354 1.24.888 0 1.391-.535 1.391-1.539v-6.356h1.391v6.362c0 1.808-1.043 2.849-2.77 2.849-1.62 0-2.732-1.01-2.732-2.556zm7.322-.08h1.379c.118.853.95 1.395 2.149 1.395 1.117 0 1.937-.58 1.937-1.377 0-.685-.521-1.097-1.708-1.377l-1.155-.28c-1.62-.38-2.36-1.166-2.36-2.487 0-1.602 1.304-2.668 3.26-2.668 1.82 0 3.15 1.066 3.23 2.58h-1.354c-.13-.828-.85-1.346-1.894-1.346-1.1 0-1.832.53-1.832 1.34 0 .642.472 1.01 1.64 1.284l.987.243c1.838.43 2.596 1.178 2.596 2.53 0 1.72-1.33 2.799-3.453 2.799-1.987 0-3.323-1.029-3.422-2.637z"
                fill="currentColor"
                fill-rule="nonzero"
              ></path>
            </svg>
          </div>
          <div class="">
            <svg viewBox="0 0 248 31" class="w-auto h-5 text-slate-900">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z"
                fill="#38bdf8"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M76.546 12.825h-4.453v8.567c0 2.285 1.508 2.249 4.453 2.106v3.463c-5.962.714-8.332-.928-8.332-5.569v-8.567H64.91V9.112h3.304V4.318l3.879-1.143v5.937h4.453v3.713zM93.52 9.112h3.878v17.849h-3.878v-2.57c-1.365 1.891-3.484 3.034-6.285 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.285 2.999V9.112zm-5.674 14.636c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm16.016-17.313c-1.364 0-2.477-1.142-2.477-2.463a2.475 2.475 0 012.477-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.879v17.849h-3.879zm8.368 0V.9h3.878v26.06h-3.878zm29.053-17.849h4.094l-5.638 17.849h-3.807l-3.735-12.03-3.771 12.03h-3.806l-5.639-17.849h4.094l3.484 12.315 3.771-12.315h3.699l3.734 12.315 3.52-12.315zm8.906-2.677c-1.365 0-2.478-1.142-2.478-2.463a2.475 2.475 0 012.478-2.463 2.475 2.475 0 012.478 2.463c0 1.32-1.113 2.463-2.478 2.463zm-1.939 20.526V9.112h3.878v17.849h-3.878zm17.812-18.313c4.022 0 6.895 2.713 6.895 7.354V26.96h-3.878V16.394c0-2.713-1.58-4.14-4.022-4.14-2.55 0-4.561 1.499-4.561 5.14v9.567h-3.879V9.112h3.879v2.285c1.185-1.856 3.124-2.749 5.566-2.749zm25.282-6.675h3.879V26.96h-3.879v-2.57c-1.364 1.892-3.483 3.034-6.284 3.034-4.884 0-8.942-4.105-8.942-9.389 0-5.318 4.058-9.388 8.942-9.388 2.801 0 4.92 1.142 6.284 2.999V1.973zm-5.674 21.775c3.232 0 5.674-2.392 5.674-5.712s-2.442-5.711-5.674-5.711-5.674 2.392-5.674 5.711c0 3.32 2.442 5.712 5.674 5.712zm22.553 3.677c-5.423 0-9.481-4.105-9.481-9.389 0-5.318 4.058-9.388 9.481-9.388 3.519 0 6.572 1.82 8.008 4.605l-3.34 1.928c-.79-1.678-2.549-2.749-4.704-2.749-3.16 0-5.566 2.392-5.566 5.604 0 3.213 2.406 5.605 5.566 5.605 2.155 0 3.914-1.107 4.776-2.749l3.34 1.892c-1.508 2.82-4.561 4.64-8.08 4.64zm14.472-13.387c0 3.249 9.661 1.285 9.661 7.89 0 3.57-3.125 5.497-7.003 5.497-3.591 0-6.177-1.607-7.326-4.177l3.34-1.927c.574 1.606 2.011 2.57 3.986 2.57 1.724 0 3.052-.571 3.052-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.909-5.462 6.572-5.462 2.945 0 5.387 1.357 6.644 3.713l-3.268 1.82c-.647-1.392-1.904-2.035-3.376-2.035-1.401 0-2.622.607-2.622 1.892zm16.556 0c0 3.249 9.66 1.285 9.66 7.89 0 3.57-3.124 5.497-7.003 5.497-3.591 0-6.176-1.607-7.326-4.177l3.34-1.927c.575 1.606 2.011 2.57 3.986 2.57 1.724 0 3.053-.571 3.053-2 0-3.176-9.66-1.391-9.66-7.781 0-3.356 2.908-5.462 6.572-5.462 2.944 0 5.386 1.357 6.643 3.713l-3.268 1.82c-.646-1.392-1.903-2.035-3.375-2.035-1.401 0-2.622.607-2.622 1.892z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div class="">
            <svg
              viewBox="0 0 105 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              class="text-[#f03e2f]"
            >
              <title>Sanity</title>
              <path
                opacity="0.7"
                d="M78.1793 7.99261V21.0028H73.9031V10.2138L78.1793 7.99261Z"
                fill="currentColor"
              ></path>
              <path
                opacity="0.7"
                d="M20.9511 21.33L30.944 16.1051L29.7121 12.9141L23.1332 15.9821L20.9511 21.33Z"
                fill="currentColor"
              ></path>
              <path
                opacity="0.5"
                d="M73.9031 10.2027L84.7443 4.65477L82.9126 1.5571L73.9031 5.95997V10.2027Z"
                fill="currentColor"
              ></path>
              <path
                opacity="0.7"
                d="M43.3705 6.96233V21.0028H39.2927V1.00714L43.3705 6.96233Z"
                fill="currentColor"
              ></path>
              <path
                opacity="0.5"
                d="M27.1299 6.18617L20.9511 21.33L17.7731 18.5943L25.1353 1.00714L27.1299 6.18617Z"
                fill="currentColor"
              ></path>
              <path
                d="M25.1353 1.00714H29.3477L37.1386 21.0028H32.8269L25.1353 1.00714Z"
                fill="currentColor"
              ></path>
              <path
                d="M44.0012 1.00714L52.9824 14.6682V21.0028L39.2927 1.00714H44.0012Z"
                fill="currentColor"
              ></path>
              <path
                d="M64.9183 1.00714H60.6739V21.0063H64.9183V1.00714Z"
                fill="currentColor"
              ></path>
              <path
                d="M73.9031 4.65474H67.37V1.00714H82.5867L84.7443 4.65474H78.1793H73.9031Z"
                fill="currentColor"
              ></path>
              <path
                opacity="0.5"
                d="M97.2754 13.4153V21.0028H93.0629V13.4153"
                fill="currentColor"
              ></path>
              <path
                d="M93.0629 13.4152L100.191 1.00714H104.666L97.2754 13.4152H93.0629Z"
                fill="currentColor"
              ></path>
              <path
                opacity="0.7"
                d="M93.063 13.4152L85.7363 1.00714H90.3456L95.3092 9.51008L93.063 13.4152Z"
                fill="currentColor"
              ></path>
              <path
                d="M1.96126 3.31479C1.96126 6.09921 3.71145 7.75595 7.21536 8.62956L10.9283 9.47533C14.2444 10.2236 16.2639 12.0822 16.2639 15.1103C16.2897 16.4295 15.8531 17.7173 15.0274 18.7579C15.0274 15.7368 13.4367 14.1044 9.59972 13.1229L5.95409 12.3085C3.03475 11.6541 0.781478 10.1262 0.781478 6.83709C0.766123 5.56693 1.18116 4.32781 1.96126 3.31479"
                fill="currentColor"
              ></path>
              <path
                opacity="0.7"
                d="M52.9824 13.6415V1.00714H57.0602V21.0028H52.9824V13.6415Z"
                fill="currentColor"
              ></path>
              <path
                opacity="0.7"
                d="M12.7458 14.3689C14.3294 15.3643 15.0238 16.7565 15.0238 18.7544C13.713 20.4041 11.4101 21.33 8.70333 21.33C4.14718 21.33 0.958577 19.1268 0.25 15.2982H4.62547C5.18878 17.0559 6.68034 17.8703 8.67144 17.8703C11.1019 17.8703 12.7174 16.5964 12.7493 14.3619"
                fill="currentColor"
              ></path>
              <path
                opacity="0.7"
                d="M4.23567 7.44267C3.5125 7.02045 2.9192 6.41375 2.51873 5.68697C2.11827 4.96019 1.92558 4.14045 1.96113 3.31476C3.22594 1.67891 5.42608 0.679993 8.10804 0.679993C12.7492 0.679993 15.4347 3.08852 16.0972 6.47856H11.8883C11.4242 5.14203 10.2621 4.10136 8.14347 4.10136C5.87957 4.10136 4.33487 5.39611 4.24629 7.44267"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div class="">
            <svg
              width="100"
              height="64"
              viewBox="0 0 284 65"
              fill="currentColor"
              class="text-black"
            >
              <path
                d="M141.68 16.25c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm117.14-14.5c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm-39.03 3.5c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9v-46h9zM37.59.25l36.95 64H.64l36.95-64zm92.38 5l-27.71 48-27.71-48h10.39l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10v14.8h-9v-34h9v9.2c0-5.08 5.91-9.2 13.2-9.2z"
              ></path>
            </svg>
          </div>
        </div>
      </section>

      <footer
        class="flex flex-wrap px-4 text-base-content/70 items-center md:justify-between justify-center h-24 w-full border-t border-base-200 mt-20"
      >
        <span>© 2022 Sandocs. All rights reserved</span>
        <div class="space-x-4">
          <span v-for="item in 3" :key="item" class="cursor-pointer">{{
            $MockWord()[lang]
          }}</span>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup>
const lang = computed(() => useRoute().query.lang || "en");
</script>

<style lang="postcss" scoped>
.comment {
  @apply text-base-content/70;
}

.keyword {
  @apply text-info;
}

.punctuation {
  @apply text-base-content/80;
}

.function {
  @apply text-secondary;
}
</style>
