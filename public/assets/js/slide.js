$(function () {
  $(function () {
    // 必要な変数設定
    var slideRail = $('.bl_carousel_rail');
    var slideLength = slideRail.children().length; // スライド枚数
    var showNum = 1;

    // ********************************************************** //
    // 2スライド移動で不自然な挙動にならないようにclone()で擬似的なスライドを生成
    $('.ly_slide_block:nth-of-type(1)').clone().appendTo(slideRail);
    $('.ly_slide_block:nth-of-type(2)').clone().appendTo(slideRail);
    $('.ly_slide_block:nth-of-type(3)').clone().appendTo(slideRail);
    $('.ly_slide_block:nth-of-type(3)').clone().appendTo(slideRail);
    $('.ly_slide_block:nth-of-type(4)').clone().appendTo(slideRail);
    $('.ly_slide_block:nth-of-type(6)').clone().appendTo(slideRail);


    // ********************************************************** //
    // カルーセルの動かし方
    // ---1スライド分の移動
    // 左回り(差分で-100%分移動させる)
    function rotation() {
      slideRail.animate({ left: '-800%' }, 500, 'swing',       // 初期位置-700％を基準にどこまで動かすか
        function () {
          slideRail.css('left', '-700%');                      // 初期位置に戻してズレを修正
          slideRail.append($('.js_slideRail > li:first-of-type'));
          navMove();  // ナビゲーションカレントの移動関数
        });
    }
    // 右回り(差分で100%分移動させる)
    function reverseRotation() {
      slideRail.animate({ left: '-100%' }, 500, 'swing',       // 初期位置-200％を基準にどこまで動かすか
        function () {
          slideRail.css('left', '-200%');                      // 初期位置に戻してズレを修正
          slideRail.prepend($('.js_slideRail > li:last-of-type'));
          reverseNavMove();  // ナビゲーションカレントの移動関数
        });
    }

    // ---2スライド分の移動
    // 左回り
    function rotationDouble() {
      slideRail.animate({ left: '-400%' }, 500, 'swing',       // 初期位置-200％を基準にどこまで動かすか
        function () {
          slideRail.css('left', '-200%');                      // 初期位置に戻してズレを修正
          // 1番目と2番目を移動させたいが、1番目を移動させた瞬間2番目だった要素も1番目になってしまうため、1番目を二つappendする
          slideRail.append($('.js_slideRail > li:nth-of-type(1)'));
          slideRail.append($('.js_slideRail > li:nth-of-type(1)'));
          navMoveDouble();  // ナビゲーションカレントの移動関数
        });
    }


    // appendで移動したと同時に
    // 右回り
    function reverseRotationDouble() {
      slideRail.animate({ left: '0' }, 500, 'swing',           // 初期位置-200％を基準にどこまで動かすか
        function () {
          slideRail.css('left', '-200%');                      // 初期位置に戻してズレを修正
          // 1番目と2番目を移動させたいが、1番目を移動させた瞬間2番目だった要素も1番目になってしまうため、1番目を二つprependする
          slideRail.prepend($('.js_slideRail > li:last-of-type'));
          slideRail.prepend($('.js_slideRail > li:last-of-type'));
          reverseNavMoveDouble();  // ナビゲーションカレントの移動関数
        });
    }


    // ********************************************************** //
    // ナビのカレント移動を設定する関数
    function currentMove() {
      $('.js_slideNav_btn').removeClass('is_target');
      $('.js_slideNav_btn:nth-of-type(' + showNum + ')').addClass('is_target');
    }

    // ---1スライド分の移動
    // 左回り
    function navMove() {
      if (showNum < slideLength) {
        showNum = showNum + 1
      } else {
        showNum = 1
      }
      currentMove();
    }
    // 右回り
    function reverseNavMove() {
      if (showNum == 1) {
        showNum = showNum + 2;
      } else {
        showNum = showNum - 1;
      }
      currentMove();
    }

    // ---2スライド分の移動
    // 左回り
    function navMoveDouble() {
      if (showNum < slideLength) {
        showNum = showNum + 2
      } else {
        showNum = 1
      }
      currentMove();
    }

    // 右回り
    function reverseNavMoveDouble() {
      if (showNum == 3) {
        showNum = showNum - 2
      } else {
        showNum = 3
      }
      currentMove();
    }



    // ********************************************************** //
    // 自動スライド送りの関数
    var timer;
    function startTimer() {
      timer = setInterval(function () {
        rotation();    // スライド送りの関数（基本：左回り）
      }, 3500);
    }
    // ---自動タイマー実行
    startTimer();

    // ナビボタンクリック時にタイマーを留める関数
    function stopTimer() {
      clearInterval(timer);
    }


    // ********************************************************** //
    // ナビボタンの番号に合わせたスライド移動
    $('.js_slideNav_btn').on('click', function () {
      stopTimer();
      startTimer();
      // クリックしたナビにカレント設定
      var clickNum = $(this).index() + 1;
      $('.js_slideNav_btn').removeClass('is_target');
      $('.js_slideNav_btn:nth-of-type(' + clickNum + ')').addClass('is_target');

      difference = clickNum - showNum;

      if (difference == 1) {
        // 右一つ隣
        rotation();
      } else if (difference == -1) {
        // 左一つ隣
        reverseRotation();
      }

      if (difference == 2) {
        // 右2つ隣
        rotationDouble();
      } else if (difference == -2) {
        // 左二つ隣
        reverseRotationDouble();
      }
    });
  });
});