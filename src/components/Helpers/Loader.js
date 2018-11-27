import React from "react";
import PropTypes from "prop-types";

const Loader = ({ loadComponent, waitComponent, isLoaded }) => {
  const component = isLoaded ? loadComponent : waitComponent;

  return React.createElement(component);
};

Loader.defaultProps = {
  waitComponent: () => "Loading..."
};
Loader.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  loadComponent: PropTypes.func.isRequired,
  waitComponent: PropTypes.func
};

export default Loader;
