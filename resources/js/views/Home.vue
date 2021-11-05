<template>
  <div>
    <Carousel
      v-model="value3"
      :autoplay="setting.autoplay"
      :autoplay-speed="setting.autoplaySpeed"
      :dots="setting.dots"
      :radius-dot="setting.radiusDot"
      :trigger="setting.trigger"
      :arrow="setting.arrow"
    >
      <CarouselItem>
        <div class="demo-carousel">
          <img
            src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"
            alt=""
            srcset=""
            height="350px"
          />
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">
          <img
            src="https://images.unsplash.com/photo-1612151855475-877969f4a6cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGQlMjBpbWFnZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
            alt=""
            srcset=""
            height="350px"
          />
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">
          <img
            src="https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300"
            alt=""
            srcset=""
            height="350px"
          />
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">
          <img
            src="https://images.unsplash.com/photo-1612151855475-877969f4a6cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aGQlMjBpbWFnZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
            alt=""
            srcset=""
            height="350px"
          />
        </div>
      </CarouselItem>
    </Carousel>
    <br />
    <Button @click="instance('info')">Info</Button>
    <Button @click="instance('success')">Success</Button>
    <Button @click="instance('warning')">Warning</Button>
    <Button @click="instance('error')">Error</Button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value3: 0,
      setting: {
        autoplay: true,
        autoplaySpeed: 5000,
        dots: "inside",
        radiusDot: false,
        trigger: "hover",
        arrow: "hover",
      },
    };
  },
  methods: {
    instance(type) {
      const title = "Title";
      const content = "<p>Content of dialog</p><p>Content of dialog</p>";
      switch (type) {
        case "info":
          this.$Modal.info({
            title: title,
            content: content,
          });
          break;
        case "success":
          this.$Modal.success({
            title: title,
            content: content,
          });
          break;
        case "warning":
          this.$Modal.warning({
            title: title,
            content: content,
          });
          break;
        case "error":
          this.$Modal.error({
            title: title,
            content: content,
          });
          break;
      }
    },
  },
};
</script>
