<script setup>
import { useWordsStore } from './../stores/words'

const store = useWordsStore()
</script>

<template>
  <div class="settings">
    <h1>Settings page</h1>
    <form @submit.prevent="handleSubmit(store)">
      <div v-for="(pair, index) in pairs" :key="index">
        <label>
          Word:
          <input type="text" v-model="pair.word" required />
        </label>
        <label>
          Translation:
          <input type="text" v-model="pair.translation" required />
        </label>
        <button type="button" @click="removePair(index)" v-if="index > 0">Remove</button>
      </div>
      <button type="button" @click="addPair">Add Pair</button>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .settings {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<script>
export default {
  data() {
    return {
      pairs: [{ word: '', translation: '' }]
    }
  },
  mounted() {
    const store = useWordsStore();
    this.pairs = store.options;
  },
  methods: {
    addPair() {
      this.pairs.push({ word: '', translation: '' })
    },
    removePair(index) {
      this.pairs.splice(index, 1)
    },
    handleSubmit(store) {
      // Handle form submission
      console.log(this.pairs);
      store.setOptions(this.pairs);
      
    }
  }
}
</script>
