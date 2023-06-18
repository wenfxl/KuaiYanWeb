<template>
  <div class="captcha"></div>
</template>

<script setup>
const props = defineProps({
  captchaConfig:Object
});
if(props.captchaConfig){
  window.initGeetest4(
      props.captchaConfig.config,
      props.captchaConfig.handler
  );
  console.log("极验初始化")
}
</script>
