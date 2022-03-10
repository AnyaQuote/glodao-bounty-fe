<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <div class="position-relative">
        <v-sheet
          v-bind="attrs"
          v-on="on"
          outlined
          class="fill-width px-3 d-flex justify-space-between align-center"
          style="border: 1px solid rgba(0, 0, 0, 0.38)"
          height="40"
        >
          <div>Start time</div>
          <div><v-icon size="36">mdi-menu-down</v-icon></div>
        </v-sheet>
      </div>
    </template>
    <v-sheet outlined>
      <v-sheet class="d-flex align-center pa-4">
        <div class="ml-3 font-weight-600 text-uppercase">Time</div>
      </v-sheet>
      <v-divider></v-divider>
      <v-sheet class="d-flex justify-space-between pa-4 align-center">
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          :return-value.sync="date1"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-sheet
              v-bind="attrs"
              v-on="on"
              height="45"
              class="d-flex align-center justify-space-between pa-3"
              outlined
            >
              {{ date1 }}
              <div class="d-flex align-center justify-end ml-2">
                <v-icon> mdi-calendar-blank </v-icon>
              </div>
            </v-sheet>
          </template>
          <v-date-picker v-model="date1" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu1.save(date1)"> OK </v-btn>
          </v-date-picker>
        </v-menu>
        <v-icon>mdi-minus</v-icon>
        <v-menu
          ref="menu2"
          v-model="menu2"
          :close-on-content-click="false"
          :return-value.sync="date2"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-sheet
              v-bind="attrs"
              v-on="on"
              height="45"
              class="d-flex align-center justify-space-between pa-3"
              outlined
            >
              {{ date2 }}
              <div class="d-flex align-center justify-end ml-2">
                <v-icon> mdi-calendar-blank </v-icon>
              </div>
            </v-sheet>
          </template>
          <v-date-picker v-model="date2" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu2.save(date2)"> OK </v-btn>
          </v-date-picker>
        </v-menu>
      </v-sheet>
    </v-sheet>
  </v-menu>
</template>

<script lang="ts">
import { reaction } from 'mobx'
import { Observer } from 'mobx-vue'
import { Component, Vue, Ref, Provide, Prop } from 'vue-property-decorator'

@Observer
@Component({})
export default class DateRangePicker extends Vue {
  date1 = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)
  date2 = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)
  menu1 = false
  menu2 = false
  @Prop() startDate!: any
  @Prop() endDate!: any
  _disposers: any[] = []

  mounted() {
    this._disposers = [
      reaction(
        () => this.date1,
        () => {
          console.log(this.date1)

          this.startDate = this.date1
        }
      ),
      reaction(
        () => this.date2,
        () => {
          console.log(this.date2)

          this.endDate = this.date2
        }
      ),
    ]
  }

  beforeDestroy() {
    this._disposers.forEach((d) => d())
  }
}
</script>

<style scoped lang="scss"></style>
