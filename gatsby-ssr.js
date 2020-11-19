import ReactDOM from 'react-dom';

export { wrapRootElement } from './wrapRootElement';

export function replaceHydrateFunction() {
  return (element, container, callback) => {
    ReactDOM.render(element, container, callback);
  };
}
