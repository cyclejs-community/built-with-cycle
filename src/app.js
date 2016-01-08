import {Observable} from 'rx';
import {div, a, h2, h3, img} from '@cycle/dom';

import projects from '../data/projects';

function renderSidebar () {
  return (
    div('.sidebar', [
      h2('Built with Cycle.js'),
      img({src: 'http://cycle.js.org/img/cyclejs_logo.svg', alt: 'Cycle.js'})
    ])
  );
}

function renderProject (project) {
  return (
    div('.project', [
      a('.homepage', {href: project.homepage}, [
        h3('.name', project.name)
      ]),

      div('.description', project.description),

      img({src: project.screenshot, alt: project.name})
    ])
  );
}

function renderProjects (projects) {
  return (
    projects.map(renderProject)
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
