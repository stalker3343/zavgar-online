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
      show-details
      :repository="$vehiclesRepository"
      @details-click="
        $router.push({ name: 'vehicles-id', params: { id: $event.id } })
      "
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
              <v-tab>Даты</v-tab>
              <v-tab>Словари</v-tab>

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

                <form-item
                  v-for="setting in stringSettings"
                  :key="setting.value"
                  :label="setting.title"
                >
                  <flag-text-field
                    v-model="item[setting.value]"
                    :height="40"
                    :placeholder="setting.title"
                  />
                </form-item>
              </v-tab-item>
              <v-tab-item>
                <form-item
                  v-for="setting in dateSettings"
                  :key="setting.value"
                  :label="setting.title"
                >
                  <date-picker
                    v-model="item[setting.value]"
                    :placeholder="setting.title"
                  />
                </form-item>
              </v-tab-item>

              <v-tab-item>
                <form-item
                  v-for="setting in dictionarySettings"
                  :key="setting.value"
                  :label="setting.title"
                >
                  <flag-select
                    v-model="item[setting.value]"
                    is-server-items-load
                    is-repository-function
                    :repository="$vehiclesDictionaryRepository[setting.value]"
                  />

                  <!-- <date-picker
                    v-model="item[setting.value]"
                    :placeholder="setting.title"
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
import DatePicker from '@/components/filters/DatePicker.vue'

import FormItem from '@/modules/CRUD/components/FormItem.vue'

const getDefaultFilters = () => ({
  inventory_number: '',
})
export default {
  components: {
    createEditSheet,
    GeneralListPage,
    FormItem,
    DatePicker,
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

      stringSettings: [
        {
          title: 'Номер Шасси',
          value: 'chass_number',
        },
        {
          title: 'Номер Кузова',
          value: 'body_number',
        },
        {
          title: 'Балансовая стоимость',
          value: 'cost',
        },
        {
          title: 'Номер Фондового извещения',
          value: 'source_number',
        },
        {
          title: 'Месячная норма пробега',
          value: 'mileage_rate',
        },
        {
          title: 'Норма расхода топлива на 100 км',
          value: 'fuel_rate',
        },
        {
          title: 'Идентификационный номер',
          value: 'id_number',
        },
        {
          title: 'Базовая норма расхода топлива',
          value: 'base_rate',
        },
      ],
      dateSettings: [
        {
          title: 'Дата действия страхавого полиса',
          value: 'trust_date',
        },
        {
          title: 'Дата действия технического осмотра',
          value: 'to_date',
        },
        {
          title: 'Дата выдачи номерного знака',
          value: 'sign_date',
        },
        {
          title: 'Дата ввода в эксплутацию',
          value: 'exploitation_date',
        },
        {
          title: 'Дата документа',
          value: 'source_date',
        },
        {
          title: 'Дата передачи в подразделение',
          value: 'transfer_date',
        },
        {
          title: 'Дата списания',
          value: 'del_date',
        },
      ],
      dictionarySettings: [
        {
          title: 'Склад',
          value: 'warehouse',
        },
        {
          title: 'Источник получения',
          value: 'source',
        },
        {
          title: 'Служба эксплутации',
          value: 'service',
        },
        {
          title: 'Цвет автомобиля',
          value: 'color',
        },
        {
          title: 'Класс автомобиля',
          value: 'vehicle_class',
        },
        {
          title: 'Штатная группа',
          value: 'group',
        },
        {
          title: 'Марка',
          value: 'brand',
        },
        {
          title: 'Завод-Изготовитель',
          value: 'manufacturer',
        },
        {
          title: 'Тип транспорта',
          value: 'type',
        },
      ],

      // identifier_fuel_rate	integer
      // title: Инд. процент баз. нормы расхода топлива
      // maximum: 999

      // category	string
      // title: Категория автомобиля
      //  Enum:
      // Array [ 4 ]

      // body	integer
      // title: Тип Кузова

      // subdivision	integer
      // title: Подразделение-владелец транспорта

      // climate_control	boolean
      // title: Наличие системы Климат контроль

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

        chass_number: '',
        body_number: '',
        cost: '',
        source_number: '',
        mileage_rate: '',
        id_number: '',
        base_rate: '',
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
