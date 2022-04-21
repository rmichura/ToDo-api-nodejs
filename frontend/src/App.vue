<template>
  <v-app>
    <navigator-bar/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import NavigatorBar from "@/components/NavigatorBar";

export default {
  name: 'App',
  components: {NavigatorBar},
  data: () => ({
    //
  }),
}
</script>
