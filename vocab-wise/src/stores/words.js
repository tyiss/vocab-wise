//import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useWordsStore = defineStore('words', {
    state: () => ({options: [], quiz: []}),
    getters: {}
    ,
    actions: {
      setOptions(options) {
        this.options = options
      }
    },
})