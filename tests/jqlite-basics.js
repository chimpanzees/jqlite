
describe('Basics', function () {

	var body = document.body;

	beforeEach(function () {
		body.innerHTML = '';
	});

	it('find', function () {
		body.innerHTML = '<article id="item-id" class="parent element" data-some="attribute"><section class="post"><a class="link"></a></section></article>';
		expect( $('#item-id > section').length ).toBe(1);
	});

	it('find: multiple', function () {
		body.innerHTML = '<ul><li>foo</li><li>bar</li><li>foobar</li></ul>';
		expect( $(body).find('ul > li').length ).toBe(3);
	});

	it('find: multiple', function () {
		body.innerHTML = '<ul><li>foo</li><li>bar</li><li>foobar</li></ul><ul><li>foo</li><li>bar</li><li>foobar</li></ul>';
		expect( $(body).find('ul').find('li').length ).toBe(6);
	});

	it('find: nested no duplicates', function () {
		body.innerHTML = '<ul><li>foo</li><li>bar</li><li>foobar<ul><li>foo</li><li>bar</li><li class="foo">foobar</li></ul></li></ul><ul><li>foo</li><li>bar</li><li class="foo">foobar</li></ul>';
		expect( $('ul').find('li').length ).toBe(9);
		expect( $('ul').find('li.foo').text() ).toBe('foobarfoobar');
	});

	it('each', function () {
		body.innerHTML = '<ul><li>foo</li><li>bar</li><li>foobar</li></ul>';
		var texts = '';

		$('ul > li').each(function () {
			texts += this.textContent;
		});

		expect( texts ).toBe('foobarfoobar');
	});

	it('filter', function () {
		body.innerHTML = '<ul><li class="odd">foo</li><li>bar</li><li class="odd">foobar</li><li>barfoo</li><li class="odd">raboof</li></ul>';

		var liList = $('ul > li'),
				liOdds = liList.filter('.odd'),
				liOdds2 = liList.filter(':nth-child(odd)'),
				liOdds3 = $('ul > li:nth-child(odd)');

		expect( liOdds.text() ).toBe('foofoobarraboof');
		expect( liOdds.length ).toBe( liOdds2.length );
		expect( liOdds.length ).toBe( liOdds3.length );

		expect( liOdds.some(function (item, index) {
			return item !== liOdds2[index];
		}) ).toBe(false);

		expect( liOdds.some(function (item, index) {
			return item !== liOdds3[index];
		}) ).toBe(false);

	});

	it('children', function () {
		body.innerHTML = '<ul><li>foo</li><li>bar</li><li>foobar<ul><li>foo</li><li>bar</li><li>foobar</li></ul></li></ul><ul><li>foo<ul><li>foo</li><li>bar</li><li>foobar</li></ul><ul><li>foo</li><li>bar</li><li>foobar</li></ul></li><li>bar</li><li>foobar</li></ul>';
		expect( $('ul').find('li').children().length ).toBe(3);
	});

});
