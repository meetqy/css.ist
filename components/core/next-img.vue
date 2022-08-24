<template>
  <div
    class="fixed top-16 w-screen h-screen"
    :style="{ left: styleLeft + 'px' }"
    :class="[
      {
        'z-[100] bg-base-100': position.status === 'target-to-full',
      },
      {
        'z-[100] bg-base-100/0': position.status === 'full-to-target',
      },
      {
        '-z-[100] bg-transparent': position.status === 'waiting',
      },
    ]"
  >
    <div
      class="absolute"
      :class="[
        {
          'transition-all ease-in duration-1000':
            position.status === 'target-to-full' ||
            position.status === 'full-to-target',
        },
      ]"
      :style="[
        `left:${position.left};top:${position.top};width:${position.width};height:${position.height}`,
      ]"
    >
      <img
        :src="nextImgProps?.src"
        class="object-contain m-auto h-full"
        :class="{ 'opacity-0': position.status === 'waiting' }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const position = reactive<{
  left: number;
  top: number;
  width: number;
  height: number;
  status: "target-to-full" | "full-to-target" | "waiting";
}>({
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  status: "waiting",
});

const styleLeft = ref(320);

watch(nextImgProps, (props) => {
  const ele = drawerSideElement.value;
  styleLeft.value = ele?.offsetWidth || 0 - (ele?.clientWidth || 0);

  if (props?.start) {
    position.left = props.start.left;
    position.top = props.start.top;
    position.width = props.start.width;
    position.height = props.start.height;

    setTimeout(() => {
      position.status = props.status;
    });
  }

  if (props?.end) {
    setTimeout(() => {
      position.left = props.end.left;
      position.top = props.end.top;
      position.width = props.end.width;
      position.height = props.end.height;
    });
  }

  if (props?.status === "full-to-target") {
    setTimeout(() => {
      position.status = "waiting";
    }, 2000);
  }
});
</script>

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
