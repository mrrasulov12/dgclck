var Format = 1,
TimeHolder = 0,
stopChecker = 0;


function SetDay(DD){
    $(".weekDays span:nth-child(" + ((DD + 1) % 7) + ")").addClass('active')
}

function resetTimer(){
    $('.S1').removeClass().addClass('S1 show0')
    $('.S2').removeClass().addClass('S2 show0')

    $('.M1').removeClass().addClass('M1 show0')
    $('.M2').removeClass().addClass('M2 show0')

    $('.H1').removeClass().addClass('H1 show0')
    $('.H2').removeClass().addClass('H2 show0')
}

function Run24hr(S1,S2,M1,M2,H1,H2){
    $('.S1').removeClass().addClass('S1 show' + S1)
    $('.S2').removeClass().addClass('S2 show' + S2)

    $('.M1').removeClass().addClass('M1 show' + M1)
    $('.M2').removeClass().addClass('M2 show' + M2)

    $('.H1').removeClass().addClass('H1 show' + H1)
    $('.H2').removeClass().addClass('H2 show' + H2)
}

function Run12hr(S1,S2,M1,M2,HH){
    if(HH>12){
        HH = HH - 12
        $(".formats span:nth-child(2)").addClass('active');
    }

    else{
        $(".formats span:nth-child(1)").addClass('active');
    }

    var H1 = Math.floor(HH/10),
        H2 = HH%10

    $('.S1').removeClass().addClass('S1 show' + S1)
    $('.S2').removeClass().addClass('S2 show' + S2)

    $('.M1').removeClass().addClass('M1 show' + M1)
    $('.M2').removeClass().addClass('M2 show' + M2)

    if(H1 === 0){
        $('.H1').fadeOut(0)
    }
    else{
        $('.H1').fadeIn().removeClass().addClass('H1 show' + H1)
    }
    $('.H2').removeClass().addClass('H2 show' + H2)
}

function StopWatch(TimeHolder){
    var HH = Math.floor(TimeHolder/3600),
        MM = Math.floor((TimeHolder - (HH*3600)) / 60),
        SS = Math.floor(TimeHolder - HH*3600 - MM*60)

        var S1 = Math.floor(SS/10)
            S2 = SS%10,
            M1 = Math.floor(MM/10),
            M2 = MM%10,
            H1 = Math.floor(HH/10),
            H2 = HH%10;
        Run24hr(S1,S2,M1,M2,H1,H2)
}



function update_time(){
    var dt = new Date(),
        HH = dt.getHours(),
        MM = dt.getMinutes(),
        SS = dt.getSeconds(),
        DD = dt.getDay();

        SetDay(DD)

        var S1 = Math.floor(SS/10)
            S2 = SS%10,
            M1 = Math.floor(MM/10),
            M2 = MM%10,
            H1 = Math.floor(HH/10),
            H2 = HH%10;

            if(Format === 1){
                Run24hr(S1,S2,M1,M2,H1,H2);
            }

            else if(Format === 2){
                Run12hr(S1,S2,M1,M2,HH);
            }
            else if(Format === 3 && stopChecker === 0){
                TimeHolder++
                StopWatch(TimeHolder)
            }
            else if(Format === 4 && stopChecker === 0){
                TimeHolder--
                AlarmOut()
            }
            else{
                StopWatch(TimeHolder)
            }

            setTimeout(update_time,1000)
}

$('.type span').on('click', function(){
    $('.type .active').removeClass('active');
    $(this).addClass('active');

    var T  = $(this).html()
    if(T === '24hr'){
        Format = 1;
        $('.H1').fadeIn();
        $('.formats span').removeClass('active')
    }
    else{
        Format = 2
    }
})

$('.fa-stopwatch').on('click',function(){
    $('body').removeClass('.BgAnimation')
    $('.H1').fadeIn()
    if( !($('.timeHolder').hasClass('StopWatch'))){
        Format = 3;
        resetTimer()
        stopChecker = 1
        $('.timeHolder').removeClass().addClass('.timeHolder StopWatch')
        $('.numbers').fadeIn(0)
        $('.pause').removeClass('active')
        $('.start').addClass('active')
        TimeHolder = 0
    }
})

$('.fa-solid.fa-clock').on('click', function(){
    $('body').removeClass('.BgAnimation')

    if(($('.type .active').html()) === '12hr'){
        Format = 2;
    }
    else{
        Format = 1;
    }

    stopChecker = 0
    $('.timeHolder').removeClass().addClass('.timeHolder')
    $('.numbers').fadeIn(0)
})

update_time()