### General

1. **Home Page**
   - [ ] **GET** `/` - Get home page.
     - Description: Combine responses from both Akoma and Koomik.
     - Response: `{ status: 'success', message: 'Parcel Pending API', data: { 'version_number': 'v1.0.1-e38d1ac+1' } }`

### Submission

2. **Submission Types**
   - [ ] **POST** `/submission-types` - Add submission type.
   - [ ] **GET** `/submission-types` - Get submission types.
   - [ ] **POST** `/submission/:submission_id/email` - Send email for championship final round.

### Genres

3. **Genres and Subgenres**
   - [ ] **GET** `/genres` - Get genres.
   - [ ] **GET** `/subgenres` - Get subgenres.
   - [ ] **POST** `/api/get_genre_list` - Get genre list.
   - [ ] **POST** `/api/get_website_genre_list` - Get website genre list.
   - [ ] **POST** `/api/get_genre_list_for_admin` - Get genre list for admin.
   - [ ] **POST** `/api/get_comic_genre` - Get comic genre.

### Likes

4. **Likes**
   - [ ] **GET** `/like-chapter` - Check if chapter is liked.
   - [ ] **PUT** `/like-chapter` - Like or unlike a chapter.
   - [ ] **POST** `/api/toggle_chapter_like` - Toggle chapter like.

### Upload

5. **Upload**
   - [ ] **POST** `/upload/bulk` - Upload multiple files.
   - [ ] **POST** `/upload/image_single` - Upload single image.
   - [ ] **POST** `/upload/sticker_thumbnail` - Upload sticker thumbnail.
   - [ ] **POST** `/upload/sticker_main_image` - Upload sticker main image.
   - [ ] **POST** `/upload/media_single` - Upload single media.
   - [ ] **POST** `/upload/content_image` - Upload content image.
   - [ ] **POST** `/upload/sticker_detail` - Upload sticker detail.
   - [ ] **POST** `/upload/coupon_banner_image` - Upload coupon banner.
   - [ ] **POST** `/upload/coupon_coupon_image` - Upload coupon coupon.
   - [ ] **POST** `/upload/image_single_to_space` - Upload single image to space.
   - [ ] **POST** `/upload/image_single_to_space_with_folder_name` - Upload single image to space with folder name.
   - [ ] **POST** `/api/get_image_base_path` - Get image base path.
   - [ ] **POST** `/api/upload_profile_picture` - Upload profile picture.

### Comics

6. **Comics**
   - [ ] **GET** `/comic-likes` - Get comic likes count.
   - [ ] **GET** `/comics/top-selling` - Get top selling comics.
   - [ ] **GET** `/comics/check` - Check if chapter exists.
   - [ ] **GET** `/comics/:comic_id/analytics` - Get comic analytics.
   - [ ] **GET** `/comics/:comic_id/earnings` - Get comic earnings.
   - [ ] **POST** `/comics/:comic_id/tips` - Create tip for comic.
   - [ ] **GET** `/comics/:comic_id/tips` - Get tips for comic.
   - [ ] **POST** `/comics` - Create comic.
   - [ ] **POST** `/comics/draft` - Save comic draft.
   - [ ] **DELETE** `/comics/draft/:draft_schedule_id` - Delete comic draft.
   - [ ] **POST** `/comics/editorial/:comicId` - Update comic editorial choice.
   - [ ] **POST** `/comics/banner` - Add comic banner.
   - [ ] **POST** `/comics/banner/edit` - Edit comic banner.
   - [ ] **DELETE** `/comics/banner/delete/:banner_id` - Delete comic banner.
   - [ ] **GET** `/comics/banner` - Get comic banners.
   - [ ] **GET** `/comics/banner/admin` - Get comic banners for admin.
   - [ ] **POST** `/api/get_my_comics` - Get my comics.
   - [ ] **POST** `/api/get_comic_detail` - Get comic detail.
   - [ ] **POST** `/api/get_authors_comic` - Get author's comic.
   - [ ] **POST** `/api/get_suspend_comic_data` - Get suspend comic data.
   - [ ] **POST** `/api/set_suspend_comic_data` - Set suspend comic data.
   - [ ] **POST** `/api/get_homepage_comic_data` - Get homepage comic data.
   - [ ] **DELETE** `/api/comic/:id` - Delete comic.
   - [ ] **GET** `/api/comics/admin` - Get comic list for admin.
   - [ ] **GET** `/api/comics/:id/download` - Download comic contents.

