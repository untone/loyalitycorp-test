import parse from 'parse-link-header';
import token from './token.json';

const baseURL = 'https://api.github.com';
export const perPage = 10;

const searchParams = params => 
  Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&');

const fetchHeaders = (endpoint, params = {}) => {
  const url = `${baseURL}${endpoint}?${searchParams({...params, token})}`;
  return fetch(url)
    .then(response => {
      const {last: {page = 1} = {}} = parse(response.headers.get('Link')) || 1;
      return page;
    })
    .catch(error => error.message)
};

const fetchData = (endpoint, params = {}) => {
  const url = `${baseURL}${endpoint}?${searchParams({...params, token})}`;
  return fetch(url)
    .then(response => response.json())
    .catch(error => error.message);
};

export const fetchRepo = async ({username, reponame}) => {
  const repo = await fetchData(`/repos/${username}/${reponame}`) || {};
  const {content} = await fetchData(`/repos/${username}/${reponame}/readme`) || 'Cg==';
  repo.readme = atob(content);
  return repo;
};

export const fetchRepos = async ({
  language,
  username,
  sort,
  page,
  getTotal
}) => {
  let endpoint = `/users/${username}/starred`;
  let params = {
    direction: 'desc',
    type: 'all',
    sort: sort,
    page: page,
    per_page: perPage
  };
  if (language !== null) {
    params.language = language;
  }
  let total_count = 0;
  let items = [];
  items = await fetchData(endpoint, {...params});
  // Github does not provided total repos count
  // at this endtpoint so first time we making
  // a hacky request with one item per page
  // and get a total items count from Link header.
  // If items presents, of course.
  if (getTotal && items.length) {
    total_count = await fetchHeaders(endpoint, {...params, ...{per_page: 1}});
  }
  return [total_count, items];
};

export const fetchUsers = ({page = 1, query: q}) => fetchData('/search/users', {per_page: perPage, page, q});
