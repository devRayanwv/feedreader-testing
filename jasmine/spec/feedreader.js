/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This will test each URL is defined and not empty
        *  By looping the allFeeds and test the url property.
        */
         it('each URL is defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });

        /* This will test each name is defined and not empty
        *  By looping the allFeeds and test the name property.
        */
         it('each Name is defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });


    /* Testing two functionality of the menue
    *  1- Test if the menu is hidden by default by test if
    *     the body tag has 'menu-hidden' class.
    *  2- Test if menu icon changes when it is clicked.
    *     by trigger click event twice and check if body tag
    *     has menu-hidden class.
    */
    describe('The Menu', function(){


        /* This test to ensure the menu is hidden by default. */
         it('menu is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* This test to ensure the menu status changed when it is clicked */
          it('menu changes when menu icon clicked', function() {
            if($('body').hasClass('menu-hidden'))
            {
                $('.menu-icon-link').click(); // trigger click event
                expect($('body').hasClass('menu-hidden')).toBe(false);
                $('.menu-icon-link').click();
                expect($('body').hasClass('menu-hidden')).toBe(true);
            }
          });
    });

    /* This test initial entries are work as expected by check
    *  if it contains at least one element.
    */
    describe('initial entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* This test ensure there is at least one element by testing
        *  the childern length of 'feed' class
        */
         it('contains one element at least', function() {
            expect($('.feed .entry-link').length).not.toBe(0);
         });
    });

    /* It is test new selection of feed */
    describe('New feed selection', function() {
        let first;
        let second;
        /* This promise to ensure the two async function are running
        *  one by one. Then, it test first content with second one
        */
        let promise = new Promise(function(resolve, reject){
            loadFeed(0, resolve);
        }).then(function(){
            first = document.getElementsByClassName('feed');
            first = first[0].outerText;

            return new Promise(function(resolve, reject) {
                loadFeed(1, resolve);
            }).then(function() {
                second = document.getElementsByClassName('feed');
                second = second[0].outerText;
            });
        });

        /* When the promise resolved and two async done. It test
        *  first content against second content
        */
         it('ensure the content changes', function(done) {
            promise.then(function(){
                expect(first).not.toBe(second);
                done();
            });
         });
    });

}());
