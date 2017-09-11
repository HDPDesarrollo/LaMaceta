$(document).ready(function(){

    $(".slides ul").cycle({
        fx: 'scrollHorz',
        slides: '> li',
        swipe: true,
        pager: '.slides .nav',
        speed: 1000,
        manualSpeed: 300,
        timeout: 3000,
        lookahead: true
    });

});

/* SIDEBAR */
$(document).ready(function(){
    var $sidebar = $("#sidebar");

    $sidebar.on('click', function(e){
        e.stopPropagation();
    });
    $('body').on('click', '.sidebar-trigger', function(e){
        if(!$('body').hasClass('isSidebarOpen')){
            open();
            e.stopPropagation();
        }
    });

    $sidebar.on('click.menu', 'link-level-0', function(e){
        var menu = $(this).next('#topmenu ul');
        if(menu.length){
            menu.toggle();
            $(this).parent().toggleClass('isOpen');
            e.preventDefault();
        }
    });
    function open(){
        $('body').addClass('isSidebarOpen');

        $('body').on('click.sidebar', function(e){
            close();
        });

        location.hash = '#sidebar';
        $(window).on('hashchange.sidebar', function(){
            if(location.hash != '#sidebar'){
                close();
            }
        });
    }
    function close(){
        $('body').removeClass('isSidebarOpen');
        $('body').off('click.sidebar');
        $(window).off('hashchange.sidebar');
        if(location.hash == '#sidebar'){
            window.history.back();
        }
    }
});

/* CALENDAR */

$(document).ready(function() {
    $("#datepicker").datepicker();
});


