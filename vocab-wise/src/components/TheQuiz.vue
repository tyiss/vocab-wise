<script setup>
import { useWordsStore } from './../stores/words'

const store = useWordsStore()
</script>

<template>
  <div class="quiz">
    <h1>Quiz page</h1>
    <form @submit.prevent="handleSubmit()">
        <ul>
          <li v-for="(slot, index) in slots" :key="index">
            {{ store.options[slot.itemIndex].word }}
            <input type="text" v-model="slots[index].value"/>
            <span v-if="slots[index].showCorrent" class="checkmark">V</span>
            <span v-if="slots[index].showWrong" class="x-mark">X</span>
            <button type="check" @click.prevent="checkTranslationOf(slot, index)">Check</button>
          </li>
      </ul>  
      <button type="submit">Submit</button>
    </form>
    <div>
      {{result}}
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .quiz {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
  .checkmark, .x-mark {
    font-size: 16px;
    width: 20px;
    height: 20px;
    line-height: 16px;
    text-align: center;
  }

  .checkmark {
    color: green;
  }

  .x-mark {
    color: red;
  }
}
</style>
<script>
export default {
  data() {
    const store = useWordsStore()
    const optionsLen = store.options.length

    return { 
      result: "",
      slots: [{
        itemIndex: Math.floor(Math.random() * optionsLen),
        showCorrent: false,
        showWrong: false,
        value: '',
      },{
        itemIndex: Math.floor(Math.random() * optionsLen),
        showCorrent: false,
        showWrong: false,
        value: '',
      },{
        itemIndex: Math.floor(Math.random() * optionsLen),
        showCorrent: false,
        showWrong: false,
        value: '',
      },{
        itemIndex: Math.floor(Math.random() * optionsLen),
        showCorrent: false,
        showWrong: false,
        value: '',
      },{
        itemIndex: Math.floor(Math.random() * optionsLen),
        showCorrent: false,
        showWrong: false,
        value: '',
      }]
      ,
    }
  },
  mounted() {    
    

  },
  methods: {
    addPair() {
      this.pairs.push({ word: '', translation: '' })
    },
    removePair(index) {
      this.pairs.splice(index, 1)
    },
    highlight(slot, correct) {
      slot.showCorrent = correct
      slot.showWrong = !correct
      setTimeout( () => {
        slot.showCorrent = false
        slot.showWrong = false
      }, 3000)
    },
    checkTranslationOf(slot) {
      const store = useWordsStore()
      const opt = store.options[slot.itemIndex]

      if(slot.value === opt.translation) {
        this.highlight(slot, true)
        // slot.showCorrent = true
        // slot.showWrong = false
        // setTimeout( () => {
        //   slot.showCorrent = false
        //   slot.showWrong = false
        // }, 3000)
      } else {
        this.highlight(slot, false)
        // slot.showWrong = true
        // slot.showCorrent = false
      // setTimeout( () => {
      //   slot.showCorrent = false
      //   slot.showWrong = false
      // }, 3000)
      }
    },

    handleSubmit() {
      const store = useWordsStore()
      
      let correntAnswers = 0
      this.slots.forEach( slot => {
        const opt = store.options[slot.itemIndex]
        console.log("slot: " , slot.value, " translation: ", opt.translation)
        if(slot.value === opt.translation) {
          correntAnswers++;
        }
      });

      this.result = correntAnswers + "/" + this.slots.length      
    }
  }
}
</script>
