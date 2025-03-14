# API Endpoints

## Submission
- **POST** `/submission-types` - Add submission type
- **GET** `/submission-types` - Get submission types
- **POST** `/submission/:submission_id/email` - Send email for championship final round

## Genres
- **GET** `/genres` - Get genres
- **GET** `/subgenres` - Get subgenres

## Likes
- **GET** `/like-chapter` - Check if chapter is liked
- **PUT** `/like-chapter` - Like or unlike a chapter

## Upload
- **POST** `/upload/bulk` - Upload multiple files

## Comics
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

## Chapters
- **POST** `/chapters/draft` - Save chapter draft
- **DELETE** `/chapters/draft-or-schedule/:draft_schedule_id` - Delete chapter draft or schedule
- **POST** `/chapters/price` - Edit chapter price
- **POST** `/chapters/edit` - Edit chapter
- **POST** `/chapters/schedule` - Save chapter release schedule
- **GET** `/chapters/catalog` - Get chapter catalog
- **DELETE** `/chapter/drop/:comic_id/:chapter_id` - Drop chapter from app

## Read History
- **POST** `/read-history` - Add read history
- **GET** `/read-history` - Get read history
- **GET** `/read-history/admin` - Get read history for admin
- **GET** `/read-history/admin/csv` - Get read history for admin in CSV format

## Sliders
- **GET** `/sliders` - Get sliders
- **POST** `/sliders` - Add slider

## Profiles
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

## Banners
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

## Notifications
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
- **POST** `/bundles` - Create bundle
- **PUT** `/bundles/:bundle_id` - Edit bundle
- **DELETE** `/bundles/:bundle_id` - Delete bundle
- **GET** `/bundles/:comic_id` - Get bundles by comic ID
- **POST** `/bundles/buy` - Buy bundle
- **GET** `/bundles` - Get bundles

## Ticketing
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
- **GET** `/badges` - Get badges for user
- **POST** `/social/share` - Update progress for share badge
- **POST** `/badges/group` - Create badge group
- **POST** `/badges` - Create badge

## Earnings
- **GET** `/top-earnings` - Get top earnings

## Withdrawals
- **POST** `/withdrawals/author` - Create withdrawal for author
- **GET** `/withdrawals` - Get withdrawals for author
- **GET** `/withdrawals/all` - Get withdrawals for admin
- **PATCH** `/withdrawals/:withdrawal_id/admin` - Update withdrawal status for admin
- **GET** `/withdrawals/config` - Get withdrawal config

## Miscellaneous
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