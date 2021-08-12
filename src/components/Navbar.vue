<template>
  <t-dropdown
    tag-name="nav"
    :classes="{}"
    :fixed-classes="{}"
    class="bg-blue-800"
  >
    <div
      slot="trigger"
      slot-scope="{
        mousedownHandler,
        focusHandler,
        blurHandler,
        keydownHandler,
        isShown,
      }"
      class="px-4 max-w-7xl sm:px-6 lg:px-8"
    >
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex items-center mr-2 -ml-2 sm:hidden">
            <!-- Mobile menu button -->
            <button
              class="
                inline-flex
                items-center
                justify-center
                p-2
                text-blue-400
                transition
                duration-150
                ease-in-out
                rounded-md
                hover:text-white hover:bg-blue-700
                focus:outline-none focus:bg-blue-700 focus:text-white
              "
              aria-label="Main menu"
              aria-expanded="false"
              @mousedown="mousedownHandler"
              @blur="blurHandler"
              @keydown="keydownHandler"
            >
              <svg
                :class="{ hidden: isShown, block: !isShown }"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                :class="{ hidden: !isShown, block: isShown }"
                class="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div class="flex items-center flex-shrink-0 text-white">Мониторинг валюты</div>
          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <a
              href="#"
              class="
                px-3
                py-2
                text-sm
                font-medium
                leading-5
                text-white
                transition
                duration-150
                ease-in-out
                bg-blue-900
                rounded-md
                focus:outline-none focus:text-white focus:bg-blue-700
              "
              >Валюты</a
            >
          </div>
        </div>
      </div>
    </div>

    <div class="sm:hidden">
      <div class="px-2 pt-2 pb-3 sm:px-3">
        <a
          href="#"
          class="
            block
            px-3
            py-2
            text-base
            font-medium
            text-white
            transition
            duration-150
            ease-in-out
            bg-blue-900
            rounded-md
            focus:outline-none focus:text-white focus:bg-blue-700
          "
          >Валюты</a>
      </div>
    </div>
  </t-dropdown>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped></style>