### Chapters

7. **Chapters**
   - [ ] **POST** `/chapters/draft` - Save chapter draft.
   - [ ] **DELETE** `/chapters/draft-or-schedule/:draft_schedule_id` - Delete chapter draft or schedule.
   - [ ] **POST** `/chapters/price` - Edit chapter price.
   - [ ] **POST** `/chapters/edit` - Edit chapter.
   - [ ] **POST** `/chapters/schedule` - Save chapter release schedule.
   - [ ] **GET** `/chapters/catalog` - Get chapter catalog.
   - [ ] **DELETE** `/chapter/drop/:comic_id/:chapter_id` - Drop chapter from app.
   - [ ] **POST** `/api/get_chapter_detail` - Get chapter detail.
   - [ ] **POST** `/api/v2/get_chapter_detail` - Get chapter detail V2.
   - [ ] **POST** `/api/get_chapter_data` - Get chapter data.
   - [ ] **POST** `/api/set_chapter_data` - Set chapter data.
   - [ ] **POST** `/api/update_chapter_data` - Update chapter data.
   - [ ] **DELETE** `/api/chapter/:id` - Delete chapter.

### Read History

8. **Read History**
   - [ ] **POST** `/read-history` - Add read history.
   - [ ] **GET** `/read-history` - Get read history.
   - [ ] **GET** `/read-history/admin` - Get read history for admin.
   - [ ] **GET** `/read-history/admin/csv` - Get read history for admin in CSV format.

### Sliders

9. **Sliders**
   - [ ] **GET** `/sliders` - Get sliders.
   - [ ] **POST** `/sliders` - Add slider.

### Profiles

10. **Profiles**
    - [ ] **GET** `/profiles` - Get profiles.
    - [ ] **POST** `/profile/request-reset` - Request password reset.
    - [ ] **POST** `/profile/check-code` - Check email code.
    - [ ] **POST** `/profile/reset-password` - Reset password.
    - [ ] **GET** `/profiles/admin` - Get profiles for admin.
    - [ ] **PUT** `/profiles` - Update profile.
    - [ ] **POST** `/profiles/link-token` - Link token.
    - [ ] **POST** `/profiles/deactivate` - Deactivate profile.
    - [ ] **POST** `/profiles/reactivate` - Reactivate profile.
    - [ ] **GET** `/profiles/link-check` - Check link status.
    - [ ] **PUT** `/profiles/device` - Add device info.
    - [ ] **POST** `/profiles/upload` - Upload profile image.
    - [ ] **PATCH** `/profiles/author-onboarding` - Onboard author.
    - [ ] **GET** `/profiles/author-analytics` - Get author analytics.
    - [ ] **GET** `/profiles/earnings` - Get author earnings.
    - [ ] **GET** `/profiles/:filter/csv` - Get profiles for export in CSV format.
    - [ ] **POST** `/profiles/resend-verification` - Resend verification email.
    - [ ] **GET** `/profile/verify` - Verify profile.
    - [ ] **POST** `/api/register` - Register.
    - [ ] **POST** `/api/set_password` - Set password.
    - [ ] **POST** `/api/change_password` - Change password.
    - [ ] **POST** `/api/login` - Login.
    - [ ] **POST** `/api/admin_login` - Admin login.
    - [ ] **POST** `/api/send_password_reset_email` - Send password reset email.
    - [ ] **GET** `/resetpassword/:ee` - Render reset password page.
    - [ ] **POST** `/resetpassword/:ee` - Do reset password.
    - [ ] **POST** `/api/get_suspend_user_data` - Get suspend user data.
    - [ ] **POST** `/api/set_suspend_user_data` - Set suspend user data.
    - [ ] **POST** `/api/get_storefront_data` - Get storefront data.
    - [ ] **POST** `/api/update_status` - Update status.
    - [ ] **POST** `/api/update_push_token` - Update push token.
    - [ ] **POST** `/api/user` - Retrieve user list.
    - [ ] **GET** `/api/user/:id` - Get user detail.
    - [ ] **PUT** `/api/user/:id` - Update user.
    - [ ] **PATCH** `/api/user/:id` - Partial update user.
    - [ ] **POST** `/api/user/delete_requests` - Delete request.
    - [ ] **DELETE** `/api/user/:id` - Delete user.

