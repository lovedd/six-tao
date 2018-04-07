<template>
  <div>
    <PageHeader></PageHeader>
    <PageBread>
      <span>Goods</span>
    </PageBread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default" :class="{'cur': sortChecked === 'default'}" @click="checkSort('default')">Default</a>
          <a href="javascript:void(0)" class="price" :class="{'cur': sortChecked === 'priceUp' ||  sortChecked === 'priceDown'}" @click="checkSort(isPriceUp?'priceDown':'priceUp')">Price
            <span v-if="isPriceArrowUp">↑</span>
            <span v-else>↓</span>
            <!--<svg class="icon icon-arrow-short">-->
              <!--<symbol id="icon-arrow-short" viewBox="0 0 25 32">-->
                <!--<title>arrow-short</title>-->
                <!--<path class="path1" d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z"></path>-->
              <!--</symbol>-->
              <!--<use xlink:href="#icon-arrow-short"></use>-->
            <!--</svg>-->
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterBy">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show': isShowFilterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur': priceChecked === 'all'}" @click="checkPriceFilter('all')">All</a></dd>
              <dd v-for="(item, index) in priceFilterList" :key="index">
                <a v-if="item.endPrice" href="javascript:void(0)" :class="{'cur': priceChecked === index}" @click="checkPriceFilter(index)">{{item.startPrice}} - {{item.endPrice}}</a>
                <a v-else href="javascript:void(0)" :class="{'cur': priceChecked === index}" @click="checkPriceFilter(index)">> {{item.startPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in prdList" :key="item.productId">
                  <div class="pic">
                    <a href="#"><img v-lazy="`../../../static/${item.productImage}`" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="isShowOverLay" @click="closeFilterBy"></div>
    <PageFooter></PageFooter>
  </div>
</template>

<script>
import PageHeader from '../../components/PageHeader'
import PageBread from '../../components/PageBread'
import PageFooter from '../../components/PageFooter'
import axios from 'axios'

let queryPrdObj = {}

export default {
  data () {
    return {
      prdList: [], // 产品列表
      // 价格过滤列表
      priceFilterList: [
        {
          startPrice: 0,
          endPrice: 100
        },
        {
          startPrice: 100,
          endPrice: 500
        },
        {
          startPrice: 500,
          endPrice: 2000
        },
        {
          startPrice: 2000
        }
      ],
      priceChecked: 'all', // 选中的价格过滤列表项
      filterPrice: null, // 选中的价格过滤列表对象
      isShowFilterBy: false, // 是否展示过滤列表弹窗
      isShowOverLay: false, // 是否展示遮罩层
      sortChecked: 'default',
      isPriceUp: true
    }
  },
  computed: {
    isPriceArrowUp () {
      return !this.isPriceUp
    }
  },
  components: {
    PageHeader,
    PageBread,
    PageFooter
  },
  created () {
    this.getPrdList()
  },
  methods: {
    // 请求接口获取产品列表数据
    getPrdList () {
      queryPrdObj = Object.assign(queryPrdObj, this.filterPrice, {sort: this.sortChecked})
      axios.get('mock/goods', {params: queryPrdObj}).then((res) => {
        console.log('res', res)
        let data = (res && res.data) || {}
        if (data.code === '000') {
          this.prdList = data.result || []
          console.log('prdList', this.prdList)
        } else {
          alert(`err:${data.msg || '系统错误'}`)
        }
      })
    },
    // 选取价格过滤列表项
    checkPriceFilter (index) {
      this.priceChecked = index
      this.filterPrice = index === 'all' ? null : this.priceFilterList[index]
      this.getPrdList()
      this.closeFilterBy()
    },
    // 展示过滤列表弹窗
    showFilterBy () {
      this.isShowFilterBy = true
      this.isShowOverLay = true
    },
    // 关闭过滤列表弹窗
    closeFilterBy () {
      this.isShowFilterBy = false
      this.isShowOverLay = false
    },
    checkSort (val) {
      this.sortChecked = val
      if (val === 'priceUp' || val === 'priceDown') {
        this.isPriceUp = !this.isPriceUp
      } else {
        this.isPriceUp = true
      }
      this.getPrdList()
    }
  }
}
</script>
