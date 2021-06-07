<template>
  <div id="app">
  

<!-- ------------------------------------------------------------------------ -->
<!--
  ***this div contains the error msg when trying to add to the cart without selecting a size.

  ***I used a v-show here so I can make the div display and display none.

  *** the boolean property 'error' works for both, the v-show and the bounded class ' errorMsg'.
 -->
 <!-- by default, the errorMsg class has a red background, however, in order to use the same class but with a different background, im binding a style attribute. inside the style attribute im setting the value of the background property, to a computed property that determines which color will be given to the background  -->
<div v-show="$store.state.error" :class="{errorMsg:$store.state.error}" :style="{background: $store.state.backgroundForMsg}">
  <p>{{$store.state.msg}}</p>
</div>
<!-- ------------------------------------------------------------------------- -->
    
    <cart-comp
      :modal="modal"
     @click.native="showCart"
      :numItems='numItems'
       @click="showCart"
    ></cart-comp>

    <div class="cartModal" v-show="$store.state.modal" >

   

   <!-------------------The code below is  content that shows when you click on the cart --------------------------------------->

      <div class="cartContent">
        <i @click="showCart" class="fa-2x far fa-window-close"></i>
              <P class="empty-cart" v-show="$store.state.numItems.length == 0">Your cart is empty</P>

        <div class="cartContentItem" v-for="(item, index) in $store.state.numItems" :key="item.id">

          <div class="cartContentItemImg">
          <img width="150px" :src="$store.state.item.img" alt="tshirt">
          </div>
          <div class="cartContentItemDescription">
         <p>{{item.item}}</p>
        <span>Size: {{item.sizeSelected}}</span>

         <p > Material: {{item.material}}</p>

<!-- ----------------prices and discounts-------------------------------------------------- -->
<!-- 
  ***in order to show the price for each item, the computed property 'itemprice' was used 
  
  *** in order to show a discounted price and put a linethrough through the regular price, two p tags were used with conditional renderings. this allows me to show the regular price or the regular price with a linethrough and the discounted price, depending on the amount of items of the same kind added to the cart.
  -->

        
         <p v-if="item.amount >= 3 " class="discountedPrice" > price: ${{item.priceRegular}}</p>
         

         <p v-else > price: ${{$store.state.itemPrice}}</p>

         <p v-if="item.amount >= 3 "> Discounted price: ${{item.discountedPrice}}</p>
<!-- -------------------------------------------------------------------------------------------- -->
          <div>
          <label >Quantity: </label>
          <!-- to be able to access the current target and current iteration, I sent both as arguments of the function i want to excute -->

          <!-- the function 'trackQty()' keeps track of the value of this input element. this is to know whether 3 or more items are being added so the discount could be activated. -->
         <input @click="$store.commit(trackQty($event,index))" type="number" :value="item.amount" min="1" :max="$store.state.merch[0].variants[merch[0].selectedVariant].inventory">
         

         </div>
        <p>{{$store.state.showDiscount}}</p>



           <button @click="delItemFromCart(index)" class="del-item-btn">Delete</button>
        
          </div>
          
          </div>

      </div>
<!-- ------------------------------------------------->


    </div>

    <h1 class="store-name">Martz Store</h1>

   <top-com

    @addToCartEvent='addItemsCart($event)' 
   
    :numItems='numItems'
    :merch='merch'
     
     ></top-com>
      


  </div>
</template>

<script>


export default {


  name: 'App',
  




// ---------------------------------------------------------------------------------------------------------------------------
  // in order to access the current iteration of a loop, you have to send it as a parametter in the function you want to excute, just like you would send current index or the $event. You do not have to use a for each loop or anything like that.

// through the use of $event you can access a lot of usefull information like path, target, etc...

  methods:{

  },
    computed:{
// this computed property 'backgroundForMsg, helps me determine the color of the background for my style binding. in this case, if I want the background of the msg that drops down orange, i have to make whichMsg equals 1. on the other hand, if I want the background to be green then the property whichMsg has to be equal to 2'
    backgroundForMsg(){
      if(this.whichMsg === 1){
        return 'orange'
      }
      if(this.whichMsg === 2){
        return 'green'
      }
    },
    showDiscount:{
      discount: 0,
      get(){
        return this.discount
      },
      set(newVal){
         return this.discount = newVal
      }
    },

    

    itemPrice(){
       return this.merch[0].variants[this.merch[0].selectedVariant].variantPrice
    },
    itemDiscount(){
      return this.merch[0].variants[this.merch[0].selectedVariant].discount
    }
  },
}
</script>

<style scoped>

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  
  
}

.errorMsg{

  width: 100%;
  height: 15vh;
  background: red;
  position: absolute;
  top: 0;
  display: grid;
  place-items: center;
  color: white;
  font-size: 1.5em;
  font-weight: 700;
  animation: error .5s ease-in;
   
}
@keyframes error {

  0% {
  transform: translateY(-1000px);
  opacity: 0;
}
100% {
  transform: translateY(0) ;
  opacity: 1;
}
  
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
   padding: 1em;
   overflow-y: auto;
   display:grid;
   place-items: center;
   gap: .2em;
   position: relative;
   
  
}
.cartContentItem{
 
   border: 1px solid rgba(0, 0, 0, 0.089);
  display: flex;
  justify-content: space-evenly;
  width: 70%;
  
  
}

.cartContentItemDescription{

display: flex;
flex-direction: column;
gap: .5em;
justify-content: center;
}
.discountedPrice{
  text-decoration: line-through;
  
}

.del-item-btn{
align-self: flex-end;
margin: .5em 2em;
cursor: pointer;

}

.empty-cart{

 text-transform: capitalize;
 font-size: 1.5em;

}

.fa-window-close{
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
}

@media (max-width:1080px){
  .cartContentItem{
    flex-direction: column;
  }
}
</style>
