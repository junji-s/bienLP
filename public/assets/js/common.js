$(function () {
  // ********************************
  // ページ内スクロール
  // ********************************
  $('a[href^="#"]').click(function () {
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top - 100;
    var speed = 500;
    $("html, body").animate({
      scrollTop: position
    }, speed, "swing");
    return false;
  });


  // ********************************
  // ハンバーガーボタン
  // ********************************
  //モーダルを開いた時のスクロール位置を保持
  var scrollValue;
  var userAgent = window.navigator.userAgent.toLowerCase();
  var ios = userAgent.indexOf('iphone') > -1 || userAgent.indexOf('ipad') > -1 || userAgent.indexOf('macintosh') > -1 && 'ontouchend' in document;

  // bodyのスクロール固定関数を作成
  function sclollRock() {
    scrollValue = $(window).scrollTop();               // メニューが開いていない状態（未ロック）のスクロール量を計算
    if (ios) {
      $('body').css('position', 'fixed');              // fixedで固定させる
      $('body').css('top', '-' + scrollValue + 'px');   // topからの位置を現在値に指定する
    } else {
      $('body').addClass('is_scrollRock');             // overflow: hiddenを付与
    }
  }
  // スクロール固定を解除する関数を作成
  function sclollUnrock() {
    if (ios) {
      $('body').css('position', '');                    // position:fixedを解除
      $('body').css('top', '');
      $(window).scrollTop(scrollValue);                 // position解除で失われるスクロール量分下方向に移動
    } else {
      $('body').removeClass('is_scrollRock');           // overflow: hiddenを解除
    }
  }

  // ボタンクリックで各要素のクラスつけ外し
  var btn = $('.ly_hamburgerbtn ,.js_hamburgerbtn_line');
  var menu = $('.ly_header');
  var link = $('.el_header_list > a , .el_close_btn');

  $('.js_hamburgerbtn').on('click', function () {
    btn.toggleClass('is_click');
    menu.toggleClass('is_open').fadeToggle();

    if (btn.hasClass('is_click')) {
      sclollRock()
      $('body').css('padding-right', '15px');
    } else {
      sclollUnrock()
      $('body').css('padding-right', '0');
    }
  })

  link.on('click', function () {
    menu.hide();
    btn.toggleClass('is_click');
    menu.toggleClass('is_open');

    if (btn.hasClass('is_click')) {
      sclollRock()
      $('body').css('padding-right', '15px');
    } else {
      sclollUnrock()
      $('body').css('padding-right', '0');
    }
  })

  // ********************************
  // タブメニュー 
  // ********************************
  $(".js_tab_menu_box:not(:first-of-type)").css("display", "none");

  // タブの制御
  $('.js_tab_btn').on('click', function () {
    var index = $('.js_tab_btn').index(this);
    $('.js_tab_btn').removeClass('is_tab_current');
    $(this).addClass('is_tab_current');
    // コンテンツの制御
    $('.js_tab_menu_box').hide().eq(index).fadeIn();
  });


  $(".tab_menuhow_box:not(:first-of-type)").css("display", "none");
  $('.tab_btn_how').on('click', function () {
    var index = $('.tab_btn_how').index(this);
    $('.tab_btn_how').removeClass('is_tab_how_current');
    $(this).addClass('is_tab_how_current');
    // コンテンツの制御
    $('.tab_menuhow_box').hide().eq(index).fadeIn();
  });


  // ********************************
  // アコーディオン
  // ********************************
  $('.ac_child').css("display", "none");
  $('.ac_parent').on('click', function () {
    //openクラスをつける
    $(this).toggleClass('is_open', 800);
    //クリックされていないac_parentのopenクラスを取る
    $(".ac_parent").not(this).removeClass("is_open");
    $(this).next().slideToggle();
    $('.ac_parent').not($(this)).next('.ac_child').slideUp();
  })


  // ********************************
  // スクロールフェードアニメーション
  // ********************************
  $(window).scroll(function () {
    $(".scroll_block").each(function () {
      var scroll = $(window).scrollTop();
      var blockPosition = $(this).offset().top;
      var windowHeihgt = $(window).height();
      if (scroll > blockPosition - windowHeihgt) {
        $(this).addClass("is_blockIn");
      }
    });
  });
});