import React from "react";
import styled from "styled-components";

const ranges = [
  { time: 3600 * 24 * 7, unit: "week" },
  { time: 3600 * 24, unit: "day" },
  { time: 3600, unit: "hour" },
  { time: 60, unit: "minute" }
];

const CommentTime = styled(({ time, className }) => {
  const passed = Date.now() / 1000 - time;
  let passedTimeDiff, flooredDiff, result;

  ranges.some(range => {
    if (passed <= range.time) {
      return false;
    }

    passedTimeDiff = passed / range.time;
    flooredDiff = Math.floor(passedTimeDiff);
    result =
      passedTimeDiff === time
        ? "A few seconds ago"
        : flooredDiff + " " + getTimeSuffix(flooredDiff, range.unit);

    return true;
  });

  return (
    <span className={className}>
      on <span className="story-comment-detail-time">{result}</span>
    </span>
  );
})``;

const getTimeSuffix = (flooredDiff, unit) => {
  const suffix = flooredDiff > 1 ? "s ago" : " ago";

  return unit + suffix;
};

export default CommentTime;
