$(document).ready(() => {
    const updateFavorite = (imageUrl, isDelete = false) => {
        const keyword = $('#keyword').val();
        $.ajax({
          method: 'get',
          url: '/api/favorite',
          data: {
              imageUrl,
              keyword,
              action: isDelete ? 'delete' : 'add'
          } 
        });
    };
    
   $('.favoriteIcon').on('click', function() {
       const imageUrl = $(this).prev().attr('src');
       
       if ($(this).attr('src') === 'img/favorite.png') {
           $(this).attr('src', 'img/favorite_on.png');
           updateFavorite(imageUrl);
       } else {
           $(this).attr('src', 'img/favorite.png');
          updateFavorite(imageUrl, true);
       }
   });
   
   $('.keyword-link').on('click', function() {
       $.ajax({
           method: 'get',
           url: '/api/displayFavorites',
           data: {
               keyword: $(this).text().trim()
           },
           success: (rows, status) => {
               $('#favorites').html('');
               (rows || []).forEach((row, i) => {
                   if (i % 4 === 0) {
                       $('#favorites').append('<br>');
                   }
                   
                   const imgEl = $('<img />')
                    .addClass('image')
                    .height(150)
                    .width(150)
                    .attr('src', row.imageUrl);
                    
                   const faveIcon = $('<img />')
                    .addClass('favoriteIcon')
                    .width(20)
                    .attr('src', 'img/favorite_on.png');
            
                   faveIcon.on('click', () => {
                       updateFavorite(row.imageUrl, true);
                       faveIcon.remove();
                       imgEl.remove();
                   });
                
                   $('#favorites').append(imgEl, faveIcon);
               });
           }
       })
   });
   
});