(function($) {
    "use strict";

    // Sticky Header start
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 200) {
            $(".header").addClass("stiky");
        } else {
            $(".header").removeClass("stiky");
        }
    });
    // Sticky Header End


    // Sticky sidebar start
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 380) {
            $(".conpany_info .sidebar").addClass("stiky");
        } else {
            $(".conpany_info .sidebar").removeClass("stiky");
        }
    });
    // Sticky sidebar End


    // Tasks button on phone
    $('.single_tasks_box .image_area').click(function() {
        $(this).parent().toggleClass('active');
    });
    // Tasks button on phone

    // notifications phone
    $('.noti_btn').click(function() {
        $(".notification_popup, .full_page_overlay").toggleClass('active');
    });


    $('.full_page_overlay, .notification_popup .primary_btn').click(function() {
        $(".notification_popup, .full_page_overlay").toggleClass('active');
    });

    // notifications phone


    // sideber on phone start
    $('.jump_bnt, .fill_progress li a').click(function() {
        $(".conpany_info .sidebar").toggleClass('show');
    });

    // sideber on phone end



    // Item add and remove start

    $(function() {
        // button
        const btn_clone = $('#duplicateButton');
        const btn_remove = $('#item_remove_btn');

        // clone
        btn_clone.click(function() {

            var text = $('.dup_item').last();

            text
                .clone()
                .val('')
                .insertAfter(text);

            if ($('.dup_item').length >= 2) {
                $(btn_remove).show();
            }

        });

        // remove
        btn_remove.click(function() {

            $('.dup_item')
                .last()
                .remove();

            if ($('.dup_item').length < 2) {
                btn_remove.hide();
            }

        });
    });

    $('#duplicateButton').on("click", function(e) {
        e.preventDefault();
    });
    // Item add and remove end



}(jQuery));

// Scroll effect start
document.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('.fill_progress li a');

    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            var targetId = this.getAttribute('href').substring(1);
            var targetElement = document.getElementById(targetId);

            if (targetElement) {
                var targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 150;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Scroll effect end




// Smooth scrolling start
var scrollLink = $(".scroll");

$(window).on('scroll', function() {
    var scrollbarLocation = $(this).scrollTop();

    scrollLink.each(function() {

        var sectionOffset = $(this.hash).offset().top - 350;

        if (sectionOffset <= scrollbarLocation) {
            $(this).parent().addClass("active").end().parent().siblings().removeClass("active");
        }
    })

});
// Smooth scrolling End