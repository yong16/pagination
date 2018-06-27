 /*** 
    * currPage: '1',              // 当前页
    * totalPage: '30',            // 总页数
    * fnCallback: function(){},   // 回调函数
  ***/
;(function($){
  $.fn.pagin = function(options){
    var defaults = {
        currPage: "1",
        totalPage: "30",
        fnCallback: function(){}
    };
    var opts = $.extend(true, defaults || {}, options || {});
    var self = this;
    var $pagin = $('.pagin');
    function page(currPage,totalPage,fnCallback) {
      var result = '';
      if(currPage == 1){
          result += '<span class="pagin-first disabled" href="javascript:;" title="已经是首页了">首页</span>' +
                    '<span class="pagin-prev disabled" title="没有上一页了">上一页</span>';
      }else{
          result += '<span class="pagin-first" href="javascript:;">首页</span>' +
                    '<span class="pagin-prev" href="javascript:;" title="上一页">上一页</span>';
      }

      //页数小于等于5的时候
      if(totalPage <= 5){
        for(var i = 1; i <= totalPage; i++){
          addToHtml(i);
        }
      }else if(currPage <= 3){
        for(var i = 1; i <= 5; i++){
          addToHtml(i);
        }
      }else if(currPage > 3 && currPage <= (totalPage - 3)){
          for (var i = currPage - 2; i <= currPage + 2; i++) {
          addToHtml(i);
        }
      }else if(currPage == totalPage){
        for(var i = (totalPage - 4); i <= totalPage; i++){
          addToHtml(i);
        }
      }else{
        for(var i = (totalPage - 4); i <= totalPage; i++){
          addToHtml(i);
        }
      }

      function addToHtml(i) {
        if(currPage == i){
          result += '<a class="curr" href="javascript:;">'+i+'</a>';
        }else{
          result += '<a href="javascript:;">'+i+'</a>';
        }
      }
      
      if(currPage < totalPage){
        result += '<span class="pagin-next" href="javascript:;" title="下一页">下一页</span>' +
                  '<span class="pagin-last" href="javascript:;">尾页</span>';
      }else{
        result += '<span class="pagin-next disabled" title="没有下一页了">下一页</span>' + 
                  '<span class="pagin-last disabled" href="javascript:;" title="已经是尾页了">尾页</span>';
      }
      result += '<div class="pagin-go">跳转至<input type="text" >页</div>';
      $pagin.html(result);
      fnCallback();
    }

    //初始化
    page(opts.currPage,opts.totalPage,opts.fnCallback);
    //跳到首页
    $pagin.on('click','.pagin-first',function(){
      if(!$(this).hasClass('disabled')){
        page(1,opts.totalPage,opts.fnCallback);
      }
    })
    //点击页数切换数据
    $pagin.on('click','a',function(){
      opts.currPage = parseInt($(this).text());
      page(opts.currPage,opts.totalPage,opts.fnCallback);
    })
    //点击上一页切换数据
    $pagin.on('click','.pagin-prev',function(){
      if(!$(this).hasClass('disabled')){
        opts.currPage = parseInt($pagin.find('.curr').text()) - 1;
        page(opts.currPage,opts.totalPage,opts.fnCallback);
      }
    })
    //点击下一页切换数据
    $pagin.on('click','.pagin-next',function(){
      if(!$(this).hasClass('disabled')){
        opts.currPage = parseInt($pagin.find('.curr').text()) + 1 ;
        page(opts.currPage,opts.totalPage,opts.fnCallback);
      }
    })
    //跳到尾页
    $pagin.on('click','.pagin-last',function(){
      if(!$(this).hasClass('disabled')){
        page(opts.totalPage,opts.totalPage,opts.fnCallback);
      }
    })
    //输入跳转
    $pagin.on('keypress','.pagin-go input',function(e){
      var $this =$(this);
      var val = +$this.val();
      if (e.keyCode == 13) {
        page(val,opts.totalPage,opts.fnCallback);
      }
    });
  }
})(jQuery);