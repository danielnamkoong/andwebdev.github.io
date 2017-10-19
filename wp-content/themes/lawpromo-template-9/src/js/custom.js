"use strict";

// 	To shorten the JS use "EGGHEAD : Lindquist : EX2 : 01-egghead-arrow-function"


// 	LEFT BTN
jQuery(document).ready(function () {
	jQuery("#leftSide_Btn").click(function () {
		jQuery(".left_Wrapper").toggleClass("leftSide_Show");
		jQuery(".right_Wrapper").toggleClass("rightSide_Hide");

		jQuery(".leftContainer").removeClass("overflowY_Hidden");
		jQuery("body").toggleClass("overflowY_Hidden");

		// 	When Left Btn Clicked, hide landingTitle
		jQuery(".landingTitle").toggleClass("stayOnRight");

		jQuery(".aboutHome").toggleClass("showHome");
	});
});

// 	RIGHT BTN
jQuery(document).ready(function () {
	jQuery(".title_Container, #rightSide_Btn").click(function () {

		// var getProgressBarHeight = jQuery("#progressBar").height();
		// console.log("getProgressBarHeight " + getProgressBarHeight);

		// 	ARROW : Right Side Button
		jQuery("#rightSide_Btn button i").toggleClass("flip");

		jQuery(".right_Wrapper").toggleClass("rightSide_Show");
		jQuery(".left_Wrapper").toggleClass("leftSide_Hide");

		jQuery(".leftContainer").toggleClass("overflowY_Hidden");
		jQuery("body").toggleClass("overflowY_Hidden");

		// 	When Right Side X Clicked > Make All right side content scroll to top		
		jQuery('.rightContainer .imgContent article').scrollTop(0);

		// 	Toggle GrayScale for HOME > RIGHT SIDE > IMG
		jQuery(".page1, .page2, .page3, .page4, .page5, .page6").toggleClass("noGray");
	});
});

// 	ANCHOR BUTTONS
jQuery(document).ready(function () {

	var documentHeight1 = jQuery(document).height();
	var windowHeight1 = jQuery(window).height();
	// console.log("----------------------------");
	// console.log("documentHeight1 " + documentHeight1);
	// console.log("windowHeight1 " + windowHeight1);


	// 	When "anchor#" clicked, getTrackHeight
	function getTrackHeight(percent) {
		var trackHeight = (documentHeight1 - windowHeight1) * percent;
		window.scrollTo(0, trackHeight);
	}
	//  Reset RightPage ProgressBar
	function reset_RightPage_ProgressBar() {
		jQuery('.progressBar_rightPage').css("height", "0%");
	}
	// 	ScrollToTop right page content when transforming to next page
	function scrollToTop_RightPage_Content(article) {
		jQuery('.rightContainer .imgContent .article' + article).scrollTop(0);
	}
	// 	Transform Up, Right Pages Content
	function transformUp_RightPageImgAndContent(percent) {
		jQuery(".imgContent").css("transform", "translate(0," + percent + "%)");
	}

	// 	ANCHOR 1
	jQuery(".anchor1").click(function () {
		// 	Set Height : 10%
		getTrackHeight(.1);
		// var windowScrollTo  = jQuery(window).scrollTop();
		// console.log("windowScrollTo " + windowScrollTo);

		//  Reset RightPage ProgressBar
		reset_RightPage_ProgressBar();

		// jQuery(".imgContent").css("transform", "translate(0, 0%)");
		transformUp_RightPageImgAndContent(0);

		// 	Add Page 2 "active"
		jQuery(".page1, .content1").addClass("active");

		return false;
	});

	// 	ANCHOR 2
	jQuery(".anchor2").click(function () {
		// 	Set Height : 30%
		getTrackHeight(.3);
		// var windowScrollTo  = jQuery(window).scrollTop();
		// console.log("windowScrollTo " + windowScrollTo);

		//  Reset RightPage ProgressBar
		reset_RightPage_ProgressBar();

		// 	Transform Up Right Page
		transformUp_RightPageImgAndContent(-100);

		// 	Remove Page 1 "active"
		jQuery(".page1, .content1").removeClass("active");
		// 	Add Page 2 "active"
		jQuery(".page2, .content2").addClass("active");

		return false;
	});

	// 	ANCHOR 3
	jQuery(".anchor3").click(function () {
		// 	Set Height : 50%
		getTrackHeight(.5);
		// var windowScrollTo  = jQuery(window).scrollTop();
		// console.log("windowScrollTo " + windowScrollTo);

		//  Reset RightPage ProgressBar
		reset_RightPage_ProgressBar();

		// 	Transform Up Right Page
		transformUp_RightPageImgAndContent(-200);

		// 	Remove Page 2 "active"
		jQuery(".page2, .content2").removeClass("active");
		// 	Add Page 3 "active"
		jQuery(".page3, .content3").addClass("active");

		return false;
	});

	// 	ANCHOR 4
	jQuery(".anchor4").click(function () {
		// 	Set Height : 70%
		getTrackHeight(.7);
		// var windowScrollTo  = jQuery(window).scrollTop();
		// console.log("windowScrollTo " + windowScrollTo);

		//  Reset RightPage ProgressBar
		reset_RightPage_ProgressBar();

		// 	Transform Up Right Page
		transformUp_RightPageImgAndContent(-300);

		// 	Remove Page 2 "active"
		jQuery(".page3, .content3").removeClass("active");
		// 	Add Page 3 "active"
		jQuery(".page4, .content4").addClass("active");

		return false;
	});

	// 	ANCHOR 5
	jQuery(".anchor5").click(function () {
		// 	Set Height : 90%
		getTrackHeight(.9);
		// var windowScrollTo  = jQuery(window).scrollTop();
		// console.log("windowScrollTo " + windowScrollTo);

		//  Reset RightPage ProgressBar
		reset_RightPage_ProgressBar();

		// 	Transform Up Right Page
		transformUp_RightPageImgAndContent(-400);

		// 	Remove Page 2 "active"
		jQuery(".page4, .content4").removeClass("active");
		// 	Add Page 3 "active"
		jQuery(".page5, .content5").addClass("active");

		return false;
	});

	// 	ANCHOR 6
	jQuery(".anchor_Home").click(function () {
		// 	Set Height : 10%
		getTrackHeight(.1);
		// var windowScrollTo  = jQuery(window).scrollTop();
		// console.log("windowScrollTo " + windowScrollTo);

		//  Reset RightPage ProgressBar
		reset_RightPage_ProgressBar();

		// 	ScrollToTop right page contents
		jQuery('.rightContainer .imgContent article').scrollTop(0);

		// 	Transform Up Right Page
		transformUp_RightPageImgAndContent(0);

		// 	Remove Page 2 "active"
		jQuery(".page5, .content5").removeClass("active");
		// 	Add Page 3 "active"
		jQuery(".page1, .content1").addClass("active");

		return false;
	});
});

