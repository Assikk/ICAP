<template>
  <div class="bg-[#0A7194] w-64 min-w-[12rem] flex justify-between flex-col gap-4 py-5 px-2 overflow-y-auto scrollbar">
    <div>
      <div class="flex justify-center">
        <img src="@/assets/img/logo.png" alt="Logo" />
      </div>
      <div class="mt-5">
        <div class="flex flex-col gap-2">
          <div v-for="page in pages" :key="page.id"
          v-show="$checkPermission(page.permissionId)">
            <div class="flex justify-between items-center gap-2 p-2 cursor-pointer rounded-md transition ease-linear"
            :class="$route.name == page.name ? 'bg-[#125B78]' : 'hover:bg-[#125B78]'"
            @click="changePage(page)">
              <div class="flex items-center gap-3">
                <svg width="24" height="24" fill="none" stroke="#BFDBFE" >
                  <use :xlink:href="page.icon"/>
                </svg>
                <p class="text-[#ECFDF5] text-sm font-medium">
                  {{page.title}}
                </p>
              </div>
              <svg v-if="page.child" width="24" height="24" fill="#A7F3D0" :class="page.isShowChild ? '-rotate-90' : 'rotate-180'">
                <use xlink:href="#arrow"/>
              </svg>
            </div>
            <div v-if="page.isShowChild" class="flex flex-col">
              <div v-for="item in page.child" :key="item.id"
              class="flex items-center gap-0.5 pl-3.5"
              @click="$router.push(item.link)">
                <svg v-if="$route.name == item.name" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8C12 9.06087 11.5786 10.0783 10.8284 10.8284C10.0783 11.5786 9.06087 12 8 12C6.93913 12 5.92172 11.5786 5.17157 10.8284C4.42143 10.0783 4 9.06087 4 8C4 6.93913 4.42143 5.92172 5.17157 5.17157C5.92172 4.42143 6.93913 4 8 4C9.06087 4 10.0783 4.42143 10.8284 5.17157C11.5786 5.92172 12 6.93913 12 8Z" fill="#93C5FD"/>
                </svg>
                <p class="p-2 text-sm font-medium cursor-pointer transition ease-linear"
                :class="$route.name == item.name ? 'text-[#93C5FD]' : 'text-[#ECFDF5] hover:text-[#93C5FD]'">
                  {{item.title}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex">
      <p class="flex cursor-pointer text-lg text-white font-semibold px-4"
      @click="show_logout(true)">
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
        <path d="M17.5 16L21.5 12M21.5 12L17.5 8M21.5 12L7.5 12M13.5 16V17C13.5 18.6569 12.1569 20 10.5 20H6.5C4.84315 20 3.5 18.6569 3.5 17V7C3.5 5.34315 4.84315 4 6.5 4H10.5C12.1569 4 13.5 5.34315 13.5 7V8" stroke="#A2F1FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
        <span class="px-2">Выход</span>
      </p>
    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
  name: 'AsideComponent',
  data() {
    return {
      pages: [
        {
          id: 1,
          title: 'Клиенты',
          link: '/',
          name: 'index',
          icon: '#clients',
          permissionId: 208
        },
        {
          id: 2,
          title: 'Пользователи',
          link: '/users',
          name: 'users',
          icon: '#users',
          permissionId: 196
        },
        {
          id: 3,
          title: 'Организации',
          link: '/organization',
          name: 'organization',
          icon: '#organization',
          permissionId: 192
        },
        {
          id: 4,
          title: 'Купоны',
          name: 'coupons',
          icon: '#coupons',
          isShowChild: false,
          permissionId: 184,
          child: [
            {
              id: 1,
              title: 'Купон-приглашения',
              link: '/coupons/invitations',
              name: 'coupons-invitations',
            },
            {
              id: 2,
              title: 'Вознаграждения',
              link: '/rewards',
              name: 'rewards'
            },
          ]
        },
        {
          id: 5,
          title: 'Отчеты',
          name: 'reports',
          icon: '#reports',
          permissionId: 208,
          isShowChild: false,
          child: [
            {
              id: 1,
              title: 'Отчетные формы',
              link: '/reports/form',
              name: 'reports-form',
            },
            {
              id: 2,
              title: 'Визуализация',
              link: '/reports/visualization',
              name: 'reports-visualization'
            },
          ]
        },
        {
          id: 6,
          title: 'Логирование',
          link: '/logs',
          name: 'logs',
          icon: '#logs',
          permissionId: 204
        },
        {
          id: 7,
          title: 'Справочники',
          name: 'references',
          icon: '#references',
          isShowChild: false,
          permissionId: 200,
          child: [
            {
              id: 1,
              title: 'Область',
              link: '/references/region',
              name: 'references-region',
            },
            {
              id: 2,
              title: 'Город',
              link: '/references/city',
              name: 'references-city'
            },
            {
              id: 3,
              title: 'Организация',
              link: '/references/organization',
              name: 'references-organization'
            },
            {
              id: 4,
              title: 'Клиенты',
              link: '/references/clients',
              name: 'references-clients'
            },
          ]
        },
        {
          id: 8,
          title: 'Роли',
          link: '/roles',
          name: 'roles',
          icon: '#settings',
          permissionId: 188
        }
      ]
    }
  },
  computed: {
    filtrPages() { /* Массив страниц, которые имеют подстраницы */
      return this.pages.filter((item) => item.child)
    }
  },
  methods: {
    ...mapMutations({
      show_logout: 'authorization/SHOW_LOGOUT'
    }),
    changePage(page) { /* Функция клика по странице */
      if(page.child) { /* Если страница имеет подстраницы то открываем подстраницы */
        page.isShowChild = !page.isShowChild
      } else {
        this.$router.push(page.link) /* Если страница не имеет подстраниц направляем на другую страницу */
        this.closeAllChild()
      }
    },
    checkChild() { /* Функция проверки имени роута с именами подстраниц */
      this.filtrPages.forEach((page) => { /* Проходимся под фильтрованному массиву */
        page.child.forEach((item) => { /* Проходимся по подстраницам страницы */
          if(this.$route.name.includes(item.name)) { /* Если находимся на странице подстраниц то открываем список подстраниц страницы */
            page.isShowChild = true
          }
        })
      })
    },
    closeAllChild() { /* Функция закрывает все подстраницы */
      this.filtrPages.forEach((page) => {
        page.isShowChild = false
      })
    },
  },
  mounted() {
    this.checkChild()
  }
}
</script>

<style>
.scrollbar::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  .scrollbar::-webkit-scrollbar-track {
    border-radius: 100vh;
    background: #0A7194;
  }

  .scrollbar::-webkit-scrollbar-thumb {
    background: #fff;
    border-radius: 100vh;
    border: 3px solid #0A7194;
  }

  .scrollbar::-webkit-scrollbar-thumb:hover {
    background: #fff;
  }
</style>
