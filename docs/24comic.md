# API Endpoints Comparison: Akoma vs Koomik

## General

### Akoma
- **GET** `/`
  - Description: Get home page.
  - Response: `{ status: 'success', message: 'Parcel Pending API', data: { 'version_number': 'v1.0.1-e38d1ac+1' } }`

### Koomik
- **GET** `/`
  - Description: Get home page.
  - Response: `{ status: 'success', message: 'Parcel Pending API', data: { 'version_number': 'v1.0.1-e38d1ac+1' } }`

## Submission

### Akoma
- **POST** `/submission-types` - Add submission type
- **GET** `/submission-types` - Get submission types
- **POST** `/submission/:submission_id/email` - Send email for championship final round

## Genres

### Akoma
- **GET** `/genres` - Get genres
- **GET** `/subgenres` - Get subgenres

### Koomik
- **POST** `/api/get_genre_list`
  - Description: Get genre list.
  - Controller: `genreController.getGenreList`

- **POST** `/api/get_website_genre_list`
  - Description: Get website genre list.
  - Controller: `genreController.getWebsiteGenreList`

- **POST** `/api/get_genre_list_for_admin`
  - Description: Get genre list for admin.
  - Middleware: `middleware.checkToken`
  - Controller: `genreController.getGenreListForAdmin`

- **POST** `/api/get_comic_genre`
  - Description: Get comic genre.
  - Controller: `genreController.getComicGenre`

## Likes

### Akoma
- **GET** `/like-chapter` - Check if chapter is liked
- **PUT** `/like-chapter` - Like or unlike a chapter

### Koomik
- **POST** `/api/toggle_chapter_like`
  - Description: Toggle chapter like.
  - Middleware: `middleware.checkToken`
  - Controller: `chapterLikeController.toggleChapterLike`

## Upload

### Akoma
- **POST** `/upload/bulk` - Upload multiple files

### Koomik
- **POST** `/upload/image_single`
  - Description: Upload single image.
  - Middleware: `middleware.checkToken`
  - Controller: `uploadController.uploadSingleImage`

- **POST** `/upload/sticker_thumbnail`
  - Description: Upload sticker thumbnail.
  - Middleware: `middleware.checkToken`
  - Controller: `uploadController.uploadStickerThumbnail`

- **POST** `/upload/sticker_main_image`
  - Description: Upload sticker main image.
  - Middleware: `middleware.checkToken`
  - Controller: `uploadController.uploadStickerMainImage`

- **POST** `/upload/media_single`
  - Description: Upload single media.
  - Middleware: `middleware.checkToken`
  - Controller: `uploadController.uploadSingleMedia`

- **POST** `/upload/content_image`
  - Description: Upload content image.
  - Middleware: `middleware.checkToken`
  - Controller: `uploadController.uploadContentImageV2`

- **POST** `/upload/sticker_detail`
  - Description: Upload sticker detail.
  - Middleware: `middleware.checkToken`
  - Controller: `uploadController.uploadStickerDetail`

- **POST** `/upload/coupon_banner_image`
  - Description: Upload coupon banner.
  - Middleware: `middleware.checkToken`
  - Controller: `uploadController.uploadCouponBanner`

- **POST** `/upload/coupon_coupon_image`
  - Description: Upload coupon coupon.
  - Middleware: `middleware.checkToken`
  - Controller: `uploadController.uploadCouponCoupon`

- **POST** `/upload/image_single_to_space`
  - Description: Upload single image to space.
  - Middleware: `middleware.checkToken`
  - Controller: `uploadController.uploadSingleImageToSpace`

- **POST** `/upload/image_single_to_space_with_folder_name`
  - Description: Upload single image to space with folder name.
  - Middleware: `middleware.checkToken`
  - Controller: `uploadController.uploadSingleImageToSpaceWithFolderName`

- **POST** `/api/get_image_base_path`
  - Description: Get image base path.
  - Controller: `uploadController.getImageBasePath`

