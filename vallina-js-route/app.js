const siteTitle = 'Matthew';

const routes = {
  404: {
    pagePath: '/pages/404.html',
    pageTitle: '404 - ' + siteTitle,
    description: 'Page not found',
  },
  '/': {
    redirect: '/home',
  },
  '/home': {
    pagePath: '/pages/home.html',
    pageTitle: 'home - ' + siteTitle,
    description: 'This is the home page',
  },
  '/contact': {
    pagePath: '/pages/contact.html',
    pageTitle: 'contact - ' + siteTitle,
    description: 'This is the contact page',
  },
};

document.querySelector('nav').addEventListener('click', e => {
  if (e.target.matches('a')) {
    e.preventDefault();
    useRoute(e);
  }
});

const useRoute = e => {
  e = e || window.event;
  e.preventDefault();
  window.history.pushState({}, '', e.target.href);
  render();
};

const redirect = path => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

const render = async () => {
  const path = window.location.pathname;
  if (routes[path]?.redirect) {
    return redirect(routes[path].redirect);
  }
  const route = routes[path] || routes['404'];
  const response = await fetch(route.pagePath);
  const html = await response.text();
  document.querySelector('#app').innerHTML = html;
  document.title = route.pageTitle;
  document.querySelector('meta[name="description"]').setAttribute('content', route.description);
};

window.onpopstate = render;
render();
