import React from "react";
import PropTypes from "prop-types";

/**
 * Usage: <DataLoader loader={<Function>} render={<Function>} />
 */
const DataLoader = ({ loader, render }) => {
  const [contents, setContent] = React.useState([]);

  React.useEffect(() => {
    loader(setContent);
  }, []);

  return render(contents);
};

DataLoader.propTypes = {
  loader: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired
};

export default DataLoader;
