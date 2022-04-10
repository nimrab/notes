<template>
  <div class="wrapper">

    <!--    <header></header>-->

    <div class="wrapper-content">
      <section>
        <div class="container">

          <!--title-->


          <!--error message-->
          <message v-if="error" :message="error"/>

          <!--add new note-->
          <newNote
              :note="note"
              :priority="priority"
              :selectedPriority="selectedPriority"
              @selectedPriority="selectedPriority = $event"
              @addNote="addNote"
          />

          <!--title-->
          <div class="note-header">
            <h1>{{ title }}</h1>

            <!--search-->
            <search
                :value="search"
                placeholder="Search your note"
                @search="search = $event"
            />

            <div class="icons">
              <svg :class={active:!grid} @click="grid = false" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                   viewBox="0 0 24 24"
                   fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3" y2="6"></line>
                <line x1="3" y1="12" x2="3" y2="12"></line>
                <line x1="3" y1="18" x2="3" y2="18"></line>
              </svg>
              <svg :class={active:grid} @click="grid = true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                   viewBox="0 0 24 24"
                   fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </div>
          </div>

          <!--notes arr-->
          <notes
              :notes="notesFilter"
              :grid="grid"
              @remove="removeNote"
          />

        </div>
      </section>
    </div>

    <!--    <footer></footer>-->

  </div>
</template>

<script>


import message from "@/components/Message";
import newNote from "@/components/NewNote"
import notes from "@/components/Notes"
import search from "@/components/Search"

export default {
  components: {message, newNote, notes, search},
  data() {
    return {
      title: '',
      error: '',
      grid: true,
      search: '',
      priority: [],
      selectedPriority: '',
      note: {
        title: '',
        descr: '',
      },
      notes: [],
    }
  },
  created() {
    this.notes = this.$store.getters.getNotes
    this.priority = this.$store.getters.getPriority
    this.title = this.$store.getters.getTitle
    this.selectedPriority = this.$store.getters.getPriority[0]
  },
  computed: {
    notesFilter() {
      let array = this.notes,
          search = this.search

      if (!search) return array

      search = search.trim().toLowerCase()

      array = array.filter(e => {
        if (e.title.toLowerCase().indexOf(search) !== -1) {
          return e
        }
      })
      return array
    }

  },
  methods: {
    addNote() {

      const {title, descr} = this.note

      if (!title) {
        this.error = 'Title could not be empty'
        return
      }

      const newNote = {
        title,
        descr,
        date: new Date().toLocaleString(),
        priority: this.selectedPriority.toLowerCase().trim().replace(/ /g, '')
      }

      this.$store.dispatch('addNote', newNote)
      this.note.title = ''
      this.note.descr = ''
      this.error = ''
    },
    removeNote(index) {
      this.$store.dispatch('removeNote', index)
    },

  }
}
</script>

<style lang="scss" scoped>
.note-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 50px 0;

  h1 {
    font-size: 32px;
  }

  svg {
    margin-right: 12px;
    color: #999999;

    &.active {
      color: #402caf;
    }

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
