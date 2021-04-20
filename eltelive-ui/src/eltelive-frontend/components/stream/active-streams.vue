<script src="flv.min.js"></script>
<template>
  <div>
    <div class="text-center pt-5 pb-5">
      <h1>Active Streams</h1>
    </div>
  </div>
</template>
<script>
export default {
  name: "active-stream",
  data() {
    return {
      streams: [],
      streamName: '',
      streamKey: '',
      streamTime: '',
    };
  },
  methods: {
  },
}
</script>
<style lang ="scss">

</style>
