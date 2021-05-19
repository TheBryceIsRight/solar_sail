import useSWR from "swr"


const fetcher = url => fetch(url).then(res => res.json())

export default function UseFigmaAPI() {
    const { data, error } = useSWR(`/api/figma_api`, fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
};
}