### Banners

11. **Banners**
    - [ ] **POST** `/banner` - Add banner.
    - [ ] **POST** `/banner/edit` - Edit banner.
    - [ ] **DELETE** `/banner/delete/:banner_id` - Delete banner.
    - [ ] **GET** `/banner` - Get banners.
    - [ ] **GET** `/banner/admin` - Get banners for admin.
    - [ ] **GET** `/banner/popup` - Get active popup banner.
    - [ ] **GET** `/banner/popup/all` - Get all popup banners.
    - [ ] **POST** `/banner/popup` - Add popup banner.
    - [ ] **POST** `/banner/popup/edit` - Edit popup banner.
    - [ ] **DELETE** `/banner/popup/delete/:banner_id` - Delete popup banner.
    - [ ] **POST** `/api/get_active_banners` - Get active banners.
    - [ ] **POST** `/api/get_link_target_id` - Get link target ID.

### Notifications

12. **Notifications**
    - [ ] **GET** `/notifications/preferences` - Get notification preferences.
    - [ ] **POST** `/notifications/preferences` - Save notification preferences.
    - [ ] **GET** `/notifications` - Get notifications.
    - [ ] **GET** `/notifications/status` - Get notification status.
    - [ ] **PUT** `/notifications/read` - Mark notifications as read.
    - [ ] **POST** `/notifications` - Add notification.
    - [ ] **GET** `/notifications/schedule` - Get scheduled notifications.
    - [ ] **POST** `/notifications/schedule` - Add scheduled notification.
    - [ ] **PUT** `/notifications/schedule/:notification_id` - Edit scheduled notification.
    - [ ] **PUT** `/notifications/schedule/:notification_id/status` - Update scheduled notification status.
    - [ ] **DELETE** `/notifications/schedule/:notification_id` - Delete scheduled notification.

### Payment

13. **Payment**
    - [ ] **POST** `/payment/play-store` - Resolve payment for Play Store.
    - [ ] **POST** `/payment/app-store` - Resolve payment for App Store.
    - [ ] **POST** `/payment/manual-process` - Manually resolve payment.
    - [ ] **POST** `/payment/manual-process-ios` - Manually resolve payment for iOS.
    - [ ] **POST** `/payment/admin-transfer` - Admin transfer.
    - [ ] **GET** `/payment/admin` - Get top-up mantra for admin.
    - [ ] **POST** `/payment/use-code` - Redeem code.
    - [ ] **GET** `/payment/code` - Get codes.
    - [ ] **POST** `/payment/code` - Create code.
    - [ ] **PUT** `/payment/code/:code_id` - Edit code.
    - [ ] **DELETE** `/payment/code/:code_id` - Delete code.
    - [ ] **POST** `/payment/app-store-s2s` - Read server payload for App Store.
    - [ ] **POST** `/payment-callback` - Payment callback.
    - [ ] **POST** `/init-payment` - Initialize payment.
    - [ ] **GET** `/payment_status/:payment_id` - Get payment status.

### Bundles

14. **Bundles**
    - [ ] **POST** `/bundles` - Create bundle.
    - [ ] **PUT** `/bundles/:bundle_id` - Edit bundle.
    - [ ] **DELETE** `/bundles/:bundle_id` - Delete bundle.
    - [ ] **GET** `/bundles/:comic_id` - Get bundles by comic ID.
    - [ ] **POST** `/bundles/buy` - Buy bundle.
    - [ ] **GET** `/bundles` - Get bundles.

