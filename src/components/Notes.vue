<template>

  <div class="notes">
    <div class="note" :class={full:!grid} v-for="(note, index) in notes" :key="index">
      <div class="note-header" :class={full:!grid}>
        <p>{{ note.title }}</p>
        <p class="delete" @click="removeNote(index)" :class={full:!grid}>X</p>
      </div>
      <div class="note-body">
        <p>{{ note.descr }}</p>
        <span :class="{[notes[index].priority]: true}">{{ note.date }}</span>

      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    notes: {
      type: Array,
      required: true
    },
    grid: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    removeNote(index) {
      this.$emit('remove', index)
    }
  }
}
</script>

<style lang="scss" scoped>

.notes {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 40px 0;
}

.note {
  width: 48%;
  padding: 18px 20px;
  margin-bottom: 20px;
  background-color: #ffffff;
  transition: all .25s cubic-bezier(.02, .01, .47, 1);
  box-shadow: 0 30px 30px rgba(0, 0, 0, 0.2);
  &.full {
    width: 100%;
    text-align: center;
  }

  &:hover {
    box-shadow: 0 30px 30px rgba(0, 0, 0, 0.04);
    transform: translate(0, -6px);
    transition-delay: 0s !important;
  }
}

.note-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: 22px;
    color: #402caf;
  }

  .delete {
    &:hover {
      cursor: pointer;
    }

    &.full {
      margin-left: 50px;
    }

  }

  &.full {
    justify-content: center;
  }
}

.note-body {
  p {
    margin: 20px 0;
  }

  span {
    font-size: 14px;
    color: #999999;
  }
  .important {
    color: #ffaa00;
  }
  .toppriority {
    color: red;
  }

}

</style>