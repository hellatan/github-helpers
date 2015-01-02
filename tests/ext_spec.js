/**
 * User: hella
 * Date: 1/1/15
 * Time: 9:50 PM
 * Copyright 1stdibs.com, Inc. 2015. All Rights Reserved.
 */

describe('extension functionality test', function () {
    var $ = Sizzle;
    var urlSpy;

    function hasClass(el, klass) {
        el = Array.isArray(el) ? el[0] : el;
        return el.classList.contains(klass) > -1;
    }

    describe('github functionality', function () {

        var $milestoneEl;
        var $statusEl;
        var $milestoneInputEl;
        var $statusOpenEl;
        var $statusClosedEl;

        beforeEach(function () {
            urlSpy = spyOn(helpers, 'goToUrl');
            $milestoneEl = $('#formMilestone');
            $statusEl = $('#formStatus');
            $milestoneInputEl = $('#formMilestoneInput');
            $statusOpenEl = $('input[type="radio"][value="open"]');
            $statusClosedEl = $('input[type="radio"][value="closed"]');
        });

        afterEach(function () {
            $milestoneEl[0].classList.remove('err');
            $statusEl[0].classList.remove('err');
            $milestoneInputEl[0].value = '';
            $statusOpenEl[0].checked = false;
            $statusClosedEl[0].checked = false;
        });

        it('should result in errors being shown', function () {
            document.getElementById('formMilestoneSearch').click();
            expect(hasClass($milestoneEl, 'err')).toBe(true);
            expect(hasClass($statusEl, 'err')).toBe(true);
        });
        it('should result in a valid url', function () {
            var url = 'https://github.com/pulls?q=user%3A1stdibs%20is%3Aopen%20milestone%3A5.5';
            $milestoneInputEl[0].value = '5.5';
            $statusOpenEl[0].checked = true;
            document.getElementById('formMilestoneSearch').click();
            expect(urlSpy).toHaveBeenCalledWith(url);
        });

    });

    describe('jira functionality', function () {
        var $fixVersionEl;
        var $fixVersionInputEl;

        beforeEach(function () {
            urlSpy = spyOn(helpers, 'goToUrl');
            $fixVersionEl = $('#formFixVersion');
            $fixVersionInputEl = $('#formFixVersionInput');
        });

        afterEach(function () {
            $fixVersionEl[0].classList.remove('err');
            $fixVersionInputEl[0].value = '';
        });

        it('should result in errors being shown', function () {
            document.getElementById('formFixVersionSearch').click();
            expect(hasClass($fixVersionEl, 'err')).toBe(true);
        });

        it('should result in a valid url', function () {
            var url = 'https://1stdibs.atlassian.net/issues/?jql=fixVersion%20%3D%205.5%20ORDER%20BY%20status%20ASC';
            $fixVersionInputEl[0].value = '5.5';
            document.getElementById('formFixVersionSearch').click();
            expect(urlSpy).toHaveBeenCalledWith(url);

        });
    });
});