/**
 * @file
 *   Adds cookie javascript functionality for the website.
 *
 *   This file will be minified automatically by gulp,
 *   and stored in the parent directory (/js)
 *
 * @author
 *   Open Up Media - www.openupmedia.be
 *
 * ------------------------------------------------------------------------- */


(function ($, Drupal, drupalSettings) {
  "use strict";
  
  // Sep up the namespace as a function to store list of arguments in a queue.
  Drupal.eu_cookie_compliance = Drupal.eu_cookie_compliance || function() {
    (Drupal.eu_cookie_compliance.queue = Drupal.eu_cookie_compliance.queue || []).push(arguments)
  };

  // Initialize the object with some data.
  Drupal.eu_cookie_compliance.a = +new Date;

  /**
   * Prepares data to be sent to datalayer.
   * @private
   */
  var _processCategories = function(response) {
    // get allowed categories from eu_cookie_compliance response
    var selectedcats = response.currentCategories;
    
    // prepare cookie consent datalayer event
    // if category allowed, set to 1, otherwise set it to 0
    var consent = {
      'event': 'cookie_consent',
      'analytics': selectedcats.indexOf('analytics') !== -1 ? 1 : 0,
      'marketing': selectedcats.indexOf('marketing') !== -1 ? 1 : 0
    };

    return consent;
  }

  /** 
   * Load saved cookie preferences
   */
  var postPreferencesLoadHandler = function(response) {
    console.log('hook ran - postPreferencesLoadHandler');

    var consent = _processCategories(response);

    window.dataLayer = window.dataLayer || [];

    // Update Google Consent Mode on datalayer
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('consent', 'update', {
      ad_storage: consent.marketing === 1 ? 'granted' : 'denied',
      analytics_storage: consent.analytics === 1 ? 'granted' : 'denied'
    });

    // Push custom Cookie Consent event to datalayer
    window.dataLayer.push(consent);
  };
  Drupal.eu_cookie_compliance('postPreferencesLoad', postPreferencesLoadHandler);

  /** 
   * Visitor saves cookie preferences
   */
  var postPreferencesSaveHandler = function(response) {
    console.log('hooks ran - postPreferencesSaveHandler');
    
    var consent = _processCategories(response);

    window.dataLayer = window.dataLayer || [];

    // Update Google Consent Mode on datalayer
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('consent', 'update', {
      ad_storage: consent.marketing === 1 ? 'granted' : 'denied',
      analytics_storage: consent.analytics === 1 ? 'granted' : 'denied'
    });

    // Push custom Cookie Consent event to datalayer
    window.dataLayer.push(consent);

  };
  // eu_cookie_compliance post save hook is run
  Drupal.eu_cookie_compliance('postPreferencesSave', postPreferencesSaveHandler);

  

})(jQuery, Drupal, drupalSettings);
