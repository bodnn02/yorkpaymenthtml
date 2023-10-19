$(".answers-list__expand-btn").on('click', function(e) {
    $(this).closest(".answers-list__item").toggleClass('expanded');
});
$(".m-btn").on('click', function(e) {
    $('.m-btn').addClass('opened')
    $(".m-overlay").addClass('opened')
    $(".m-menu").addClass('opened')
});
$(".m-menu__close-btn").on('click', function(e) {
    $('.m-btn').removeClass('opened')
    $(".m-overlay").removeClass('opened')
    $(".m-menu").removeClass('opened')
});