- **POST** `/api/upload_profile_picture`
  - Description: Upload profile picture.
  - Middleware: `middleware.checkToken`
  - Controller: `uploadController.uploadProfilePicture`

## Comics

### Akoma
- **GET** `/comic-likes` - Get comic likes count
- **GET** `/comics/top-selling` - Get top selling comics
- **GET** `/comics/check` - Check if chapter exists
- **GET** `/comics/:comic_id/analytics` - Get comic analytics
- **GET** `/comics/:comic_id/earnings` - Get comic earnings
- **POST** `/comics/:comic_id/tips` - Create tip for comic
- **GET** `/comics/:comic_id/tips` - Get tips for comic
- **POST** `/comics` - Create comic
- **POST** `/comics/draft` - Save comic draft
- **DELETE** `/comics/draft/:draft_schedule_id` - Delete comic draft
- **POST** `/comics/editorial/:comicId` - Update comic editorial choice
- **POST** `/comics/banner` - Add comic banner
- **POST** `/comics/banner/edit` - Edit comic banner
- **DELETE** `/comics/banner/delete/:banner_id` - Delete comic banner
- **GET** `/comics/banner` - Get comic banners
- **GET** `/comics/banner/admin` - Get comic banners for admin

### Koomik
- **POST** `/api/get_my_comics`
  - Description: Get my comics.
  - Middleware: `middleware.checkToken`
  - Controller: `comicController.getMyComics`

- **POST** `/api/get_comic_detail`
  - Description: Get comic detail.
  - Controller: `comicController.getComicDetail`

- **POST** `/api/get_authors_comic`
  - Description: Get author's comic.
  - Controller: `comicController.getAuthorsComic`

- **POST** `/api/get_suspend_comic_data`
  - Description: Get suspend comic data.
  - Middleware: `middleware.checkToken`
  - Controller: `comicController.getSuspendComicData`

- **POST** `/api/set_suspend_comic_data`
  - Description: Set suspend comic data.
  - Middleware: `middleware.checkToken`
  - Controller: `comicController.setSuspendComicData`

- **POST** `/api/get_homepage_comic_data`
  - Description: Get homepage comic data.
  - Controller: `comicController.getHomepageComicData`

- **DELETE** `/api/comic/:id`
  - Description: Delete comic.
  - Middleware: `middleware.checkToken`
  - Controller: `comicController.delete`

- **GET** `/api/comics/admin`
  - Description: Get comic list for admin.
  - Middleware: `middleware.checkToken`
  - Controller: `comicController.getComicListForAdmin`

- **GET** `/api/comics/:id/download`
  - Description: Download comic contents.
  - Middleware: `middleware.checkToken`
  - Controller: `comicController.downloadComicContents`

## Chapters

### Akoma
- **POST** `/chapters/draft` - Save chapter draft
- **DELETE** `/chapters/draft-or-schedule/:draft_schedule_id` - Delete chapter draft or schedule
- **POST** `/chapters/price` - Edit chapter price
- **POST** `/chapters/edit` - Edit chapter
- **POST** `/chapters/schedule` - Save chapter release schedule
- **GET** `/chapters/catalog` - Get chapter catalog
- **DELETE** `/chapter/drop/:comic_id/:chapter_id` - Drop chapter from app

### Koomik
- **POST** `/api/get_chapter_detail`
  - Description: Get chapter detail.
  - Controller: `chapterController.getChapterDetail`

- **POST** `/api/v2/get_chapter_detail`
  - Description: Get chapter detail V2.
  - Controller: `chapterController.getChapterDetailV2`

- **POST** `/api/get_chapter_data`
  - Description: Get chapter data.
  - Middleware: `middleware.checkToken`
  - Controller: `chapterController.getChapterData`

- **POST** `/api/set_chapter_data`
  - Description: Set chapter data.
  - Middleware: `middleware.checkToken`
  - Controller: `chapterController.setChapterData`

- **POST** `/api/update_chapter_data`
  - Description: Update chapter data.
  - Middleware: `middleware.checkToken`
  - Controller: `chapterController.updateChapterData`

