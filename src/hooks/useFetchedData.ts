"use client";

import { useCallback, useEffect, useState } from "react";
import type { RequestStatus } from "@/types/RequestStatus";

export function useFetchedData<Data>(url: string, refreshMilliseconds?: number) {
  const [data, setData] = useState<Data | null>(null);
  const [status, setStatus] = useState<RequestStatus>("loading");

  const reload = useCallback(async () => {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      setData(await response.json());
      setStatus("ready");
    } catch {
      setStatus("failed");
    }
  }, [url]);

  useEffect(() => {
    reload();
    if (!refreshMilliseconds) {
      return;
    }
    const timer = setInterval(reload, refreshMilliseconds);
    return () => clearInterval(timer);
  }, [reload, refreshMilliseconds]);

  return { data, status, reload };
}
