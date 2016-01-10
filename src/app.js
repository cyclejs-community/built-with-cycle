import {Observable} from 'rx';
import {div, a, h2, h3, img, hr, button} from '@cycle/dom';

import projects from '../data/projects';

const PROJECTS_PER_PAGE = 10;

const INSTRUCTIONS = `
Please add new projects by making a pull request or issue against this <a href="https://github.com/Widdershin/built-with-cycle">project's repository</a>.
`;

function renderSidebar () {
  return (
    div('.sidebar', [

      a({href: 'http://cycle.js.org', target: '_blank'}, [
        img({src: 'assets/cyclejs_logo.svg', alt: 'Cycle.js'})
      ]),

      h2('Built with Cycle.js'),

      div('.instructions', {innerHTML: INSTRUCTIONS}),

      hr(),

      div('.credit', [
        'Built by ',
        a({href: 'https://github.com/Widdershin'}, 'Widdershin'),
        ' with the help of the ',
        a({href: 'https://github.com/Widdershin/graphs/contributors'}, 'Cycle community'),
        '.'
      ])
    ])
  );
}

function renderProject (project, index, projects) {
  const lastProject = index === projects.length - 1;

  return (
    div('.project', [
      div('.project-header', [
        a('.homepage', {href: project.homepage, target: '_blank'}, [
          h3('.name', project.name)
        ]),

        a('.repo', {href: project.repository, target: '_blank'}, [
          img('.repo-img', {src: 'assets/github.svg', alt: project.name})
        ])
      ]),

      div('.description', project.description),

      a('.homepage', {href: project.homepage, target: '_blank'}, [
        img('.screenshot', {src: project.screenshot, alt: project.name})
      ]),

      lastProject ? '' : hr()
    ])
  );
}

function renderNavigationControls (projects, numberToRender) {
  if (numberToRender >= projects.length) {
    return;
  }

  return (
    div('.navigation', [
      button('.more', 'Show more')
    ])
  );
}

function renderProjects (projects, numberToRender) {
  return (
    div('.projects', projects
      .slice(0, numberToRender)
      .map(renderProject)
      .concat([renderNavigationControls(projects, numberToRender)])
    )
  );
}

export default function App ({DOM}) {
  const showMore$ = DOM
    .select('.navigation .more')
    .events('click')
    .do(ev => ev.preventDefault())
    .map(_ => +PROJECTS_PER_PAGE);

  const projectsToShowCount$ = showMore$
    .scan((current, change) => current + change, PROJECTS_PER_PAGE)
    .startWith(PROJECTS_PER_PAGE);

  return {
    DOM: projectsToShowCount$.map(numberToShow =>
      div('.built-with-cycle', [
        renderSidebar(),
        renderProjects(projects, numberToShow)
      ])
    )
  };
}