- **DELETE** `/api/chapter/:id`
  - Description: Delete chapter.
  - Middleware: `middleware.checkToken`
  - Controller: `chapterController.delete`

## Read History

### Akoma
- **POST** `/read-history` - Add read history
- **GET** `/read-history` - Get read history
- **GET** `/read-history/admin` - Get read history for admin
- **GET** `/read-history/admin/csv` - Get read history for admin in CSV format

## Sliders

### Akoma
- **GET** `/sliders` - Get sliders
- **POST** `/sliders` - Add slider

## Profiles

### Akoma
- **GET** `/profiles` - Get profiles
- **POST** `/profile/request-reset` - Request password reset
- **POST** `/profile/check-code` - Check email code
- **POST** `/profile/reset-password` - Reset password
- **GET** `/profiles/admin` - Get profiles for admin
- **PUT** `/profiles` - Update profile
- **POST** `/profiles/link-token` - Link token
- **POST** `/profiles/deactivate` - Deactivate profile
- **POST** `/profiles/reactivate` - Reactivate profile
- **GET** `/profiles/link-check` - Check link status
- **PUT** `/profiles/device` - Add device info
- **POST** `/profiles/upload` - Upload profile image
- **PATCH** `/profiles/author-onboarding` - Onboard author
- **GET** `/profiles/author-analytics` - Get author analytics
- **GET** `/profiles/earnings` - Get author earnings
- **GET** `/profiles/:filter/csv` - Get profiles for export in CSV format
- **POST** `/profiles/resend-verification` - Resend verification email
- **GET** `/profile/verify` - Verify profile

### Koomik
- **POST** `/api/register`
  - Description: Register.
  - Controller: `userController.register`

- **POST** `/api/set_password`
  - Description: Set password.
  - Middleware: `middleware.checkToken`
  - Controller: `userController.setPassword`

- **POST** `/api/change_password`
  - Description: Change password.
  - Middleware: `middleware.checkToken`
  - Controller: `userController.changePassword`

- **POST** `/api/login`
  - Description: Login.
  - Controller: `userController.loginV2`

- **POST** `/api/admin_login`
  - Description: Admin login.
  - Controller: `userController.adminLogin`

- **POST** `/api/send_password_reset_email`
  - Description: Send password reset email.
  - Controller: `userController.sendPasswordResetEmail`

- **GET** `/resetpassword/:ee`
  - Description: Render reset password page.
  - Controller: `userController.renderResetPasswordPage`

- **POST** `/resetpassword/:ee`
  - Description: Do reset password.
  - Controller: `userController.doResetPassword`

- **POST** `/api/get_suspend_user_data`
  - Description: Get suspend user data.
  - Middleware: `middleware.checkToken`
  - Controller: `userController.getSuspendUserData`

- **POST** `/api/set_suspend_user_data`
  - Description: Set suspend user data.
  - Middleware: `middleware.checkToken`
  - Controller: `userController.setSuspendUserData`

- **POST** `/api/get_storefront_data`
  - Description: Get storefront data.
  - Controller: `userController.getStoreFrontData`

- **POST** `/api/update_status`
  - Description: Update status.
  - Controller: `userController.updateStatus`

- **POST** `/api/update_push_token`
  - Description: Update push token.
  - Middleware: `middleware.checkToken`
  - Controller: `userController.updatePushToken`

- **POST** `/api/user`
  - Description: Retrieve user list.
  - Middleware: `middleware.checkToken`
  - Controller: `userController.list`

- **GET** `/api/user/:id`
  - Description: Get user detail.
  - Middleware: `middleware.checkToken`
  - Controller: `userController.detail`

- **PUT** `/api/user/:id`
  - Description: Update user.
  - Middleware: `middleware.checkToken`
  - Controller: `userController.update`

- **PATCH** `/api/user/:id`
  - Description: Partial update user.
  - Middleware: `middleware.checkToken`
  - Controller: `userController.partialUpdate`

