 let titlecart = document.querySelector('.titlecart2');
 let cart = document.querySelector('.cart');
 let title = document.querySelector('.titlecart');
 let itemCart = document.querySelector('.itemcart')
 let candles = document.querySelector('#products');
 let totalEl = document.querySelector('.totalEl');
 let totalPriceHtml = document.querySelector('.totalPris')


/**CART**/
titlecart.addEventListener('click' , function(){

    cart.style.display ="block";
})
title.addEventListener('click' , function(){

    cart.style.display ="none";
})



/**let n = 0;
title.addEventListener('click' , function(){
    if (n==0){
        cart.style.bottom = "-360px";
        n++;
    }else{
        cart.style.bottom = "0px";
        n=0;
    }
})

**/

// Show all post




function showAllPosts(){

    for(let i = 0 ; i < products.length ; i++){

        candles.innerHTML += `
        <div class="candles">
        <div class="candlesimg"><img src="`+ products[i].imgSrc+`" alt="" class=""></div>
        <div class="product-title">`+products[i].name +`</div>
        <div class="product-instock">تعداد موجود:` +products[i].instock+`</div>
        <div class="product-data">
            <div class="product-price">`+ products[i].price+`</div>
            <div class="add-to-cart" onclick="addCandles(`+ products[i].id+`)"><i class="fa-solid fa-cart-shopping"></i></div>
        </div>
        </div>`
    }
}

showAllPosts();


//ADD TO CART

let CartCandles =[];

function addCandles(id){

    let itemId = CartCandles.some(function(item){
        return item.id == id;
    });


    if(itemId){ 
        ChangeNumberOfCartCandles('plus', id)

    }else{
        let item = products.find(function(p){
        return p.id == id;
        });
        item.numberOfUnits = 1;
        CartCandles.push(item);
        render();
        renderTotal()
    }

}

function render(){
    
    itemCart.innerHTML =' ';
    for(let i =0; i<CartCandles.length; i++){
        itemCart.innerHTML +=`
            <li>
            <div class="pname">`+CartCandles[i].name+`</div>
            <div class="p-price">`+CartCandles[i].price+`</div>
            <div class="unic">
                <div class="plus" onclick="ChangeNumberOfCartCandles('plus', ` + CartCandles[i].id + `)"><i class="fa-solid fa-plus"></i></div>
                <div class="p-unic">`+CartCandles[i].numberOfUnits+`</div>
                <div class="minus" onclick="ChangeNumberOfCartCandles('minus', ` + CartCandles[i].id + `)"><i class="fa-solid fa-minus"></i></div>
            </div>
            </li>`;
    }
}

function ChangeNumberOfCartCandles(action, id){

    CartCandles = CartCandles.map (function(item){

        let oldNumber= item.numberOfUnits;

        if (item.id == id){
            if(action =='plus'  && oldNumber<item.instock){
                 
                 oldNumber++;
            }else if(action=='minus' && oldNumber>1){
               oldNumber--;
            }
        }
        item.numberOfUnits = oldNumber;
        return item;
    });

       render();
       renderTotal()

}

function renderTotal(){
    let totalPrice =0;
    let totalElement = 0;

    for (let i =0 ; i<CartCandles.length ; i++){
        totalElement += CartCandles[i].numberOfUnits;
        totalPrice += CartCandles[i].price* CartCandles[i].numberOfUnits;
    }
    totalEl.innerHTML =totalElement; 
    totalPriceHtml.innerHTML = totalPrice;
}