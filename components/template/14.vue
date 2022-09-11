<template>
  <div class="w-screen h-screen overflow-y-auto">
    <div class="m-auto max-w-5xl py-16 px-2 flex">
      <div class="w-2/3">
        <div
          v-for="(item, i) in $MockList(3, '/600/200')[lang]"
          :key="i"
          class="post"
        >
          <div class="post_image">
            <img v-lazy="vLazy(item.image)" alt="Image 01" /><span class="date">
              June 22, 2048
            </span>
          </div>
          <h2>Free CSS Templates</h2>
          <p>
            Ut sed lorem ac ante cursus auctor. Nam ut congue velit. Cras eget
            fermentum sem. Maecenas nec purus lorem, a sodales lectus. Etiam
            consequat nulla sit amet nisl volutpat ornare. Donec purus nulla,
            egestas ac porttitor et, pharetra nec felis. Donec lobortis
            fringilla blandit. Validate
            <a href="http://validator.w3.org/check?uri=referer" rel="nofollow"
              ><strong>XHTML</strong></a
            >
            &amp;
            <a
              href="http://jigsaw.w3.org/css-validator/check/referer"
              rel="nofollow"
              ><strong>CSS</strong></a
            >.
          </p>
          <a href="blog_post.html">Continue reading...</a>
        </div>

        <div class="pagging">
          <ul>
            <li>
              <a href="http://www.templatemo.com" target="_parent">Previous</a>
            </li>
            <li>
              <a href="http://www.templatemo.com/page/1" target="_parent">1</a>
            </li>
            <li>
              <a href="http://www.templatemo.com/page/2" target="_parent">2</a>
            </li>
            <li>
              <a href="http://www.templatemo.com/page/3" target="_parent">3</a>
            </li>
            <li>
              <a href="http://www.templatemo.com/page/4" target="_parent">4</a>
            </li>
            <li>
              <a href="http://www.templatemo.com/page/5" target="_parent">5</a>
            </li>
            <li>
              <a href="http://www.templatemo.com/page/6" target="_parent">6</a>
            </li>
            <li>
              <a href="http://www.templatemo.com/page/7" target="_parent"
                >Next</a
              >
            </li>
          </ul>
        </div>
      </div>
      <!-- END of content -->

      <div id="sidebar" class="flex-1">
        <h3>Services</h3>
        <ul class="templatemo_list">
          <li>Augue felis pharetra felis sed</li>
          <li>Condimentum vulputate augue</li>
          <li>Dolor vel condimentum nisl</li>
          <li>Felis pharetra felis sed</li>
          <li>Integer placerat dolor vel</li>
          <li>Tortor mi in massa donec</li>
          <li>Vulputate tortor mi in massa</li>
        </ul>

        <div class="cleaner h50"></div>

        <h3>Popular Posts</h3>
        <ul class="popular_post">
          <li>
            <a href="#">Donec eu orci dolor</a>Pellentesque in nunc quam. Sed
            molestie ultricies ante, vel scelerisque diam varius sed.
          </li>
          <li>
            <a href="#">Aliquam bibendum vulputate</a>Auris nisl mi, aliquet ac
            lobortis ut, tincidunt in tortor vitae lectus dapibus pellentesque.
          </li>
          <li>
            <a href="http://cn.forwallpaper.com">Curabitur rutrum vestibulum</a
            >Nunc viverra vestibulum magna, nec dignissim turpis tincidunt.
            Donec ac nibh arcu.
          </li>
          <li>
            <a href="#">Fusce placerat ultrices</a>Integer ac ultricies nisi.
            Curabitur velit ante, porttitor ac feugiat a, porta ut lectus.
          </li>
        </ul>
      </div>
      <!-- END of sidebar -->
    </div>
  </div>
</template>

<script setup>
const lang = computed(() => useRoute().query.lang || "en");
</script>