- **POST** `/api/user/delete_requests`
  - Description: Delete request.
  - Middleware: `middleware.rateLimit`
  - Controller: `userController.deleteRequest`

- **DELETE** `/api/user/:id`
  - Description: Delete user.
  - Middleware: `middleware.checkToken`
  - Controller: `userController.delete`

## Banners

### Akoma
- **POST** `/banner` - Add banner
- **POST** `/banner/edit` - Edit banner
- **DELETE** `/banner/delete/:banner_id` - Delete banner
- **GET** `/banner` - Get banners
- **GET** `/banner/admin` - Get banners for admin
- **GET** `/banner/popup` - Get active popup banner
- **GET** `/banner/popup/all` - Get all popup banners
- **POST** `/banner/popup` - Add popup banner
- **POST** `/banner/popup/edit` - Edit popup banner
- **DELETE** `/banner/popup/delete/:banner_id` - Delete popup banner

### Koomik
- **POST** `/api/get_active_banners`
  - Description: Get active banners.
  - Controller: `bannerController.getActiveBanners`

- **POST** `/api/get_link_target_id`
  - Description: Get link target ID.
  - Controller: `bannerController.getLinkTargetID`

## Notifications

### Akoma
- **GET** `/notifications/preferences` - Get notification preferences
- **POST** `/notifications/preferences` - Save notification preferences
- **GET** `/notifications` - Get notifications
- **GET** `/notifications/status` - Get notification status
- **PUT** `/notifications/read` - Mark notifications as read
- **POST** `/notifications` - Add notification
- **GET** `/notifications/schedule` - Get scheduled notifications
- **POST** `/notifications/schedule` - Add scheduled notification
- **PUT** `/notifications/schedule/:notification_id` - Edit scheduled notification
- **PUT** `/notifications/schedule/:notification_id/status` - Update scheduled notification status
- **DELETE** `/notifications/schedule/:notification_id` - Delete scheduled notification

## Payment

### Akoma
- **POST** `/payment/play-store` - Resolve payment for Play Store
- **POST** `/payment/app-store` - Resolve payment for App Store
- **POST** `/payment/manual-process` - Manually resolve payment
- **POST** `/payment/manual-process-ios` - Manually resolve payment for iOS
- **POST** `/payment/admin-transfer` - Admin transfer
- **GET** `/payment/admin` - Get top-up mantra for admin
- **POST** `/payment/use-code` - Redeem code
- **GET** `/payment/code` - Get codes
- **POST** `/payment/code` - Create code
- **PUT** `/payment/code/:code_id` - Edit code
- **DELETE** `/payment/code/:code_id` - Delete code
- **POST** `/payment/app-store-s2s` - Read server payload for App Store
- **POST** `/payment-callback` - Payment callback
- **POST** `/init-payment` - Initialize payment
- **GET** `/payment_status/:payment_id` - Get payment status

## Bundles

### Akoma
- **POST** `/bundles` - Create bundle
- **PUT** `/bundles/:bundle_id` - Edit bundle
- **DELETE** `/bundles/:bundle_id` - Delete bundle
- **GET** `/bundles/:comic_id` - Get bundles by comic ID
- **POST** `/bundles/buy` - Buy bundle
- **GET** `/bundles` - Get bundles

## Ticketing

### Akoma
- **GET** `/buyer-pda/:comic_id` - Get PDA for buyer
- **GET** `/ticketing/comics/admin` - Get comics available for free ticketing for admin
- **GET** `/ticketing/comics` - Get comics available for change ticket
- **GET** `/ticketing/last-checkin` - Get last check-in
- **POST** `/ticketing/bulk-late-checkin` - Bulk late check-in
- **GET** `/ticketing/days` - Get check-in days
- **GET** `/ticketing/tickets` - Get available free tickets
- **GET** `/ticketing/redeemable-tickets` - Get exchangeable free tickets
- **GET** `/ticketing/balance` - Get ticket balance
- **POST** `/ticketing/free-claim` - Claim free comic ticket
- **POST** `/ticketing/redeem` - Redeem tickets
- **POST** `/ticketing/late-checkin` - Late check-in
- **POST** `/ticketing/unlock` - Unlock chapter using ticket
- **POST** `/ticketing/comics/add-bulk` - Add schedules in bulk
- **POST** `/ticketing/comics/update-bulk` - Update schedules in bulk
- **GET** `/ticketing/schedules` - Get schedules

