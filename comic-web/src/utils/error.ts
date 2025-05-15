// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertFirebaseAuthErrorToMessage(error: any): string {
	switch (error.code) {
		case 'auth/invalid-email':
			return 'The email address is not valid.'
		case 'auth/user-disabled':
			return 'The user account has been disabled by an administrator.'
		case 'auth/user-not-found':
			return 'There is no user corresponding to the given email.'
		case 'auth/wrong-password':
			return 'The password is invalid or the user does not have a password.'
		case 'auth/email-already-in-use':
			return 'The email address is already in use by another account.'
		case 'auth/weak-password':
			return 'The password is too weak.'
		case 'auth/operation-not-allowed':
			return 'Email/password accounts are not enabled.'
		case 'auth/invalid-credential':
			return 'The supplied auth credential is malformed or has expired.'
		case 'auth/invalid-verification-code':
			return 'The verification code is invalid.'
		case 'auth/invalid-verification-id':
			return 'The verification ID is invalid.'
		case 'auth/missing-verification-code':
			return 'The verification code is missing.'
		case 'auth/missing-verification-id':
			return 'The verification ID is missing.'
		case 'auth/missing-phone-number':
			return 'The phone number is missing.'
		case 'auth/invalid-phone-number':
			return 'The phone number is invalid.'
		case 'auth/quota-exceeded':
			return 'Quota exceeded.'
		case 'auth/captcha-check-failed':
			return 'The reCAPTCHA response token provided is either invalid, expired, or has already been used.'
		case 'auth/timeout':
			return 'The operation has timed out.'
		case 'auth/network-request-failed':
			return 'A network error has occurred.'
		case 'auth/too-many-requests':
			return 'Too many attempts. Try again later.'
		case 'auth/app-not-authorized':
			return 'This app is not authorized to use Firebase Authentication.'
		case 'auth/app-not-installed':
			return 'The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.'
		case 'auth/unauthorized-domain':
			return 'This domain is not authorized for OAuth operations for your Firebase project.'
		case 'auth/requires-recent-login':
			return 'This operation is sensitive and requires recent authentication. Log in again before retrying this request.'
		case 'auth/account-exists-with-different-credential':
			return 'An account already exists with the same email address but different sign-in credentials.'
		case 'auth/credential-already-in-use':
			return 'This credential is already associated with a different user account.'
		case 'auth/email-change-needs-verification':
			return 'The email change needs to be verified.'
		case 'auth/expired-action-code':
			return 'The action code has expired.'
		case 'auth/invalid-action-code':
			return 'The action code is invalid.'
		case 'auth/missing-action-code':
			return 'The action code is missing.'
		case 'auth/missing-continue-uri':
			return 'The continue URL is missing.'
		case 'auth/missing-iframe-start':
			return 'The iframe start parameter is missing.'
		case 'auth/missing-android-pkg-name':
			return 'The Android package name is missing.'
		case 'auth/missing-ios-bundle-id':
			return 'The iOS bundle ID is missing.'
		case 'auth/missing-continue-url':
			return 'The continue URL is missing.'
		case 'auth/missing-oob-code':
			return 'The out-of-band code is missing.'
		case 'auth/missing-app-credential':
			return 'The app credential is missing.'
		case 'auth/session-expired':
			return 'The session has expired.'
		case 'auth/user-token-expired':
			return 'The user token has expired.'
		case 'auth/web-storage-unsupported':
			return 'Web storage is unsupported.'
		case 'auth/unsupported-persistence-type':
			return 'The persistence type is unsupported.'
		case 'auth/invalid-persistence-type':
			return 'The persistence type is invalid.'
		case 'auth/unsupported-tenant-operation':
			return 'This operation is not supported in a multi-tenant context.'
		case 'auth/tenant-id-mismatch':
			return 'The tenant ID does not match the expected tenant ID.'
		case 'auth/multi-factor-auth-required':
			return 'Multi-factor authentication is required.'
		case 'auth/multi-factor-info-not-found':
			return 'Multi-factor info not found.'
		case 'auth/multi-factor-auth-failed':
			return 'Multi-factor authentication failed.'
		case 'auth/multi-factor-auth-unenrolled':
			return 'Multi-factor authentication is unenrolled.'
		case 'auth/multi-factor-auth-unenroll-failed':
			return 'Multi-factor authentication unenrollment failed.'
		case 'auth/multi-factor-auth-enroll-failed':
			return 'Multi-factor authentication enrollment failed.'
		case 'auth/multi-factor-auth-enrollment-not-found':
			return 'Multi-factor authentication enrollment not found.'
		case 'auth/multi-factor-auth-enrollment-failed':
			return 'Multi-factor authentication enrollment failed.'
		case 'auth/multi-factor-auth-enrollment-not-supported':
			return 'Multi-factor authentication enrollment is not supported.'
		case 'auth/multi-factor-auth-enrollment-not-available':
			return 'Multi-factor authentication enrollment is not available.'
		case 'auth/multi-factor-auth-enrollment-not-required':
			return 'Multi-factor authentication enrollment is not required.'
		case 'auth/multi-factor-auth-enrollment-not-configured':
			return 'Multi-factor authentication enrollment is not configured.'
		case 'auth/multi-factor-auth-enrollment-not-enabled':
			return 'Multi-factor authentication enrollment is not enabled.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-user':
			return 'Multi-factor authentication enrollment is not available for this user.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-app':
			return 'Multi-factor authentication enrollment is not available for this app.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-tenant':
			return 'Multi-factor authentication enrollment is not available for this tenant.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-domain':
			return 'Multi-factor authentication enrollment is not available for this domain.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-device':
			return 'Multi-factor authentication enrollment is not available for this device.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-browser':
			return 'Multi-factor authentication enrollment is not available for this browser.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-os':
			return 'Multi-factor authentication enrollment is not available for this operating system.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-platform':
			return 'Multi-factor authentication enrollment is not available for this platform.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-version':
			return 'Multi-factor authentication enrollment is not available for this version.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-sdk':
			return 'Multi-factor authentication enrollment is not available for this SDK.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-api':
			return 'Multi-factor authentication enrollment is not available for this API.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-service':
			return 'Multi-factor authentication enrollment is not available for this service.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-provider':
			return 'Multi-factor authentication enrollment is not available for this provider.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-method':
			return 'Multi-factor authentication enrollment is not available for this method.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-type':
			return 'Multi-factor authentication enrollment is not available for this type.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-credential':
			return 'Multi-factor authentication enrollment is not available for this credential.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-identity':
			return 'Multi-factor authentication enrollment is not available for this identity.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-account':
			return 'Multi-factor authentication enrollment is not available for this account.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-user-account':
			return 'Multi-factor authentication enrollment is not available for this user account.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-app-account':
			return 'Multi-factor authentication enrollment is not available for this app account.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-tenant-account':
			return 'Multi-factor authentication enrollment is not available for this tenant account.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-domain-account':
			return 'Multi-factor authentication enrollment is not available for this domain account.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-device-account':
			return 'Multi-factor authentication enrollment is not available for this device account.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-browser-account':
			return 'Multi-factor authentication enrollment is not available for this browser account.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-os-account':
			return 'Multi-factor authentication enrollment is not available for this operating system account.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-platform-account':
			return 'Multi-factor authentication enrollment is not available for this platform account.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-version-account':
			return 'Multi-factor authentication enrollment is not available for this version account.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-sdk-account':
			return 'Multi-factor authentication enrollment is not available for this SDK account.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-api-account':
			return 'Multi-factor authentication enrollment is not available for this API account.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-service-account':
			return 'Multi-factor authentication enrollment is not available for this service account.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-provider-account':
			return 'Multi-factor authentication enrollment is not available for this provider account.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-method-account':
			return 'Multi-factor authentication enrollment is not available for this method account.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-type-account':
			return 'Multi-factor authentication enrollment is not available for this type account.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-credential-account':
			return 'Multi-factor authentication enrollment is not available for this credential account.'
		case 'auth/multi-factor-auth-enrollment-not-available-for-identity-account':
			return 'Multi-factor authentication enrollment is not available for this identity account.'
		default:
			return 'An unknown error occurred.'
	}
}
