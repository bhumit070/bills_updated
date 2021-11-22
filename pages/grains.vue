<template>
  <div class="container mt-3">
    <div v-if="isAdd" class="mb-2">
      <b-input v-model="grainText" placeholder="Add Grain Name" />
      <b-button
        variant="primary"
        class="mt-2"
        :disabled="loading"
        @click="addGrain"
        >Add Grain</b-button
      >
    </div>
    <div class="w-100">
      <b-button
        :variant="isAdd ? 'danger' : 'primary'"
        :disabled="loading"
        @click="isAdd = !isAdd"
        >{{ !isAdd ? 'Add Grain' : 'Close Add Grain' }}</b-button
      >
    </div>
    <div v-if="grains && grains.length" class="mt-2">
      <div v-for="grain in grains" :key="grain.id">
        <b-card class="mb-2">
          <b-card-body>
            {{ grain.name }}
            <b-button
              class="float-right"
              variant="danger"
              :disabled="loading"
              @click="removeGrain(grain.id)"
            >
              Delete Grain
            </b-button>
          </b-card-body>
        </b-card>
      </div>
    </div>
    <div v-else>
      <p>No grains added yet.</p>
    </div>
  </div>
</template>

<script>
import { ADD_GRAIN, REMOVE_GRAIN } from '@/store/grains/action.types'
export default {
  data: () => ({
    isAdd: false,
    grainText: '',
    loading: false,
  }),
  computed: {
    grains() {
      return this.$store.getters['grains/grains']
    },
  },
  methods: {
    async addGrain() {
      try {
        this.loading = true
        await this.$store.dispatch(ADD_GRAIN, { name: this.grainText })
        this.isAdd = false
        this.grainText = ''
      } catch (error) {
        alert('unable to add grain')
      } finally {
        this.loading = false
      }
    },
    async removeGrain(id) {
      try {
        this.loading = true
        await this.$store.dispatch(REMOVE_GRAIN, id)
      } catch (error) {
        alert('unable to remove grain')
      } finally {
        this.loading = false
      }
    },
  },
}
</script>