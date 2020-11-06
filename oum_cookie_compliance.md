# OUM cookie compliance

This module implements Google Consent Mode, and sends cookie consent events to the datalayer, when a user agrees to cookie categories in the cookie popup from eu_cookie_compliance.

## Requirements
The eu_cookie_compliance & google_tag modules are required.

We **need** an `analytics` & preferably a `Marketing` category in eu_cookie_compliance.

## How does it work
We set a default Google Consent Mode (`analytics_storage` & `marketing_storage` are both set so `denied`). With this setting we can safely activate Google Analytics or other Google services, and they will comply with GDPR. No cookies will be set, and no identifying data is stored.

When the user accepts the analytics or marketing categories, we update the corresponding Google Consent Mode storage value to `granted` so the Google Services can start tracking personal data, store cookies, etc.

We also send a `cookie_consent` event to the datalayer, containing the cookie categories, and whether they are allowed or not.

In Google Tag Manager, we can use this custom event to trigger additional tags, like social media pixels, etc.
