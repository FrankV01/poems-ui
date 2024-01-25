"use client";

import { getGroupedPoemIds } from "../../lib/ApiActions";
import PoemRow from "./PoemRow";
import React, { useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { LoadingColumn } from "./LoadingColumn";
import { useEffectOnce } from "usehooks-ts";

type InfinitePoemsProps = {};

export const InfinitePoems = (prop: InfinitePoemsProps) => {
  const [poemData, setPoemData] = useState<number[][]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const moreData = () => {
    if (isLoading) return;
    setIsLoading(true);
    getGroupedPoemIds(page, 6)
      .then((data) => {
        setHasMore(data.length === 2);
        setPoemData((prev) => [...prev, ...data]);
      })
      .catch((err) => {
        setError("error occurred during retrieval of poem data");
      })
      .finally(() => {
        setPage((prev) => prev + 1);
        setIsLoading(false);
      });
  };

  useEffectOnce(() => {
    moreData();
  });

  // Produces the React components.
  const rows = useMemo(
    () =>
      poemData.map((itm) => (
        <PoemRow key={`poemRow-${itm[0]}`} poemIds={itm} />
      )),
    [poemData],
  );

  return (
    <>
      <InfiniteScroll
        dataLength={poemData.length}
        next={moreData}
        hasMore={hasMore}
        loader={<LoadingColumn />}
        endMessage={
          <div className={"m-auto"}>
            <h4>All poems Displayed</h4>
          </div>
        }
      >
        {rows.length !== 0 ? rows : <LoadingColumn />}
        {isLoading && <LoadingColumn />}
        {error && <p>Error: {error}</p>}
      </InfiniteScroll>
    </>
  );
};
