<template>
  <div id="app">
   <p class="cart">
      <i class="fas fa-shopping-cart"></i>       
       <span> {{numItems}}</span>
   </p>
    <h1>Martz Store</h1>
   <top-com></top-com>
  </div>
</template>

<script>


export default {
  name: 'App',
  
  data(){
    return{
    
    }
  }
}
</script>

<style scoped>

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
h1{
  font-size: 3em;
}

#app{
  height: 100vh;
  display: grid;
  place-items: center;
  position: relative;
  
}
.cart{
  position: absolute;
  top: 20px;
  right: 150px;
  background: red;
  width: 5vw;
}
.cart span{
  margin-left: 1em;
  border: 1px solid green;
  width: 5
  
}
</style>
