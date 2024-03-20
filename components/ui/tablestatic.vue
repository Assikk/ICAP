<template>
  <div class="flex flex-col">
    <DeleteModal  @ondelete="ondelete(id)"  />
    <EditModal v-if="isRegion" @onClose="isRegion = false"/>
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div
        class="align-middle inline-block w-full shadow overflow-hidden border-b border-gray-200 overflow-x-auto rounded-md"
      >
        <table class="w-full bg-[#F9FAFB]">
          <thead>
            <tr>
              <th
                class="w-full text-xs font-semibold bg-[#F9FAFB] border-b border-gray-200 text-left leading-4 text-white tracking-wider h-10"
                v-for="title in titles"
              >
                <p class="text-[#6B7280] px-4">
                  {{ title }}
                </p>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <tr v-for="(title, i) in bodies" class="border-b border-gray-200">
              <td class="py-4" v-for="key in Object.values(keys)">
                <div class="flex items-center px-6">
                  <!-- <div class="ml-1 flex justify-between"> -->
                  <div class="text-sm leading-5 font-medium text-gray-900">
                    <p v-if="!Array.isArray(key)">
                      {{
                        key === "created_at"
                          ? $moment(title[key]).format("DD/MM/YYYY")
                          : key === "status" && title[key] === 1
                          ? "Активен"
                          : key === "status" && title[key] === 0
                          ? "Неактивен"
                          : key === "payment_type" && title[key] === "Bonus"
                          ? "Бонус"
                          : key === "payment_type" && title[key] === "Cash"
                          ? "Наличные"
                          : key === "gender" && title[key] === "M"
                          ? "М"
                          : key === "gender" && title[key] === "F"
                          ? "Ж"
                          : title[key]
                      }}
                    </p>
                    <p v-else>
                      {{
                        !title[key[0]][key[1]]
                          ? `${title[key[0]]} ${title[key[1]]}`
                          : title[key[0]][key[1]]
                      }}
                    </p>
                    <!-- </div> -->
                  </div>
                </div>
              </td>
              <td class="flex py-4 w-16" :class="icon ? 'table-icon' : ''">
                <!-- <nuxt-link
                  v-if="isIcon"
                  :to="`${$route.path}${path}/${title.id}`"
                  class="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline flex"
                > -->
                <div
                  class="flex flex-end pr-4 cursor-pointer"
                  v-if="isIcon"
                  @click="isRegion = true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M16.8898 3.11019L17.4201 2.57986V2.57986L16.8898 3.11019ZM5.41667 17.5296V18.2796C5.61558 18.2796 5.80634 18.2005 5.947 18.0599L5.41667 17.5296ZM2.5 17.5296H1.75C1.75 17.9438 2.08579 18.2796 2.5 18.2796V17.5296ZM2.5 14.5537L1.96967 14.0233C1.82902 14.164 1.75 14.3548 1.75 14.5537H2.5ZM14.4738 3.64052C14.9945 3.11983 15.8387 3.11983 16.3594 3.64052L17.4201 2.57986C16.3136 1.47338 14.5196 1.47338 13.4132 2.57986L14.4738 3.64052ZM16.3594 3.64052C16.8801 4.16122 16.8801 5.00544 16.3594 5.52614L17.4201 6.5868C18.5266 5.48032 18.5266 3.68635 17.4201 2.57986L16.3594 3.64052ZM16.3594 5.52614L4.88634 16.9992L5.947 18.0599L17.4201 6.5868L16.3594 5.52614ZM5.41667 16.7796H2.5V18.2796H5.41667V16.7796ZM13.4132 2.57986L1.96967 14.0233L3.03033 15.084L14.4738 3.64052L13.4132 2.57986ZM1.75 14.5537V17.5296H3.25V14.5537H1.75ZM12.1632 4.89052L15.1094 7.8368L16.1701 6.77614L13.2238 3.82986L12.1632 4.89052Z"
                      fill="#6B7280"
                    />
                  </svg>
                </div>
                <!-- </nuxt-link> -->
                <div
                  class="text-indigo-600 hover:text-indigo-900 focus:outline-none focus:underline flex cursor-pointer"
                  v-if="isIcon"
                  @click="set_modal(true), (id = title.id)"
                >
                  <img src="/img/delete.svg" alt="Delete" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: ["bodies", "titles", "isIcon", "keys", "path", "deleted", "icon"],

  computed: {
    ...mapState({
      isDelete: (state) => state.api.isDelete,
    }),
  },
  data() {
    return {
      id: null,
      isRegion: false,
    };
  },
  methods: {
    ...mapMutations({
      set_modal: "api/SET_MODAL",
    }),
    async ondelete(id){
      await this.$axios.delete(`${this.deleted}/${id}`).then(() =>{
        window.location.reload();
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.table-icon {
  display: none;
}
</style>
