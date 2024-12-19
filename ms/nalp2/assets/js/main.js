(function($) {
    "use strict";



    // Login area start
    document.querySelector('.nalp-tabbed-form').addEventListener('click', function(event) {
        event.stopPropagation();
    });

    document.querySelector('.nalp-tabbed-form-m').addEventListener('click', function(event) {
        event.stopPropagation();
    });
    // Login area end  


    // Mobile menu start

    $(".mobile-menu-btn").click(function() {
        $(".mobile-menu").toggleClass("active");
        $("body").toggleClass("overflow-hidden");
        $(".header").toggleClass("mobile-menu-active");
    });
    // Mobile menu end



    // on load animation

    // window.onload = function() {
    //     $(".hero_area").addClass("loaded");
    // };

    // on load animation

    // home Slider start

    // $(" ").owlCarousel({
    //     loop: true,
    //     autoplay: true,
    //     nav: false,
    //     dots: false,
    //     autoplayTimeout: 5000,
    //     items: 1,
    //     mouseDrag: false,
    //     animateOut: 'flipInX',
    //     animateIn: 'fadeOut',
    // });

    // home Slider end



    // menu Slider start

    // $(" ").owlCarousel({
    //     loop: true,
    //     autoplay: false,
    //     nav: true,
    //     navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
    //     dots: false,
    //     autoplayTimeout: 5000,
    //     items: 1,
    //     mouseDrag: false,
    //     smartSpeed: 2000,
    //     margin: 30,
    //     animateOut: 'flipOutX',
    // });

    // menu Slider end



    // toggleClass srart

    // $(". ").click(function () {
    //     $(". ").toggleClass("");
    // });

    // toggleClass end




    // Smooth scrolling start

    // var scrollLink = $(".scroll");

    // scrollLink.on('click', function (e) {
    //     e.preventDefault();
    //     $("body,html").animate({
    //         scrollTop: $(this.hash).offset().top
    //     }, 1000, );
    // });

    // Smooth scrolling End




    // scroll up add class start

    // $(document).ready(function () {
    //     $(window).scroll(function () {
    //         if ($(document).scrollTop() > 100) {
    //             $(".header").addClass("stiky");
    //         } else {
    //             $(".header").removeClass("stiky");
    //         }
    //     });
    // });

    // scroll up add class end



}(jQuery));