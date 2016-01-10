import {Observable} from 'rx';
import {div, a, h2, h3, img, hr} from '@cycle/dom';

import projects from '../data/projects';

const INSTRUCTIONS = `
Submit a new project by making a pull request or issue against this <a href="https://github.com/Widdershin/built-with-cycle">project's repository</a>.
`;

function renderSidebar () {
  return (
    div('.sidebar', [
      img({src: 'assets/cyclejs_logo.svg', alt: 'Cycle.js'}),

      h2('Built with Cycle.js'),

      hr(),

      div('.instructions', {innerHTML: INSTRUCTIONS}),

      hr(),

      div('.credit', [
        'Built by ',
        a({href: 'https://github.com/Widdershin'}, 'Widdershin'),
        '.'
      ])
    ])
  );
}

function renderProject (project) {
  return (
    div('.project', [
      a('.homepage', {href: project.homepage, target: '_blank'}, [
        h3('.name', project.name)
      ]),

      div('.description', project.description),

      a('.homepage', {href: project.homepage, target: '_blank'}, [
        img({src: project.screenshot, alt: project.name})
      ]),

      hr()
    ])
  );
}

function renderProjects (projects) {
  return (
    div('.projects', projects.map(renderProject))
  );
}

export default function App ({DOM}) {
  return {
    DOM: Observable.just(
      div('.built-with-cycle', [
        renderSidebar(),
        renderProjects(projects)
      ])
    )
  };
}