## Badges

### Akoma
- **GET** `/badges` - Get bad
- **POST** `/social/share` - Update progress for share badge
- **POST** `/badges/group` - Create badge group
- **POST** `/badges` - Create badge

## Earnings

### Akoma
- **GET** `/top-earnings` - Get top earnings

## Withdrawals

### Akoma
- **POST** `/withdrawals/author` - Create withdrawal for author
- **GET** `/withdrawals` - Get withdrawals for author
- **GET** `/withdrawals/all` - Get withdrawals for admin
- **PATCH** `/withdrawals/:withdrawal_id/admin` - Update withdrawal status for admin
- **GET** `/withdrawals/config` - Get withdrawal config

### Koomik
- **POST** `/api/get_withdrawal_info`
  - Description: Get withdrawal info.
  - Controller: `withdrawalController.getWithdrawalInfo`

- **POST** `/api/create_withdrawal`
  - Description: Create withdrawal.
  - Controller: `withdrawalController.createWithdrawal`

- **POST** `/api/get_withdrawal_history`
  - Description: Get withdrawal history.
  - Controller: `withdrawalController.getWithdrawalHistory`

- **POST** `/api/update_withdrawal`
  - Description: Update withdrawal.
  - Controller: `withdrawalController.updateWithdrawal`

- **POST** `/api/send_withdrawal_request_email`
  - Description: Send withdrawal request email.
  - Middleware: `middleware.checkToken`
  - Controller: `withdrawalController.sendWithdrawalRequestEmail`

- **POST** `/api/withdrawal`
  - Description: Retrieve withdrawal list.
  - Middleware: `middleware.checkToken`
  - Controller: `withdrawalController.list`

- **PUT** `/api/withdrawal/:id`
  - Description: Update withdrawal.
  - Middleware: `middleware.checkToken`
  - Controller: `withdrawalController.update`

## Miscellaneous

### Akoma
- **PUT** `/view-comic` - Add view to comic
- **POST** `/ratings` - Rate comic
- **GET** `/get-top-search` - Get top search
- **POST** `/add-search-history` - Add search history
- **GET** `/ratings` - Get ratings
- **GET** `/account/history` - Get account history
- **GET** `/packages` - Get packages
- **GET** `/packages/play-store` - Get Play Store packages
- **POST** `/buy-comic` - Buy comic
- **GET** `/balance` - Get balance
- **GET** `/missions/admob` - Verify AdMob mission
- **GET** `/missions` - Get missions
- **GET** `/missions/admin` - Get missions for admin
- **PUT** `/missions/admin` - Complete and claim mission by admin
- **POST** `/missions/claim` - Claim mission reward
- **PUT** `/missions/share` - Finish share mission
- **PUT** `/missions/ads` - Finish ads mission
- **PUT** `/missions/share-weekly` - Finish share mission weekly
- **PUT** `/missions/login` - Finish login mission
- **PUT** `/missions/online` - Finish online mission
- **GET** `/mana-conversion` - Get mana packs
- **POST** `/mana-conversion` - Convert to mantra
- **POST** `/set-release-schedule` - Set release schedule
- **POST** `/set-comic-notice` - Set comic notice
- **POST** `/subscribe` - Subscribe to comic
- **POST** `/unsubscribe` - Unsubscribe from comic
- **GET** `/subscriptions` - Get subscriptions
- **GET** `/unlock-ticket/:comic_id` - Get free ticket for comic
- **POST** `/unlock-ticket` - Unlock comic chapter
- **GET** `/non-series-chapters` - Get non-series chapters
- **GET** `/public-non-series-chapters` - Get public non-series chapters
- **GET** `/settings` - Get current settings
- **POST** `/settings` - Save settings
- **GET** `/bug-report` - Get bug reports
- **POST** `/bug-report` - Post bug report
- **DELETE** `/bug-report/:bugReportId` - Solve bug report
- **DELETE** `/deactivate` - Unregister account
- **POST** `/profile/message` - Send email message
- **POST** `/profile/message/updates` - Send app version email
- **GET** `/profile/message` - Get notification histories
- **GET** `/in-app-rating` - Get in-app rating
- **PUT** `/in-app-rating` - Set in-app rating