### Ticketing

15. **Ticketing**
    - [ ] **GET** `/buyer-pda/:comic_id` - Get PDA for buyer.
    - [ ] **GET** `/ticketing/comics/admin` - Get comics available for free ticketing for admin.
    - [ ] **GET** `/ticketing/comics` - Get comics available for change ticket.
    - [ ] **GET** `/ticketing/last-checkin` - Get last check-in.
    - [ ] **POST** `/ticketing/bulk-late-checkin` - Bulk late check-in.
    - [ ] **GET** `/ticketing/days` - Get check-in days.
    - [ ] **GET** `/ticketing/tickets` - Get available free tickets.
    - [ ] **GET** `/ticketing/redeemable-tickets` - Get exchangeable free tickets.
    - [ ] **GET** `/ticketing/balance` - Get ticket balance.
    - [ ] **POST** `/ticketing/free-claim` - Claim free comic ticket.
    - [ ] **POST** `/ticketing/redeem` - Redeem tickets.
    - [ ] **POST** `/ticketing/late-checkin` - Late check-in.
    - [ ] **POST** `/ticketing/unlock` - Unlock chapter using ticket.
    - [ ] **POST** `/ticketing/comics/add-bulk` - Add schedules in bulk.
    - [ ] **POST** `/ticketing/comics/update-bulk` - Update schedules in bulk.
    - [ ] **GET** `/ticketing/schedules` - Get schedules.

### Badges

16. **Badges**
    - [ ] **GET** `/badges` - Get badges.
    - [ ] **POST** `/social/share` - Update progress for share badge.
    - [ ] **POST** `/badges/group` - Create badge group.
    - [ ] **POST** `/badges` - Create badge.

### Earnings

17. **Earnings**
    - [ ] **GET** `/top-earnings` - Get top earnings.

### Withdrawals

18. **Withdrawals**
    - [ ] **POST** `/withdrawals/author` - Create withdrawal for author.
    - [ ] **GET** `/withdrawals` - Get withdrawals for author.
    - [ ] **GET** `/withdrawals/all` - Get withdrawals for admin.
    - [ ] **PATCH** `/withdrawals/:withdrawal_id/admin` - Update withdrawal status for admin.
    - [ ] **GET** `/withdrawals/config` - Get withdrawal config.
    - [ ] **POST** `/api/get_withdrawal_info` - Get withdrawal info.
    - [ ] **POST** `/api/create_withdrawal` - Create withdrawal.
    - [ ] **POST** `/api/get_withdrawal_history` - Get withdrawal history.
    - [ ] **POST** `/api/update_withdrawal` - Update withdrawal.
    - [ ] **POST** `/api/send_withdrawal_request_email` - Send withdrawal request email.
    - [ ] **POST** `/api/withdrawal` - Retrieve withdrawal list.
    - [ ] **PUT** `/api/withdrawal/:id` - Update withdrawal.

### Miscellaneous

19. **Miscellaneous**
    - [ ] **PUT** `/view-comic` - Add view to comic.
    - [ ] **POST** `/ratings` - Rate comic.
    - [ ] **GET** `/get-top-search` - Get top search.
    - [ ] **POST** `/add-search-history` - Add search history.
    - [ ] **GET** `/ratings` - Get ratings.
    - [ ] **GET** `/account/history` - Get account history.
    - [ ] **GET** `/packages` - Get packages.
    - [ ] **GET** `/packages/play-store` - Get Play Store packages.
    - [ ] **POST** `/buy-comic` - Buy comic.
    - [ ] **GET** `/balance` - Get balance.
    - [ ] **GET** `/missions/admob` - Verify AdMob mission.
    - [ ] **GET** `/missions` - Get missions.
    - [ ] **GET** `/missions/admin` - Get missions for admin.
    - [ ] **PUT** `/missions/admin` - Complete and claim mission by admin.
    - [ ] **POST** `/missions/claim` - Claim mission reward.
    - [ ] **PUT** `/missions/share` - Finish share mission.
    - [ ] **PUT** `/missions/ads` - Finish
