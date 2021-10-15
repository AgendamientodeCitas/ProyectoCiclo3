<template>
  <div id="nav">
    <router-link :to="{ name: 'Home' }">Home</router-link> |
    <router-link :to="{ name: 'About' }">Acerca de</router-link> |
    
    <router-link 
      v-if="!isLogin"
        :to ="{ name: 'Login' }">Login</router-link>
    <router-link 
      v-else
        :to="{ name: 'Admin' }">Admin</router-link> | 
    <router-link :to="{ name: 'Register' }">Registro</router-link>       
  </div>
</template>

<script>
export default {
  name: "TheNavigation",
  computed: { 
    isLogin(){
      return localStorage.getItem("token") ? true : false;
    }
  }
};
</script>

<style scoped>
#nav {
  padding: 30px;
  display: flex;
  justify-content: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 30px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
