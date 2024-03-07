$(".answers-list__expand-btn").on('click', function(e) {
    $(this).closest(".answers-list__item").toggleClass('expanded');
});
$(".m-btn").on('click', function(e) {
    $('.m-btn').toggleClass('opened')
});
$("#m-btn").on('click', function(e) {
    $(".m-overlay").toggleClass('opened')
    $(".m-menu").toggleClass('opened')
});
$('#profile-m-btn').on('click', function(e) {
    lockScroll()
    $(".profile-sidebar").toggleClass('opened')
});
$(".m-menu__close-btn").on('click', function(e) {
    unlockScroll()
    $('.m-btn').removeClass('opened')
    $(".m-overlay").removeClass('opened')
    $(".m-menu").removeClass('opened')
});

$('[data-link]').on('click', function(e) {
    var attr = $(this).attr('data-link')

    $('.overlay').addClass('opened')
    $('.overlay-item[data-overlay="' + attr + '"]').addClass('opened')
});

$('.overlay .container').on('click', function(e) {
    if ($(e.target).hasClass('container')) {
        // Это событие было вызвано внутри .container
        $('.overlay').removeClass('opened');
        $('.overlay').find('.opened').removeClass('opened');
    }
});
$('.select__header').on('click', function(e) {
    $('.select.opened').removeClass('opened');
    $(this).closest('.select').toggleClass('opened')
});
$('.select-list__item').on('click', function(e) {
    var select = $(this).closest('.select');
    var heading = select.find('.select__heading');

    if (select.hasClass('multiple')) {
        // Переключение выбранного состояния варианта при клике
        $(this).toggleClass('selected');
        
        // Снимаем выбор со всех вариантов, кроме текущего
        select.find('.select-list__item').not(this).removeClass('selected');
        
        // Обновить текст для .select__heading из выбранных вариантов через запятую
        var selectedItems = select.find('.select-list__item.selected');
        var selectedText = selectedItems.map(function() {
            return $(this).text();
        }).get().join(', ');
        
        // Обновить .select__heading
        heading.text(selectedText);

        // Определить, какой текст нужно показать в зависимости от выбора вариантов
        if (selectedItems.length === 0) {
            heading.text("Выберите один или несколько вариантов");
        } else if (selectedItems.length === 1) {
            heading.text(selectedText);
        } else {
            heading.text("Выберите один или несколько вариантов");
        }
    } else {
        if($(this).hasClass('selected')) {
            $(this).removeClass('selected')
            // Определить, какой текст нужно показать в зависимости от выбора вариантов
            if (select.find('.select-list__item.selected').length === 0) {
                heading.text("Выберите один вариант");
            }
            
            select.removeClass('opened');
        } else {
            // Снимаем выбор со всех вариантов в текущем select
            select.find('.select-list__item').removeClass('selected');
            
            // Добавляем выбор к текущему варианту
            $(this).addClass('selected');
            
            // Устанавливаем текст .select__heading из выбранного варианта
            heading.text($(this).text());
            
            // Закрываем select

            // Определить, какой текст нужно показать в зависимости от выбора вариантов
            if (select.find('.select-list__item.selected').length === 0) {
                heading.text("Выберите один вариант");
            }
            
            select.removeClass('opened');
        }
    }
});

$(document).on('click', function(e) {
    // Проверяем, был ли клик внутри элемента с классом .select
    if (!$(e.target).closest('.select.opened').length) {
        // Если не было, то удаляем класс .opened у всех элементов с классом .select
        $('.select').removeClass('opened');
    }
});


$('.lang-selector__item').on('click', function(e) {
    $(this).parent('.lang-selector').children('.lang-selector__item').removeClass('selected')
    $(this).addClass('selected')
});

$('.main-section__scroll-btn').on('click', function(e) {
    $('html, body').animate({
        scrollTop: $('.popular-services').offset().top
      }, 1000); // 1000 миллисекунд (1 секунда) для плавной прокрутки
});


$('.input__copy-btn').on('click', function(e) {
    var inputValue = $(this).parent().find('input').val();
    var tempInput = $('<input>');
    $('body').append(tempInput);
    tempInput.val(inputValue).select();
    document.execCommand('copy');
    tempInput.remove();
    alert('Значение скопировано в буфер обмена: ' + inputValue);
});

$('.carousel__prev').on('click', function(e) {
    var content_wrapper = $(this).parent().find('.carousel__content');
    var content = $(content_wrapper).children('ul');
    
    // Вычисляем ширину всего контента, включая то, что выходит за границы
    var totalWidth = $(content)[0].scrollWidth;
    
    // Получаем ширину контейнера
    var containerWidth = $(content_wrapper).width();
    
    // Вычисляем количество страниц
    var length = Math.ceil(totalWidth / containerWidth);
    
    var current_index = parseInt(content.css('transform').split(',')[4]);

    // Устанавливаем ширину одной страницы
    var pageWidth = containerWidth;
    
    // Проверяем, текущая страница находится на грани
    if (current_index < 0) {
        // Перемещаем на предыдущую страницу (влево)
        var new_index = current_index + pageWidth;
        content.css('transform', 'translateX(' + new_index + 'px)');
    } else {
        // Если текущая страница уже первая, перейдем на последнюю страницу
        var new_index = -(length - 1) * pageWidth;
        content.css('transform', 'translateX(' + new_index + 'px)');
    }
});


