<template>
  <div>
    <div class="filters-layout mb-3">
      <flag-text-field
        v-model="filters.inventory_number"
        :height="40"
        placeholder="inventory_number"
      />
    </div>
    <div class="d-flex">
      <flag-btn color="primary" @click="onApplyFilters"> Показать </flag-btn>
      <flag-btn @click="resetFilters"> Сброс </flag-btn>
    </div>
    <!-- eslint-disable vue/valid-v-slot  -->

    <general-list-page
      ref="generalListPage"
      :filters="filters"
      delete-confirm-text="Транспортное средство"
      :headers="headers"
      show-create
      show-edit
      :repository="$vehiclesRepository"
      @click-row="onClickVehicle"
    >
      <template #create-edit-sheet="{ editedItem, onSuccesDataUpdate }">
        <create-edit-sheet
          :item-id="editedItem"
          header-title="Транспортное средство"
          :repository="$vehiclesRepository"
          :get-default-item="defaultVehicle"
          @success-create="onSuccesDataUpdate"
          @success-edit="onSuccesDataUpdate"
        >
          <template #default="{ item }">
            <v-tabs v-model="tab" :height="35" class="mb-4" align-with-title>
              <v-tab>Информация</v-tab>
              <v-tab>Двигатель</v-tab>
              <v-tab>Распределение</v-tab>
              <v-tab>Паспорт</v-tab>
              <v-tab>Файлы</v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item>
                <form-item label="gov_number">
                  <flag-text-field
                    v-model="item.gov_number"
                    :height="40"
                    placeholder="gov_number"
                  />
                </form-item>

                <form-item label="year">
                  <flag-text-field
                    v-model="item.year"
                    :height="40"
                    placeholder="year"
                  />
                </form-item>

                <form-item label="inventory_number">
                  <flag-text-field
                    v-model="item.inventory_number"
                    :height="40"
                    placeholder="inventory_number"
                  />
                </form-item>

                <form-item label="fuel_type">
                  <flag-select
                    v-model="item.fuel_type"
                    is-server-items-load
                    :repository="$fuelTypesRepository"
                  />
                  <!-- <flag-text-field
                  v-model="item.inventory_number"
                  :height="40"
                  placeholder="inventory_number"
                /> -->
                </form-item>
              </v-tab-item>

              <v-tab-item>
                <form-item label="number">
                  <flag-text-field
                    v-model="item.engine.number"
                    :height="40"
                    placeholder="number"
                  />
                </form-item>
                <form-item label="model">
                  <flag-text-field
                    v-model="item.engine.model"
                    :height="40"
                    placeholder="model"
                  />
                </form-item>
                <form-item label="power">
                  <flag-text-field
                    v-model="item.engine.power"
                    :height="40"
                    placeholder="power"
                  />
                </form-item>
                <form-item label="capacity">
                  <flag-text-field
                    v-model="item.engine.capacity"
                    :height="40"
                    placeholder="capacity"
                  />
                </form-item>
              </v-tab-item>

              <v-tab-item> Распределение </v-tab-item>
              <v-tab-item> Паспорт </v-tab-item>

              <v-tab-item> Файлы </v-tab-item>
            </v-tabs-items>
          </template>
        </create-edit-sheet>
      </template>
    </general-list-page>
  </div>
</template>

<script>
import createEditSheet from '@/modules/CRUD/components/createEditSheet.vue'
import GeneralListPage from '@/modules/CRUD/components/GeneralListPage.vue'
import FormItem from '@/modules/CRUD/components/FormItem.vue'

const getDefaultFilters = () => ({
  inventory_number: '',
})
export default {
  components: {
    createEditSheet,
    GeneralListPage,
    FormItem,
  },

  data() {
    return {
      tab: null,
      filters: getDefaultFilters(),

      headers: [
        {
          text: 'Фото',
          value: 'avatar',
        },
        {
          text: 'Инвентарный номер',
          value: 'inventory_number',
        },
        {
          text: 'Номер гос регистрации',
          value: 'gov_number',
        },
        {
          text: 'Группа',
          value: 'group',
        },
        {
          text: 'Марка ТС',
          value: 'brand',
        },

        {
          text: 'Год выпуска',
          value: 'year',
        },
        {
          text: 'Счетчик',
          value: 'counter',
        },
      ],
      defaultVehicle: () => ({
        engine: {
          number: '',
          model: '',
          power: 1,
          capacity: '',
        },
        distribution: {},
        passport: {},
        inventory_number: '',
        year: '',
        gov_number: '',
        fuel_type: null,
      }),
    }
  },
  methods: {
    resetFilters() {
      this.filters = getDefaultFilters()
      this.$nextTick(() => {
        this.$refs.generalListPage.applyFilters()
      })
    },
    onApplyFilters() {
      this.$refs.generalListPage.applyFilters()
    },
    onClickVehicle() {
      console.log('onClickVehicle')
    },
  },
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  background: white;

  border-radius: 10px;
  padding: 10px 20px;
}

.filters-layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>
