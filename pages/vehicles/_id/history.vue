<template>
  <div>
    <!-- eslint-disable vue/valid-v-slot  -->

    <general-list-page
      ref="generalListPage"
      delete-confirm-text="Заправку"
      :headers="headers"
      show-create
      show-edit
      show-details
      :repository="customeFueling"
    >
      <template #create-edit-sheet="{ editedItem, onSuccesDataUpdate }">
        <create-edit-sheet
          :item-id="editedItem"
          header-title="Заправка"
          :repository="$fuelingRepository"
          :get-default-item="defaultVehicle"
          @success-create="onSuccesDataUpdate"
          @success-edit="onSuccesDataUpdate"
        >
          <template #default="{ item }">
            <form-item label="vehicle_id">
              <flag-select
                v-model="item.vehicle_id"
                item-text="inventory_number"
                is-server-items-load
                :repository="$vehiclesRepository"
              />
            </form-item>
            <form-item label="fuel_type">
              <flag-select
                v-model="item.fuel_type"
                is-server-items-load
                :repository="$fuelTypesRepository"
              />
            </form-item>

            <form-item label="counter">
              <flag-text-field
                v-model="item.counter.value"
                :height="40"
                placeholder="counter"
              />
            </form-item>

            <form-item label="price">
              <flag-text-field
                v-model="item.price"
                :height="40"
                placeholder="price"
              />
            </form-item>

            <form-item label="summ">
              <flag-text-field
                v-model="item.summ"
                :height="40"
                placeholder="summ"
              />
            </form-item>

            <form-item label="liters">
              <flag-text-field
                v-model="item.liters"
                :height="40"
                placeholder="liters"
              />
            </form-item>

            <form-item label="date">
              <flag-text-field
                v-model="item.date"
                :height="40"
                placeholder="date"
              />
            </form-item>
          </template>
        </create-edit-sheet>
      </template>

      <template #details-modal="{ item }">
        <div class="d-flex align-center">
          <img style="width: 70px" class="mr-3" :src="item.vehicle.avatar" />

          <div>
            <div class="d-flex justify-space-between">
              <div class="mr-2">Инвентарный номер</div>
              <div>
                {{ item.vehicle.inventory_number }}
              </div>
            </div>

            <div class="d-flex justify-space-between">
              <div class="mr-2">Бренд</div>
              <div>
                {{ item.vehicle.brand }}
              </div>
            </div>

            <div class="d-flex justify-space-between">
              <div class="mr-2">Гос. номер</div>
              <div>
                {{ item.vehicle.gov_number }}
              </div>
            </div>
          </div>
        </div>
        <div
          v-for="detail in detailsProps"
          :key="detail.label"
          class="d-flex justify-space-between"
        >
          <div class="mr-2">{{ detail.label }}</div>
          <div>
            {{ item[`${detail.value}`] }}
          </div>
        </div>

        <div class="d-flex justify-space-between">
          <div class="mr-2">Показания счетчика</div>
          <div>
            {{ item.counter.value }}
          </div>
        </div>

        <!-- {{ item }} -->
      </template>
    </general-list-page>
  </div>
</template>

<script>
import createEditSheet from '@/modules/CRUD/components/createEditSheet.vue'
import GeneralListPage from '@/modules/CRUD/components/GeneralListPage.vue'

import FormItem from '@/modules/CRUD/components/FormItem.vue'

const getDefaultFilters = () => ({
  vehicle: '',
  date_after: '',
  date_before: '',
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
      customeFueling: {
        ...this.$fuelingRepository,
        index: () => {
          return this.$fuelingRepository.index({
            vehicle: this.$route.params.id,
          })
        },
      },
      detailsProps: [
        {
          label: 'Обьем',
          value: 'liters',
        },
        {
          label: 'Тип топлива',
          value: 'fuel_type_name',
        },
        {
          label: 'Цена за единицу',
          value: 'price',
        },
        {
          label: 'Сумма',
          value: 'summ',
        },
        {
          label: 'Дата и время заправки',
          value: 'date',
        },
        {
          label: 'Дата и время создания записи',
          value: 'created_at',
        },
      ],

      headers: [
        {
          text: 'ТС',
          value: 'vehicle.inventory_number',
        },
        {
          text: 'Дата',
          value: 'date',
        },
        {
          text: 'Счетчик',
          value: 'counter.value',
        },
        {
          text: 'Километраж',
          value: 'vehicle.counter',
        },
        {
          text: 'обьем',
          value: 'liters',
        },

        {
          text: 'Стоимость',
          value: 'summ',
        },
      ],
      defaultVehicle: () => ({
        vehicle_id: null,
        counter: { value: null },
        fuel_type: null,
        price: null,
        summ: null,
        liters: null,
        date: null,
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