// 	PROGRESS BAR 2 / LANDING PAGE
jQuery(document).ready(function () {
	jQuery(".article1, .article2, .article3, .article4, .article5").scroll(function () {
		var distanceToTop2 = jQuery(this).scrollTop();
		var documentHeight2 = jQuery(".imgContent article .content.active").height();
		var windowHeight2 = jQuery(this).height();
		// console.log("----------------------------");
		// console.log("distanceToTop2 " + distanceToTop2);
		// console.log("documentHeight2 " + documentHeight2);
		// console.log("windowHeight2 " + windowHeight2);


		// 	100 from padding ".rightContainer .imgContent article .content"
		var percentScrolled2 = distanceToTop2 / (documentHeight2 + 100 - windowHeight2) * 100;
		jQuery('.progressBar_rightPage').css({ 'height': percentScrolled2 + '%' });
		// console.log("percentScrolled2 " + percentScrolled2);
	});
});

// 	PROGRESS BAR 1 / RIGHT SIDE PAGES
jQuery(document).ready(function () {
	// 	1st Image / Page Content : Active / Display Block
	jQuery(".content1").addClass("active"); // was jQuery(".page1").addClass("active");
	jQuery(".imgFix_ContentScroll .contents article:first-of-type").addClass("show");

	// 	PROGRESS BAR 1
	jQuery(window).scroll(function () {
		var distanceToTop = jQuery(this).scrollTop();
		var documentHeight = jQuery(document).height();
		var windowHeight = jQuery(this).height();
		// console.log("----------------------------");
		// console.log("distanceToTop " + distanceToTop);
		// console.log("documentHeight " + documentHeight);
		// console.log("windowHeight " + windowHeight);

		// 	PROGRESS BAR 1
		var percentScrolled = distanceToTop / (documentHeight - windowHeight) * 100;
		jQuery('#progressBar').css({ 'height': percentScrolled + '%' });
		// console.log("percentScrolled " + percentScrolled);


		// 	Transform Up, Landing Page Title and Subtitle
		function transformUp_PageTitle(percent) {
			jQuery(".titleView, .subTitleView").css("transform", "translate(0," + percent + "%)");
		}
		// 	Transform Up, Right Pages Content
		function transformUp_RightPageImgAndContent(percent) {
			jQuery(".imgContent").css("transform", "translate(0," + percent + "%)");
		}

		//**************************************** 	RIGHT SIDE PAGES
		// 	PAGE ONE
		if (percentScrolled >= 0 && percentScrolled < 19.9) {
			//***** Left Side
			transformUp_PageTitle(0);

			//***** Right Side
			//	Img & Content
			// jQuery(".imgContent").css("transform", "translate(0, 0%)");
			transformUp_RightPageImgAndContent(0);

			jQuery(".content1").addClass("active");
		} else {
			jQuery(".content1").removeClass("active");
		};

		// 	PAGE TWO
		if (percentScrolled > 20 && percentScrolled < 39.9) {
			//***** Left Side
			transformUp_PageTitle(-100);

			//***** Right Side
			//	Img & Content
			transformUp_RightPageImgAndContent(-100);

			jQuery(".content2").addClass("active");
		} else {
			jQuery(".content2").removeClass("active");
		};

		// 	PAGE THREE
		if (percentScrolled > 40 && percentScrolled < 59.9) {
			//***** Left Side
			transformUp_PageTitle(-200);

			//***** Right Side
			//	Img & Content
			transformUp_RightPageImgAndContent(-200);

			jQuery(".content3").addClass("active");
		} else {
			jQuery(".content3").removeClass("active");
		};

		// 	PAGE FOUR
		if (percentScrolled > 60 && percentScrolled < 79.9) {
			//***** Left Side
			transformUp_PageTitle(-300);

			//***** Right Side
			//	Img & Content
			transformUp_RightPageImgAndContent(-300);

			jQuery(".content4").addClass("active");
		} else {
			jQuery(".content4").removeClass("active");
		};

		// 	PAGE FIVE
		if (percentScrolled > 80 && percentScrolled <= 100) {
			//***** Left Side
			transformUp_PageTitle(-400);

			//***** Right Side
			//	Img & Content
			transformUp_RightPageImgAndContent(-400);

			jQuery(".content5").addClass("active");
		} else {
			jQuery(".content5").removeClass("active");
		};
	});
});