### Koomik
- **POST** `/api/generate_comic_report_data`
  - Description: Generate comic report data.
  - Middleware: `middleware.checkToken`
  - Controller: `reportController.generateComicReportData`

- **POST** `/api/get_country_list`
  - Description: Get country list.
  - Controller: `countryController.getCountryList`

- **POST** `/api/get_city_list`
  - Description: Get city list.
  - Controller: `cityController.getCityList`

- **POST** `/api/search_comic_website`
  - Description: Search comic website.
  - Controller: `comicGenreController.searchComicWebsite`

- **POST** `/api/get_editors_choice`
  - Description: Get editors choice.
  - Controller: `comicGenreController.getEditorsChoice`

- **POST** `/api/v2/get_editors_choice`
  - Description: Get editors choice V2.
  - Controller: `comicGenreController.getEditorsChoiceV2`

- **POST** `/api/get_hidden_gem`
  - Description: Get hidden gem.
  - Controller: `comicGenreController.getHiddenGem`

- **POST** `/api/v2/get_hidden_gem`
  - Description: Get hidden gem V2.
  - Controller: `comicGenreController.getHiddenGemV2`

- **POST** `/api/get_exclusive_comic`
  - Description: Get exclusive comic.
  - Controller: `comicGenreController.getExclusiveComic`

- **POST** `/api/get_premium_comic`
  - Description: Get premium comic.
  - Controller: `comicGenreController.getPremiumComic`

- **POST** `/api/search_comic`
  - Description: Search comic.
  - Controller: `comicGenreController.searchComicV2`

- **POST** `/api/get_new_release`
  - Description: Get new release.
  - Controller: `comicGenreController.getNewRelease`

- **POST** `/api/get_random_comic`
  - Description: Get random comic.
  - Controller: `comicGenreController.getRandomComic`

- **POST** `/api/get_trending_comic`
  - Description: Get trending comic.
  - Controller: `comicGenreController.getTrendingComic`

- **POST** `/api/get_weekly_top_comic`
  - Description: Get weekly top comic.
  - Controller: `comicGenreController.getWeeklyTopComic`

- **POST** `/api/get_comic_recommendation`
  - Description: Get comic recommendation.
  - Controller: `comicGenreController.getComicRecommendationV2`

- **POST** `/api/get_website_comic_recommendation`
  - Description: Get website comic recommendation.
  - Controller: `comicGenreController.getWebsiteComicRecommendation`

- **POST** `/api/assign_comic_to_homepage`
  - Description: Assign comic to homepage.
  - Middleware: `middleware.checkToken`
  - Controller: `comicGenreController.assignComicToHomepage`

- **PUT** `/api/comic_genre/:id`
  - Description: Update comic genre.
  - Middleware: `middleware.checkToken`
  - Controller: `comicGenreController.update`

- **DELETE** `/api/comic_genre/:id`
  - Description: Delete comic genre.
  - Middleware: `middleware.checkToken`
  - Controller: `comicGenreController.delete`

- **POST** `/api/get_exclusive_comic_list`
  - Description: Get exclusive comic list.
  - Controller: `comicGenreController.getExclusiveComicList`

- **POST** `/api/update_aspect_ratio`
  - Description: Update aspect ratio.
  - Controller: `chapterContentController.updateAspectRatio`

- **POST** `/api/do_chapter_read`
  - Description: Do chapter read.
  - Controller: `chapterReadController.doChapterReadV2`

