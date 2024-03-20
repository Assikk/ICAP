<template>
  <div>
    <Header />
    <div class="py-6 px-16">
      <Tabs
        class="my-6 flex justify-between"
        :list="listTabs"
        :active="activeTab"
        @click="clickItem"
      />
      <div class="flex gap-4 justify-between items-center">
        <Table
          :head="clientsHead"
          :bodies="listTabs.list"
          :isLoading="false"
          :count="16"
          :isPagination="false"
        >
          <template #body>
            <tr v-for="title in titles" :key="title.id">
              <td
                class="flex hover:bg-[#F1F5F9] cursor-pointer"
                @click="changePage(title)"
              >
                <div class="flex justify-between w-full">
                  <div
                    class="flex justify-between w-full text-sm font-medium text-[#111827]"
                  >
                    <div>
                      {{ title.name }}
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M7.70938 15.2698C7.42228 14.9713 7.43159 14.4965 7.73017 14.2094L11.6679 10.5L7.73017 6.79062C7.43159 6.50353 7.42228 6.02875 7.70938 5.73017C7.99647 5.43159 8.47125 5.42228 8.76983 5.70937L13.2698 9.95937C13.4169 10.1008 13.5 10.296 13.5 10.5C13.5 10.704 13.4169 10.8992 13.2698 11.0406L8.76983 15.2906C8.47125 15.5777 7.99647 15.5684 7.70938 15.2698Z"
                          fill="#6B7280"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </Table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Header from '@/components/ui/header.vue'
import Tabs from '@/components/ui/tabs/default.vue'
import Button from '@/components/ui/buttons/default.vue'
import Table from '@/components/ui/table.vue'

export default {
  components: {
    Header,
    Tabs,
    Button,
    Table,
  },
  data() {
    return {
      pageChangeHandler: 1,
      listTabs: [
        {
          id: 1,
          name: 'Личная информация',
          list: [
            {
              id: 1,
              name: 'Биологический Пол',
              link: '/references/clients/bio-gender',
            },
            {
              id: 2,
              name: 'Гендер',
              link: '/references/clients/gender',
            },
            {
              id: 3,
              name: 'Предпочитаемый метод связи',
              link: '/references/clients/communication',
            },
          ],
        },
        {
          id: 2,
          name: 'Категория клиента',
          list: [
            {
              id: 1,
              name: 'Категория КГН',
              link: '/references/clients/categorykgn',
            },
            {
              id: 2,
              name: 'Рискованное поведение',
              link: '/references/clients/risk',
            },
            {
              id: 3,
              name: 'Вид наркотиков',
              link: '/references/clients/drug',
            },
            {
              id: 4,
              name: 'Преимущественный способ употребления',
              link: '/references/clients/uses',
            },
          ],
        },
        {
          id: 3,
          name: 'Скрининг',
          list: [
            {
              id: 1,
              name: 'Тип опросника',
              link: '/references/clients/questionnaire',
            },
            {
              id: 2,
              name: 'Активно употребляет наркотики',
              link: '/references/clients/active-uses',
            },
            {
              id: 3,
              name: 'Последняя дата тестирования на ВИЧ',
              link: '/references/clients/last-test',
            },
          ],
        },
        {
          id: 4,
          name: 'Тестирование на ВИЧ',
          list: [
            {
              id: 1,
              name: 'Результат экспресс-теста на ВИЧ',
              link: '/references/clients/test-result',
            },
            {
              id: 2,
              name: 'Результат подтверждающего теста на ВИЧ',
              link: '/references/clients/confirmation-result',
            },
            {
              id: 3,
              name: 'Причина отсутствия подтверждающего теста',
              link: '/references/clients/reason-absence',
            },
            {
              id: 4,
              name: 'Причины не взятия на АРТ',
              link: '/references/clients/reasons-taking',
            },
          ],
        },
        {
          id: 5,
          name: 'Профилактика',
          list: [
            {
              id: 1,
              name: 'Набор пррофилактических материалов',
              link: '/references/clients/pro-materials',
            },
            {
              id: 2,
              name: 'Участнику выданы ИОМ',
              link: '/references/clients/participant-iom',
            },
            {
              id: 3,
              name: 'Консультация по ДКП проведена?',
              link: '/references/clients/participant-offered',
            },
            {
              id: 4,
              name: 'Причины отказа',
              link: '/references/clients/resons-reject',
            },
            {
              id: 5,
              name: 'Когда участник состоял на ОЗТ',
              link: '/references/clients/attendance-periods',
            },
          ],
        },
        {
          id: 6,
          name: 'Купоны и Вознаграждения',
          list: [
            {
              id: 1,
              name: 'Причина невыдачи',
              link: '/references/clients/reason-issue',
            },
          ],
        },
      ],
      clientsHead: [
        {
          name: 'Название справочника',
        },
      ],
      // activeTab: 1,
      titles: [
        {
          id: 1,
          name: 'Биологический Пол',
          link: '/references/clients/bio-gender',
        },
        {
          id: 2,
          name: 'Гендер',
          link: '/references/clients/gender',
        },
        {
          id: 3,
          name: 'Предпочитаемый метод связи',
          link: '/references/clients/communication',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      // clients: (state) => state.api.clients,
      activeTab: (state) => state.activetab.activeTab,
    }),
  },
  methods: {
    ...mapMutations({
      change_activeTab: 'activetab/CHANGE_ACTIVETAB',
    }),
    changePage(item) {
      /* Функция клика по странице */
      this.$router.push(item.link)
    },

    clickItem(item) {
      this.change_activeTab(item.id)
      // this.activeTab = item.id;
      this.titles = item.list
    },
  },
  mounted() {
    // Your mounted logic here
  },
}
</script>
