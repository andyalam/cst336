$(document).ready(function() {
    
    /*
    <div class="input-group">
        <div class="input-group-prepend">
            <div class="input-group-text">$<span id="total-price"></span></div>
            <button type="submit" class="btn btn-primary">Checkout</button>
        </div>
    </div>
    
    */
    
    const createCartItemElement = (item) => {
        const el = $('<div></div>')
            .addClass('cart-item card mb-3');
        
        const imgEl = $('<img />')
            .addClass('card-img card-img-left img-fluid')
            .attr('src', item.imgUrl)
            .attr('alt', `Image of ${item.title}`);
        
        const quantityInputEl = $('<input>')
            .attr('type', 'number')
            .val(item.quantity);

        const priceControlsEl = $('<div></div>')
            .addClass('price-controls input-group')
            .append(
                $('<div></div>')
                    .addClass('input-group-prepend'),
                quantityInputEl
            );
            
        const cardBodyEl = $('<div></div>')
            .addClass('row no-gutters')
            .append(
                $('<div></div>')
                    .addClass('col-md-4')
                    .append(imgEl),
                $('<div></div>')
                    .addClass('col-md-8')
                    .append(
                        $('<div></div>')
                            .addClass('card-body')
                            .append(
                                $('<h5></h5>')
                                    .addClass('card-title')
                                    .html(item.title),
                                $('<p></p>')
                                    .addClass('card-text')
                                    .html(item.description),
                                priceControlsEl
                            )
                    )
            );
        
        
        el.append(cardBodyEl);
        $("#cart").append(el);
    }
    
    const renderCart = () => {
       const cart = [
           {
               id: 1,
               price: 4.99,
               title: 'Branded Hat',
               description: 'This branded hat has all the brandedness that you could ever need',
               imgUrl: 'img/hat.jpg',
               quantity: 1
           },
           {
               id: 2,
               price: 20.00,
               title: 'Branded Sweater',
               description: 'This sweater will keep you warm during winter and cool during the summer with its branded coolness',
               imgUrl: 'img/sweater.jpg',
               quantity: 2
           }
        ];
        
        for (const item of cart) {
            createCartItemElement(item);
        }
        
        // fetch('./data.json')
        //     .then(console.log)
        //     .catch(console.error);
    }
    
    renderCart();
});