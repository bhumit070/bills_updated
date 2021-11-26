<template>
  <Nuxt />
</template>

<script>
export default {
  mounted() {
    localStorage.removeItem('isLoggedIn', false)
  },
}
</script>