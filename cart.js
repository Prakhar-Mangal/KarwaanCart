items = [
    {
        id : 1,
       name : 'Paneer',
       price : 20 
    },
    {
        id : 2,
       name : 'Aloo',
       price : 15 
    },
    {
        id : 3,
       name : 'Tinde',
       price : 10 
    }
]

cart = []
tprice = 0;
function totalPrice(){
    tprice = 0;
    cart.map(c=>(
        tprice+=c.price*c.quantity
    ))
    //alert(tprice)
   
}

function showItems(){
    str=''
    items.map(item=>{
        str+=`<tr>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td><button type="button" class="btn btn-success" onclick=addToCart(${item.id},'${item.name}',${item.price})>Add</button></td>
      </tr>`
      
    })
   
  document.getElementById('items').innerHTML = str
}

function showCartItems(){
    totalPrice()
    str = ''
    cart.map((c,i)=>(
     str+=`<tr>
    <th scope="row">${i+1}</th>
        <td>${c.name}</td>
        <td>${c.price}</td>
        <td><button onclick=sub(${c.id})>-</button>${c.quantity}<button onclick=add(${c.id})>+</button></td>
      </tr>`
    ))
    str += `<tr>
    <td></td>
    <td><b>Total: </b></td>
    <td id="tprice">...</td>
    <td></td>
  </tr>`
    document.getElementById('cartItems').innerHTML = str
    document.getElementById('tprice').innerHTML = tprice
}

function add(id){
    cart.map(c=>{
        if(c.id == id){
            c.quantity++;
        }
    })
    showCartItems()
}

function sub(id){

    cart.map(c=>{
        if(c.id == id){
            if(c.quantity<=1){
                alert('1 tho lo')
            }
            else{
            c.quantity--;
            }
        }
    })
    showCartItems()
}
function updateCartValue(){
    document.getElementById('cartValue').innerHTML = cart.length
    showCartItems();
}

function addToCart(id,name,price){
    n=1;
    k=1;
    if(cart.length==0){
        cart.push({
            id  : id,
            name : name,
            price : price,
            quantity : 1
        })     
    }
    else{
    cart.map(c=>{
        if(c.id == id){
            k=0;
            c.quantity++;
        }
        else{
            n=0;
        }
    })
    if(n==0&&k==1){
        cart.push({
            id  : id,
            name : name,
            price : price,
            quantity : 1
        })
        n=1;    
    }
}
updateCartValue()
console.log(cart)
}

