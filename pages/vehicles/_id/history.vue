<template>
  <div>
    <!-- eslint-disable vue/valid-v-slot  -->

    <general-list-page
      ref="generalListPage"
      delete-confirm-text="Запись"
      :headers="headers"
      :show-delete="false"
      :repository="customeFueling"
    />
  </div>
</template>

<script>
import GeneralListPage from '@/modules/CRUD/components/GeneralListPage.vue'

export default {
  components: {
    GeneralListPage,
  },

  data() {
    return {
      customeFueling: {
        ...this.$vehiclesRepository,
        index: () => {
          return this.$vehiclesRepository.history(this.$route.params.id)
        },
      },

      headers: [
        {
          text: 'verbose_name',
          value: 'verbose_name',
        },
        {
          text: 'content_type',
          value: 'content_type',
        },
        {
          text: 'field',
          value: 'field',
        },
        {
          text: 'value',
          value: 'value',
        },
        {
          text: 'created_at',
          value: 'created_at',
        },
      ],
    }
  },
}
</script>
