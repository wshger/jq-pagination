'use strict';

$.fn.extend({
	pagination: function pagination(_object_cfg) {
		var _ = this;
		_.fun = {
			init: function init() {
				_.par = {
					btn: false, //是否出现...
					count: 30, //拿到的总页数
					currentPage: 1, //当前页
					numsPerPage: 5, //一页显示多少数据
					allowPage: 7, //允许分页个数，
					back: null //回调函数
				};
				_.cfg = $.extend(true, {}, _.par, _object_cfg); //初始化参数
				_.fun.countPage();
			},
			countPage: function countPage() {
				var int_allPage = Math.ceil(_.cfg.count / _.cfg.numsPerPage); //一共有几页
				var int_allowPage = _.cfg.allowPage; //允许显示几页
				var int_currentPage = parseInt(_.cfg.currentPage); //当前页
				var int_init = 1; //初始化页数
				var int_leftNum = 0 == int_allowPage % 2 ? int_allowPage / 2 : (int_allowPage - 1) / 2;
				var int_rightNum = int_allowPage - 1 - int_leftNum; //3
				var int_lastNum = int_allPage - int_rightNum;
				_.find('a.aitem').remove();
				if (int_allowPage < int_allPage) {
					if (int_currentPage > (0 == int_allowPage % 2 ? int_leftNum + 1 : int_leftNum)) {
						int_init = int_currentPage - int_leftNum; //2
						int_allowPage = int_currentPage - (0 == int_allowPage % 2 ? int_leftNum : int_leftNum + 1) + (0 == int_allowPage % 2 ? int_allowPage - 1 : int_allowPage);
						if (int_currentPage + int_rightNum >= int_allPage) {
							int_init = int_lastNum - int_leftNum;
							int_allowPage = int_allPage;
						}
					}
				} else {
					int_allowPage = int_allPage;
				}
				// 遍历循环出分页的个数
				var allWidth = 0;
				var aWidth = 0;
				for (; int_init <= int_allowPage; int_init++) {
					if (!_.find('.left-chevron').next().hasClass('item')) {
						$('<a class="item aitem">' + int_init + '</a>').insertAfter(_.find('.left-chevron'));
					} else {
						$('<a class="item aitem">' + int_init + '</a>').insertBefore(_.find('.right-chevron'));
					}
					aWidth = parseInt($('a').outerWidth(true));
					allWidth += aWidth;
				}
				if (_.cfg.btn) {
					allWidth += 2 * aWidth;
				}
				allWidth += 2 * aWidth;
				// 设置控件的宽度
				_.css('width', allWidth);
				// 分页逻辑
				if (int_currentPage <= int_leftNum) {
					_.find('a.item.aitem').eq(int_currentPage - 1).addClass('active');
				} else if (int_allPage - int_currentPage < int_rightNum) {
					_.find('a.item.aitem').eq(int_currentPage - int_init).addClass('active');
				} else {
					_.find('a.item.aitem').eq(int_leftNum).addClass('active');
				}
				_.find('a.item').off('click').click(_.fun.method);
				if (_.cfg.btn) {
					if (int_allowPage < int_allPage) {
						$('<a>', { class: 'item aitem', html: '...' }).insertBefore(_.find('.right-chevron'));
					}
					if (int_currentPage > int_leftNum + 1) {
						$('<a>', { class: 'item aitem', html: '...' }).insertAfter(_.find('.left-chevron'));
					}
				}
				if (int_currentPage == int_allPage) {
					_.find('.right-chevron').off('click').addClass('disabled');
				} else {
					_.find('.right-chevron').removeClass('disabled');
				}
				if (1 == int_currentPage) {
					_.find('.left-chevron').off('click').addClass('disabled');
				} else {
					_.find('.left-chevron').removeClass('disabled');
				}
			},
			method: function method() {
				var int_active = parseInt(_.find('a.item.aitem.active').text());
				if (0 == $(this).index()) {
					int_active = int_active - 1;
				} else if (_.find('.item').length - 1 == $(this).index()) {
					int_active = int_active + 1;
				} else {
					int_active = $(this).text();
				}
				_.cfg = $.extend(true, {}, _.cfg, { currentPage: int_active });
				_.pagination(_.cfg);
				_.cfg.back(_.cfg.currentPage); //执行回调
			}
		};
		_.fun.init();
	}
});