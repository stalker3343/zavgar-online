<template>
  <div>
    <v-row>
      <!-- <v-icon left> mdi-account </v-icon> -->
      <v-col cols="3">
        <v-tabs vertical>
          <v-tab nuxt :to="{ name: 'settings' }"> Типы топлива </v-tab>
          <!-- /api/vehicles/brands/ -->
          <v-tab nuxt :to="{ name: 'settings-brands' }"> марки ТС </v-tab>

          <!-- /api/vehicles/groups/ -->
          <v-tab nuxt :to="{ name: 'settings-groups' }">Штатные группы </v-tab>

          <v-tab nuxt :to="{ name: 'settings-expenses' }">Типы расходов </v-tab>

          <!-- /api/vehicles/types/ -->
          <v-tab nuxt :to="{ name: 'inspire' }"> Типы </v-tab>
          <!-- /api/vehicles/manufacturers/ -->
          <v-tab nuxt :to="{ name: 'inspire' }"> завод изготовитель </v-tab>

          <!-- /api/vehicles/sources/ -->
          <v-tab nuxt :to="{ name: 'inspire' }"> Организ. выдавш. наряд </v-tab>
          <!-- /api/vehicles/warehouses/ -->
          <v-tab nuxt :to="{ name: 'inspire' }"> Склады </v-tab>
          <!-- /api/vehicles/bodies/ -->
          <v-tab nuxt :to="{ name: 'inspire' }"> Типы кузова </v-tab>
          <!-- /api/vehicles/classes/ -->
          <v-tab nuxt :to="{ name: 'inspire' }"> Классы ТС </v-tab>

          <!-- /api/vehicles/colors/-->
          <v-tab nuxt :to="{ name: 'inspire' }"> Цвета ТС </v-tab>

          <!-- /api/vehicles/services/ -->
          <v-tab nuxt :to="{ name: 'inspire' }"> Службы эксп. ТС </v-tab>
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
