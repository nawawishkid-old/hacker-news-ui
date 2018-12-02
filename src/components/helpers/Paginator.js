import PropTypes from "prop-types";

const Paginator = ({ page, perPage, contents, render }) =>
  render(contents.filter(getPaginationFilter(page, perPage)));

function getPaginationFilter(pageNumber, itemsPerLoad) {
  const storiesFrom = (pageNumber - 1) * itemsPerLoad;
  const storiesBefore = storiesFrom + itemsPerLoad;

  return (id, index) => index < storiesBefore && index >= storiesFrom;
}

const PAGINATOR_DEFAULT_NUMBER_PER_PAGE = 5;

Paginator.defaultProps = {
  page: 1,
  perPage: PAGINATOR_DEFAULT_NUMBER_PER_PAGE,
  contents: []
};
Paginator.propTypes = {
  page: PropTypes.number,
  perPage: PropTypes.number,
  contents: PropTypes.array
};

export default Paginator;
