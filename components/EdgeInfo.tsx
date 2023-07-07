'use client';

import { useEffect, useState } from "react";

export default function EdgeInfo() {

    const [data, setData] = useState<string>("Loading!");

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/edge-handler`);
            if (!response.ok) {
                setData(response.statusText);
                return;
            }

            const json = await response.json();
            setData(json.message);
        }
        fetchData();
    }, []);
    return (
        <div className="flex flex-col gap-4">
            <p>To keep the example simple, I am NOT refreshing this based on auth status.  After logout/in, you may need to reload the page for it to update.</p>
            <div className="p-4 rounded border"><pre>{JSON.stringify(data)}</pre></div>
        </div>
    )
}