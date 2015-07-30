import $ from 'jquery';
import debug from 'debug';

import tpl from './templates/home.hbs';

const dbg = debug('oz:index');

const content = tpl({
  content: 'Even with template',
});

$(() => {
  dbg('document ready');

  $('#main').append(content);
});
