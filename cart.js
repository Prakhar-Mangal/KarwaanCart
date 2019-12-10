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
orders = [{
    ono : 1,
    cart : []
}]
order = [1]
tprice = 0;
orderno = 2;

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

function generateOrder(){
    alert('order generated successfully, Add items now :)')
    order.push(orderno)
    orders.push({
        ono : orderno,
        cart : []
    })
    console.log(order)
    document.getElementById('orderValue').innerHTML = order.length
    showItems(orderno)
    showCartItems(orderno)
    orderno++;
}


function totalPrice(ono){
    orders.map(o=>{
        if(o.ono == ono){
            tprice = 0;
        o.cart.map(c=>(
            tprice+=c.price*c.quantity
        ))
        }
    })
    
    
   
}

function showOrders(){
    str = ''
    orders.map(o=>{
        str+=`<tr>
        <td>${o.ono}</td>
        <td><button type="button" class="btn btn-success" onclick=editOrder(${o.ono}) data-dismiss="modal">Edit</button></td>
        <td>Done
        <i class="fas fa-clock"></i>
        </td>
        </tr>`
    })
    document.getElementById('orders').innerHTML = str

}

function editOrder(ono){
    showItems(ono)
    document.getElementById('close').click();
}


function showItems(ono){
    str=''
    items.map(item=>{
        str+=`<tr>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td><button type="button" class="btn btn-success" onclick=addToCart(${item.id},'${item.name}',${item.price},${ono})>Add</button></td>
      </tr>`
      
    })
  document.getElementById('items').innerHTML = str
  orders.map(o=>{
      if(o.ono == ono){
         
    document.getElementById('cartValue').innerHTML = o.cart.length
  showOrders()
  showCartItems(o.ono)
      }
  })
  
}

function showCartItems(ono){
    orders.map(o=>{
        if(o.ono == ono){
            totalPrice(ono)
        str = ''
        o.cart.map((c,i)=>(
        str+=`<tr>
        <th scope="row">${i+1}</th>
            <td>${c.name}</td>
            <td>${c.price}</td>
            <td><button onclick=sub(${c.id},${ono})>-</button>${c.quantity}<button onclick=add(${c.id},${ono})>+</button><button onclick=del(${c.id},${ono})>d</button></td>
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
        document.getElementById('onumber').innerHTML = ono
        }
        
    })
    
}

function add(id,ono){
    orders.map(o=>{
        if(o.ono == ono){
            o.cart.map(c=>{
                if(c.id == id){
                    c.quantity++;
                }
            })
            showCartItems(ono)
        }
    })
    
}

function sub(id,ono){
    orders.map(o=>{
        if(o.ono == ono){
            o.cart.map(c=>{
                if(c.id == id){
                    if(c.quantity<=1){
                        alert('1 tho lo')
                    }
                    else{
                    c.quantity--;
                    }
                }
            })
            showCartItems(ono)

        }
    })
   
}

function del(id,ono){
    orders.map(o=>{
        if(o.ono == ono){
            
            o.cart.map(c=>{
                if(c.id == id){
                o.cart.remove(c)

                }
            })
            showCartItems(ono)
            updateCartValue(ono)
        }
    })
}

function updateCartValue(ono){
    orders.map(o=>{
        if(o.ono == ono){
            document.getElementById('cartValue').innerHTML = o.cart.length
        }
    })
    
    showCartItems(ono);
}

function addToCart(id,name,price,ono){
    n=1;
    k=1;
    orders.map(o=>{
        if(o.ono == ono){
            if(o.cart.length==0){
                o.cart.push({
                    id  : id,
                    name : name,
                    price : price,
                    quantity : 1
                })     
            }
            else{
            o.cart.map(c=>{
                if(c.id == id){
                    k=0;
                    c.quantity++;
                }
                else{
                    n=0;
                }
            })
            if(n==0&&k==1){
                o.cart.push({
                    id  : id,
                    name : name,
                    price : price,
                    quantity : 1
                })
                n=1;    
            }
        }
        updateCartValue(ono)
        console.log(cart)
        }
    })
    
}

