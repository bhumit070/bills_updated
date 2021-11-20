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
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Nuxt class="mt-2" />
  </div>
</template>

