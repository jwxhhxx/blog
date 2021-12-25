<template>
  <el-menu class="el-menu-vertical-demo"
           :collapse="isCollapse"
           background-color="#545c64"
           text-color="#fff"
           active-text-color="#ffd04b">
    <h3 style="color:#fff;text-align:center"
        v-show="!isCollapse">通用后台管理系统</h3>
    <h3 style="color:#fff;text-align:center"
        v-show="isCollapse">后台</h3>
    <el-menu-item :index="item.path"
                  v-for="item in noChildren"
                  :key="item.path"
                  @click="clickMenu(item)">
      <i :class="'el-icon-'+item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu :index="item.label"
                v-for="item in hasChildren"
                :key="item.path">
      <template slot="title">
        <i :class="'el-icon-'+item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="subItem.path"
                      v-for="(subItem,subIndex) in item.children "
                      :key="subIndex"
                      @click="clickMenu(subItem)"> <i :class="'el-icon-'+subItem.icon"></i>{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>

</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100vh;
  text-align: left;
}
</style>

<script>

export default {
  data () {
    return {
      menu: [
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home'
        },
        {
          path: '/mall',
          name: 'mall',
          label: '商品管理',
          icon: 'video-play',
          url: 'MallManege/MallManage'
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user',
          url: 'UserManage/UserManage'
        },
        {
          label: '其他',
          icon: 'location',
          children: [{
            path: '/page1',
            name: 'page1',
            label: '页面1',
            icon: 'setting',
            url: 'Other/PageOne'
          },
          {
            path: '/page2',
            name: 'page2',
            label: '页面2',
            icon: 'setting',
            url: 'Other/pageTwo'
          }]
        }
      ]
    }
  },
  methods: {
    // handleOpen (key, keyPath) {
    //   console.log(key, keyPath)
    // },
    // handleClose (key, keyPath) {
    //   console.log(key, keyPath)
    // },
    clickMenu (item) {
      this.$router.push({ name: item.name })
    }
  },
  computed: {
    noChildren () {
      return this.menu.filter((item) => !item.children)
    },
    hasChildren () {
      return this.menu.filter((item) => item.children)
    },
    isCollapse () {
      return this.$store.state.tab.isCollapse
    }
  }
}
</script>
