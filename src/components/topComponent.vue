<template>
  <div class="top">

    
    
    <ul class="ul-container">
       <li class="item"  v-for="m in merch" :key="m.id">
         
         <img width="400px"   :src="image" alt="tshirt">
        
         <div class="details">
         <p v-if="m.inventory  >= 5">In stock</p>
         <p v-else-if="m.inventory > 0 && m.inventory <= 4">almost out stock</p>
         <p v-else>sold out</p>

         <p>{{m.item}}</p>
         <p>{{material}}</p>
         <p :class="{discount:m.show}">${{m.price}}</p> 
         <p v-show="m.show">${{m.discount}}</p> 
         <span>size: </span>
         
         <select>
           <option>Please select</option>
           <option>Small</option>
           <option>Medium</option>
           <option>Large</option>
         </select>
          <div class="variant-container">
         
         <div
          v-for="(variant, index) in m.variants" :key="variant.varaintId"
          :style="{backgroundColor:variant.variantColorCode}"
          class="variantColor" 
           @click="updateProduct(index)" >

         </div>

         </div>
          <div class="btns">
            <button :disabled='!instock'  @click="addToCart" class="btn add-btn">Add to cart</button>
            <button  @click="removeItemEvent" class="btn del-btn">Remove from cart</button>

            
            
          </div>

         </div>

        
       </li>
    </ul>
  </div>
</template>

<script>

export default {
  
 props:{
       
       numItems: Number
       
     },
 data(){
   return{

     instock: true,
    
    merch:[

    {item:"Men's Carefree Unshrinkable Tee, Traditional Fit Short-Sleeve",
    id:1,
    price:19.95, 
    discount:16.99,
    salePrice:11.99,
    show:false,
    inventory:10,
    selectedVariant:0,
    variants:[

      {
        variantId:2234,
        variantColorCode:'#a4ebf3',
        variantImg: 'https://cdni.llbean.net/is/image/wim/240624_4094_41?hei=764&wid=665&resMode=sharp2&defaultImage=llbstage/A0211793_2',
        variantMaterial:'Cotton'

      },
      {
        variantId:2235,
        variantColorCode:'#000000',
        variantImg: 'https://cdni.llbean.net/is/image/wim/240624_1_41?hei=764&wid=665&resMode=sharp2&defaultImage=llbstage/A0211793_2',
        variantMaterial:'silk'

      },
      {
        variantId:2236,
        variantColorCode:'#ffac41',
        variantImg: 'https://cdni.llbean.net/is/image/wim/240624_33409_41?hei=764&wid=665&resMode=sharp2&defaultImage=llbstage/A0211793_2',
        variantMaterial:'wool'

      },
   
    ],

    },

   
  ]
   }

 },
 computed:{
   
   image(){
       return this.merch[0].variants[this.merch[0].selectedVariant].variantImg
     
   },
   material(){
     return this.merch[0].variants[this.merch[0].selectedVariant].variantMaterial
   }
   
 },
 methods:{

  updateProduct(index){
    
    this.merch[0].selectedVariant = index
 

  },
 
   addToCart(){
     this.$emit('addToCart')
  
     this.merch[0].inventory--

     if(this.merch[0].inventory === 0){
       this.instock = false
     }
     if(this.numItems > 3){
       this.merch[0].show = true
     }
   },

   removeItemEvent(){
     this.$emit('removeFromCart')

      
    if(this.numItems > 0){
      this.merch[0].inventory++
    }
       if(this.merch[0].inventory > 0){
       this.instock = true
     }
    if(this.numItems < 3 ){
       this.merch[0].show = false
     }
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
.disabledBtn{
  opacity: .4;
}
.discount{
  text-decoration: line-through;
}
.top,.ul-container{
  width: 60vw;
  height: 70vh;
}

/* .ul-container{

} */
.item{
  box-shadow: 0 0 10px rgb(238, 233, 233);
  font-size: 1.2em;
  text-transform: capitalize;
  list-style: none;
  display: flex;
  align-items: center;

}
.details{
  display: flex;
  flex-direction: column;
  gap: 1em;
  

  
}

.btns{
  display: flex;
  gap: 1em;
}

.btn{
  padding: 1em 1em;
  cursor: pointer;
}

.variant-container{
  display: flex;
  gap: 1em;
}
.variantColor{
  border: 1px solid;
  width: 2em;
  height: 2em;
}

.tshirts-colors{
  display: flex;
  justify-content: space-evenly;
  width: 20%;

}
.color{
 width: 20px;
 height: 20px;
 cursor: pointer;
}
.color:hover{
  opacity: .7;
}
.blue{
  background: rgb(72, 200, 243);
}
.black{
  background: black;
}

.pupu{
  background: rgb(255, 144, 99);
}
</style>
