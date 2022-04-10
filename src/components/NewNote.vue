<template>
  <div class="new-note">
    <label>Title</label>
    <input type="text" v-model="note.title">
    <label>Description</label>
    <textarea name="new-note" id="new-note" cols="30" rows="10" v-model="note.descr"></textarea>

    <div class="priority">
      <span>Select priority: </span>
      <select v-model="selectedPriority" class="priority_option">
        <option v-for="(option, index) in priority" :key="index">{{ option }}</option>
      </select>
    </div>

    <button @click="addNote" class="btn btnPrimary">Add note</button>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true
    },
    priority: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      selectedPriority:''
    }
  },

  created() {
    this.selectedPriority = this.priority[0]
  },

  methods: {
    addNote() {
      this.$emit('addNote', this.note)
    },
  },
  watch: {
    selectedPriority: function (value) {
      this.$emit('selectedPriority', value);
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  margin-top: 15px;
}

.new-note {
  text-align: center;
}

.priority {
  margin-top: 20px;
}

.priority_option {
  height: 30px;
  min-width: 140px;
  margin-left: 20px;
  color: #2d2d2d;
}

select {
  border-radius: 5px;
}


</style>