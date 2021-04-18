<template>
  <div id="app">
   <!-- <p   class="cart">
      <i class="fas fa-shopping-cart"></i>       
       <span> {{numItems.length}}</span>
   </p> -->


    <cart-comp
      :modal="modal"
     @click.native="showCart"
      :numItems='numItems'
    ></cart-comp>

    <div class="cartModal" v-show="modal"
    
      @click="showCart"
    >

    

      <div class="cartContent">

        <div class="cartContentItem" v-for="item in numItems" :key="item.variantId">

          <div class="cartContentItemImg">
          <img width="150px" :src="item.variantImg" alt="tshirt">
          </div>
          <div class="cartContentItemDescription">
         <p>{{merch[0].item}}</p>
         <p> Material: {{item.variantMaterial}}</p>
         <p :class="{discount:merch[0].show}"> price: ${{merch[0].price}}</p>
         <p v-if="item.howMany >= 3"> Discounted price: ${{merch[0].discount}}</p>
         <p>Quantity: {{item.howMany}}</p>

          </div>
          
          </div>

      </div>


    </div>

    <h1 class="store-name">Martz Store</h1>

   <top-com
    
    @addToCartEvent='addItemsCart($event)' 
    @howmanyEvent='addHowmany($event)'
    @removeFromCart='removeItemsCart'
    :numItems='numItems'
    :merch='merch'
    
   
     ></top-com>
     
  </div>
</template>

<script>


export default {


  name: 'App',
  
  data(){
    return{
     numItems: [],
     modal:false,

        merch:[

    {item:"Men's Carefree Unshrinkable Tee, Traditional Fit Short-Sleeve",
    id:1,
    price:19.95, 
    discount:16.99,
    salePrice:11.99,
    show:false,
    selectedVariant:0,
    variants:[

      {
        variantId:2234,
        variantColorCode:'#a4ebf3',
        variantImg: 'https://cdni.llbean.net/is/image/wim/240624_4094_41?hei=764&wid=665&resMode=sharp2&defaultImage=llbstage/A0211793_2',
        variantMaterial:'Cotton',
        howMany: 0,
        inventory: 10,

      },
      {
        variantId:2235,
        variantColorCode:'#000000',
        variantImg: 'https://cdni.llbean.net/is/image/wim/240624_1_41?hei=764&wid=665&resMode=sharp2&defaultImage=llbstage/A0211793_2',
        variantMaterial:'silk',
        inventory:15,
        howMany: 0,

      },
      {
        variantId:2236,
        variantColorCode:'#ffac41',
        variantImg: 'https://cdni.llbean.net/is/image/wim/240624_33409_41?hei=764&wid=665&resMode=sharp2&defaultImage=llbstage/A0211793_2',
        variantMaterial:'wool',
        inventory:20,
        howMany: 0,

      },
   
    ],

    },

   
  ]
     
    }
  },
  methods:{
    addItemsCart(item){
     this.numItems.push(item)   
     

    },
     addHowmany(qty){
    this.merch[0].variants[this.merch[0].selectedVariant].howMany = qty
    if(qty >= 3){
      this.merch[0].show = true
    }
     }
    ,
    removeItemsCart(){
      if(this.numItems > 0){

        
      }
    },

    showCart(){
      this.modal = !this.modal
    
      
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
                                       
.store-name{
  font-size: 3em;
  font-family: 'Poppins', sans-serif;
}
.store-name::before{
  content: "-";
  color: red;
  width: 1em;
}

#app{
  height: 100vh;
  display: grid;
  place-items: center;
  position: relative;
 
  
}

.cartModal{
  position: absolute;
  top: 0%;
  bottom: 0%;
  background:rgba(12, 12, 12, 0.226);
  width: 100%;
  display: grid;
  place-items: center;
}

.cartContent{
  width: 70%;
  height: 80vh;
   background: white;
   padding: 2em;
   overflow-y: auto;
   
}
.cartContentItem{
  box-shadow: 0 0 10px rgb(238, 233, 233);
  display: flex;
  justify-content: space-evenly;
  width: 70%;
  margin: auto;
}
.cartContentItemImg{
/* border: 1px solid red; */
}
.cartContentItemDescription{
/* border: 1px solid blue; */
display: flex;
flex-direction: column;
gap: .5em;
justify-content: center;
}
.discount{
  text-decoration: line-through;
}
</style>