$('.carousel__next').on('click', function(e) {
    var content_wrapper = $(this).parent().find('.carousel__content');
    var content = $(content_wrapper).children('ul');
    
    // Вычисляем ширину всего контента, включая то, что выходит за границы
    var totalWidth = $(content)[0].scrollWidth;
    
    // Получаем ширину контейнера
    var containerWidth = $(content_wrapper).width();
    
    // Вычисляем количество страниц
    var length = Math.ceil(totalWidth / containerWidth);
    
    var current_index = parseInt(content.css('transform').split(',')[4]);

    // Устанавливаем ширину одной страницы
    var pageWidth = containerWidth;
    
    // Проверяем, текущая страница находится на грани
    if (current_index > -(length - 1) * pageWidth) {
        // Перемещаем на следующую страницу (вправо)
        var new_index = current_index - pageWidth;
        content.css('transform', 'translateX(' + new_index + 'px)');
    } else {
        // Если текущая страница уже последняя, перейдем на первую страницу
        content.css('transform', 'translateX(0)');
    }
});


$('.paggination-list__item', '[data-pagginator]').on('click', function(e) {
    var attr = $(this).parent().attr('data-pagginator')

    $(this).parent().children('.paggination-list__item').removeClass('selected')
    $(this).addClass('selected')

    $('[data-paggination="' + attr + '"]').children().removeClass('selected')
    $('[data-paggination="' + attr + '"]').children().eq($(this).index()).addClass('selected')
});

$(".articles-next").on('click', function(e) {
    $(this).parent().find('.articles').scrollWidth;
});

$(".carousel").on("swipeleft", function() {
    var content_wrapper = $(this).find('.carousel__content');
    var content = $(content_wrapper).children('ul');
    
    // Вычисляем ширину всего контента, включая то, что выходит за границы
    var totalWidth = $(content)[0].scrollWidth;
    
    // Получаем ширину контейнера
    var containerWidth = $(content_wrapper).width();
    
    // Вычисляем количество страниц
    var length = Math.ceil(totalWidth / containerWidth);
    
    var current_index = parseInt(content.css('transform').split(',')[4]);

    // Устанавливаем ширину одной страницы
    var pageWidth = containerWidth;
    
    // Проверяем, текущая страница находится на грани
    if (current_index > -(length - 1) * pageWidth) {
        // Перемещаем на следующую страницу (вправо)
        var new_index = current_index - pageWidth;
        content.css('transform', 'translateX(' + new_index + 'px)');
    } else {
        // Если текущая страница уже последняя, перейдем на первую страницу
        content.css('transform', 'translateX(0)');
    }
});

$(".carousel").on("swiperight", function() {
    var content_wrapper = $(this).find('.carousel__content');
    var content = $(content_wrapper).children('ul');
    
    // Вычисляем ширину всего контента, включая то, что выходит за границы
    var totalWidth = $(content)[0].scrollWidth;
    
    // Получаем ширину контейнера
    var containerWidth = $(content_wrapper).width();
    
    // Вычисляем количество страниц
    var length = Math.ceil(totalWidth / containerWidth);
    
    var current_index = parseInt(content.css('transform').split(',')[4]);

    // Устанавливаем ширину одной страницы
    var pageWidth = containerWidth;
    
    // Проверяем, текущая страница находится на грани
    if (current_index < 0) {
        // Перемещаем на предыдущую страницу (влево)
        var new_index = current_index + pageWidth;
        content.css('transform', 'translateX(' + new_index + 'px)');
    } else {
        // Если текущая страница уже первая, перейдем на последнюю страницу
        var new_index = -(length - 1) * pageWidth;
        content.css('transform', 'translateX(' + new_index + 'px)');
    }
});

$('.tariffs-list').on("swiperight", function() {

});

var container = $('.articles-wrapper');
var articles = $('.articles');
var items = $('.articles__item');
var itemWidth = items.first().outerWidth();
var itemCount = items.length;
var currentIndex = 0;

var showPrev = function() {
    if (currentIndex > 0) {
        currentIndex--;
        updateNavigation();
    }
};

var showNext = function() {
    if (currentIndex < itemCount - 3) { // 3 is the number of items to show at a time
        currentIndex++;
        updateNavigation();
    }
};

var updateNavigation = function() {
    articles.css('transform', 'translateX(' + (-currentIndex * itemWidth) + 'px)');
    if (currentIndex === 0) {
        $('.articles-prev').hide();
    } else {
        $('.articles-prev').show();
    }
    if (currentIndex === itemCount - 3) {
        $('.articles-next').hide();
    } else {
        $('.articles-next').show();
    }
};

$('.articles-prev').on('click', showPrev);
$('.articles-next').on('click', showNext);
updateNavigation();

function lockScroll() {
    var scrollPosition = [
      self.pageXOffset ||
        document.documentElement.scrollLeft ||
        document.body.scrollLeft,
      self.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop,
    ];
    var html = jQuery("html"); // it would make more sense to apply this to body, but IE7 won't have that
    html.data("scroll-position", scrollPosition);
    html.data("previous-overflow", html.css("overflow"));
    html.css("overflow", "hidden");
    window.scrollTo(scrollPosition[0], scrollPosition[1]);
  }
  
  function unlockScroll() {
    var html = jQuery("html");
    var scrollPosition = html.data("scroll-position");
    html.css("overflow", html.data("previous-overflow"));
    window.scrollTo(scrollPosition[0], scrollPosition[1]);
  }