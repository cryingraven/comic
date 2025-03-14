# API Endpoints

## General

- **GET /**
  - Description: Get home page.
  - Response: `{ status: 'success', message: 'Parcel Pending API', data: { 'version_number': 'v1.0.1-e38d1ac+1' } }`

- **GET /api/restart/:p**
  - Description: Restart the process.
  - Controller: `processController.restart`

- **POST /api/verify_token**
  - Description: Verify token.
  - Middleware: `middleware.verifyToken`

- **GET /share/:model/:id**
  - Description: Redirect to app.
  - Controller: `shareController.redirectToApp`

- **POST /api/update_comic_share_count**
  - Description: Update comic share count.
  - Controller: `shareController.updateComicShareCount`

## Upload

- **POST /upload/image_single**
  - Description: Upload single image.
  - Middleware: `middleware.checkToken`
  - Controller: `uploadController.uploadSingleImage`

- **POST /upload/sticker_thumbnail**
  - Description: Upload sticker thumbnail.
  - Middleware: `middleware.checkToken`
  - Controller: `uploadController.uploadStickerThumbnail`

- **POST /upload/sticker_main_image**
  - Description: Upload sticker main image.
  - Middleware: `middleware.checkToken`
  - Controller: `uploadController.uploadStickerMainImage`

- **POST /upload/media_single**
  - Description: Upload single media.
  - Middleware: `middleware.checkToken`
  - Controller: `uploadController.uploadSingleMedia`

- **POST /upload/content_image**
  - Description: Upload content image.
  - Middleware: `middleware.checkToken`
  - Controller: `uploadController.uploadContentImageV2`

- **POST /upload/sticker_detail**
  - Description: Upload sticker detail.
  - Middleware: `middleware.checkToken`
  - Controller: `uploadController.uploadStickerDetail`

- **POST /upload/coupon_banner_image**
  - Description: Upload coupon banner.
  - Middleware: `middleware.checkToken`
  - Controller: `uploadController.uploadCouponBanner`

- **POST /upload/coupon_coupon_image**
  - Description: Upload coupon coupon.
  - Middleware: `middleware.checkToken`
  - Controller: `uploadController.uploadCouponCoupon`

- **POST /upload/image_single_to_space**
  - Description: Upload single image to space.
  - Middleware: `middleware.checkToken`
  - Controller: `uploadController.uploadSingleImageToSpace`

- **POST /upload/image_single_to_space_with_folder_name**
  - Description: Upload single image to space with folder name.
  - Middleware: `middleware.checkToken`
  - Controller: `uploadController.uploadSingleImageToSpaceWithFolderName`

- **POST /api/get_image_base_path**
  - Description: Get image base path.
  - Controller: `uploadController.getImageBasePath`

- **POST /api/upload_profile_picture**
  - Description: Upload profile picture.
  - Middleware: `middleware.checkToken`
  - Controller: `uploadController.uploadProfilePicture`

## Report

- **POST /api/generate_comic_report_data**
  - Description: Generate comic report data.
  - Middleware: `middleware.checkToken`
  - Controller: `reportController.generateComicReportData`

## User

- **POST /api/register**
  - Description: Register.
  - Controller: `userController.register`

- **POST /api/set_password**
  - Description: Set password.
  - Middleware: `middleware.checkToken`
  - Controller: `userController.setPassword`

- **POST /api/change_password**
  - Description: Change password.
  - Middleware: `middleware.checkToken`
  - Controller: `userController.changePassword`

- **POST /api/login**
  - Description: Login.
  - Controller: `userController.loginV2`

- **POST /api/admin_login**
  - Description: Admin login.
  - Controller: `userController.adminLogin`

- **POST /api/send_password_reset_email**
  - Description: Send password reset email.
  - Controller: `userController.sendPasswordResetEmail`

- **GET /resetpassword/:ee**
  - Description: Render reset password page.
  - Controller: `userController.renderResetPasswordPage`

- **POST /resetpassword/:ee**
  - Description: Do reset password.
  - Controller: `userController.doResetPassword`

- **POST /api/get_suspend_user_data**
  - Description: Get suspend user data.
  - Middleware: `middleware.checkToken`
  - Controller: `userController.getSuspendUserData`

- **POST /api/set_suspend_user_data**
  - Description: Set suspend user data.
  - Middleware: `middleware.checkToken`
  - Controller: `userController.setSuspendUserData`

- **POST /api/get_storefront_data**
  - Description: Get storefront data.
  - Controller: `userController.getStoreFrontData`

- **POST /api/update_status**
  - Description: Update status.
  - Controller: `userController.updateStatus`

- **POST /api/update_push_token**
  - Description: Update push token.
  - Middleware: `middleware.checkToken`
  - Controller: `userController.updatePushToken`

- **POST /api/user**
  - Description: Retrieve user list.
  - Middleware: `middleware.checkToken`
  - Controller: `userController.list`

- **GET /api/user/:id**
  - Description: Get user detail.
  - Middleware: `middleware.checkToken`
  - Controller: `userController.detail`

- **PUT /api/user/:id**
  - Description: Update user.
  - Middleware: `middleware.checkToken`
  - Controller: `userController.update`

- **PATCH /api/user/:id**
  - Description: Partial update user.
  - Middleware: `middleware.checkToken`
  - Controller: `userController.partialUpdate`

- **POST /api/user/delete_requests**
  - Description: Delete request.
  - Middleware: `middleware.rateLimit`
  - Controller: `userController.deleteRequest`

- **DELETE /api/user/:id**
  - Description: Delete user.
  - Middleware: `middleware.checkToken`
  - Controller: `userController.delete`

## Banner

- **POST /api/get_active_banners**
  - Description: Get active banners.
  - Controller: `bannerController.getActiveBanners`

- **POST /api/get_link_target_id**
  - Description: Get link target ID.
  - Controller: `bannerController.getLinkTargetID`

## Genre

- **POST /api/get_genre_list**
  - Description: Get genre list.
  - Controller: `genreController.getGenreList`

- **POST /api/get_website_genre_list**
  - Description: Get website genre list.
  - Controller: `genreController.getWebsiteGenreList`

- **POST /api/get_genre_list_for_admin**
  - Description: Get genre list for admin.
  - Middleware: `middleware.checkToken`
  - Controller: `genreController.getGenreListForAdmin`

- **POST /api/get_comic_genre**
  - Description: Get comic genre.
  - Controller: `genreController.getComicGenre`

## Country

- **POST /api/get_country_list**
  - Description: Get country list.
  - Controller: `countryController.getCountryList`

## City

- **POST /api/get_city_list**
  - Description: Get city list.
  - Controller: `cityController.getCityList`

## Comic Genre

- **POST /api/search_comic_website**
  - Description: Search comic website.
  - Controller: `comicGenreController.searchComicWebsite`

- **POST /api/get_editors_choice**
  - Description: Get editors choice.
  - Controller: `comicGenreController.getEditorsChoice`

- **POST /api/v2/get_editors_choice**
  - Description: Get editors choice V2.
  - Controller: `comicGenreController.getEditorsChoiceV2`

- **POST /api/get_hidden_gem**
  - Description: Get hidden gem.
  - Controller: `comicGenreController.getHiddenGem`

- **POST /api/v2/get_hidden_gem**
  - Description: Get hidden gem V2.
  - Controller: `comicGenreController.getHiddenGemV2`

- **POST /api/get_exclusive_comic**
  - Description: Get exclusive comic.
  - Controller: `comicGenreController.getExclusiveComic`

- **POST /api/get_premium_comic**
  - Description: Get premium comic.
  - Controller: `comicGenreController.getPremiumComic`

- **POST /api/search_comic**
  - Description: Search comic.
  - Controller: `comicGenreController.searchComicV2`

- **POST /api/get_new_release**
  - Description: Get new release.
  - Controller: `comicGenreController.getNewRelease`

- **POST /api/get_random_comic**
  - Description: Get random comic.
  - Controller: `comicGenreController.getRandomComic`

- **POST /api/get_trending_comic**
  - Description: Get trending comic.
  - Controller: `comicGenreController.getTrendingComic`

- **POST /api/get_weekly_top_comic**
  - Description: Get weekly top comic.
  - Controller: `comicGenreController.getWeeklyTopComic`

- **POST /api/get_comic_recommendation**
  - Description: Get comic recommendation.
  - Controller: `comicGenreController.getComicRecommendationV2`

- **POST /api/get_website_comic_recommendation**
  - Description: Get website comic recommendation.
  - Controller: `comicGenreController.getWebsiteComicRecommendation`

- **POST /api/assign_comic_to_homepage**
  - Description: Assign comic to homepage.
  - Middleware: `middleware.checkToken`
  - Controller: `comicGenreController.assignComicToHomepage`

- **PUT /api/comic_genre/:id**
  - Description: Update comic genre.
  - Middleware: `middleware.checkToken`
  - Controller: `comicGenreController.update`

- **DELETE /api/comic_genre/:id**
  - Description: Delete comic genre.
  - Middleware: `middleware.checkToken`
  - Controller: `comicGenreController.delete`

- **POST /api/get_exclusive_comic_list**
  - Description: Get exclusive comic list.
  - Controller: `comicGenreController.getExclusiveComicList`

## Comic

- **POST /api/get_my_comics**
  - Description: Get my comics.
  - Middleware: `middleware.checkToken`
  - Controller: `comicController.getMyComics`

- **POST /api/get_comic_detail**
  - Description: Get comic detail.
  - Controller: `comicController.getComicDetail`

- **POST /api/get_authors_comic**
  - Description: Get author's comic.
  - Controller: `comicController.getAuthorsComic`

- **POST /api/get_suspend_comic_data**
  - Description: Get suspend comic data.
  - Middleware: `middleware.checkToken`
  - Controller: `comicController.getSuspendComicData`

- **POST /api/set_suspend_comic_data**
  - Description: Set suspend comic data.
  - Middleware: `middleware.checkToken`
  - Controller: `comicController.setSuspendComicData`

- **POST /api/get_homepage_comic_data**
  - Description: Get homepage comic data.
  - Controller: `comicController.getHomepageComicData`

- **DELETE /api/comic/:id**
  - Description: Delete comic.
  - Middleware: `middleware.checkToken`
  - Controller: `comicController.delete`

- **GET /api/comics/admin**
  - Description: Get comic list for admin.
  - Middleware: `middleware.checkToken`
  - Controller: `comicController.getComicListForAdmin`

- **GET /api/comics/:id/download**
  - Description: Download comic contents.
  - Middleware: `middleware.checkToken`
  - Controller: `comicController.downloadComicContents`

## Exclusive Ads

- **GET /api/exclusive_ads/:id/comic**
  - Description: Get exclusive ads comic.
  - Middleware: `middleware.checkToken`
  - Controller: `exclusiveAdsController.getExclusiveAdsComic`

## Chapter

- **POST /api/get_chapter_detail**
  - Description: Get chapter detail.
  - Controller: `chapterController.getChapterDetail`

- **POST /api/v2/get_chapter_detail**
  - Description: Get chapter detail V2.
  - Controller: `chapterController.getChapterDetailV2`

- **POST /api/get_chapter_data**
  - Description: Get chapter data.
  - Middleware: `middleware.checkToken`
  - Controller: `chapterController.getChapterData`

- **POST /api/set_chapter_data**
  - Description: Set chapter data.
  - Middleware: `middleware.checkToken`
  - Controller: `chapterController.setChapterData`

- **POST /api/update_chapter_data**
  - Description: Update chapter data.
  - Middleware: `middleware.checkToken`
  - Controller: `chapterController.updateChapterData`

- **DELETE /api/chapter/:id**
  - Description: Delete chapter.
  - Middleware: `middleware.checkToken`
  - Controller: `chapterController.delete`

## Chapter Content

- **POST /api/update_aspect_ratio**
  - Description: Update aspect ratio.
  - Controller: `chapterContentController.updateAspectRatio`

## Chapter Like

- **POST /api/toggle_chapter_like**
  - Description: Toggle chapter like.
  - Middleware: `middleware.checkToken`
  - Controller: `chapterLikeController.toggleChapterLike`

## Chapter Read

- **POST /api/do_chapter_read**
  - Description: Do chapter read.
  - Controller: `chapterReadController.doChapterReadV2`

## User Comic Bookmark

- **POST /api/toggle_comic_bookmark**
  - Description: Toggle comic bookmark.
  - Middleware: `middleware.checkToken`
  - Controller: `userComicBookmarkController.toggleComicBookmark`

## Static Content

- **POST /api/get_static_content**
  - Description: Get static content.
  - Controller: `staticContentController.getStaticContent`

- **GET /api/static_content/report_categories**
  - Description: Get report categories.
  - Controller: `staticContentController.getReportCategories`

## Contact Us

- **POST /api/submit_contact_us**
  - Description: Submit contact us.
  - Controller: `contactUsController.submitContactUs`

## User Follow

- **POST /api/toggle_user_follow**
  - Description: Toggle user follow.
  - Middleware: `middleware.checkToken`
  - Controller: `userFollowController.toggleUserFollow`

## Statistic

- **POST /api/get_user_statistic**
  - Description: Get user statistic.
  - Middleware: `middleware.checkToken`
  - Controller: `statisticController.getCMSStatistic`

- **POST /api/get_admin_statistic**
  - Description: Get admin statistic.
  - Middleware: `middleware.checkToken`
  - Controller: `statisticController.getAdminStatistic`

- **POST /api/get_mobile_statistic**
  - Description: Get mobile statistic.
  - Middleware: `middleware.checkToken`
  - Controller: `statisticController.getMobileStatistic`

## Donation

- **GET /api/get_donation_options**
  - Description: Get donation options.
  - Controller: `donationController.getDonationOptions`

- **POST /api/get_donation_amount_options**
  - Description: Get donation amount options.
  - Controller: `donationController.getDonationAmountOptions`

- **POST /api/create_donation**
  - Description: Create donation.
  - Controller: `donationController.createDonation`

- **POST /api/v2/create_donation**
  - Description: Create donation V2.
  - Controller: `donationController.createDonationV2`

- **POST /api/create_midtrans_donation**
  - Description: Create midtrans donation.
  - Controller: `donationController.createMidtransDonation`

- **POST /api/get_donation_list**
  - Description: Get donation list.
  - Controller: `donationController.getDonationList`

- **POST /api/v2/get_donation_list**
  - Description: Get donation list V2.
  - Controller: `donationController.getDonationListV2`

- **POST /api/get_midtrans_payment_method**
  - Description: Get midtrans payment method.
  - Controller: `donationController.getMidtransPaymentMethods`

- **POST /api/get_snap_token**
  - Description: Get snap token.
  - Controller: `donationController.getSnapToken`

- **POST /api/get_specific_snap_token**
  - Description: Get specific snap token.
  - Controller: `donationController.getSpecificSnapToken`

- **POST /api/update_donation_status_by_midtrans_status**
  - Description: Update donation status.
  - Controller: `donationController.updateDonationStatus`

- **POST /api/v2/update_donation_status**
  - Description: Update donation status V2.
  - Controller: `donationController.updateDonationStatusV2`

- **POST /api/update_donation_status_by_purchase_token**
  - Description: Update donation status by purchase token.
  - Controller: `donationController.updateDonationStatusByPurchaseToken`

## Withdrawal

- **POST /api/get_withdrawal_info**
  - Description: Get withdrawal info.
  - Controller: `withdrawalController.getWithdrawalInfo`

- **POST /api/create_withdrawal**
  - Description: Create withdrawal.
  - Controller: `withdrawalController.createWithdrawal`

- **POST /api/get_withdrawal_history**
  - Description: Get withdrawal history.
  - Controller: `withdrawalController.getWithdrawalHistory`

- **POST /api/update_withdrawal**
  - Description: Update withdrawal.
  - Controller: `withdrawalController.updateWithdrawal`

- **POST /api/send_withdrawal_request_email**
  - Description: Send withdrawal request email.
  - Middleware: `middleware.checkToken`
  - Controller: `withdrawalController.sendWithdrawalRequestEmail`

- **POST /api/withdrawal**
  - Description: Retrieve withdrawal list.
  - Middleware: `middleware.checkToken`
  - Controller: `withdrawalController.list`

- **PUT /api/withdrawal/:id**
  - Description: Update withdrawal.
  - Middleware: `middleware.checkToken`
  - Controller: `withdrawalController.update`

## Business