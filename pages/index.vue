<template>
  <div>
    <v-progress-linear v-if="$fetchState.pending" indeterminate />

    <v-alert v-else-if="$fetchState.error" type="error">
      Ошибка: {{ $fetchState.error.message }}
    </v-alert>

    <div v-else>
      <v-row>
        <v-col cols="3">
          <v-card>
            <v-card-subtitle> Количество ТС</v-card-subtitle>
            <v-card-title>{{ res.vehicles.count }}</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="9">
          <v-card>
            <v-card-subtitle> Проблемы</v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col style="color: #ffbd68">
                  <div style="color: #ffbd68" class="flagman-h3-bold">
                    Открытые
                  </div>

                  {{ res.issues.open }}
                </v-col>
                <v-col>
                  <div class="red--text">
                    <div class="red--text flagman-h3-bold">Просроченные</div>
                    <div>
                      {{ res.issues.overdue }}
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <chart-vehikle-date
            header="Общий пробег по автопарку"
            :repository="$dashboardRepository.millage"
          />
        </v-col>
        <v-col>
          <chart-vehikle-date
            header="Стоимость километра пути"
            :repository="$dashboardRepository.kilometer"
          />
        </v-col>
        <v-col>
          <chart-vehikle-date
            header="Затраты на топливо"
            :repository="$dashboardRepository.millage"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <chart-vehikle-date
            header="Доп расходы"
            :repository="$dashboardRepository.expenses"
          />
        </v-col>
        <v-col>
          <chart-vehikle-date
            header="Затраты на сервис"
            :repository="$dashboardRepository.services"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <chart-vehikle-date
            header="Топ ТС по пробегу"
            :repository="$dashboardRepository.counter"
          />
        </v-col>
        <v-col>
          <chart-vehikle-date
            header="Топ ТС по тратам на топливо"
            :repository="$dashboardRepository.fueling"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import ChartVehikleDate from '~/components/ChartVehikleDate.vue'
export default {
  components: {
    ChartVehikleDate,
  },
  data() {
    return {
      res: null,
    }
  },
  async fetch() {
    const [issues, vehicles] = await Promise.all([
      this.$dashboardRepository.issues(),
      this.$dashboardRepository.vehicles(),
    ])
    this.res = {
      issues,
      vehicles,
    }
  },
}
</script>

<style></style>
