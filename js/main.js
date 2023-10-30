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
    $(".profile-sidebar").toggleClass('opened')
});
$(".m-menu__close-btn").on('click', function(e) {
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