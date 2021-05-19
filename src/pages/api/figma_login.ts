import axios from "axios"

export default async (req, res) => {
  const state = '0e900be10ac54e6abf4b38f8b21a189b';
  const url = `https://www.figma.com/oauth?client_id=:LP0W6v8LjJ0MVonK3Ct0AT&redirect_uri=:https://solar-sail-chi.vercel.app/Figma&scope=file_read&state=:0e900be10ac54e6abf4b38f8b21a189b&response_type=code`;
  const xFigmaToken = '190114-46a6f35c-d869-4e2e-8663-5a33f8c38a96';

  await axios
    .get(url)
    .then(({ data }) => {
      res.status(200).json({ data })
    })
    .catch(({ err }) => {
      res.status(400).json({ err })
    })
}