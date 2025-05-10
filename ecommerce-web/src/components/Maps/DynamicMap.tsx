"use client";

import dynamic from "next/dynamic";
import Loading from "../Loading";

const DynamicMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => <Loading message="Đang tải bản đồ..." />,
});

export default DynamicMap;
