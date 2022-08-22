<template>
  <div
    class="fixed top-16 left-80 w-screen h-screen transition-colors duration-500 ease-in"
    :class="nextImgTarget ? 'z-[100] bg-base-100' : '-z-[100] bg-transparent'"
  >
    <div
      v-if="nextImgTarget && nextImgWrapper"
      class="absolute ease-in duration-1000"
      :class="nextImgReverse ? 'an-reverse' : 'an'"
      :style="[
        `left:${nextImgTarget.offsetLeft - nextImgWrapper.scrollLeft}px;top:${
          nextImgTarget.offsetTop - nextImgWrapper.scrollTop
        }px;width:${nextImgTarget.clientWidth}px;height:${
          nextImgTarget.clientHeight
        }px`,
      ]"
    >
      <img :src="nextImgTarget.src" class="object-contain m-auto h-full" />
    </div>
  </div>
</template>

<style scoped>
.an {
  animation: d 1s forwards ease-in alternate;
}

.an-reverse {
  animation: d-r 1s forwards ease-in alternate;
}

@keyframes d-r {
  from {
    left: 0;
    top: 0;
    width: calc(100% - 320px);
    height: calc(100% - 64px);
  }
}

@keyframes d {
  to {
    left: 0;
    top: 0;
    width: calc(100% - 320px);
    height: calc(100% - 64px);
  }
}
</style>
