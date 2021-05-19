import useSWR from "swr"

const fetcher = url => fetch(url).then(res => res.json())

export default function UseFigmaAPI() {
    const { data, error } = useSWR(`/api/figma_login`, fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
};
}
