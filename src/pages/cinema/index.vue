<template>
  <div class="panel">
    <NavBar title="影院" />
    <TopBar />
    <SelectPanel v-if="filters.brand"
                 class="select-wrapper"
                 :filters="filters" />
    <section class="list">
      <NoData v-if=" loading && empty"></NoData>
      <div>
        <cinema-item :cinema="item"
                     v-for="item in cinemas"
                     :key="item.id">
        </cinema-item>
      </div>
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </section>
  </div>
</template>

<script>
import TopBar from './components/top'
import NavBar from '@/components/navbar/fixed'
import SelectPanel from '@/components/selectPanel'
import CinemaItem from '@/components/cinema-item'
import NoData from '@/components/no-data'
import { getFilterCinemas } from '@/api'
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  name: 'Cinema',
  data () {
    return {
      filters: {},
      loading: true
    }
  },
  computed: {
    ...mapState(['cinemas', 'city']),
    empty () {
      const { cinemas } = this
      return cinemas ? !cinemas.length : false
    }
  },
  methods: {
    ...mapActions(['getCinemaList']),
    ...mapMutations(['changeFilter', 'emptyCinemaList', 'resetFilter']),
    infiniteHandler ($state) {
      this.loading && this.getCinemaList().then(data => {
        this.loading = true
        const { paging } = data
        if (paging.total === 0) {
          this.empty = true
        }
        if (paging.hasMore) {
          this.changeFilter({
            offset: paging.offset + paging.limit
          })
          $state.loaded()
        } else {
          $state.complete()
        }
      })
      this.loading = false
    }
  },
  created () {
    getFilterCinemas({ params: { ci: this.city.id } }).then(data => {
      this.filters = data
    })
  },
  beforeDestroy () {
    this.resetFilter()
    this.emptyCinemaList()
  },
  components: {
    NavBar,
    TopBar,
    SelectPanel,
    NoData,
    CinemaItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.panel {
  min-height: 80%;
}
.list {
  padding-top: 84px;
  min-height: 100%;
}
.select-wrapper {
  position: fixed;
  top: 94px;
  left: 0;
}
.panel {
  padding-top: 50px;
  padding-bottom: 50px;
  background: #fff;
}
</style>
