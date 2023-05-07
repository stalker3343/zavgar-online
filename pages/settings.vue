<template>
  <div>
    <v-row>
      <v-col cols="3">
        <v-tabs vertical>
          <v-tab nuxt :to="{ name: 'settings-fuel-types' }">
            <!-- <v-icon left> mdi-account </v-icon> -->
            Типы топлива
          </v-tab>
          <!-- <v-tab nuxt>
        <v-icon left> mdi-lock </v-icon>
        Option 2
      </v-tab>
      <v-tab nuxt>
        <v-icon left> mdia-access-point </v-icon>
        Option 3
      </v-tab> -->
        </v-tabs>
      </v-col>
      <v-col cols="9">
        <nuxt-child />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
