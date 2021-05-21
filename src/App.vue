<template>
  <div id="app">
  

<!-- ------------------------------------------------------------------------ -->
<!--
  ***this div contains the error msg when trying to add to the cart without selecting a size.

  ***I used a v-show here so I can make the div display and display none.

  *** the boolean property 'error' works for both, the v-show and the bounded class ' errorMsg'.
 -->
<div v-show="error" :class="{errorMsg:error}">
  <p>{{msg}}</p>
</div>
<!-- ------------------------------------------------------------------------- -->
    
    <cart-comp
      :modal="modal"
     @click.native="showCart"
      :numItems='numItems'
       @click="showCart"
    ></cart-comp>

    <div class="cartModal" v-show="modal" >

   

   <!-------------------The code below is  content that shows when you click on the cart --------------------------------------->

      <div class="cartContent">
        <i @click="showCart" class="fa-2x far fa-window-close"></i>
              <P class="empty-cart" v-show="numItems.length == 0">Your cart is empty</P>

        <div class="cartContentItem" v-for="(item, index) in numItems" :key="item.numId">

          <div class="cartContentItemImg">
          <img width="150px" :src="item.variantImg" alt="tshirt">
          </div>
          <div class="cartContentItemDescription">
         <p>{{merch[0].item}}</p>
        <span>Size: {{item.selectedSize}}</span>

         <p> Material: {{item.variantMaterial}}</p>

<!-- ----------------prices and discounts-------------------------------------------------- -->
<!-- 
  ***in order to show the price for each item, the computed property 'itemprice' was used 
  
  *** in order to show a discounted price and put a linethrough through the regular price, two p tags were used with conditional renderings. this allows me to show the regular price or the regular price with a linethrough and the discounted price, depending on the amount of items of the same kind added to the cart.
  -->

         <p v-if="item.howMany >= 3" class="discountedPrice" > price: ${{itemPrice}}</p>

         <p v-else > price: ${{itemPrice}}</p>

         <p v-if="item.howMany >= 3"> Discounted price: ${{itemDiscount}}</p>
<!-- -------------------------------------------------------------------------------------------- -->
          <div>
          <label >Quantity: </label>
         <input type="number" :value="item.howMany" min="1" :max="merch[0].variants[merch[0].selectedVariant].inventory">

         </div>

<!-- delete btn removes itmes from the cart. however, for some reason it wont remove the first item of the array -->

           <button @click="delItemFromCart(index)" class="del-item-btn">Delete</button>
        
          </div>
          
          </div>

      </div>
<!-- ------------------------------------------------------------------------------------------------------------------------ -->




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
     numId:10,
     modal:false,
     msg:'Please select a size',
     error:false,

        merch:[

    {item:"Men's Carefree Unshrinkable Tee, Traditional Fit Short-Sleeve",
    id:1,
    price:19.95, 
    salePrice:11.99,
    show:false,
    selectedVariant:0,
    TheSize:'',
    variants:[

      {
        variantId:2234,
        variantColorCode:'#a4ebf3',
        variantImg: 'https://cdni.llbean.net/is/image/wim/240624_4094_41?hei=764&wid=665&resMode=sharp2&defaultImage=llbstage/A0211793_2',
        variantMaterial:'Cotton',
        howMany: 0,
        inventory: 10,
        variantPrice:19.95, 
         discount:16.99,
         variantBool: false,
         selectedSize:'',
         sizes:[
      {size:'Small', id: 1,},
      {size:'Medium', id: 2,},
      {size:'Large', id: 3,}
    ],
      },
      {
        variantId:2235,
        variantColorCode:'#000000',
        variantImg: 'https://cdni.llbean.net/is/image/wim/240624_1_41?hei=764&wid=665&resMode=sharp2&defaultImage=llbstage/A0211793_2',
        variantMaterial:'silk',
        inventory:15,
        howMany: 0,
         variantPrice:19.95, 
         discount:16.99,
         variantBool: false,
         selectedSize:'',
         sizes:[
      {size:'Small', id: 1,},
      {size:'Medium', id: 2,},
      {size:'Large', id: 3,},
      
    ],

      },
      {
        variantId:2236,
        variantColorCode:'#ffac41',
        variantImg: 'https://cdni.llbean.net/is/image/wim/240624_33409_41?hei=764&wid=665&resMode=sharp2&defaultImage=llbstage/A0211793_2',
        variantMaterial:'wool',
        inventory:20,
        howMany: 0,
        variantPrice:19.95, 
         discount:16.99,
         variantBool: false,
         selectedSize:'',
         sizes:[
      {size:'Small', id: 1,},
      {size:'Medium', id: 2,},
      {size:'Large', id: 3,}
    ],

      },
   
    ],

    },

   
  ]
     
    }
  },

  computed:{
    itemPrice(){
       return this.merch[0].variants[this.merch[0].selectedVariant].variantPrice
    },
    itemDiscount(){
      return this.merch[0].variants[this.merch[0].selectedVariant].discount
    }
  },

  
  methods:{
    showError(){
      console.log(this.newSize())
    }
    ,
    
    addItemsCart(item){
      
      if(item.selectedSize === ''){
       this.error = true

       setTimeout(() => {
         this.error = false
       }, 4000);
      }
      else{

        this.numItems.push(item)   
      }

     
     

    },
     addHowmany(qty){
    this.merch[0].variants[this.merch[0].selectedVariant].howMany = qty
    if(qty >= 3){
      this.merch[0].variants[this.merch[0].selectedVariant].variantBool = true
    }
     }
    ,
    removeItemsCart(){
      if(this.numItems > 0){

        
      }
    },

    showCart(){
      this.modal = !this.modal
    
      
    },

    delItemFromCart(index){
      this.numItems.splice(1,index)
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
.discountedPrice{
  text-decoration: line-through;
  /* align-self: center; */
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
