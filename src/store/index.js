import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    numItems: [],
    numId:10,
    modal:false,
    msg:'Please select a size',
    whichMsg:0,
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

  
 ],
 instock: true,

  },
  mutations: {

    trackQty(event,index,state){
  
      // this line updates the value of the property 'amount' of the objects pushed to the 'numItems' array so that the discounted price could show from the cart when the quantity input value is changed.
      state.numItems[index].amount = event.target.value
        
        
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
          
          let newObject = {
             
            item: this.merch[0].variants[this.merch[0].selectedVariant].item,
  
            colorCode: this.merch[0].variants[this.merch[0].selectedVariant].variantColorCode,
            
            img: this.merch[0].variants[this.merch[0].selectedVariant].variantImg,
  
            material: this.merch[0].variants[this.merch[0].selectedVariant].variantMaterial,
  
            priceRegular: this.merch[0].variants[this.merch[0].selectedVariant].variantPrice,
  
            discountedPrice: this.merch[0].variants[this.merch[0].selectedVariant].discount,
  
            amount: +this.merch[0].variants[this.merch[0].selectedVariant].howMany,
  
            sizeSelected:this.merch[0].variants[this.merch[0].selectedVariant].selectedSize,   
            
            color: this.merch[0].variants[this.merch[0].selectedVariant].variantColorCode,
  
            objExits: false
          }
  
  // here im looping through the existing objects in the array 'numItems' whenever there are any in it. this in order to validate whether the object with the same size and color alreay exists. if it exists, im taking the newObject amount and just adding is to the existing object amount. this is to not have duplicate objects with the same color and size. 
  
    
          
            if(this.numItems.length != 0){
  
         this.numItems.forEach(one =>{
           
           if(one.color === this.merch[0].variants[this.merch[0].selectedVariant].variantColorCode && one.sizeSelected === this.merch[0].variants[this.merch[0].selectedVariant].selectedSize){
  
           
  
              one.amount = one.amount + newObject.amount
  
               newObject.objExits = true
  
              //  using the which msg property to determing the color of the background and the msg that will be used with the class error to show a msg alert. in this case, im changing the value of 'which msg ' to 1 to later say, if whichMsg is equal to 1 then the background color will be such.
  
               this.whichMsg = 1
  
               this.msg = 'Added to Existing Item'
  
               this.error = true
                setTimeout(() => {
           this.error = false
         }, 4000);
  
               
  
           }
            
  
           
         })}
         
         if(newObject.objExits === false || this.numItems.length === 0){
  
       this.numItems.push(newObject)
  
              this.whichMsg = 2
  
               this.msg = 'New Item Added'
  
               this.error = true
                setTimeout(() => {
           this.error = false
         }, 4000);
  
  
         }        
  
        
        }
  
       
       
  
      },
  
    
  
      showCart(){
        this.modal = !this.modal
      
        
      },
  
      delItemFromCart(index){
        this.numItems.splice(index,1)
      }
  },
  actions: {
  },
  modules: {
  }
})
