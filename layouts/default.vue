<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand style="cursor: pointer" @click="$router.push('/')"
        >Shreeji Billing Software</b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <nuxt-link to="/peoples"> Peoples <b-icon-person /> </nuxt-link>
          </b-nav-item>
          <b-nav-item>
            <nuxt-link to="/firms">Firms <b-icon-building /> </nuxt-link>
          </b-nav-item>
          <b-nav-item>
            <nuxt-link to="/grains">Grains <b-icon-alarm /> </nuxt-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Nuxt class="mt-2" />
    <people-modal />
  </div>
</template>

<script>
import { FETCH_PEOPLE } from '@/store/peoples/action.types'
import { FETCH_FIRMS } from '@/store/firms/actions.types'
import { FETCH_GRAINS } from '@/store/grains/action.types'
export default {
  async created() {
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
    if (!isLoggedIn) {
      this.$router.push('/auth')
    }
    await this.$store.dispatch(FETCH_PEOPLE)
    await this.$store.dispatch(FETCH_FIRMS)
    await this.$store.dispatch(FETCH_GRAINS)
  },
}
</script>

