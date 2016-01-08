import {Observable} from 'rx';
import {div, pre, h2, img} from '@cycle/dom';

import projects from '../data/projects';

function renderSidebar () {
  return (
    div('.sidebar', [
      h2('Built with Cycle.js'),
      img({src: 'http://cycle.js.org/img/cyclejs_logo.svg', alt: 'Cycle.js'})
    ])
  );
}

function renderProject(project) {
  return (
    pre(JSON.stringify(project, null, 2))
  );
}

function renderProjects (projects) {
  return (
    projects.map(renderProject)
  )
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