- **POST** `/api/toggle_comic_bookmark`
  - Description: Toggle comic bookmark.
  - Middleware: `middleware.checkToken`
  - Controller: `userComicBookmarkController.toggleComicBookmark`

- **POST** `/api/get_static_content`
  - Description: Get static content.
  - Controller: `staticContentController.getStaticContent`

- **GET** `/api/static_content/report_categories`
  - Description: Get report categories.
  - Controller: `staticContentController.getReportCategories`

- **POST** `/api/submit_contact_us`
  - Description: Submit contact us.
  - Controller: `contactUsController.submitContactUs`

- **POST** `/api/toggle_user_follow`
  - Description: Toggle user follow.
  - Middleware: `middleware.checkToken`
  - Controller: `userFollowController.toggleUserFollow`

- **POST** `/api/get_user_statistic`
  - Description: Get user statistic.
  - Middleware: `middleware.checkToken`
  - Controller: `statisticController.getCMSStatistic`

- **POST** `/api/get_admin_statistic`
  - Description: Get admin statistic.
  - Middleware: `middleware.checkToken`
  - Controller: `statisticController.getAdminStatistic`

- **POST** `/api/get_mobile_statistic`
  - Description: Get mobile statistic.
  - Middleware: `middleware.checkToken`
  - Controller: `statisticController.getMobileStatistic`

- **GET** `/api/get_donation_options`
  - Description: Get donation options.
  - Controller: `donationController.getDonationOptions`

- **POST** `/api/get_donation_amount_options`
  - Description: Get donation amount options.
  - Controller: `donationController.getDonationAmountOptions`

- **POST** `/api/create_donation`
  - Description: Create donation.
  - Controller: `donationController.createDonation`

- **POST** `/api/v2/create_donation`
  - Description: Create donation V2.
  - Controller: `donationController.createDonationV2`

- **POST** `/api/create_midtrans_donation`
  - Description: Create midtrans donation.
  - Controller: `donationController.createMidtransDonation`

- **POST** `/api/get_donation_list`
  - Description: Get donation list.
  - Controller: `donationController.getDonationList`

- **POST** `/api/v2/get_donation_list`
  - Description: Get donation list V2.
  - Controller: `donationController.getDonationListV2`

- **POST** `/api/get_midtrans_payment_method`
  - Description: Get midtrans payment method.
  - Controller: `donationController.getMidtransPaymentMethods`

- **POST** `/api/get_snap_token`
  - Description: Get snap token.
  - Controller: `donationController.getSnapToken`

- **POST** `/api/get_specific_snap_token`
  - Description: Get specific snap token.
  - Controller: `donationController.getSpecificSnapToken`

- **POST** `/api/update_donation_status_by_midtrans_status`
  - Description: Update donation status.
  - Controller: `donationController.updateDonationStatus`

- **POST** `/api/v2/update_donation_status`
  - Description: Update donation status V2.
  - Controller: `donationController.updateDonationStatusV2`

- **POST** `/api/update_donation_status_by_purchase_token`
  - Description: Update donation status by purchase token.
  - Controller: `donationController.updateDonationStatusByPurchaseToken`

## Exclusive Ads

### Koomik
- **GET** `/api/exclusive_ads/:id/comic`
  - Description: Get exclusive ads comic.
  - Middleware: `middleware.checkToken`
  - Controller: `exclusiveAdsController.getExclusiveAdsComic`

## Business

### Koomik
- **GET** `/api/restart/:p`
  - Description: Restart the process.
  - Controller: `processController.restart`

- **POST** `/api/verify_token`
  - Description: Verify token.
  - Middleware: `middleware.verifyToken`

- **GET** `/share/:model/:id`
  - Description: Redirect to app.
  - Controller: `shareController.redirectToApp`

- **POST** `/api/update_comic_share_count`
  - Description: Update comic share count.
  - Controller: `shareController.updateComicShareCount`

This comparison should help in understanding the similarities and differences between the API endpoints of Akoma and Koomik.