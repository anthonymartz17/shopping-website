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

        <div class="cartContentItem" v-for="(item, index) in numItems" :key="item.id">

          <div class="cartContentItemImg">
          <img width="150px" :src="item.img" alt="tshirt">
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

         <!-- <p v-if="item.howMany >= 3 || trackQty >= 3 " class="discountedPrice" > price: ${{itemPrice}}</p> -->
         <p v-if="item.amount >= 3 || merch[0].variants[merch[0].selectedVariant].howMany >= 3 " class="discountedPrice" > price: ${{item.priceRegular}}</p>
         

         <p v-else > price: ${{itemPrice}}</p>

         <p v-if="item.amount >= 3 || merch[0].variants[merch[0].selectedVariant].howMany >= 3 "> Discounted price: ${{item.discountedPrice}}</p>
<!-- -------------------------------------------------------------------------------------------- -->
          <div>
          <label >Quantity: </label>
          <!-- to be able to access the current target and current iteration, I sent both as arguments of the function i want to excute -->

          <!-- the function 'trackQty()' keeps track of the value of this input element. this is to know whether 3 or more items are being added so the discount could be activated. -->
         <input @click="trackQty($event)" type="number" :value="item.amount" min="1" :max="merch[0].variants[merch[0].selectedVariant].inventory">
         

         </div>
        <p>{{showDiscount}}</p>



           <button @click="delItemFromCart(index)" class="del-item-btn">Delete</button>
        
          </div>
          
          </div>

      </div>
<!-- ------------------------------------------------------------------------------------------------------------------------ -->


<!--  @howmanyEvent='addHowmany($event)' -->

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
        item:"Men's Carefree Unshrinkable Tee, Traditional Fit Short-Sleeve",
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
        item:"Men's Carefree Unshrinkable Tee, Traditional Fit Short-Sleeve",
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
        item:"Men's Carefree Unshrinkable Tee, Traditional Fit Short-Sleeve",
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



// ---------------------------------------------------------------------------------------------------------------------------
  // in order to access the current iteration of a loop, you have to send it as a parametter in the function you want to excute, just like you would send current index or the $event. You do not have to use a for each loop or anything like that.

// through the use of $event you can access a lot of usefull information like path, target, etc...

  methods:{
    trackQty(event){
  this.merch[0].variants[this.merch[0].selectedVariant].howMany = event.target.value
 

      
      
    },
  //  -------------------------------------------------------------------------------------------------------
   
    addItemsCart(item){
 // the conditional 'If' of  this funtion 'addItemsCart(item)' keeps track of whether a size was selected or not in order to show the error msg that a size must be selected.
    // the parameter it receives, is the selected variant or item which is an object with all the properties of the variant or item.
     
      // the else part, adds an object with the values of the properties of the current iteration for the item to be added to the cart. This way, in each iteration, each item will have their own unique property values.
      if(item.selectedSize === ''){
       this.error = true

       setTimeout(() => {
         this.error = false
       }, 4000);
      }
      else{
         
        
        this.numItems.push(

        {

          
          item: this.merch[0].variants[this.merch[0].selectedVariant].item,

          colorCode: this.merch[0].variants[this.merch[0].selectedVariant].variantColorCode,
          
          img: this.merch[0].variants[this.merch[0].selectedVariant].variantImg,

          material: this.merch[0].variants[this.merch[0].selectedVariant].variantMaterial,

          priceRegular: this.merch[0].variants[this.merch[0].selectedVariant].variantPrice,

          discountedPrice: this.merch[0].variants[this.merch[0].selectedVariant].discount,

          amount: this.merch[0].variants[this.merch[0].selectedVariant].howMany,

          sizeSelected:this.merch[0].variants[this.merch[0].selectedVariant].selectedSize,          
          
          }

        )   
      }

     
     

    },
  //   trackQty(){
  //    if (this.$refs.qtyCart[0].value >= 3){
  //            console.log('mayor o igual a 3')
  //    }
  //    else {
  //      console.log('es menor a 3')
  //    }
  //  },
    //  addHowmany(qty){
    // this.merch[0].variants[this.merch[0].selectedVariant].howMany = qty
    // console.log(this.merch[0].variants[this.merch[0].selectedVariant].howMany)
   
    //  },
  

    showCart(){
      this.modal = !this.modal
    
      
    },

    delItemFromCart(index){
      this.numItems.splice(index,1)
    }
  },
    computed:{

    showDiscount:{
      discount: 0,
      get(){
        return this.discount
      },
      set(newVal){
         return this.discount = newVal
      }
    },

    // got to figure out why my refs qtycart is undefined 

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
